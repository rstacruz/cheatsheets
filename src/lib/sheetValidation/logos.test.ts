import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { getPages } from '../page'
import { isListed } from '../page/accessors'
import { resolveLogo } from '../logo-render'
import { SheetFrontmatterSchema } from '~/types/SheetFrontmatter'

const MIN_RATIO = 0.8
const MAX_RATIO = 1.25

const pagesWithLogos = async () => {
  const pages = await getPages()
  return Object.values(pages).filter((page) => page.frontmatter.logo)
}

describe('logo frontmatter', () => {
  it.each([
    { set: 'logos', name: 'react' },
    { set: 'icon-park-outline', name: 'layers' },
    { set: 'logos', name: 'codex', mono: true },
    { src: '/assets/logos/herdr.svg', mono: true }
  ])('accepts %j', (logo) => {
    expect(SheetFrontmatterSchema.parse({ logo }).logo).toEqual(logo)
  })

  it.each([
    { set: 'fa7-brands', name: 'react' },
    { set: 'logos' },
    { src: 'herdr.svg' },
    { set: 'logos', name: '' }
  ])('rejects %j', (logo) => {
    expect(() => SheetFrontmatterSchema.parse({ logo })).toThrow()
  })
})

test('every logo resolves at build time', async () => {
  const pages = await pagesWithLogos()
  expect(pages.length).toBeGreaterThan(0)

  for (const page of pages) {
    expect(resolveLogo(page.frontmatter.logo!), page.slug).not.toBeNull()
  }
})

test('every file logo exists under public/', async () => {
  for (const page of await pagesWithLogos()) {
    const logo = page.frontmatter.logo!
    if (!('src' in logo)) continue
    const path = join(process.cwd(), 'public', logo.src.replace(/^\//, ''))
    expect(existsSync(path), `${page.slug} is missing ${logo.src}`).toBe(true)
  }
})

// Tiers are broad review cadences, not a logo shortlist. The homepage's
// featured cards are the set that always renders a mark.
test('every featured sheet has a logo', async () => {
  const pages = Object.values(await getPages())
  const featured = pages.filter(
    (page) =>
      isListed(page) && page.frontmatter.tags?.some((tag) => tag === 'Featured')
  )

  expect(featured.length).toBeGreaterThan(0)

  for (const page of featured) {
    expect(
      page.frontmatter.logo,
      `${page.slug} is featured but has no logo`
    ).toBeDefined()
  }
})

test('every t1/t2 sheet has a logo', async () => {
  const pages = Object.values(await getPages())
  const tiered = pages.filter(
    (page) => page.frontmatter.tier === 't1' || page.frontmatter.tier === 't2'
  )

  expect(tiered.length).toBeGreaterThan(0)

  for (const page of tiered) {
    expect(
      page.frontmatter.logo,
      `${page.slug} is ${page.frontmatter.tier} but has no logo`
    ).toBeDefined()
  }
})

test('all logo marks are square', async () => {
  for (const page of await pagesWithLogos()) {
    const logo = page.frontmatter.logo!
    const resolved = resolveLogo(logo)
    expect(resolved, `${page.slug} did not resolve`).not.toBeNull()
    if (!resolved) continue

    const viewBox =
      resolved.kind === 'svg'
        ? resolved.attributes.viewBox
        : readFileSync(
            join(process.cwd(), 'public', resolved.src.replace(/^\//, '')),
            'utf8'
          ).match(/viewBox="([^"]+)"/)?.[1]

    expect(viewBox, `${page.slug} has no viewBox`).toBeDefined()
    if (!viewBox) continue

    const [, , width, height] = viewBox.split(/[ ,]+/).map(Number)
    const ratio = width / height

    expect(ratio, `${page.slug} is ${width}x${height}`).toBeGreaterThanOrEqual(
      MIN_RATIO
    )
    expect(ratio, `${page.slug} is ${width}x${height}`).toBeLessThanOrEqual(
      MAX_RATIO
    )
  }
})
