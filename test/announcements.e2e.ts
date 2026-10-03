import { expect, test, type Page } from '@playwright/test'

const item = '.announcements-item'

/**
 * Reads the stored visibility decision for the announcement.
 */

function storedDecision(page: Page) {
  return page.evaluate(() => {
    const data = JSON.parse(window.localStorage.getItem('dismissed') || '{}')
    return Object.values(data)[0]
  })
}

test('forces the announcement to show', async ({ page }) => {
  await page.goto('/?announcement=1')

  const announcement = page.locator(item)
  await expect(announcement).toHaveCount(1)
  await expect(announcement).toBeVisible()

  await expect(announcement.locator('a')).toHaveAttribute(
    'href',
    'https://ricostacruz.com/posts?utm_source=devhints'
  )
  await expect(announcement).not.toContainText('Twitter')
  await expect(announcement).not.toContainText('@devhints')
})

test('persists the dismissal', async ({ page }) => {
  await page.addInitScript(() => {
    const v = new URLSearchParams(location.search).get('__random')
    if (v !== null) Math.random = () => Number(v)
  })

  await page.goto('/?announcement=1')
  await expect(page.locator(item)).toHaveCount(1)

  await page.locator('[data-js-dismiss]').click()
  await expect(page.locator(item)).toHaveCount(0)
  expect(await storedDecision(page)).toBe(true)

  // `__random=0` would roll it in if the dismissal weren't stored
  await page.goto('/?__random=0')
  await expect(page.locator(item)).toHaveCount(0)
})

test('decides the roll once per browser', async ({ page }) => {
  // One init script drives the stub per navigation; multiple addInitScript
  // calls have undefined order.
  await page.addInitScript(() => {
    const v = new URLSearchParams(location.search).get('__random')
    if (v !== null) Math.random = () => Number(v)
  })

  // Hidden: rolled out on the first visit, stays hidden on a re-roll.
  await page.goto('/?__random=0.99')
  await expect(page.locator(item)).toHaveCount(0)
  expect(await storedDecision(page)).toBe(true)

  await page.goto('/?__random=0')
  await expect(page.locator(item)).toHaveCount(0)

  // Shown: rolled in on the first visit, stays visible on a re-roll.
  await page.evaluate(() => window.localStorage.clear())

  await page.goto('/?__random=0')
  await expect(page.locator(item)).toHaveCount(1)
  await expect(page.locator(item)).toBeVisible()
  expect(await storedDecision(page)).toBe(false)

  await page.goto('/?__random=0.99')
  await expect(page.locator(item)).toHaveCount(1)
})

test('preview still removes the announcement', async ({ page }) => {
  await page.goto('/?preview=1')
  await expect(page.locator(item)).toHaveCount(0)

  await page.goto('/?preview=1&announcement=1')
  await expect(page.locator(item)).toHaveCount(1)
  await expect(page.locator(item)).toBeVisible()
})
