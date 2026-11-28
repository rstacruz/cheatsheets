import { expect, test, type Page } from '@playwright/test'

test('/?q=git+rebase loads ranked search results', async ({ page }) => {
  await page.goto('/?q=git+rebase')

  await expect(page).toHaveURL(/\/search\?q=git%20rebase$/)
  await expect(page.getByPlaceholder('Search...')).toHaveValue('git rebase')
  await waitForResults(page, 8)
  await expect(page.locator('[data-slug="git-rebase"]')).toBeVisible()
})

test('the top hit is the first visible result', async ({ page }) => {
  await page.goto('/search?q=react')
  await waitForResults(page, 24)

  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(0)
  const slugs = await page
    .locator('[data-js-search-results] [data-slug]:visible')
    .evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute('data-slug') ?? '')
    )
  expect(slugs[0]).toBe('react')
})

test('a landing query hides the browse list until results load', async ({
  page
}) => {
  await page.route('**/searchindex.json', async (route) => {
    const { promise, resolve } = Promise.withResolvers<void>()
    setTimeout(resolve, 500)
    await promise
    await route.continue()
  })

  await page.goto('/search?q=react')
  await expect(page.locator('[data-js-search-results]')).toBeHidden()
  await waitForResults(page, 24)
  await expect(page.locator('[data-js-search-results]')).toBeVisible()
})

test('typing filters in place without autocomplete suggestions', async ({
  page
}) => {
  const indexLoaded = page.waitForResponse('**/searchindex.json')
  await page.goto('/search')
  await indexLoaded
  const input = page.getByPlaceholder('Search...')

  await input.fill('git stash')
  await waitForResults(page, 8)
  await expect(page.getByRole('option')).toHaveCount(0)
  await expect(page).toHaveURL(/\/search$/)

  await input.press('Enter')
  await expect(page).toHaveURL(/\/search\?q=git%20stash$/)
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

  await waitForResults(page, 8)
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
  await waitForResults(page, 8)

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
  await waitForResults(page, 8)

  const input = page.getByPlaceholder('Search...')
  await input.fill('git rebase')
  await input.press('Enter')

  await expect(page).toHaveURL(/\/search\?q=git%20rebase$/)
  await waitForResults(page, 8)
  await expect(page.locator('[data-slug="git-rebase"]')).toBeVisible()
  await expect(page.locator('[data-slug="git-stash"]')).toBeHidden()

  await page.goBack()
  await expect(page).toHaveURL(/\/search\?q=git%20stash$/)
  await waitForResults(page, 8)
})

test('refining to a single hit stays on the search page', async ({ page }) => {
  await page.goto('/search?q=git%20stash')
  await waitForResults(page, 8)

  const input = page.getByPlaceholder('Search...')
  await input.fill('es6')
  await input.press('Enter')

  await expect(page.locator('[data-slug="es6"]')).toBeVisible()
  await waitForResults(page, 1)
  await page.waitForTimeout(500)
  await expect(page).toHaveURL(/\/search\?q=es6$/)
})

test('an unknown query shows the empty state', async ({ page }) => {
  await page.goto('/search?q=skinamarink')

  await waitForResults(page, 0)
  await expect(page.locator('[data-js-search-empty]')).toBeVisible()
  await expect(page.locator('[data-slug]:visible')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Git' })).toBeHidden()
})

test('homepage search button submits the typed query', async ({ page }) => {
  await page.goto('/')
  const input = page.getByPlaceholder('Search...')

  await input.fill('git stash')
  const button = page.getByRole('button', { name: 'Search', exact: true })
  await expect(button).toBeVisible()
  await button.click()

  await expect(page).toHaveURL(/\/search\?q=git%20stash$/)
  await waitForResults(page, 8)
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

async function waitForResults(page: Page, count: number) {
  await expect(
    page.locator('[data-js-search-results] [data-slug]:visible')
  ).toHaveCount(count)
}
