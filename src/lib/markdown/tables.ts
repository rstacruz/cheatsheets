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
  return lines.some((line) => {
    const ranges = protectedRanges(line)
    let cursor = 0
    let stripped = ''
    for (const [start, end] of ranges) {
      stripped += line.slice(cursor, start)
      cursor = end
    }
    stripped += line.slice(cursor)
    return stripped.startsWith('|') || /[^\\]\|/.test(stripped)
  })
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

/** Replaces each table with a fenced sentinel so attribute-list sees a normal block */
export function encodeKramdownTables(md: string): string {
  const lines = md.split('\n')
  const out: string[] = []
  let fence: string | null = null

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]
    const fenceMatch = FENCE_LINE.exec(line)

    if (fenceMatch) {
      const char = fenceMatch[2][0]
      if (fence) {
        if (char === fence && fenceMatch[3].trim() === '') fence = null
      } else if (char === '~' || !fenceMatch[3].includes('`')) {
        fence = char
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
    if (
      !afterBlank ||
      !/^ {0,3}\S/.test(line) ||
      !hasPipe(line) ||
      setextNext
    ) {
      out.push(line)
      continue
    }

    const parsed = parseKramdownTable(lines, index)
    if (!parsed) {
      out.push(line)
      continue
    }

    out.push('```' + TABLE_SENTINEL_LANG, encodeTable(parsed.table), '```')
    index = parsed.end - 1
  }

  return out.join('\n')
}

const inlineProcessor = unified().use(remarkParse)

/**
 * Parses a cell's inline markdown; link definitions are replayed because
 * micromark only resolves `[text][ref]` within the same document
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
