import { getPages } from '../page'
import { SheetFrontmatterSchema } from '~/types/SheetFrontmatter'
import { isSheetSlug } from './baseline'
import { scanHeadings } from './outline'
import { sheetSources } from './sheets'

/** H3 titles reserved for the card generated from frontmatter */
const CARD_TITLES = /^### (?:Introduction|About)$/

const LINKS = [{ title: 'Docs', url: 'https://example.com' }]
const CREATED = { created_at: new Date('2020-01-01') }

test('the schema requires intro and links on ordinary sheets', () => {
  expect(() => SheetFrontmatterSchema.parse(CREATED)).toThrow(/intro/)
  expect(() =>
    SheetFrontmatterSchema.parse({ ...CREATED, intro: 'Hello' })
  ).toThrow(/links/)
  expect(() =>
    SheetFrontmatterSchema.parse({ ...CREATED, intro: 'Hello', links: [] })
  ).toThrow(/links/)
})

it.each([{ layout: 'snippet' }, { archived: 'No longer maintained.' }])(
  'the schema exempts %j from intro',
  (exemption) => {
    const parsed = SheetFrontmatterSchema.parse({
      ...CREATED,
      ...exemption,
      links: LINKS
    })
    expect(parsed.intro).toBeUndefined()
  }
)

test('the schema exempts archived sheets from links', () => {
  const parsed = SheetFrontmatterSchema.parse({
    ...CREATED,
    archived: 'No longer maintained.',
    intro: 'Hello'
  })
  expect(parsed.links).toBeUndefined()
})

test('the schema accepts a single paragraph with soft line breaks', () => {
  const intro = 'A worktree is a second checkout.\nIt shares objects and refs.'
  const result = SheetFrontmatterSchema.parse({
    ...CREATED,
    intro,
    links: LINKS
  })
  expect(result.intro).toBe(intro)
})

test('the schema rejects two paragraphs separated by a blank line', () => {
  const frontmatter = {
    ...CREATED,
    intro: 'First sentence.\n\nSecond sentence.',
    links: LINKS
  }
  expect(() => SheetFrontmatterSchema.parse(frontmatter)).toThrow(
    'single paragraph'
  )
})

it.each(['\n   \n', '\n\t\t\n', '\n \t \r\n'])(
  'the schema rejects a whitespace-only blank line %j',
  (blankLine) => {
    const frontmatter = {
      ...CREATED,
      intro: `First sentence.${blankLine}Second sentence.`,
      links: LINKS
    }
    expect(() => SheetFrontmatterSchema.parse(frontmatter)).toThrow(
      'single paragraph'
    )
  }
)

test('no sheet hand-writes an Introduction or About card', async () => {
  const findings: string[] = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    const lines = source.split('\n')
    lines.forEach((line, index) => {
      if (!CARD_TITLES.test(line)) return
      const isCard = lines
        .slice(index + 1, index + 6)
        .some((below) => below.includes('{: .-intro'))
      if (isCard) findings.push(`${slug}:${index + 1}`)
    })
  }

  expect(findings).toEqual([])
})

test('intro contains no headings', async () => {
  const pages = await getPages()
  const findings: string[] = []

  for (const page of Object.values(pages)) {
    if (!isSheetSlug(page.slug)) continue
    for (const heading of scanHeadings(page.frontmatter.intro ?? '')) {
      findings.push(`${page.slug}:${heading.line}`)
    }
  }

  expect(findings).toEqual([])
})

test('every active page has links and every non-snippet has an intro', async () => {
  const pages = Object.values(await getPages())
  expect(pages.length).toBeGreaterThan(0)

  for (const { slug, frontmatter } of pages) {
    if (frontmatter.archived) continue
    expect(frontmatter.links.length, slug).toBeGreaterThan(0)
    if (frontmatter.layout === 'snippet') continue
    expect(frontmatter.intro, slug).toBeTruthy()
  }
})
