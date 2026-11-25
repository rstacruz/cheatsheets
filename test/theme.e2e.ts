import { expect, test, type Page } from '@playwright/test'

type Theme = 'light' | 'dark'

type ThemeSnapshot = {
  background: string
  foreground: string
  scheme: string
  theme: string | null
}

const tokens = {
  light: { background: 'rgb(250, 250, 252)', foreground: 'rgb(51, 68, 85)' },
  dark: { background: 'rgb(14, 14, 25)', foreground: 'rgb(203, 208, 224)' }
}

const TOGGLE = '[data-js-theme-toggle]'

function readTheme(): ThemeSnapshot {
  const root = document.documentElement
  const body = getComputedStyle(document.body)
  return {
    background: body.backgroundColor,
    foreground: body.color,
    scheme: getComputedStyle(root).colorScheme,
    theme: root.getAttribute('data-theme')
  }
}

function snapshot(page: Page) {
  return page.evaluate(readTheme)
}

function snapshotAtDomReady(page: Page) {
  return page.evaluate(
    () =>
      (window as typeof window & { themeAtDomReady?: ThemeSnapshot })
        .themeAtDomReady
  )
}

function captureAtDomReady(page: Page) {
  return page.addInitScript(() => {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        const root = document.documentElement
        const body = getComputedStyle(document.body)
        ;(
          window as typeof window & { themeAtDomReady?: ThemeSnapshot }
        ).themeAtDomReady = {
          background: body.backgroundColor,
          foreground: body.color,
          scheme: getComputedStyle(root).colorScheme,
          theme: root.getAttribute('data-theme')
        }
      },
      { once: true }
    )
  })
}

function seedTheme(page: Page, theme: Theme) {
  return page.addInitScript(
    (value) => localStorage.setItem('theme', value),
    theme
  )
}

function storedTheme(page: Page) {
  return page.evaluate(() => localStorage.getItem('theme'))
}

function blockStorage(page: Page) {
  return page.addInitScript(() => {
    for (const method of ['getItem', 'setItem', 'removeItem'] as const) {
      Object.defineProperty(Storage.prototype, method, {
        configurable: true,
        value() {
          throw new DOMException('Storage is blocked', 'SecurityError')
        }
      })
    }
  })
}

function offered(page: Page, target: Theme) {
  const toggle = page.locator(TOGGLE)
  const label =
    target === 'dark' ? 'Switch to dark theme' : 'Switch to light theme'
  return [
    expect(toggle).toHaveAttribute('data-theme-target', target),
    expect(toggle).toHaveAttribute('aria-label', label),
    expect(toggle).toHaveAttribute('title', label),
    expect(toggle.locator(`[data-theme-icon="${target}"]`)).toBeVisible(),
    expect(toggle.locator('[data-theme-icon="initial"]')).toBeHidden()
  ]
}

function opposite(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark'
}

for (const scheme of ['light', 'dark'] as const) {
  test(`follows the system ${scheme} preference before first paint`, async ({
    page
  }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await captureAtDomReady(page)
    await page.goto('/')

    const expected = { ...tokens[scheme], scheme: 'light dark', theme: null }
    expect(await snapshotAtDomReady(page)).toEqual(expected)
    expect(await snapshot(page)).toEqual(expected)
    expect(await storedTheme(page)).toBeNull()
    await Promise.all(offered(page, opposite(scheme)))
  })

  test(`applies a stored ${opposite(scheme)} override on a ${scheme} system before first paint`, async ({
    page
  }) => {
    const override = opposite(scheme)
    await page.emulateMedia({ colorScheme: scheme })
    await seedTheme(page, override)
    await captureAtDomReady(page)
    await page.goto('/')

    const expected = {
      ...tokens[override],
      scheme: override,
      theme: override
    }
    expect(await snapshotAtDomReady(page)).toEqual(expected)
    expect(await snapshot(page)).toEqual(expected)
    expect(await storedTheme(page)).toBe(override)
    await Promise.all(offered(page, scheme))
  })

  test(`pins ${opposite(scheme)} on a ${scheme} system and returns to System on the next click`, async ({
    page
  }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.goto('/')

    await page.locator(TOGGLE).click()

    expect(await snapshot(page)).toEqual({
      ...tokens[opposite(scheme)],
      scheme: opposite(scheme),
      theme: opposite(scheme)
    })
    expect(await storedTheme(page)).toBe(opposite(scheme))
    await Promise.all(offered(page, scheme))

    await page.locator(TOGGLE).focus()
    await page.keyboard.press('Enter')

    await expect
      .poll(() => snapshot(page))
      .toEqual({
        ...tokens[scheme],
        scheme: 'light dark',
        theme: null
      })
    expect(await storedTheme(page)).toBeNull()
    await Promise.all(offered(page, opposite(scheme)))
  })
}

test('an OS change keeps an explicit override', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await seedTheme(page, 'dark')
  await page.goto('/')

  await page.emulateMedia({ colorScheme: 'dark' })

  expect(await snapshot(page)).toEqual({
    ...tokens.dark,
    scheme: 'dark',
    theme: 'dark'
  })
  expect(await storedTheme(page)).toBe('dark')
  await Promise.all(offered(page, 'light'))
})

