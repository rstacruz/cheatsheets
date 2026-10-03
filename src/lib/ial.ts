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
 *
 * kramdown's IAL regex is not line-bounded: `\{:(?!:|\/)([^\}]+)\}` will span
 * newlines, so an own-line `{: .-shortcuts` with no closing brace on its own
 * line swallows everything up to the next `}` *anywhere in the document*, and
 * the classes found in that span are applied to the preceding block. That is
 * measured behaviour (spacemacs.md: the heading and table between the two
 * braces disappear, and the Toggle table gains both classes), so reproduce it.
 */
export function dropUnterminatedIALs(md: string): string {
  const lines = md.split('\n')
  const fenced = fenceFlags(lines)
  const out: string[] = []

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]
    if (fenced[index] || !IAL_LINE.test(line) || isTerminatedIAL(line)) {
      out.push(line)
      continue
    }

    // A `}` on the same line means kramdown consumed just this line (and
    // found no usable attributes, e.g. an unterminated quoted value).
    if (line.includes('}')) continue

    let close = -1
    for (let scan = index + 1; scan < lines.length; scan++) {
      if (lines[scan].includes('}')) {
        close = scan
        break
      }
    }
    if (close === -1) continue // no closing brace anywhere: drop the line

    const span = lines.slice(index, close + 1).join('\n')
    const classes = [...new Set(span.match(/\.-?[A-Za-z0-9_-]+/g) ?? [])]
    if (classes.length > 0) out.push(`{: ${classes.join(' ')} }`)
    index = close
  }

  return out.join('\n')
}

/**
 * kramdown does not parse a single-backtick code span when the backtick is
 * preceded by whitespace (or starts the span) and followed by whitespace:
 * `` `  ` `` and `` ` x` `` stay literal backticks, while `` `x ` `` is a code
 * span. Escape those backticks so remark leaves them literal too.
 */
export function escapeWhitespaceCodeSpans(md: string): string {
  const lines = md.split('\n')
  const fenced = fenceFlags(lines)

  return lines
    .map((line, index) => {
      if (fenced[index] || !line.includes('`')) return line
      let out = ''
      let i = 0
      while (i < line.length) {
        if (line[i] !== '`') {
          out += line[i]
          i++
          continue
        }

        let run = 0
        while (line[i + run] === '`') run++
        if (run > 1) {
          out += '`'.repeat(run)
          i += run
          continue
        }

        const previous = i === 0 ? '' : line[i - 1]
        if (
          (previous === '' || /\s/.test(previous)) &&
          /\s/.test(line[i + 1] ?? '')
        ) {
          // kramdown treats this backtick as literal text.
          out += '\\`'
          i++
          continue
        }

        // Otherwise it opens a code span: skip to its closing backtick so it
        // is not escaped as well.
        let close = i + 1
        while (close < line.length && line[close] !== '`') close++
        if (close < line.length) {
          out += line.slice(i, close + 1)
          i = close + 1
        } else {
          out += line[i]
          i++
        }
      }
      return out
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
