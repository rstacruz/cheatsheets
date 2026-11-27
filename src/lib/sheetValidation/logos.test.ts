import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { getPages } from '../page'
import { isListed } from '../page/accessors'
import { resolveLogo } from '../logo-render'
import { SheetFrontmatterSchema } from '~/types/SheetFrontmatter'

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

test('logo marks are not wide wordmarks', async () => {
  for (const page of await pagesWithLogos()) {
    const resolved = resolveLogo(page.frontmatter.logo!)
    if (resolved?.kind !== 'svg') continue

    const [, , width, height] = resolved.attributes.viewBox
      .split(' ')
      .map(Number)
    const ratio = width / height

    expect(
      ratio,
      `${page.slug} is ${width}x${height}; prefer a square mark`
    ).toBeGreaterThan(0.7)
    expect(
      ratio,
      `${page.slug} is ${width}x${height}; prefer a square mark`
    ).toBeLessThan(1.45)
  }
})
