import { beforeEach, expect, it, vi } from 'vitest'
import { buildFuseIndex, parseFuse } from '../src/lib/fuseSearch/fuseSearch'
import type { onRequestGet } from './search'

const ORIGIN = 'https://devhints.io'
const HTML = '<html>search</html>'
const PAGES = {
  es6: { slug: 'es6', markdown: '', frontmatter: { title: 'ES6' } },
  react: { slug: 'react', markdown: '', frontmatter: { title: 'React' } },
  'react-router': {
    slug: 'react-router',
    markdown: '',
    frontmatter: { title: 'React Router' }
  }
}
const INDEX_JSON = JSON.stringify(buildFuseIndex(PAGES))
const ONE_HIT_SLUG = parseFuse(JSON.parse(INDEX_JSON)).search('es6')[0]?.item
  .slug

type Handler = typeof onRequestGet
type Fetch = (input: RequestInfo | URL) => Promise<Response>

let handler: Handler

beforeEach(async () => {
  vi.resetModules()
  handler = (await import('./search')).onRequestGet
})

it('redirects a single hit with no-store', async () => {
  const fetchAsset = assetFetch()
  const response = await handler(context('es6', fetchAsset))

  expect(ONE_HIT_SLUG).toBe('es6')
  expect(response.status).toBe(302)
  expect(response.headers.get('Location')).toBe(`${ORIGIN}/es6`)
  expect(response.headers.get('Cache-Control')).toBe('private, no-store')
  expect(fetchAsset).toHaveBeenCalledTimes(1)
  expect(String(fetchAsset.mock.calls[0][0])).toBe(`${ORIGIN}/searchindex.json`)
})

it.each(['react', 'skinamarink'])(
  'serves the static page for %s',
  async (query) => {
    const fetchAsset = assetFetch()
    const response = await handler(context(query, fetchAsset))

    expect(response.status).toBe(200)
    expect(await response.text()).toBe(HTML)
    expect(String(fetchAsset.mock.calls.at(-1)?.[0])).toBe(`${ORIGIN}/search`)
  }
)

it('skips the index when there is no query', async () => {
  const fetchAsset = assetFetch()
  const response = await handler(context('', fetchAsset))

  expect(await response.text()).toBe(HTML)
  expect(fetchAsset).toHaveBeenCalledTimes(1)
  expect(String(fetchAsset.mock.calls[0][0])).toBe(`${ORIGIN}/search`)
})

it('falls back on a failed index fetch and recovers later', async () => {
  const fetchAsset = assetFetch(true)
  const query = context('es6', fetchAsset)

  expect((await handler(query)).status).toBe(200)
  expect((await handler(query)).status).toBe(302)

  const indexCalls = fetchAsset.mock.calls.filter(
    ([input]) => new URL(String(input), ORIGIN).pathname === '/searchindex.json'
  )
  expect(indexCalls).toHaveLength(2)
})

function context(query: string, fetchAsset: Fetch) {
  return {
    request: new Request(`${ORIGIN}/search?q=${encodeURIComponent(query)}`),
    env: { ASSETS: { fetch: fetchAsset } }
  }
}

function assetFetch(failFirstIndex = false) {
  let indexCalls = 0
  return vi.fn(async (input: RequestInfo | URL) => {
    const path = new URL(String(input), ORIGIN).pathname
    if (path !== '/searchindex.json') return new Response(HTML)
    if (failFirstIndex && indexCalls++ === 0) {
      throw new Error('index unavailable')
    }
    return new Response(INDEX_JSON)
  })
}
