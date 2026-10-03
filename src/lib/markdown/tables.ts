import type {
  Code,
  Nodes as MdastNodes,
  PhrasingContent,
  Position,
  Root
} from 'mdast'
import type { Data } from 'unist'
import type { Element, HastElementContent, Properties } from 'hast'
import type { State } from 'mdast-util-to-hast'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

/**
 * kramdown's table dialect, ported from table.rb (REL_2_4_0); differs from GFM
 * in headerless tables, separator-row bodies, tfoot, alignment styles and
 * ragged-row padding
 *
 * Tables are lifted out before parsing so attribute-list can attach IALs, then
 * re-expanded into a custom node by `kramdownTables`
 */

export const TABLE_SENTINEL_LANG = 'kramdown-table'

type Align = 'left' | 'right' | 'center' | null
type Cell = PhrasingContent[]

export type KramdownTable = {
  columns: number
  align: Align[]
  containers: Array<{ type: 'thead' | 'tbody' | 'tfoot'; rows: string[][] }>
}

export type KramdownTableNode = {
  type: 'kramdownTable'
  align: Align[]
  children: KramdownSection[]
  data?: Data
  position?: Position
}

export type KramdownSection = {
  type: 'kramdownTableSection'
  name: 'thead' | 'tbody' | 'tfoot'
  children: KramdownRow[]
}

export type KramdownRow = { type: 'kramdownTableRow'; children: KramdownCell[] }

export type KramdownCell = {
  type: 'kramdownTableCell'
  children: PhrasingContent[]
}

