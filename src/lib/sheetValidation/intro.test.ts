import { getPages } from '../page'
import { isSheetSlug } from './baseline'
import { scanHeadings } from './outline'
import { sheetSources } from './sheets'

/** H3 titles reserved for the card generated from frontmatter */
const CARD_TITLES = /^### (?:Introduction|About)$/

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
