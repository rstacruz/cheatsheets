import type { Link, Root, Text } from 'mdast'
import type { Element, Root as HastRoot } from 'hast'
import type { Handlers } from 'mdast-util-to-hast'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkAttributeList from 'remark-attribute-list'
import remarkRehype from 'remark-rehype'
import remarkSmartypants from 'remark-smartypants'
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
  hoistCodeAttrs,
  refloatIALs,
  restoreCodeLanguage
} from './ial'
import {
  encodeKramdownTables,
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
  const lines = md.split('\n')
  const fenced = fenceFlags(lines)

  // Next line continues this paragraph, so a trailing space is kept
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
      if (node.value.includes(WHITESPACE_MARK)) {
        node.value = node.value.replaceAll(WHITESPACE_MARK, ' ')
      }
    })
  }
}

/** kramdown wraps a lone `<br />` in a paragraph; CommonMark does not */
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
 * remark-gfm autolinks bare URLs (`http://x.com`, `me@x.com`), kramdown does
 * not. An autolinked literal's only child spans the same source range as the
 * link; angle autolinks (`<http://x>`) and `[text](url)` keep their brackets
 * and are left alone
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
 * Rewrites remark-gfm's task-list markup to kramdown's classes and
 * `disabled="disabled"`/`checked="checked"`; the checkbox is raw HTML because
 * hast-util-to-html collapses boolean attributes to bare names
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

      items.forEach((item, index) => {
        const first = item.children[0]
        if (!first || first.type !== 'paragraph') {
          transparent.push(false)
          return
        }

        // A blank line before the next item makes kramdown wrap this paragraph
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

/**
 * kramdown leaves the content of raw `<code>` HTML unparsed, so it is never
 * typographically transformed; remark exposes that content as ordinary text
 * nodes. Hide them across `remarkSmartypants` and restore the originals after
 */
type RawCodeStash = Array<[Text, string]>

function insideRawCode(children: unknown[], index: number): boolean {
  let depth = 0
  for (let i = 0; i < index; i++) {
    const child = children[i] as { type?: string; value?: string }
    if (child?.type !== 'html' || typeof child.value !== 'string') continue
    depth += (child.value.match(/<code\b/gi) ?? []).length
    depth -= (child.value.match(/<\/code>/gi) ?? []).length
  }
  return depth > 0
}

export function hideRawCode(stash: RawCodeStash) {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (
        parent &&
        index !== undefined &&
        insideRawCode(parent.children, index)
      ) {
        stash.push([node, node.value])
        node.value = ''
      }
    })
  }
}

export function restoreRawCode(stash: RawCodeStash) {
  return () => {
    for (const [node, value] of stash) node.value = value
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

  const rawCode: RawCodeStash = []

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkAttributeList, { allowNoSpaceBeforeName: true })
    .use(stripGfmAutolinks)
    .use(restoreCodeLanguage)
    .use(kramdownTables)
    .use(hideRawCode, rawCode)
    .use(remarkSmartypants)
    .use(restoreRawCode, rawCode)
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