const SEP_LINE = /^([+|: \t-]*?-[+|: \t-]*?)[ \t]*$/
const FSEP_LINE = /^[+|: \t=]*?=[+|: \t=]*?[ \t]*$/
const HSEP_ALIGN = /[ \t]?(:?)-+(:?)[ \t]?/g
const FENCE_LINE = /^( {0,3})(`{3,}|~{3,})(.*)$/

// kramdown's element categories (parser/html.rb): a line opening a non-span
// tag is an HTML block, and a span-level element hides its body from the
// table pipe check
export const HTML_SPAN_ELEMENTS: Record<string, boolean> = Object.fromEntries(
  (
    'a abbr acronym b big bdo br button cite code del dfn em i img input ins ' +
    'kbd label mark option q rb rbc rp rt rtc ruby samp select small span ' +
    'strong sub sup tt u var'
  )
    .split(' ')
    .map((name) => [name, true])
)
const HTML_BLOCK_ELEMENTS: Record<string, boolean> = Object.fromEntries(
  (
    'address article aside applet body blockquote caption col colgroup dd div ' +
    'dl dt fieldset figcaption footer form h1 h2 h3 h4 h5 h6 header hgroup hr ' +
    'html head iframe legend menu li main map nav ol optgroup p pre section ' +
    'summary table tbody td th thead tfoot tr ul'
  )
    .split(' ')
    .map((name) => [name, true])
)
const HTML_VOID_ELEMENTS: Record<string, boolean> = Object.fromEntries(
  'area base br col command embed hr img input keygen link meta param source track wbr'
    .split(' ')
    .map((name) => [name, true])
)
const HTML_NAME = '[A-Za-z_:][-A-Za-z0-9_:.]*'
const HTML_BLOCK_START_RE = new RegExp(`^ {0,3}</?(${HTML_NAME})(?=[\\s/>])`)

/** `HTML_BLOCK_START` + `parse_block_html` from kramdown */
function startsHtmlBlock(line: string): boolean {
  if (/^ {0,3}<!--/.test(line)) return true
  const match = HTML_BLOCK_START_RE.exec(line)
  return match != null && !HTML_SPAN_ELEMENTS[match[1].toLowerCase()]
}

type SpanNode = { code: boolean; value: string }
type HtmlTag = { kind: 'element' | 'text'; text: string; end: number }

function findTagEnd(region: string, start: number): number {
  let quote = ''
  for (let i = start; i < region.length; i++) {
    const char = region[i]
    if (quote) {
      if (char === quote) quote = ''
    } else if (char === '"' || char === "'") {
      quote = char
    } else if (char === '>') {
      return i + 1
    }
  }
  return -1
}

/**
 * Mirrors `parse_span_html`: closing and block tags become text (pipes in
 * their attributes count), span/void tags become an element node whose value
 * is the tag name so its body is ignored by the pipe check
 */
function scanHtmlTag(region: string, start: number): HtmlTag | null {
  const close = new RegExp(`^</${HTML_NAME}\\s*>`).exec(region.slice(start))
  if (close)
    return { kind: 'text', text: close[0], end: start + close[0].length }

  const open = new RegExp(`^<(${HTML_NAME})`).exec(region.slice(start))
  if (!open) return null
  const end = findTagEnd(region, start + open[0].length)
  if (end < 0) return null

  const raw = region.slice(start, end)
  const lower = open[1].toLowerCase()
  if (HTML_BLOCK_ELEMENTS[lower]) return { kind: 'text', text: raw, end }
  if (/\/\s*>$/.test(raw) || HTML_VOID_ELEMENTS[lower])
    return { kind: 'element', text: lower, end }

  // Walk to the matching close tag, tracking nested same-name elements
  const escaped = lower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const openRe = new RegExp(`<${escaped}(?=[\\s/>])`, 'gi')
  const closeRe = new RegExp(`</${escaped}\\s*>`, 'gi')
  let cursor = end
  let depth = 1
  while (depth > 0) {
    closeRe.lastIndex = cursor
    const closeMatch = closeRe.exec(region)
    if (!closeMatch) {
      cursor = region.length
      break
    }
    openRe.lastIndex = cursor
    const openMatch = openRe.exec(region)
    if (openMatch && openMatch.index < closeMatch.index) {
      const tagEnd = findTagEnd(region, openMatch.index + openMatch[0].length)
      if (tagEnd >= 0 && !/\/\s*>$/.test(region.slice(openMatch.index, tagEnd)))
        depth++
      cursor = tagEnd >= 0 ? tagEnd : region.length
    } else {
      cursor = closeMatch.index + closeMatch[0].length
      depth--
    }
  }
  return { kind: 'element', text: lower, end: cursor }
}

/** Splits a source region into kramdown's span nodes for the pipe check */
function tokenizeSpanNodes(region: string): SpanNode[] {
  const nodes: SpanNode[] = []
  let text = ''
  const flush = () => {
    if (text) {
      nodes.push({ code: false, value: text })
      text = ''
    }
  }

  let i = 0
  while (i < region.length) {
    if (region[i] === '`') {
      let ticks = 0
      while (region[i + ticks] === '`') ticks++
      let cursor = i + ticks
      let close = -1
      while (cursor < region.length) {
        if (region[cursor] !== '`') {
          cursor++
          continue
        }
        let run = 0
        while (region[cursor + run] === '`') run++
        if (run === ticks) {
          close = cursor
          break
        }
        cursor += run
      }
      if (close >= 0) {
        flush()
        nodes.push({ code: true, value: region.slice(i + ticks, close) })
        i = close + ticks
        continue
      }
      text += '`'.repeat(ticks)
      i += ticks
      continue
    }

    if (region.startsWith('<!--', i)) {
      const end = region.indexOf('-->', i + 4)
      if (end >= 0) {
        flush()
        nodes.push({ code: false, value: region.slice(i, end + 3) })
        i = end + 3
        continue
      }
    }

    if (region[i] === '<') {
      const tag = scanHtmlTag(region, i)
      if (tag) {
        if (tag.kind === 'element') {
          flush()
          nodes.push({ code: false, value: tag.text })
        } else {
          text += tag.text
        }
        i = tag.end
        continue
      }
    }

    text += region[i]
    i++
  }
  flush()
  return nodes
}

// `TABLE_PIPE_CHECK` from table.rb: a leading pipe or an unescaped one
const PIPE_CHECK = /^(?:\||.*?[^\\\n]\|)/

/**
 * Port of kramdown's per-line pipe check over span nodes: a table needs an
 * unescaped pipe outside code spans and span-level HTML elements
 */
function barePipeInRegion(region: string): boolean {
  let pipeOnLine = false
  for (const node of tokenizeSpanNodes(region)) {
    if (!node.value) continue
    const lines = node.value.split('\n')
    while (lines.length > 0 && lines[lines.length - 1] === '') lines.pop()
    if (node.code) {
      if (lines.length > 2 || (lines.length === 2 && !pipeOnLine)) break
      if (lines.length === 2) pipeOnLine = false
      continue
    }
    if (lines.length > 1 && !pipeOnLine && !PIPE_CHECK.test(lines[0])) break
    pipeOnLine =
      (lines.length > 1 ? false : pipeOnLine) ||
      (lines.length > 0 && PIPE_CHECK.test(lines[lines.length - 1]))
  }
  return pipeOnLine
}

