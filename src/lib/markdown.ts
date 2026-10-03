import type { Link, Root } from 'mdast'
import type { Element, Root as HastRoot } from 'hast'
import type { Handlers } from 'mdast-util-to-hast'
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
  fenceFlags,
  hoistCodeAttrs,
  refloatIALs,
  restoreCodeLanguage
} from './ial'
import { kramdownSmartQuotes, kramdownTypographicSymbols } from './smartquotes'
import {
  encodeKramdownTables,
  kramdownTableHandler,
  kramdownTables
} from './tables'

/**
 * Replaces `renderKramdown()` (Ruby kramdown + a `.cache/` of prebuilt HTML)
 * with an in-process unified/remark pipeline.
 *
 * The ordering below encodes measured constraints:
 *
 * - `expandJekyll` and the IAL pre-passes run on the raw source, since
 *   includes contain IALs and kramdown tolerates shapes the plugin does not.
 * - `restoreCodeLanguage` must run before `remark-rehype`:
 *   `mdast-util-to-hast` overwrites `className` on `<code>` with the IAL's
 *   classes, so `language-*` has to be merged back at the mdast level.
 * - `kramdownTables` replaces GFM's table dialect with kramdown's.
 * - Typographic symbols run before `remark-smartypants`, which then only has
 *   to deal with quotes.
 * - `dropEmptyHeadingIds` runs after `rehype-slug` (which is what emits
 *   `id=""`).
 */

/**
 * kramdown emits a newline after every block, and one more for each blank
 * line between blocks in the source. `render.ts`'s sectionizer preserves that
 * whitespace, and the existing inline snapshots assert it.
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
 * Placeholder for whitespace that kramdown preserves but CommonMark strips:
 * a single trailing space before a line break, and the indentation of a
 * paragraph's continuation lines. Restored by `restoreWhitespace()` after the
 * tree is built. Invisible in HTML, but part of the rendered contract.
 */
const WHITESPACE_MARK = '\uE000'

const BLOCK_START =
  /^(?:[#>|{}]|[-*+](\s|$)|\d+[.)](\s|$)|-{2,}\s*$|={2,}\s*$|`{3,}|~{3,})/
const LINK_DEFINITION = /^\[[^\]]*\]:/
// CommonMark HTML block start conditions (types 1-6); inline HTML like
// `<code>` does not interrupt a paragraph.
const HTML_BLOCK =
  /^<(?:!--|\?|!\[CDATA\[|!DOCTYPE|\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>))/i

const isBlockStart = (line: string) =>
  BLOCK_START.test(line) || LINK_DEFINITION.test(line) || HTML_BLOCK.test(line)

// For the line *before* a continuation, a list marker does not end the
// paragraph (`* item\n  continued`), so it is not treated as a block start.
const PREV_BLOCK_START = /^(?:[#>|{}]|-{2,}\s*$|={2,}\s*$|`{3,}|~{3,})/

const isPrevBlockStart = (line: string) =>
  PREV_BLOCK_START.test(line) ||
  LINK_DEFINITION.test(line) ||
  HTML_BLOCK.test(line)

/**
 * kramdown consumes `{::options … /}` block extensions without emitting
 * anything. Only `kramdown.md` uses one, and its effect (`parse_block_html`)
 * does not change that sheet's output.
 */
export function dropBlockExtensions(md: string): string {
  const lines = md.split('\n')
  const fenced = fenceFlags(lines)
  return lines
    .filter((line, index) => fenced[index] || !/^\s*\{::.*\/\}\s*$/.test(line))
    .join('\n')
}

export function preserveWhitespace(md: string): string {
  const lines = md.split('\n')
  const fenced = fenceFlags(lines)

  // The next line continues the same paragraph (so a trailing space is a
  // soft-break space, which kramdown keeps) rather than ending the block.
  const continues = (index: number) =>
    index >= 0 &&
    index < lines.length &&
    !fenced[index] &&
    lines[index].trim() !== '' &&
    !isBlockStart(lines[index].trimStart())

  return lines
    .map((line, index) => {
      if (fenced[index] || /^ {0,3}\{:[ \t]/.test(line)) return line
      let out = line
      if (line.trim() !== '' && continues(index + 1)) {
        out = out.replace(/(?<![ \t]) $/, WHITESPACE_MARK)
      }
      // Indentation of a paragraph's continuation line. A code block's lines
      // are either preceded by a blank line or by another indented line, so
      // requiring a shallow previous line keeps them intact.
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
      if (node.value.includes(WHITESPACE_MARK)) {
        node.value = node.value.replaceAll(WHITESPACE_MARK, ' ')
      }
    })
  }
}

/** kramdown wraps a lone `<br />` block in a paragraph; CommonMark does not. */
export function wrapLoneBreaks() {
  return (tree: HastRoot) => {
    tree.children = tree.children.map((child) =>
      child.type === 'element' && child.tagName === 'br'
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

/**
 * kramdown's indented code blocks end before trailing whitespace-only lines
 * (CommonMark keeps them in the block). Dropping them keeps the rendered
 * `<pre>` identical.
 */
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
 * kramdown does not autolink bare URLs (`www.x.com`, `http://x.com`,
 * `me@x.com`), while `remark-gfm` does. Autolinked literals are exactly the
 * links whose only child spans the same source range as the link itself;
 * angle autolinks (`<http://x>`) and `[text](url)` links keep their brackets
 * in the range and are left alone.
 */
export function stripGfmAutolinks() {
  return (tree: Root) => {
    visit(tree, 'link', (node: Link, index, parent) => {
      const child = node.children[0]
      if (index === undefined || !parent) return
      if (node.children.length !== 1 || child.type !== 'text') return
      const position = node.position
      const childPosition = child.position
      if (!position || !childPosition) return
      if (
        position.start.offset !== childPosition.start.offset ||
        position.end.offset !== childPosition.end.offset
      ) {
        return
      }
      parent.children[index] = child
    })
  }
}

/**
 * Rewrites `remark-gfm`'s task-list HTML into kramdown's
 * (`class="task-list"`, `class="task-list-item"`,
 * `class="task-list-item-checkbox"`, `disabled="disabled"`,
 * `checked="checked"`). The checkbox is emitted as raw HTML because
 * `hast-util-to-html` collapses boolean attributes to bare names.
 */
export function normalizeTaskLists() {
  return (tree: HastRoot) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'li') return
      const input = node.children.find(
        (child): child is Element =>
          child.type === 'element' &&
          child.tagName === 'input' &&
          child.properties?.type === 'checkbox'
      )
      if (!input) return

      const checked =
        input.properties.checked === true || input.properties.checked === ''
      node.children[node.children.indexOf(input)] = {
        type: 'raw',
        value: `<input type="checkbox" class="task-list-item-checkbox" disabled="disabled"${
          checked ? ' checked="checked"' : ''
        } />`
      } as unknown as Element
      node.properties = { ...node.properties, className: ['task-list-item'] }
    })

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'ul') return
      const hasTask = node.children.some(
        (child) =>
          child.type === 'element' &&
          child.tagName === 'li' &&
          Array.isArray(child.properties?.className) &&
          child.properties.className.includes('task-list-item')
      )
      if (hasTask)
        node.properties = { ...node.properties, className: ['task-list'] }
    })
  }
}

