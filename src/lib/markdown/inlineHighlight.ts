import type { Element, ElementContent, Root, Text } from 'hast'
import { visit } from 'unist-util-visit'

/**
 * Wraps text matching `data-highlight` in `.inline-highlight` spans, so a
 * fenced block can point at one API name instead of shading the whole line.
 * The spec is a comma-separated list of literal, case-sensitive strings.
 */

const HIGHLIGHT_CLASS = 'inline-highlight'

type Match = { start: number; end: number }
type Segment = {
  node: Text
  parent: Element
  index: number
  start: number
  end: number
}

type PropertyValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number>

/** `data-highlight="a, b"` → `["a", "b"]` */
export function parseHighlightSpec(value: PropertyValue): string[] {
  const values = Array.isArray(value) ? value.map(String) : [String(value)]
  return values.flatMap((item) =>
    item.split(',').flatMap((part) => {
      const token = part.trim()
      return token ? [token] : []
    })
  )
}

/** Literal matches for every token, dropping overlaps (longer wins) */
export function findMatches(text: string, tokens: string[]): Match[] {
  const found: Match[] = []

  for (const token of tokens) {
    let index = text.indexOf(token)
    while (index !== -1) {
      found.push({ start: index, end: index + token.length })
      index = text.indexOf(token, index + token.length)
    }
  }

  found.sort((a, b) => a.start - b.start || b.end - a.end)

  const matches: Match[] = []
  let lastEnd = 0
  for (const match of found) {
    if (match.start < lastEnd) continue
    matches.push(match)
    lastEnd = match.end
  }
  return matches
}

function highlight(value: string): Element {
  return {
    type: 'element',
    tagName: 'span',
    properties: { className: [HIGHLIGHT_CLASS] },
    children: [{ type: 'text', value }]
  }
}

/** Splits one text node into plain and highlighted pieces */
function slice(
  value: string,
  start: number,
  matches: Match[]
): ElementContent[] {
  const end = start + value.length
  const pieces: ElementContent[] = []
  let cursor = start

  for (const match of matches) {
    const from = Math.max(match.start, start)
    const to = Math.min(match.end, end)
    if (from >= to) continue
    if (from > cursor) {
      pieces.push({
        type: 'text',
        value: value.slice(cursor - start, from - start)
      })
    }
    pieces.push(highlight(value.slice(from - start, to - start)))
    cursor = to
  }

  if (cursor < end) {
    pieces.push({ type: 'text', value: value.slice(cursor - start) })
  }
  return pieces
}

function collectSegments(container: Element): Segment[] {
  const segments: Segment[] = []
  let offset = 0

  visit(container, 'text', (node, index, parent) => {
    if (index === undefined || parent?.type !== 'element') return
    segments.push({
      node,
      parent,
      index,
      start: offset,
      end: offset + node.value.length
    })
    offset += node.value.length
  })

  return segments
}

export function rehypeInlineHighlight() {
  return (tree: Root) => {
    visit(tree, 'element', (pre) => {
      if (pre.tagName !== 'pre') return
      const spec = pre.properties?.dataHighlight
      if (spec === undefined || spec === null) return

      const tokens = parseHighlightSpec(spec)
      if (tokens.length === 0) return

      const code = pre.children.find(
        (child): child is Element =>
          child.type === 'element' && child.tagName === 'code'
      )
      const segments = collectSegments(code ?? pre)
      if (segments.length === 0) return

      const text = segments.map((segment) => segment.node.value).join('')
      const matches = findMatches(text, tokens)
      if (matches.length === 0) return

      // Reverse order keeps earlier sibling indexes valid as nodes split
      for (const segment of segments.reverse()) {
        const pieces = slice(segment.node.value, segment.start, matches)
        segment.parent.children.splice(segment.index, 1, ...pieces)
      }
    })
  }
}