/**
 * Ranges of code spans and `<code>` HTML, which protect pipes from splitting
 * cells
 */
function protectedRanges(line: string): Array<[number, number]> {
  const ranges: Array<[number, number]> = []
  let i = 0
  while (i < line.length) {
    if (line[i] === '`') {
      let ticks = 0
      while (line[i + ticks] === '`') ticks++
      let j = i + ticks
      let close = -1
      while (j < line.length) {
        if (line[j] !== '`') {
          j++
          continue
        }
        let run = 0
        while (line[j + run] === '`') run++
        if (run === ticks) {
          close = j
          break
        }
        j += run
      }
      if (close >= 0) {
        ranges.push([i, close + ticks])
        i = close + ticks
        continue
      }
      i += ticks
      continue
    }
    if (line.startsWith('<code', i) && /[\s>]/.test(line[i + 5] ?? '')) {
      const end = line.indexOf('</code>', i)
      if (end >= 0) {
        ranges.push([i, end + '</code>'.length])
        i = end + '</code>'.length
        continue
      }
    }
    i++
  }
  return ranges
}

/** `TABLE_LINE` from table.rb: line starts with or contains a pipe */
function hasPipe(line: string): boolean {
  return line.startsWith('|') || /[^\\]\|/.test(line)
}

/** `pipe_on_line`: a table needs an unescaped pipe outside code spans / `<code>` */
function hasBarePipe(lines: string[]): boolean {
  return barePipeInRegion(lines.join('\n'))
}

function parseAlign(separator: string): Align[] {
  const align: Align[] = []
  const re = new RegExp(HSEP_ALIGN.source, 'g')
  let match: RegExpExecArray | null
  while ((match = re.exec(separator)) !== null) {
    if (match[0].length === 0) {
      re.lastIndex++
      continue
    }
    const left = match[1] === ':'
    const right = match[2] === ':'
    align.push(
      left && right ? 'center' : right ? 'right' : left ? 'left' : null
    )
  }
  return align
}

/** Splits a row into cells; code spans and `<code>` protect pipes, `\|` escapes */
function splitCells(line: string): string[] {
  const cells: string[] = []
  let buffer = ''

  const pushRaw = (raw: string) => {
    const parts = raw.split(/(?<!\\)\|/)
    for (let i = 0; i < parts.length - 1; i++) {
      buffer += parts[i].replace(/\\\|/g, '|')
      cells.push(buffer)
      buffer = ''
    }
    buffer += parts[parts.length - 1].replace(/\\\|/g, '|')
  }

  let cursor = 0
  for (const [start, end] of protectedRanges(line)) {
    pushRaw(line.slice(cursor, start))
    buffer += line.slice(start, end)
    cursor = end
  }
  pushRaw(line.slice(cursor))
  cells.push(buffer)

  return cells
}

function rowCells(line: string, leadingPipe: boolean): string[] {
  const cells = splitCells(line)
  if (leadingPipe && cells.length > 0 && cells[0].trim() === '') cells.shift()
  if (cells.length > 0 && cells[cells.length - 1].trim() === '') cells.pop()
  return cells.map((cell) => cell.trim())
}

/** Parses the table at `lines[start]`; `undefined` when kramdown would not */
export function parseKramdownTable(
  lines: string[],
  start: number
): { table: KramdownTable; end: number } | undefined {
  if (!hasPipe(lines[start])) return undefined

  const leadingPipe = /^\s*\|/.test(lines[start])
  const align: Align[] = []
  const containers: KramdownTable['containers'] = []
  let rows: string[][] = []
  let hasFooter = false
  let columns = 0

  const addContainer = (type: 'thead' | 'tbody' | 'tfoot', force = false) => {
    if (!hasFooter || type !== 'tbody' || force) {
      containers.push({ type, rows })
      rows = []
    }
  }

  let index = start
  // kramdown consumes a leading separator line with no rows
  if (SEP_LINE.test(lines[index])) index++

  while (index < lines.length && hasPipe(lines[index])) {
    const line = lines[index]
    const separator = SEP_LINE.exec(line)

    if (separator) {
      if (rows.length === 0) {
        // Consecutive separator lines are ignored
      } else if (align.length === 0 && !hasFooter) {
        addContainer('thead')
        align.push(...parseAlign(separator[1]))
      } else {
        addContainer('tbody')
      }
    } else if (FSEP_LINE.test(line)) {
      if (rows.length > 0) addContainer('tbody', true)
      hasFooter = true
    } else {
      rows.push(rowCells(line, leadingPipe))
      columns = Math.max(columns, rows[rows.length - 1].length)
    }

    index++
  }

  if (rows.length > 0) addContainer(hasFooter ? 'tfoot' : 'tbody')

  const hasBody = containers.some((container) => container.type === 'tbody')
  if (!hasBody) return undefined
  if (!hasBarePipe(lines.slice(start, index))) return undefined

  for (const container of containers) {
    for (const row of container.rows) {
      while (row.length < columns) row.push('')
    }
  }
  if (align.length > columns) align.length = columns
  while (align.length < columns) align.push(null)

  return { table: { columns, align, containers }, end: index }
}

