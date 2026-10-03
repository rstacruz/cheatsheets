import { expect, test } from '@playwright/test'

test('deprecated: true renders a notice without a link', async ({ page }) => {
  await page.goto('/tests/deprecated')

  const notice = page.locator('.notice-box')
  await expect(notice).toContainText('Deprecated:')
  await expect(notice.locator('a')).toHaveCount(0)
})

test('deprecated_by renders a notice linking to the newer sheet', async ({
  page
}) => {
  await page.goto('/tests/deprecated-by')

  const notice = page.locator('.notice-box')
  await expect(notice).toContainText('Deprecated:')
  await expect(
    notice.getByRole('link', { name: 'A newer version is available here.' })
  ).toHaveAttribute('href', '/deku')
})

test('sheets without deprecation render no notice', async ({ page }) => {
  await page.goto('/bash')

  await expect(page.locator('.notice-box')).toHaveCount(0)
})

test('deprecated sheets are hidden from related lists', async ({ page }) => {
  await page.goto('/vue')

  await expect(page.locator('#related')).toBeVisible()
  await expect(page.locator('#related a[href="/vue@1.0.28"]')).toHaveCount(0)
})

test('deprecated sheets leave the homepage and join the archive', async ({
  page
}) => {
  await page.goto('/')
  await expect(page.locator('.pages-list a[href="/react@16"]')).toHaveCount(0)

  await page.goto('/archive')
  await expect(page.locator('a[href="/react@16"]')).toHaveCount(1)
})
