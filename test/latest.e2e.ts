import { expect, test } from '@playwright/test'

test('/latest shows both chronological lists', async ({ page }) => {
  await page.goto('/latest')

  await expect(
    page.getByRole('heading', { level: 1, name: 'Latest' })
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'New cheatsheets' })
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Recently updated' })
  ).toBeVisible()
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://devhints.io/latest'
  )

  const featured = page.locator('.FeaturedPages__root')
  await expect(featured.locator('.PageListItem__link')).toHaveCount(2)
  await expect(featured.locator('.HomePage__carbonCover')).toHaveCount(1)
  const featuredOrder = await featured
    .locator(':scope > *')
    .evaluateAll((els) => els.map((el) => el.className))
  expect(featuredOrder.at(-1)).toContain('HomePage__carbonCover')

  const newList = page.locator('#new-pages')
  const updatedList = page.locator('#updated-pages')
  const featuredHrefs = await featured
    .locator('.PageListItem__link')
    .evaluateAll((els) => els.map((el) => el.getAttribute('href')))
  const newHrefs = await newList
    .locator('.PageListItem__link')
    .evaluateAll((els) => els.map((el) => el.getAttribute('href')))

  expect(featuredHrefs).toEqual(newHrefs.slice(0, 2))
  await expect(newList.locator('.PageListItem__meta').first()).toContainText(
    'Added '
  )
  await expect(
    updatedList.locator('.PageListItem__meta').first()
  ).toContainText('Updated ')
  await expect(newList.locator('.PageListItem__link')).toHaveCount(20)
})

test('homepage links to /latest', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('link', { name: 'See all new and updated sheets' })
  ).toHaveAttribute('href', '/latest')

  const homeFeatured = page.locator('.FeaturedPages__root').first()
  const homeOrder = await homeFeatured
    .locator(':scope > *')
    .evaluateAll((els) => els.map((el) => el.className))
  expect(homeOrder[2]).toContain('HomePage__carbonCover')
})
