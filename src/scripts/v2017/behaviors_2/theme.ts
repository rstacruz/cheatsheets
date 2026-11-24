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
      if (stored() === null) paint(null)
    })

  window.addEventListener('storage', (event) => {
    if (event.key === KEY) paint(stored())
  })
}
