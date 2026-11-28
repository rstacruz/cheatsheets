import Fuse from 'fuse.js'
import {
  parseFuse,
  type ExternalSearchData,
  type Row
} from '../src/lib/fuseSearch/fuseSearch'
import { getInitialRedirectSlug } from '../src/lib/fuseSearch/searchLanding'
import { RESULT_LIMIT } from '../src/lib/fuseSearch/searchConfig'

type SearchEnv = { ASSETS: { fetch: typeof fetch } }
type SearchContext = { request: Request; env: SearchEnv }

const MAX_QUERY_LENGTH = 100

let cachedFuse: Promise<Fuse<Row>> | undefined

async function loadFuse(env: SearchEnv, url: URL) {
  const response = await env.ASSETS.fetch(new URL('/searchindex.json', url))
  const data = (await response.json()) as ExternalSearchData
  return parseFuse(data)
}

async function getFuse(env: SearchEnv, url: URL) {
  cachedFuse ??= loadFuse(env, url)
  try {
    return await cachedFuse
  } catch (error) {
    cachedFuse = undefined
    throw error
  }
}

export async function onRequestGet({ request, env }: SearchContext) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q')?.trim() ?? ''
  const asset = () => env.ASSETS.fetch(new URL('/search', url))

  if (!query || query.length > MAX_QUERY_LENGTH) return asset()

  try {
    const fuse = await getFuse(env, url)
    const slugs = fuse
      .search(query, { limit: RESULT_LIMIT })
      .map((hit) => hit.item.slug)
    const slug = getInitialRedirectSlug(query, slugs)
    if (slug) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: new URL(`/${slug}`, url).toString(),
          'Cache-Control': 'private, no-store'
        }
      })
    }
  } catch {}

  return asset()
}
