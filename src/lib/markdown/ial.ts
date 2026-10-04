import type { Code, Root } from 'mdast'
import type { Element, Properties, Root as HastRoot } from 'hast'
import { visit } from 'unist-util-visit'
import { TABLE_SENTINEL_LANG } from './tables'

/**
 * Fence scanning plus two post-parse shims: `restoreCodeLanguage` keeps Prism
 * classes when an IAL sets `<code>` attributes, and `hoistCodeAttrs` moves
 * non-`language-*` attributes to `<pre>` like kramdown
 */

const FENCE_LINE = /^( {0,3})(`{3,}|~{3,})(.*)$/

/** Marks lines inside or opening/closing a fenced code block */
export function scanFences(lines: string[]) {
  const fenced = new Array<boolean>(lines.length).fill(false)
  // Opening fence indentation, for lines inside the block
  const indent = new Array<number>(lines.length).fill(0)
  let fence: string | null = null
  let opener = 0

  lines.forEach((line, index) => {
    const match = FENCE_LINE.exec(line)
    if (fence) {
      fenced[index] = true
      indent[index] = opener
      // A closing fence needs at least as many characters as the opener
      if (
        match &&
        match[2][0] === fence[0] &&
        match[2].length >= fence.length &&
        match[3].trim() === ''
      ) {
        fence = null
      }
    } else if (match && (match[2][0] === '~' || !match[3].includes('`'))) {
      fence = match[2]
      opener = match[1].length
      fenced[index] = true
      indent[index] = opener
    }
  })

  return { fenced, indent }
}

export function fenceFlags(lines: string[]): boolean[] {
  return scanFences(lines).fenced
}

/**
 * mdast-util-to-hast overwrites `<code>` className with the IAL's classes,
 * dropping `language-*`; re-add it before conversion so Prism still highlights
 */
export function restoreCodeLanguage() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code) => {
      if (!node.lang || node.lang === TABLE_SENTINEL_LANG) return
      const properties = node.data?.hProperties
      const className = properties?.className
      if (className === undefined || className === null) return
      if (/(?:^|\s)language-/.test(String(className))) return
      properties.className = `language-${node.lang} ${String(className)}`
    })
  }
}

/**
 * Moves non-`language-*` attributes from `<code>` to `<pre>`, matching
 * kramdown: `<pre class="-setup" data-line="1"><code class="language-ruby">`
 */
export function hoistCodeAttrs() {
  return (tree: HastRoot) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'pre') return
      const code = node.children.find(
        (child): child is Element =>
          child.type === 'element' && child.tagName === 'code'
      )
      if (!code?.properties) return

      const properties = code.properties
      const moved: Properties = {}
      let className: string[] | undefined

      for (const [key, value] of Object.entries(properties)) {
        if (key !== 'className') {
          moved[key] = value
          delete properties[key]
          continue
        }

        const list = Array.isArray(value)
          ? value.map(String)
          : String(value).split(/\s+/).filter(Boolean)
        const keep = list.filter((item) => item.startsWith('language-'))
        const move = list.filter((item) => !item.startsWith('language-'))
        if (move.length) className = move
        if (keep.length) properties.className = keep
        else delete properties.className
      }

      const next: Properties = {}
      if (className) next.className = className
      Object.assign(next, moved, node.properties)
      node.properties = next
    })
  }
}
