import { expect, test } from '@playwright/test'

test('line highlights render inside pre[data-line]', async ({ page }) => {
  await page.goto('/absinthe')

  const pre = page.locator('pre[data-line]').first()
  await expect(pre).toBeVisible()
  await expect(pre.locator('.line-highlight').first()).toBeVisible()

  const geometry = await pre.evaluate((el) => {
    const highlights = [...el.querySelectorAll(':scope > .line-highlight')]
    const preBox = el.getBoundingClientRect()
    return {
      count: highlights.length,
      offsets: highlights.map((highlight) => {
        const box = highlight.getBoundingClientRect()
        return { top: box.top - preBox.top, bottom: preBox.bottom - box.bottom }
      })
    }
  })

  expect(geometry.count).toBeGreaterThan(0)
  for (const { top, bottom } of geometry.offsets) {
    expect(top).toBeGreaterThanOrEqual(0)
    expect(bottom).toBeGreaterThanOrEqual(-1)
  }
})

test('blocks without data-line get no highlights', async ({ page }) => {
  await page.goto('/absinthe')

  await expect(page.locator('pre:not([data-line])').first()).toBeVisible()
  expect(
    await page.locator('pre:not([data-line]) .line-highlight').count()
  ).toBe(0)
})
