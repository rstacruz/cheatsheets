import { expect, test } from '@playwright/test'

// Allows for subpixel line-height rounding, but not for a stale fixed offset
const TOLERANCE = 1

test('line highlights align with the referenced lines', async ({ page }) => {
  await page.goto('/absinthe')

  const pre = page.locator('pre[data-line]').first()
  await expect(pre).toBeVisible()

  const geometry = await pre.evaluate((el) => {
    const { lineHeight, paddingTop, borderTopWidth } = getComputedStyle(el)
    const ranges = (el.getAttribute('data-line') || '')
      .replace(/\s+/g, '')
      .split(',')
      .filter(Boolean)
      .map((range) => {
        const [start, end] = range.split('-')
        return { start: Number(start), end: Number(end) || Number(start) }
      })
    const preBox = el.getBoundingClientRect()

    return {
      lineHeight: parseFloat(lineHeight),
      paddingTop: parseFloat(paddingTop),
      borderTopWidth: parseFloat(borderTopWidth),
      ranges,
      highlights: [...el.querySelectorAll(':scope > .line-highlight')].map(
        (highlight) => {
          const box = highlight.getBoundingClientRect()
          return {
            start: Number(highlight.dataset.start),
            top: box.top - preBox.top,
            height: box.height
          }
        }
      )
    }
  })

  expect(geometry.highlights).toHaveLength(geometry.ranges.length)
  geometry.ranges.forEach(({ start, end }, index) => {
    const highlight = geometry.highlights[index]
    const expectedTop =
      geometry.borderTopWidth +
      geometry.paddingTop +
      (start - 1) * geometry.lineHeight
    const expectedHeight = (end - start + 1) * geometry.lineHeight
    expect(highlight.start).toBe(start)
    expect(Math.abs(highlight.top - expectedTop)).toBeLessThanOrEqual(TOLERANCE)
    expect(Math.abs(highlight.height - expectedHeight)).toBeLessThanOrEqual(
      TOLERANCE
    )
  })
})

test('blocks without data-line get no highlights', async ({ page }) => {
  await page.goto('/absinthe')

  await expect(page.locator('pre:not([data-line])').first()).toBeVisible()
  expect(
    await page.locator('pre:not([data-line]) .line-highlight').count()
  ).toBe(0)
})