function encodeTable(table: KramdownTable): string {
  return Buffer.from(JSON.stringify(table), 'utf8').toString('base64')
}

/** Container markup (blockquote/list) wrapping a table, re-applied to the sentinel */
type Container = { kind: 'quote' | 'list'; prefix: string; indent: number }

function containerPrefix(line: string): Container | null {
  const quote = /^(\s*)((?:>[ \t]?)+)/.exec(line)
  if (quote) return { kind: 'quote', prefix: quote[1] + quote[2], indent: 0 }
  const list = /^(\s*)(?:[-*+]|\d+[.)])[ \t]+/.exec(line)
  if (list) return { kind: 'list', prefix: list[0], indent: list[0].length }
  return null
}

function stripContainer(line: string, container: Container): string | null {
  if (container.kind === 'quote') {
    const match = /^\s*(?:>[ \t]?)+/.exec(line)
    return match ? line.slice(match[0].length) : null
  }
  const lead = /^ */.exec(line)?.[0].length ?? 0
  return lead < container.indent ? null : line.slice(container.indent)
}

/** Escapes the pipes of a GFM delimiter row so remark-gfm can't table-ify it */
function escapeGfmDelimiter(line: string): string {
  if (/^ {4,}/.test(line) || line.startsWith('\t')) return line
  const match = /^(\s*(?:>[ \t]*)*)([|: \t-]+)$/.exec(line)
  if (!match) return line
  return match[2].includes('|') && match[2].includes('-')
    ? match[1] + match[2].replaceAll('|', '\\|')
    : line
}

/**
 * Replaces each kramdown table with a fenced sentinel so attribute-list sees a
 * normal block. Tables inside blockquotes/lists are stripped of their markers
 * and re-emitted inside a sentinel that keeps them in the container
 */
export function encodeKramdownTables(md: string): string {
  const lines = md.split('\n')
  const out: string[] = []
  let fence: string | null = null

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]
    const fenceMatch = FENCE_LINE.exec(line)

    if (fenceMatch) {
      if (fence) {
        // A closing fence needs at least as many characters as the opener
        if (
          fenceMatch[2][0] === fence[0] &&
          fenceMatch[2].length >= fence.length &&
          fenceMatch[3].trim() === ''
        ) {
          fence = null
        }
      } else if (fenceMatch[2][0] === '~' || !fenceMatch[3].includes('`')) {
        fence = fenceMatch[2]
      }
      out.push(line)
      continue
    }
    if (fence) {
      out.push(line)
      continue
    }

    const afterBlank = index === 0 || lines[index - 1].trim() === ''
    const setextNext = /^ {0,3}(=+|-+)[ \t]*$/.test(lines[index + 1] ?? '')
    const liftable =
      afterBlank && /^ {0,3}\S/.test(line) && hasPipe(line) && !setextNext

    const container = liftable ? containerPrefix(line) : null
    if (container) {
      const logical: string[] = []
      for (
        let cursor = index;
        cursor < lines.length &&
        !(cursor > index && FENCE_LINE.test(lines[cursor]));
        cursor++
      ) {
        const stripped =
          cursor === index
            ? lines[cursor].slice(container.prefix.length)
            : stripContainer(lines[cursor], container)
        if (stripped == null || !hasPipe(stripped)) break
        logical.push(stripped)
      }
      const parsed =
        logical.length > 0 ? parseKramdownTable(logical, 0) : undefined
      if (parsed) {
        const body = encodeTable(parsed.table)
        const pad =
          container.kind === 'list'
            ? ' '.repeat(container.indent)
            : container.prefix
        out.push(
          `${container.prefix}\`\`\`${TABLE_SENTINEL_LANG}`,
          `${pad}${body}`,
          `${pad}\`\`\``
        )
        index = index + parsed.end - 1
        continue
      }
    }

    if (!liftable || startsHtmlBlock(line)) {
      out.push(escapeGfmDelimiter(line))
      continue
    }

    const parsed = parseKramdownTable(lines, index)
    if (!parsed) {
      out.push(escapeGfmDelimiter(line))
      continue
    }

    out.push('```' + TABLE_SENTINEL_LANG, encodeTable(parsed.table), '```')
    index = parsed.end - 1
  }

  return out.join('\n')
}

