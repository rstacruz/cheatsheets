import { expect, test } from '@playwright/test'

test('archived renders its note as a notice', async ({ page }) => {
  await page.goto('/tests/archived')

  const notice = page.locator('.notice-box')
  await expect(notice).toContainText('Archived:')
  await expect(notice).toContainText('no longer maintained')
  await expect(notice.getByRole('link', { name: 'Deku v2' })).toHaveAttribute(
    'href',
    '/deku'
  )
})

test('archived sheets are noindexed', async ({ page }) => {
  await page.goto('/tests/archived')

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, follow'
  )
})
