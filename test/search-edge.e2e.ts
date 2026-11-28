import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

const ROUTES = '{"version":1,"include":["/search","/search/"],"exclude":[]}'

test.describe('edge search', () => {
  test.use({ javaScriptEnabled: false })

  test('redirects a one-hit query before the page renders', async ({
    page,
    request
  }) => {
    const redirect = await request.get('/search?q=es6', { maxRedirects: 0 })
    expect(redirect.status()).toBe(302)
    expect(redirect.headers()['location']).toMatch(/\/es6$/)
    expect(redirect.headers()['cache-control']).toBe('private, no-store')

    await page.goto('/search?q=es6')
    await expect(page).toHaveURL(/\/es6$/)
    await expect(
      page.getByRole('heading', { name: 'ES2015+ cheatsheet' })
    ).toBeVisible()
  })

  test('serves the static page for a multi-hit query', async ({ page }) => {
    const response = await page.goto('/search?q=git%20rebase')

    expect(response?.status()).toBe(200)
    await expect(page).toHaveURL(/\/search\?q=git%20rebase$/)
    await expect(page.getByPlaceholder('Search...')).toBeVisible()
    await expect(
      page.locator('[data-js-search-results] [data-slug="git-rebase"]')
    ).toBeAttached()
  })

  test('serves the static page for a zero-hit query', async ({ page }) => {
    const response = await page.goto('/search?q=skinamarink')

    expect(response?.status()).toBe(200)
    await expect(page).toHaveURL(/\/search\?q=skinamarink$/)
    await expect(page.getByPlaceholder('Search...')).toBeVisible()
  })

  test('serves the static page without a query', async ({ page }) => {
    const response = await page.goto('/search')

    expect(response?.status()).toBe(200)
    await expect(page).toHaveURL(/\/search$/)
    await expect(page.getByPlaceholder('Search...')).toBeVisible()
  })
})

test('routes only /search through the function', () => {
  const routes = readFileSync(
    new URL('../dist/_routes.json', import.meta.url),
    'utf8'
  )
  expect(routes).toBe(ROUTES)
})