const inlineProcessor = unified().use(remarkParse).use(remarkGfm)

/**
 * Parses a cell's inline markdown; link definitions are replayed because
 * micromark only resolves `[text][ref]` within the same document. GFM inline
 * syntax (strikethrough) and autolinks are enabled, matching the rest of the
 * pipeline. Tables cannot form in a single-line cell
 */
function parseCell(text: string, definitions: string): Cell {
  if (!text) return []
  // nbsp prefix stops `#`/`-`/`>` from starting a block in the cell
  const tree = inlineProcessor.parse(`${definitions}\u00a0${text}`)
  const paragraph = tree.children[tree.children.length - 1]
  if (!paragraph || paragraph.type !== 'paragraph')
    return [{ type: 'text', value: text }]

  const children = paragraph.children.slice()
  const first = children[0]
  if (first?.type === 'text') {
    first.value = first.value.replace(/^\u00a0/, '')
    if (!first.value) children.shift()
  }
  return children
}

/** Expands the sentinels from `encodeKramdownTables` */
export function kramdownTables() {
  return (tree: Root) => {
    const definitions: string[] = []
    visit(tree, 'definition', (node) => {
      definitions.push(
        `[${node.identifier}]: ${node.url}${node.title ? ` "${node.title}"` : ''}`
      )
    })
    const definitionBlock = definitions.length
      ? `${definitions.join('\n')}\n\n`
      : ''

    visit(tree, 'code', (node: Code, index, parent) => {
      if (node.lang !== TABLE_SENTINEL_LANG) return
      if (index === undefined || !parent) return

      const parsed = JSON.parse(
        Buffer.from(node.value.trim(), 'base64').toString('utf8')
      ) as KramdownTable

      const table: KramdownTableNode = {
        type: 'kramdownTable',
        align: parsed.align,
        children: parsed.containers.map((container) => ({
          type: 'kramdownTableSection',
          name: container.type,
          children: container.rows.map((row) => ({
            type: 'kramdownTableRow',
            children: row.map((cell) => ({
              type: 'kramdownTableCell',
              children: parseCell(cell, definitionBlock)
            }))
          }))
        })),
        data: node.data,
        position: node.position
      }

      parent.children[index] =
        table as unknown as (typeof parent.children)[number]
    })
  }
}

/** Renders a `kramdownTable` node to kramdown's table HTML */
export function kramdownTableHandler(
  state: State,
  node: KramdownTableNode
): Element {
  const cellElement = (
    cell: KramdownCell,
    align: Align,
    tagName: 'th' | 'td'
  ): Element => {
    const properties: Properties = {}
    if (align) properties.style = `text-align: ${align}`
    const children: HastElementContent[] = state.all(
      cell as unknown as MdastNodes
    )
    return {
      type: 'element',
      tagName,
      properties,
      children:
        children.length > 0 ? children : [{ type: 'text', value: '\u00a0' }]
    }
  }

  const children: Element[] = node.children.map((section) => ({
    type: 'element',
    tagName: section.name,
    properties: {},
    children: section.children.map((row) => ({
      type: 'element',
      tagName: 'tr',
      properties: {},
      children: row.children.map((cell, column) =>
        cellElement(
          cell,
          node.align[column] ?? null,
          section.name === 'thead' ? 'th' : 'td'
        )
      )
    }))
  }))

  const result: Element = {
    type: 'element',
    tagName: 'table',
    properties: {},
    children
  }

  return state.applyData(node as unknown as MdastNodes, result) as Element
}
