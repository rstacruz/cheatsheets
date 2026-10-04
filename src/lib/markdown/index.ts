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
      handlers: { kramdownTable: kramdownTableHandler }
    })
    .use(rehypeRaw)
    .use(hoistCodeAttrs)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true, closeSelfClosing: true })
    .process(md)

  return { html: String(result) }
}