/**
 * kramdown renders a list item's first paragraph without `<p>` unless the
 * item's value ends with a blank line (`* a\n\n* b` → both wrapped), and the
 * last item follows whatever the earlier items did. CommonMark marks the
 * whole list loose instead, wrapping every item. Mark the paragraphs kramdown
 * would unwrap; `unwrapTransparentParagraphs()` removes the wrapper.
 */
const TRANSPARENT = '__kramdown-transparent'

export function tightenListItems() {
  return (tree: Root) => {
    visit(tree, 'list', (list) => {
      const items = list.children
      const transparent: boolean[] = []

      items.forEach((item, index) => {
        const first = item.children[0]
        if (!first || first.type !== 'paragraph') {
          transparent.push(false)
          return
        }

        // A blank line between this item and the next one is part of the
        // item's value in kramdown, which then wraps its paragraph in `<p>`.
        const multiple = item.children.length >= 2
        const next = items[index + 1]
        const endLine = item.position?.end.line
        const nextLine = next?.position?.start.line ?? list.position?.end.line
        const blankTerminated =
          !multiple &&
          endLine != null &&
          nextLine != null &&
          nextLine > endLine + 1

        if (blankTerminated) transparent.push(false)
        else if (index === items.length - 1)
          transparent.push(transparent.some(Boolean))
        else transparent.push(true)
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
 * Removes the `<p>` wrappers marked by `tightenListItems()`, along with the
 * newline `mdast-util-to-hast` inserts before a loose list item's paragraph.
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
          trimIndentedCodeBlocks(dropBlockExtensions(expandJekyll(input)))
        )
      )
    )
  )

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkAttributeList, { allowNoSpaceBeforeName: true })
    .use(stripGfmAutolinks)
    .use(restoreCodeLanguage)
    .use(kramdownTables)
    .use(kramdownTypographicSymbols)
    .use(kramdownSmartQuotes)
    .use(tightenListItems)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: createHandlers(md)
    })
    .use(rehypeRaw)
    .use(unwrapTransparentParagraphs)
    .use(restoreWhitespace)
    .use(wrapLoneBreaks)
    .use(hoistCodeAttrs)
    .use(normalizeTaskLists)
    .use(rehypeSlug)
    .use(dropEmptyHeadingIds)
    .use(rehypeStringify, { allowDangerousHtml: true, closeSelfClosing: true })
    .process(md)

  return { html: String(result) }
}
