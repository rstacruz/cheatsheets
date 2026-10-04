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
import { expandJekyll } from './jekyll'
import { hoistCodeAttrs, restoreCodeLanguage } from './ial'
import {
  encodeKramdownTables,
  kramdownTableHandler,
  kramdownTables
} from './tables'

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

export async function renderMarkdown(input: string): Promise<{ html: string }> {
  const md = encodeKramdownTables(expandJekyll(input))

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
    .use(hoistCodeAttrs)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true, closeSelfClosing: true })
    .process(md)

  return { html: String(result) }
}
