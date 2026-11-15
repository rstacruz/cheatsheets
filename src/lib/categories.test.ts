import { categories } from '~/config'
import { getPages } from './page'
import { isListed } from './page/accessors'

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
