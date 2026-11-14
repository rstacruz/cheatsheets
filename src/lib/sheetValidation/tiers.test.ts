import { getPages } from '../page'
import { isListed } from '../page/accessors'

test('every tiered sheet is listed', async () => {
  const pages = Object.values(await getPages())
  // Tier annotations live on root sheets only, not `_docs/` or fixtures
  const tiered = pages.filter(
    (page) => !page.slug.includes('/') && page.frontmatter.tier
  )

  expect(tiered.length).toBeGreaterThan(0)

  for (const page of tiered) {
    expect(
      isListed(page),
      `${page.slug} is tiered but unlisted (hidden or deprecated)`
    ).toBe(true)
  }

  for (const tier of ['t1', 't2'] as const) {
    expect(
      tiered.some((page) => page.frontmatter.tier === tier),
      `no sheets in ${tier}`
    ).toBe(true)
  }
})
