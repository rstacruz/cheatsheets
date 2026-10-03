import { expect, test } from '@playwright/test'

test('deprecated: true renders a notice without a link', async ({ page }) => {
  await page.goto('/react@0.14')

  const notice = page.locator('.notice-box')
  await expect(notice).toContainText('Deprecated:')
  await expect(notice.locator('a')).toHaveCount(0)
})

test('deprecated_by renders a notice linking to the newer sheet', async ({
  page
}) => {
  await page.goto('/enzyme@2')

  const notice = page.locator('.notice-box')
  await expect(notice).toContainText('Deprecated:')
  await expect(
    notice.getByRole('link', { name: 'A newer version is available here.' })
  ).toHaveAttribute('href', '/enzyme')
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
