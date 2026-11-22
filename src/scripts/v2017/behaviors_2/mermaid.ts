/**
 * Renders ```mermaid fences into inline diagrams and wires the zoom
 * interaction. Mermaid itself is imported on demand, so sheets without a
 * diagram never download it.
 */

import type { Mermaid } from 'mermaid'

const DIAGRAM = '.MermaidDiagram'
const ZOOMED = 'is-zoomed'

let counter = 0
let loaded = false

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

function showError(figure: HTMLElement, error: Error) {
  figure.classList.add('is-error')
  const message = document.createElement('p')
  message.className = 'MermaidDiagram__error'
  message.textContent = 'This diagram could not be rendered.'
  figure.prepend(message)
  console.error('Mermaid diagram failed to render', error)
}

async function renderDiagram(figure: HTMLElement, mermaid: Mermaid) {
  const frame = figure.querySelector<HTMLElement>('.MermaidDiagram__frame')
  const source = figure.querySelector<HTMLElement>('.MermaidDiagram__source')
  if (!frame || !source) return

  setupInteractions(frame)

  try {
    const { svg, bindFunctions } = await mermaid.render(
      `mermaid-diagram-${++counter}`,
      source.textContent ?? ''
    )
    const canvas = document.createElement('div')
    canvas.className = 'MermaidDiagram__canvas'
    canvas.innerHTML = svg
    source.replaceWith(canvas)
    figure.classList.add('is-rendered')
    bindFunctions?.(canvas)
  } catch (error) {
    showError(figure, error instanceof Error ? error : new Error(String(error)))
  }
}

export async function setupMermaid() {
  if (loaded) return
  const figures = [...document.querySelectorAll<HTMLElement>(DIAGRAM)]
  if (!figures.length) return
  loaded = true

  if (document.readyState === 'loading') {
    const { promise, resolve } = Promise.withResolvers<void>()
    document.addEventListener('DOMContentLoaded', () => resolve(), {
      once: true
    })
    await promise
  }

  // Static import would ship Mermaid to every sheet; fetch it only here.
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    fontFamily: 'Geist Variable, system-ui, sans-serif',
    themeVariables: {
      primaryColor: '#eef2ff',
      primaryTextColor: '#1f2937',
      primaryBorderColor: '#a5b4fc',
      lineColor: '#64748b',
      fontFamily: 'Geist Variable, system-ui, sans-serif',
      fontSize: '14px'
    },
    flowchart: { useMaxWidth: true }
  })

  for (const figure of figures) await renderDiagram(figure, mermaid)
}
