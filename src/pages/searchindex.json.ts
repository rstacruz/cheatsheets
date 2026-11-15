import { buildFuseIndex } from '~/lib/fuseSearch/fuseSearch'
import { getPages } from '~/lib/page'
import { isListed } from '~/lib/page/accessors'

/*
 * Returns a search index that can be hydrated later
 */

export async function GET() {
  const pages = Object.values(await getPages()).filter(isListed)
  const visible = Object.fromEntries(pages.map((page) => [page.slug, page]))
  const result = buildFuseIndex(visible)
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
