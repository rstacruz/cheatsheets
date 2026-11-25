import { expect, test, type Page } from '@playwright/test'

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

function captureAtDomReady(page: Page, override?: 'light' | 'dark') {
  return page.addInitScript((theme) => {
    if (theme) {
      const observer = new MutationObserver(() => {
        if (!document.documentElement) return
        document.documentElement.dataset.theme = theme
        observer.disconnect()
      })
      observer.observe(document, { childList: true })
    }
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
  }, override)
}

for (const scheme of ['light', 'dark'] as const) {
  test(`follows the system ${scheme} preference without a stored theme`, async ({
    page
  }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.goto('/')

    expect(await snapshot(page)).toEqual({
      ...tokens[scheme],
      scheme: 'light dark',
      theme: null
    })
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBeNull()
  })

  test(`resolves ${scheme} tokens before first paint`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await captureAtDomReady(page)
    await page.goto('/')

    const expected = { ...tokens[scheme], scheme: 'light dark', theme: null }
    expect(await snapshotAtDomReady(page)).toEqual(expected)
    expect(await snapshot(page)).toEqual(expected)
  })

  const system = scheme === 'light' ? 'dark' : 'light'

  test(`pins ${scheme} against a system ${system} preference`, async ({
    page
  }) => {
    await page.emulateMedia({ colorScheme: system })
    await captureAtDomReady(page, scheme)
    await page.goto('/')

    expect(await snapshotAtDomReady(page)).toEqual({
      ...tokens[scheme],
      scheme,
      theme: scheme
    })
  })
}
