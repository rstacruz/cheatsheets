import type { Root as HastRoot } from 'hast'
import type { Handler, Handlers } from 'mdast-util-to-hast'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkAttributeList from 'remark-attribute-list'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { expandJekyll } from './jekyll'
import { hoistCodeAttrs, restoreCodeLanguage } from './ial'
import {
  encodeKramdownTables,
  kramdownTableHandler,
  kramdownTables
} from './tables'
import {
  BLOCK_START,
  HTML_BLOCK,
  LINK_DEFINITION,
  PREV_BLOCK_START,
  scanFences
} from '~/lib/sheetValidation/utils'

/**
 * In-process remark pipeline replacing Ruby kramdown. Ordering constraint:
 * `restoreCodeLanguage` must precede remark-rehype, which overwrites `<code>`
 * className
 */

/**
 * kramdown emits a newline per block plus one per blank line in the source;
 * render.ts's sectionizer relies on that whitespace
 */
function createHandlers(md: string): Handlers {
  const lines = md.split('\n')

  const blankBetween = (endLine?: number, startLine?: number) => {
    if (endLine == null || startLine == null) return false
    for (let i = endLine; i < startLine - 1; i++) {
      if ((lines[i] ?? '').trim() === '') return true
    }
    return false
  }

  const root: Handler = (state, node) => {
    const children: HastRoot['children'] = []

    node.children.forEach((child, index) => {
      const rendered = state.one(child, node)
      const nodes = Array.isArray(rendered)
        ? rendered
        : rendered
          ? [rendered]
          : []
      if (index > 0) {
        const previous = node.children[index - 1]
        children.push({
          type: 'text',
          value: blankBetween(
            previous.position?.end.line,
            child.position?.start.line
          )
            ? '\n\n'
            : '\n'
        })
      }
      children.push(...nodes)
    })

    if (children.length > 0) children.push({ type: 'text', value: '\n' })

    const result: HastRoot = { type: 'root', children }
    state.patch(node, result)
    return state.applyData(node, result) as HastRoot
  }

  return { kramdownTable: kramdownTableHandler, root } as unknown as Handlers
}

/**
 * Private-use placeholder for whitespace kramdown keeps and CommonMark strips:
 * a trailing soft-break space and continuation indentation. Restored after the
 * tree is built
 */
const WHITESPACE_MARK = '\uE000'
/** Escapes pre-existing marker/escape characters so none are lost */
const WHITESPACE_ESCAPE = '\uE001'

const isBlockStart = (line: string) =>
  BLOCK_START.test(line) || LINK_DEFINITION.test(line) || HTML_BLOCK.test(line)

const isPrevBlockStart = (line: string) =>
  PREV_BLOCK_START.test(line) ||
  LINK_DEFINITION.test(line) ||
  HTML_BLOCK.test(line)

export function preserveWhitespace(md: string): string {
  // Escape existing private-use chars first: the marker must be unambiguous
  md = md
    .replaceAll(WHITESPACE_ESCAPE, WHITESPACE_ESCAPE + WHITESPACE_ESCAPE)
    .replaceAll(WHITESPACE_MARK, WHITESPACE_ESCAPE + WHITESPACE_MARK)
  const lines = md.split('\n')
  const { fenced, indent } = scanFences(lines)
  // Next line continues this paragraph, so a trailing space is kept
  const continues = (index: number) =>
    index >= 0 &&
    index < lines.length &&
    !fenced[index] &&
    lines[index].trim() !== '' &&
    !isBlockStart(lines[index].trimStart())

  return lines
    .map((line, index) => {
      // kramdown keeps the indentation of whitespace-only lines inside a
      // fenced block, which CommonMark strips along with the fence indent
      if (fenced[index]) {
        if (!/^ +$/.test(line)) return line
        return (
          line + WHITESPACE_MARK.repeat(Math.min(indent[index], line.length))
        )
      }
      if (/^ {0,3}\{:[ \t]/.test(line)) return line
      let out = line
      if (line.trim() !== '' && continues(index + 1)) {
        out = out.replace(/(?<![ \t]) $/, WHITESPACE_MARK)
      }
      // Continuation indentation; a shallow previous line keeps code blocks
      // intact
      if (
        index > 0 &&
        !fenced[index - 1] &&
        /^ {0,3}\S/.test(lines[index - 1]) &&
        !isPrevBlockStart(lines[index - 1].trimStart()) &&
        /^ +\S/.test(out) &&
        !isBlockStart(out.trimStart())
      ) {
        out = out.replace(/^ +/, (spaces) =>
          WHITESPACE_MARK.repeat(spaces.length)
        )
      }
      return out
    })
    .join('\n')
}

export function restoreWhitespace() {
  return (tree: HastRoot) => {
    visit(tree, 'text', (node) => {
      const value = node.value
      if (
        !value.includes(WHITESPACE_MARK) &&
        !value.includes(WHITESPACE_ESCAPE)
      ) {
        return
      }
      let out = ''
      for (let i = 0; i < value.length; i++) {
        const char = value[i]
        if (char === WHITESPACE_ESCAPE) {
          const next = value[i + 1]
          if (next === WHITESPACE_ESCAPE || next === WHITESPACE_MARK) {
            out += next
            i++
          } else {
            out += char
          }
        } else if (char === WHITESPACE_MARK) {
          out += ' '
        } else {
          out += char
        }
      }
      node.value = out
    })
  }
}

export async function renderMarkdown(input: string): Promise<{ html: string }> {
  const md = encodeKramdownTables(preserveWhitespace(expandJekyll(input)))

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkAttributeList, { allowNoSpaceBeforeName: true })
    .use(restoreCodeLanguage)
    .use(kramdownTables)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: createHandlers(md)
    })
    .use(rehypeRaw)
    .use(restoreWhitespace)
    .use(hoistCodeAttrs)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true, closeSelfClosing: true })
    .process(md)

  return { html: String(result) }
}
