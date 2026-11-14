import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { getPages } from '../page'
import { isListed } from '../page/accessors'
import { sheetLogos } from '../logos'
import { resolveLogo } from '../logo-render'

const rootPages = async () => {
  const pages = await getPages()
  return Object.values(pages).filter((page) => !page.slug.includes('/'))
}

test('every registry slug is a real sheet', async () => {
  const pages = await rootPages()
  const slugs = new Set(pages.map((page) => page.slug))

  for (const slug of Object.keys(sheetLogos)) {
    expect(slugs.has(slug), `${slug} has a logo but no sheet`).toBe(true)
  }
})

test('every set and glyph resolves at build time', () => {
  for (const [slug, logo] of Object.entries(sheetLogos)) {
    expect(resolveLogo(logo), `${slug} did not resolve`).not.toBeNull()
  }
})

test('every file logo exists under public/', () => {
  for (const [slug, logo] of Object.entries(sheetLogos)) {
    if (logo.kind !== 'file') continue
    const path = join(process.cwd(), 'public', logo.src.replace(/^\//, ''))
    expect(existsSync(path), `${slug} is missing ${logo.src}`).toBe(true)
  }
})

test('every tiered and featured sheet has a logo', async () => {
  const pages = await rootPages()
  const needsLogo = pages.filter(
    (page) =>
      isListed(page) &&
      (page.frontmatter.tier ||
        page.frontmatter.tags?.some((tag) => tag === 'Featured'))
  )

  expect(needsLogo.length).toBeGreaterThan(0)

  for (const page of needsLogo) {
    expect(
      sheetLogos[page.slug],
      `${page.slug} is tiered/featured but has no logo`
    ).toBeDefined()
  }
})

test('logo marks are not wide wordmarks', () => {
  for (const [slug, logo] of Object.entries(sheetLogos)) {
    const resolved = resolveLogo(logo)
    if (resolved?.kind !== 'svg') continue

    const [, , width, height] = resolved.attributes.viewBox
      .split(' ')
      .map(Number)
    const ratio = width / height

    expect(
      ratio,
      `${slug} is ${width}x${height}; prefer a square mark`
    ).toBeGreaterThan(0.7)
    expect(
      ratio,
      `${slug} is ${width}x${height}; prefer a square mark`
    ).toBeLessThan(1.45)
  }
})
