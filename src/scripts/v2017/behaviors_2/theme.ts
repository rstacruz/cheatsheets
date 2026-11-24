/**
 * Wires the nav theme toggle. System is the default: `localStorage.theme`
 * holds an explicit `light` or `dark` override, and the inline script in
 * BaseLayout applies it before first paint.
 */

type Theme = 'light' | 'dark'

const KEY = 'theme'

function stored(): Theme | null {
  try {
    const value = localStorage.getItem(KEY)
    if (value === 'light' || value === 'dark') return value
  } catch {}
  return null
}

function system(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
    ? 'dark'
    : 'light'
}

function effective(): Theme {
  return stored() ?? system()
}

/** Lets other scripts, such as Mermaid, react to a rendered change. */
function emit() {
  document.dispatchEvent(
    new CustomEvent('themechange', {
      detail: { stored: stored(), effective: effective() }
    })
  )
}

function updateUi() {
  const target = effective() === 'dark' ? 'light' : 'dark'
  const button = document.querySelector<HTMLElement>('[data-js-theme-toggle]')
  if (!button) return

  const label =
    target === 'dark' ? 'Switch to dark theme' : 'Switch to light theme'
  button.setAttribute('aria-label', label)
  button.setAttribute('title', label)
  button.dataset.themeTarget = target

  for (const icon of button.querySelectorAll<HTMLElement>(
    '[data-theme-icon]'
  )) {
    icon.hidden = icon.dataset.themeIcon !== target
  }
}

function paint(theme: Theme | null) {
  const root = document.documentElement
  if (theme === null) delete root.dataset.theme
  else root.dataset.theme = theme
  updateUi()
  emit()
}

function persist(theme: Theme | null) {
  try {
    if (theme === null) localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, theme)
  } catch {}
}

export function setupThemeToggle() {
  updateUi()

  document
    .querySelector<HTMLElement>('[data-js-theme-toggle]')
    ?.addEventListener('click', () => {
      const target = effective() === 'dark' ? 'light' : 'dark'

      // A click whose target is the OS scheme returns to System; anything
      // else pins the override.
      if (target === system()) {
        persist(null)
        paint(null)
      } else {
        persist(target)
        paint(target)
      }
    })

  window
    .matchMedia?.('(prefers-color-scheme: dark)')
    ?.addEventListener('change', () => {
      // Only System follows the OS; an explicit override stays pinned.
      if (stored() === null) paint(null)
      else updateUi()
    })

  window.addEventListener('storage', (event) => {
    if (event.key === KEY) paint(stored())
  })
}
