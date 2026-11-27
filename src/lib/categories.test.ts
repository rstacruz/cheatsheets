import { categories } from '~/config'
import { getPages } from './page'
import { isListed } from './page/accessors'
import { getPagesByCategory } from './page/queries'

describe('categories config', () => {
  test('pins the curated order', () => {
    expect(categories[0]).toBe('Agents')
    expect(categories.at(-1)).toBe('Others')
  })

  test('has no duplicate entries', () => {
    expect(new Set(categories).size).toBe(categories.length)
  })

  test('every listed sheet has a known category', async () => {
    const pages = await getPages()
    const unknownCategories: string[] = []

    for (const page of Object.values(pages)) {
      if (!isListed(page)) continue

      const category = page.frontmatter.category ?? 'Others'
      if (!categories.includes(category)) {
        unknownCategories.push(`${page.slug}: ${category}`)
      }
    }

    expect(unknownCategories).toEqual([])
  })
})

const MIN_PER_CATEGORY = 3
const MAX_PER_CATEGORY = 16
const MAX_OTHERS = 12

describe('category sizes', () => {
  test('listed non-snippet sheets stay within the size bounds', async () => {
    const grouped = getPagesByCategory(await getPages(), {
      excludeSnippets: true
    })
    const findings: string[] = []

    const others = grouped['Others']?.pages.length ?? 0
    if (others > MAX_OTHERS) {
      findings.push(`Others: ${others} sheets (max ${MAX_OTHERS})`)
    }

    for (const category of categories) {
      if (category === 'Others') continue
      const count = grouped[category]?.pages.length ?? 0
      if (count < MIN_PER_CATEGORY || count > MAX_PER_CATEGORY) {
        findings.push(
          `${category}: ${count} sheets ` +
            `(needs ${MIN_PER_CATEGORY}-${MAX_PER_CATEGORY})`
        )
      }
    }

    expect(findings).toEqual([])
  })
})
