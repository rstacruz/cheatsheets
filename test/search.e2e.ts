import { expect, test, type Page } from '@playwright/test'

const STATUS = '[data-js-search-status]'

test('/?q=git+rebase hands off to a multi-result search', async ({ page }) => {
  await page.goto('/?q=git+rebase')

  await expect(page).toHaveURL(/\/search\?q=git%20rebase$/)
  await expect(page.getByPlaceholder('Search...')).toHaveValue('git rebase')
  await expect(page.locator(STATUS)).toHaveText(
    '8 cheatsheets for “git rebase”'
  )
  await expect(page.locator('[data-slug="git-rebase"]')).toBeVisible()
})

test('a single result redirects straight to the sheet', async ({ page }) => {
  await page.goto('/search?q=es6')

  await page.waitForURL(/\/es6$/, { timeout: 30_000 })
  await expect(
    page.getByRole('heading', { name: 'ES2015+ cheatsheet' })
  ).toBeVisible()
})

test('cards and snippets are ranked in separate sections', async ({ page }) => {
  await page.goto('/search?q=git%20stash')

  await expect(page.locator(STATUS)).toHaveText('8 cheatsheets for “git stash”')
  expect(await visibleSlugsInGroup(page, 'Git')).toEqual(['git-stash'])
  expect((await visibleSlugsInGroup(page, 'Snippets')).slice(0, 3)).toEqual([
    'git-stash-show',
    'git-resolve-stash-conflict',
    'git-recover-dropped-stash'
  ])
  await expect(page.locator('[data-slug="git"]')).toBeHidden()
})

test('clearing the query restores the original browse order', async ({
  page
}) => {
  await page.goto('/search')
  const original = await visibleSlugsInGroup(page, 'Git')

  await page.goto('/search?q=git%20stash')
  await expect(page.locator(STATUS)).toHaveText('8 cheatsheets for “git stash”')

  const input = page.getByPlaceholder('Search...')
  await input.fill('')
  await input.press('Enter')

  await expect(page).toHaveURL(/\/search$/)
  expect(await visibleSlugsInGroup(page, 'Git')).toEqual(original)
})

test('typed refinement updates in place and Back restores the query', async ({
  page
}) => {
  await page.goto('/search?q=git%20stash')
  await expect(page.locator(STATUS)).toHaveText('8 cheatsheets for “git stash”')

  const input = page.getByPlaceholder('Search...')
  await input.fill('git rebase')
  await input.press('Enter')

  await expect(page).toHaveURL(/\/search\?q=git%20rebase$/)
  await expect(page.locator(STATUS)).toHaveText(
    '8 cheatsheets for “git rebase”'
  )
  await expect(page.locator('[data-slug="git-rebase"]')).toBeVisible()
  await expect(page.locator('[data-slug="git-stash"]')).toBeHidden()

  await page.goBack()
  await expect(page).toHaveURL(/\/search\?q=git%20stash$/)
  await expect(page.locator(STATUS)).toHaveText('8 cheatsheets for “git stash”')
})

test('an unknown query shows the empty state', async ({ page }) => {
  await page.goto('/search?q=skinamarink')

  await expect(page.locator(STATUS)).toHaveText(
    'No cheatsheets for “skinamarink”'
  )
  await expect(page.locator('[data-js-search-empty]')).toBeVisible()
  await expect(page.locator('[data-slug]:visible')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Git' })).toBeHidden()
})

function visibleSlugsInGroup(page: Page, heading: string): Promise<string[]> {
  const group = page.locator('[data-js-search-group]').filter({
    has: page.getByRole('heading', { name: heading, exact: true })
  })
  return group
    .locator('[data-slug]:visible')
    .evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute('data-slug') ?? '')
    )
}
