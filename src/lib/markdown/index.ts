import type { Root } from 'mdast'
import type { Element, Root as HastRoot } from 'hast'
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
import {
  dropEmptyHeadingIds,
  dropUnterminatedIALs,
  escapeWhitespaceCodeSpans,
  fenceFlags,
  scanFences,
  hoistCodeAttrs,
  refloatIALs,
  restoreCodeLanguage
} from './ial'
import {
  encodeKramdownTables,
  HTML_SPAN_ELEMENTS,
  kramdownTableHandler,
  kramdownTables
} from './tables'

/**
 * In-process remark pipeline replacing Ruby kramdown. Ordering constraints:
 * the IAL pre-passes need raw source (includes contain IALs);
 * `restoreCodeLanguage` must precede remark-rehype, which overwrites `<code>`
 * className; `dropEmptyHeadingIds` follows `rehype-slug`, which emits `id=""`
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

const BLOCK_START =
  /^(?:[#>|{}]|[-*+](\s|$)|\d+[.)](\s|$)|-{2,}\s*$|={2,}\s*$|`{3,}|~{3,})/
const LINK_DEFINITION = /^\[[^\]]*\]:/
// CommonMark HTML block starts (types 1-6)
const HTML_BLOCK =
  /^<(?:!--|\?|!\[CDATA\[|!DOCTYPE|\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>))/i

const isBlockStart = (line: string) =>
  BLOCK_START.test(line) || LINK_DEFINITION.test(line) || HTML_BLOCK.test(line)

// A list marker before a continuation does not end the paragraph
// (`* item\n  continued`), so it is not a block start here
const PREV_BLOCK_START = /^(?:[#>|{}]|-{2,}\s*$|={2,}\s*$|`{3,}|~{3,})/

const isPrevBlockStart = (line: string) =>
  PREV_BLOCK_START.test(line) ||
  LINK_DEFINITION.test(line) ||
  HTML_BLOCK.test(line)

/** Drops `{::options ... /}`; measured no-op for kramdown.md's one use */
export function dropBlockExtensions(md: string): string {
  const lines = md.split('\n')
  const fenced = fenceFlags(lines)
  return lines
    .filter((line, index) => fenced[index] || !/^\s*\{::.*\/\}\s*$/.test(line))
    .join('\n')
}

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

/**
 * kramdown renders a line that is a lone span-level HTML tag as a paragraph;
 * CommonMark treats it as a raw HTML block. Wrap those root elements in `<p>`
 */
export function wrapLoneInlineHtml() {
  return (tree: HastRoot) => {
    tree.children = tree.children.map((child) =>
      child.type === 'element' && HTML_SPAN_ELEMENTS[child.tagName]
        ? {
            type: 'element' as const,
            tagName: 'p',
            properties: {},
            children: [child]
          }
        : child
    )
  }
}

/** kramdown ends indented code before trailing blank lines; CommonMark keeps them */
export function trimIndentedCodeBlocks(md: string): string {
  const lines = md.split('\n')
  const fenced = fenceFlags(lines)
  const drop = new Set<number>()

  let index = 0
  while (index < lines.length) {
    const atBoundary =
      index === 0 ||
      lines[index - 1].trim() === '' ||
      isBlockStart(lines[index - 1].trimStart())
    if (fenced[index] || !atBoundary || !/^ {4,}\S/.test(lines[index])) {
      index++
      continue
    }

    let end = index
    let lastCode = index
    while (
      end < lines.length &&
      !fenced[end] &&
      (lines[end].trim() === '' || /^ {4,}/.test(lines[end]))
    ) {
      if (lines[end].trim() !== '') lastCode = end
      end++
    }
    for (let i = lastCode + 1; i < end; i++) drop.add(i)
    index = end
  }

  return lines.filter((_, i) => !drop.has(i)).join('\n')
}

/**
 * kramdown omits `<p>` around a list item's first paragraph unless the item
 * ends with a blank line (`* a\n\n* b` wraps both); CommonMark wraps every item
 * in a loose list. Tags what `unwrapTransparentParagraphs` removes
 */
