import type { Code, Data, Root } from 'mdast'
import type {
  Element,
  ElementContent,
  Properties,
  Root as HastRoot
} from 'hast'
import { SKIP, visit } from 'unist-util-visit'

/**
 * Turns ` ```mermaid ` fences into figures rendered by Mermaid in the browser.
 *
 * Titles come from the fence meta (`title="Hook anatomy"`) or the diagram's
 * own `accTitle:`, so the figure has a caption before Mermaid runs.
 */

export const MERMAID_LANG = 'mermaid'

const TITLE_META = /(?:^|\s)title=(?:"([^"]*)"|'([^']*)')/
const ACC_TITLE = /^\s*accTitle:\s*(.+?)\s*$/m
const ACC_DESCRIPTION = /^\s*accDescr:\s*(.+?)\s*$/m

function metaTitle(meta: string | null | undefined): string | undefined {
  if (!meta) return undefined
  const match = TITLE_META.exec(meta)
  return match?.[1] ?? match?.[2] ?? undefined
}

export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code) => {
      if (node.lang !== MERMAID_LANG) return

      const properties: Properties = {}
      const title = metaTitle(node.meta) ?? ACC_TITLE.exec(node.value)?.[1]
      const description = ACC_DESCRIPTION.exec(node.value)?.[1]

      if (title) properties['data-diagram-title'] = title
      if (description) properties['data-diagram-description'] = description
      if (!title && !description) return

      const data = (node.data ?? {}) as Data & { hProperties?: Properties }
      node.data = {
        ...data,
        hProperties: { ...data.hProperties, ...properties }
      }
    })
  }
}

function isMermaidCode(node: Element) {
  if (node.tagName !== 'code') return false
  const className = node.properties.className
  const list = Array.isArray(className) ? className : [className]
  return list.map(String).includes(`language-${MERMAID_LANG}`)
}

function textContent(node: ElementContent): string {
  if (node.type === 'text') return node.value
  if (node.type === 'element') return node.children.map(textContent).join('')
  return ''
}

function stringProperty(value: Properties[string]): string | undefined {
  if (value === undefined || value === null || value === '') return undefined
  return String(value)
}

export function rehypeMermaid() {
  return (tree: HastRoot) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'pre' || index === undefined || !parent) return

      const code = node.children.find(
        (child): child is Element =>
          child.type === 'element' && isMermaidCode(child)
      )
      if (!code) return

      const title = stringProperty(node.properties.dataDiagramTitle)
      const description = stringProperty(node.properties.dataDiagramDescription)
      const caption = title ?? 'Diagram'
      const label = title ?? caption
      const parts = [`${label}.`, 'Hover, focus, or tap to zoom.']
      if (description) parts.push(description)

      const frameProperties: Properties = {
        className: ['MermaidDiagram__frame'],
        role: 'group',
        tabIndex: 0,
        'aria-label': parts.join(' ')
      }
      if (description) frameProperties['aria-description'] = description

      const figure: Element = {
        type: 'element',
        tagName: 'figure',
        properties: {
          className: ['MermaidDiagram'],
          dataMermaidDiagram: ''
        },
        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: frameProperties,
            children: [
              {
                type: 'element',
                tagName: 'pre',
                properties: {
                  className: ['mermaid', 'MermaidDiagram__source']
                },
                children: [{ type: 'text', value: textContent(code) }]
              }
            ]
          },
          {
            type: 'element',
            tagName: 'figcaption',
            properties: {
              className: title
                ? ['MermaidDiagram__caption']
                : ['MermaidDiagram__caption', 'MermaidDiagram__caption--hidden']
            },
            children: [{ type: 'text', value: caption }]
          }
        ]
      }

      parent.children[index] = figure
      return SKIP
    })
  }
}
