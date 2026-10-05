import { buildFuseIndex } from '~/lib/fuseSearch/fuseSearch'
import { getPages } from '~/lib/page'

/*
 * Returns a search index that can be hydrated later
 */

export async function GET() {
  const result = buildFuseIndex(await getPages())
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