test('keeps a stored override that matches the OS until a click', async ({
  page
}) => {
  for (const scheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: scheme })
    await page.goto('/')
    await page.evaluate((theme) => localStorage.setItem('theme', theme), scheme)
    await page.reload()

    expect(await snapshot(page)).toEqual({
      ...tokens[scheme],
      scheme,
      theme: scheme
    })
    await Promise.all(offered(page, opposite(scheme)))

    await page.locator(TOGGLE).click()
    expect(await storedTheme(page)).toBe(opposite(scheme))
    expect(await snapshot(page)).toEqual({
      ...tokens[opposite(scheme)],
      scheme: opposite(scheme),
      theme: opposite(scheme)
    })
    await Promise.all(offered(page, scheme))

    await page.emulateMedia({ colorScheme: opposite(scheme) })
    expect(await storedTheme(page)).toBe(opposite(scheme))
    expect((await snapshot(page)).theme).toBe(opposite(scheme))
  }
})

test('keeps the chosen theme across reloads', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')

  await page.locator(TOGGLE).click()
  expect(await storedTheme(page)).toBe('dark')

  await page.reload()

  expect(await snapshot(page)).toEqual({
    ...tokens.dark,
    scheme: 'dark',
    theme: 'dark'
  })
  expect(await storedTheme(page)).toBe('dark')
})

test('falls back to System when storage is blocked', async ({ page }) => {
  await blockStorage(page)
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')

  expect(await snapshot(page)).toEqual({
    ...tokens.dark,
    scheme: 'light dark',
    theme: null
  })
  await Promise.all(offered(page, 'light'))
})

test('serves the theme script inline in the head', async ({ request }) => {
  const html = await (await request.get('/')).text()
  const body = html.indexOf('<body')

  expect(body).toBeGreaterThan(-1)
  expect(html.slice(0, body)).toContain("localStorage.getItem('theme')")
  expect(html).toContain('<meta name="color-scheme" content="light dark"')
})

for (const path of ['/', '/bash', '/archive', '/404']) {
  test(`shows the toggle on ${path} at both widths`, async ({ page }) => {
    await page.goto(path)
    const toggle = page.locator(TOGGLE)

    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 800 })
      await expect(toggle).toBeVisible()
    }
  })
}

const MERMAID_CANVAS = '.MermaidDiagram__canvas svg'
const MERMAID_ERROR = '.MermaidDiagram__error'

/** Strip per-render ids so markups compare equal */
function withoutRenderIds(html: string) {
  return html.replaceAll(/mermaid-diagram-\d+/g, 'mermaid-diagram')
}

async function mermaidMarkup(page: Page) {
  const markup = await page.evaluate(
    () => document.querySelector('.MermaidDiagram__canvas svg')?.outerHTML
  )
  return markup ? withoutRenderIds(markup) : undefined
}

test('re-renders the Mermaid diagram for the chosen theme', async ({
  page
}) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/git-revisions')
  await expect(page.locator(MERMAID_CANVAS)).toBeVisible({ timeout: 15_000 })

  const light = await mermaidMarkup(page)
  const canvasBox = await page.locator('.MermaidDiagram__canvas').boundingBox()
  const captionBox = await page
    .locator('.MermaidDiagram__caption')
    .boundingBox()
  expect(captionBox!.y).toBeGreaterThanOrEqual(canvasBox!.y + canvasBox!.height)

  await page.locator(TOGGLE).click()

  await expect
    .poll(
      async () => {
        const markup = await mermaidMarkup(page)
        return markup !== undefined && markup !== light
      },
      { timeout: 15_000 }
    )
    .toBe(true)
  await expect(page.locator(MERMAID_ERROR)).toHaveCount(0)
})

test('drops a stale Mermaid render after two quick toggles', async ({
  page
}) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/git-revisions')
  await expect(page.locator(MERMAID_CANVAS)).toBeVisible({ timeout: 15_000 })

  const light = await mermaidMarkup(page)

  await page.evaluate(() => {
    const figure = document.querySelector('.MermaidDiagram')
    const win = window as typeof window & { mermaidRenders?: number }
    win.mermaidRenders = 0
    if (!figure) return

    new MutationObserver((records) => {
      for (const record of records)
        for (const node of record.addedNodes)
          if (
            node instanceof Element &&
            node.classList.contains('MermaidDiagram__canvas')
          )
            win.mermaidRenders = (win.mermaidRenders ?? 0) + 1
    }).observe(figure, { childList: true, subtree: true })

    ;(document.querySelector('[data-js-theme-toggle]') as HTMLElement).click()
    ;(document.querySelector('[data-js-theme-toggle]') as HTMLElement).click()
  })

  await expect
    .poll(
      async () => {
        const renders = await page.evaluate(
          () =>
            (window as typeof window & { mermaidRenders?: number })
              .mermaidRenders
        )
        const markup = await mermaidMarkup(page)
        return (renders ?? 0) > 0 && markup === light
      },
      { timeout: 15_000 }
    )
    .toBe(true)

  const renders = await page.evaluate(
    () => (window as typeof window & { mermaidRenders?: number }).mermaidRenders
  )
  expect(renders).toBe(1)
  await expect(page.locator(MERMAID_ERROR)).toHaveCount(0)
})