const TRANSPARENT = '__kramdown-transparent'

export function tightenListItems() {
  return (tree: Root) => {
    visit(tree, 'list', (list) => {
      const items = list.children
      const transparent: boolean[] = []
      const notParagraph: boolean[] = []

      items.forEach((item, index) => {
        const first = item.children[0]
        notParagraph.push(!first || first.type !== 'paragraph')
        if (!first || first.type !== 'paragraph') {
          transparent.push(false)
          return
        }

        const second = item.children[1]
        // A blank line between the first paragraph and the next child makes
        // kramdown wrap this paragraph (`- a\n\n  ```
        const blankBeforeSecond =
          second != null &&
          first.position != null &&
          second.position != null &&
          second.position.start.line > first.position.end.line + 1

        // A trailing blank line before the next item does the same for a
        // single-block item (`* a\n\n* b` wraps both)
        const next = items[index + 1]
        const endLine = item.position?.end.line
        const nextLine = next?.position?.start.line ?? list.position?.end.line
        const blankTerminated =
          endLine != null && nextLine != null && nextLine > endLine + 1

        const multi = item.children.length >= 2
        const unwrapped = multi
          ? !blankBeforeSecond
          : !blankTerminated || index === items.length - 1

        const last = index === items.length - 1
        const anchorsList =
          !last ||
          items.length === 1 ||
          items
            .slice(0, index)
            .some((_, earlier) => notParagraph[earlier] || transparent[earlier])

        transparent.push(unwrapped && anchorsList)
      })

      items.forEach((item, index) => {
        const first = item.children[0]
        if (!transparent[index] || !first || first.type !== 'paragraph') return
        first.data ??= {}
        const properties = (first.data.hProperties ??= {}) as Record<
          string,
          unknown
        >
        const className = properties.className
        properties.className = Array.isArray(className)
          ? [...className.map(String), TRANSPARENT]
          : className
            ? `${String(className)} ${TRANSPARENT}`
            : TRANSPARENT
      })
    })
  }
}

/**
 * Removes the `<p>` wrappers tagged by `tightenListItems` plus the newline
 * mdast-util-to-hast inserts before them
 */
export function unwrapTransparentParagraphs() {
  return (tree: HastRoot) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'p' || index === undefined || !parent) return
      const className = node.properties?.className
      const list = Array.isArray(className)
        ? className.map(String)
        : typeof className === 'string'
          ? className.split(/\s+/).filter(Boolean)
          : []
      if (!list.includes(TRANSPARENT)) return

      const keep = list.filter((name) => name !== TRANSPARENT)
      if (keep.length) node.properties.className = keep
      else delete node.properties.className

      const children = parent.children
      let at = index
      const before = children[at - 1]
      if (before?.type === 'text' && before.value === '\n') {
        children.splice(at - 1, 1)
        at--
      }
      children.splice(at, 1, ...node.children)

      const after = children[at + node.children.length]
      if (
        after?.type === 'text' &&
        after.value === '\n' &&
        at + node.children.length === children.length - 1
      ) {
        children.splice(at + node.children.length, 1)
      }
    })
  }
}

export async function renderMarkdown(input: string): Promise<{ html: string }> {
  const md = encodeKramdownTables(
    refloatIALs(
      dropUnterminatedIALs(
        preserveWhitespace(
          escapeWhitespaceCodeSpans(
            trimIndentedCodeBlocks(dropBlockExtensions(expandJekyll(input)))
          )
        )
      )
    )
  )

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkAttributeList, { allowNoSpaceBeforeName: true })
    .use(restoreCodeLanguage)
    .use(kramdownTables)
    .use(tightenListItems)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: createHandlers(md)
    })
    .use(rehypeRaw)
    .use(unwrapTransparentParagraphs)
    .use(restoreWhitespace)
    .use(wrapLoneInlineHtml)
    .use(hoistCodeAttrs)
    .use(rehypeSlug)
    .use(dropEmptyHeadingIds)
    .use(rehypeStringify, { allowDangerousHtml: true, closeSelfClosing: true })
    .process(md)

  return { html: String(result) }
}
