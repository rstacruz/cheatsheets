import type { Code, Root } from 'mdast'
import type { Element, Properties, Root as HastRoot } from 'hast'
import { visit } from 'unist-util-visit'
import { TABLE_SENTINEL_LANG } from './tables'

/**
 * IAL (kramdown `{: …}`) compatibility shims.
 *
 * `remark-attribute-list` covers almost all of the corpus' own-line IALs, but
 * kramdown is more forgiving in two measured spots:
 *
 * 1. Unterminated IALs (`{: .-shortcuts`) are silently ignored by kramdown,
 *    while the plugin throws while building the document.
 * 2. An IAL preceded by a blank line attaches to the *next* block in kramdown,
 *    while the plugin only looks backwards.
 *
 * Both are handled before parsing, where kramdown decides them too.
 */

const FENCE_LINE = /^( {0,3})(`{3,}|~{3,})(.*)$/
const IAL_LINE = /^ {0,3}\{:[ \t]/

/** Marks every line that sits inside (or opens/closes) a fenced code block. */
export function fenceFlags(lines: string[]): boolean[] {
  const flags = new Array<boolean>(lines.length).fill(false)
  let fence: string | null = null

  lines.forEach((line, index) => {
    const match = FENCE_LINE.exec(line)
    if (fence) {
      flags[index] = true
      if (match && match[2][0] === fence && match[3].trim() === '') fence = null
    } else if (match && (match[2][0] === '~' || !match[3].includes('`'))) {
      fence = match[2][0]
      flags[index] = true
    }
  })

  return flags
}

/**
 * An own-line IAL is terminated when a `}` closes it outside a quoted value.
 * kramdown ignores `{: .-shortcuts` (no `}`) and `{: data-line="1,3,5,7 }`
 * (unterminated quote); the plugin throws on both.
 */
function isTerminatedIAL(line: string): boolean {
  const body = line.slice(line.indexOf('{:') + 2)
  let inQuote = false
  for (let i = 0; i < body.length; i++) {
    const char = body[i]
    if (char === '\\') {
      i++
    } else if (char === '"') {
      inQuote = !inQuote
    } else if (char === '}' && !inQuote) {
      return true
    }
  }
  return false
}

/**
 * Deletes own-line IALs that never terminate. kramdown ignores them entirely
 * (neither attributes nor literal text reach the output); the plugin throws.
 */
export function dropUnterminatedIALs(md: string): string {
  const lines = md.split('\n')
  const fenced = fenceFlags(lines)

  return lines
    .filter((line, index) => {
      if (fenced[index] || !IAL_LINE.test(line)) return true
      return isTerminatedIAL(line)
    })
    .join('\n')
}

/**
 * Moves an own-line IAL that follows a blank line down to the end of the next
 * block, so the plugin attaches it to that block — kramdown's behaviour.
 */
export function refloatIALs(md: string): string {
  const lines = md.split('\n')
  const fenced = fenceFlags(lines)
  const isBlank = (line: string) => line.trim() === ''

  const moves: Array<{ ial: number; after: number }> = []
  for (let i = 1; i < lines.length; i++) {
    if (fenced[i] || !IAL_LINE.test(lines[i]) || !isTerminatedIAL(lines[i]))
      continue
    if (!isBlank(lines[i - 1])) continue

    // Skip blank lines to the block the IAL floats over, then walk to the end
    // of that block (ignoring blank lines inside a fenced code block).
    let start = i + 1
    while (start < lines.length && isBlank(lines[start]) && !fenced[start])
      start++
    if (start >= lines.length || fenced[start]) continue

    let end = start
    while (end + 1 < lines.length) {
      if (isBlank(lines[end + 1]) && !fenced[end + 1]) break
      end++
    }
    moves.push({ ial: i, after: end })
  }

  for (const { ial, after } of moves.reverse()) {
    const [line] = lines.splice(ial, 1)
    lines.splice(after, 0, line)
  }

  return lines.join('\n')
}

/**
 * `mdast-util-to-hast` overwrites `className` on `<code>` with the IAL's
 * classes, dropping `language-*`. Restore it here, before the tree is
 * converted, so Prism keeps highlighting fenced code with an IAL.
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
 * Moves non-language attributes from `<code>` to its `<pre>`, matching
 * kramdown's output (`<pre class="-setup" data-line="1"><code
 * class="language-ruby">`). `language-*` stays behind on `<code>`.
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

/**
 * kramdown emits no `id` at all for headings whose slug is empty (`### ⌘`);
 * `rehype-slug` emits `id=""`. Run after `rehype-slug`.
 */
export function dropEmptyHeadingIds() {
  return (tree: HastRoot) => {
    visit(tree, 'element', (node: Element) => {
      if (/^h[1-6]$/.test(node.tagName) && node.properties?.id === '') {
        delete node.properties.id
      }
    })
  }
}
