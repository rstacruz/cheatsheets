/**
 * Renders ```mermaid fences into inline diagrams and wires the zoom
 * interaction. Mermaid itself is imported on demand, so sheets without a
 * diagram never download it.
 *
 * Mermaid bakes fills and strokes into the SVG at render time, so a theme
 * change re-renders from the source kept on the figure.
 */

import type { Mermaid, MermaidConfig } from 'mermaid'

const DIAGRAM = '.MermaidDiagram'
const ZOOMED = 'is-zoomed'
const FONT = 'Geist Variable, system-ui, sans-serif'

/** Semantic role to read, and the CSS property that resolves it */
const ROLES = {
  background: ['--card', 'background-color'],
  mainBkg: ['--card', 'background-color'],
  primaryColor: ['--primary-surface', 'background-color'],
  primaryTextColor: ['--foreground', 'color'],
  primaryBorderColor: ['--primary', 'color'],
  secondaryColor: ['--muted', 'background-color'],
  tertiaryColor: ['--muted', 'background-color'],
  textColor: ['--foreground', 'color'],
  lineColor: ['--muted-foreground', 'color'],
  nodeBorder: ['--primary', 'color'],
  clusterBkg: ['--muted', 'background-color'],
  clusterBorder: ['--primary', 'color'],
  edgeLabelBackground: ['--card', 'background-color']
} as const satisfies Record<string, readonly [string, string]>

type ThemeVariables = Record<keyof typeof ROLES, string>

let counter = 0
let generation = 0
let queue: Promise<void> = Promise.resolve()
let mermaid: Mermaid | null = null

function toggleZoom(frame: HTMLElement) {
  const figure = frame.closest(DIAGRAM)
  figure?.classList.toggle(ZOOMED)
}

/** Zooms around the pointer, so the part under the cursor stays readable */
function trackPointer(frame: HTMLElement) {
  frame.addEventListener('pointermove', (event) => {
    const rect = frame.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    frame.style.setProperty('--mermaid-origin', `${x}% ${y}%`)
  })
}

function setupInteractions(frame: HTMLElement) {
  trackPointer(frame)
  frame.addEventListener('click', () => toggleZoom(frame))
  frame.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleZoom(frame)
    } else if (event.key === 'Escape') {
      frame.closest(DIAGRAM)?.classList.remove(ZOOMED)
    }
  })
}

/** The scheme the page renders in: a pinned override, else the OS choice */
function scheme(): 'light' | 'dark' {
  const pinned = document.documentElement.dataset.theme
  if (pinned === 'light' || pinned === 'dark') return pinned
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
    ? 'dark'
    : 'light'
}

/**
 * Resolves the semantic roles through a probe. `getComputedStyle` on a custom
 * property returns `light-dark(…)` unresolved, so the value must land on a real
 * property first.
 */
function readRoles(): ThemeVariables {
  const probe = document.createElement('span')
  probe.setAttribute('aria-hidden', 'true')
  probe.style.cssText =
    'position:absolute;visibility:hidden;pointer-events:none'
  document.body.append(probe)

  const variables = {} as ThemeVariables
  for (const [name, [role, property]] of Object.entries(ROLES)) {
    probe.style.setProperty(property, `var(${role})`)
    variables[name as keyof ThemeVariables] =
      getComputedStyle(probe).getPropertyValue(property)
  }
  probe.remove()
  return variables
}

function config(): MermaidConfig {
  return {
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    darkMode: scheme() === 'dark',
    fontFamily: FONT,
    themeVariables: { ...readRoles(), fontFamily: FONT, fontSize: '14px' },
    flowchart: { useMaxWidth: true }
  }
}

function showError(figure: HTMLElement, error: Error) {
  figure.classList.add('is-error')
  const message = document.createElement('p')
  message.className = 'MermaidDiagram__error'
  message.textContent = 'This diagram could not be rendered.'
  figure.prepend(message)
  console.error('Mermaid diagram failed to render', error)
}

/** Keeps the source on the figure, then swaps any previous canvas for a new one */
async function renderDiagram(figure: HTMLElement, instance: Mermaid) {
  const frame = figure.querySelector<HTMLElement>('.MermaidDiagram__frame')
  if (!frame) return

  const source = figure.querySelector<HTMLElement>('.MermaidDiagram__source')
  if (source) {
    figure.dataset.mermaidSource = source.textContent ?? ''
    source.remove()
  }
  const code = figure.dataset.mermaidSource
  if (!code) return

  figure.querySelector('.MermaidDiagram__canvas')?.remove()
  figure.querySelector('.MermaidDiagram__error')?.remove()
  figure.classList.remove('is-error')

  try {
    const { svg, bindFunctions } = await instance.render(
      `mermaid-diagram-${++counter}`,
      code
    )
    const canvas = document.createElement('div')
    canvas.className = 'MermaidDiagram__canvas'
    canvas.innerHTML = svg
    const caption = frame.querySelector('.MermaidDiagram__caption')
    if (caption) caption.before(canvas)
    else frame.append(canvas)
    figure.classList.add('is-rendered')
    bindFunctions?.(canvas)
  } catch (error) {
    showError(figure, error instanceof Error ? error : new Error(String(error)))
  }
}

async function renderAll(run: number) {
  if (run !== generation || !mermaid) return
  mermaid.initialize(config())

  for (const figure of document.querySelectorAll<HTMLElement>(DIAGRAM)) {
    // A newer theme landed while this run was rendering; drop the rest.
    if (run !== generation) return
    await renderDiagram(figure, mermaid)
  }
}

/** Serialises renders and drops every run but the newest */
function scheduleRender() {
  const run = ++generation
  queue = queue
    .then(() => renderAll(run))
    .catch((error) => console.error('Mermaid re-render failed', error))
}

export async function setupMermaid() {
  const figures = [...document.querySelectorAll<HTMLElement>(DIAGRAM)]
  if (!figures.length || mermaid) return

  if (document.readyState === 'loading') {
    const { promise, resolve } = Promise.withResolvers<void>()
    document.addEventListener('DOMContentLoaded', () => resolve(), {
      once: true
    })
    await promise
  }

  for (const figure of figures) {
    const frame = figure.querySelector<HTMLElement>('.MermaidDiagram__frame')
    if (frame) setupInteractions(frame)
  }

  // Static import would ship Mermaid to every sheet; fetch it only here.
  mermaid = (await import('mermaid')).default

  document.addEventListener('themechange', scheduleRender)
  scheduleRender()
  await queue
}
