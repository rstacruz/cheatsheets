import type { Code, Root } from 'mdast'
import type { Element, Properties, Root as HastRoot } from 'hast'
import { visit } from 'unist-util-visit'
import { TABLE_SENTINEL_LANG } from './tables'

/**
 * IAL (kramdown `{: ...}`) shims for two measured gaps in
 * `remark-attribute-list`: unterminated IALs swallow text to the next `}`, and
 * a blank-line IAL attaches to the next block. Both run pre-parse, where
 * kramdown decides them
 */

const FENCE_LINE = /^( {0,3})(`{3,}|~{3,})(.*)$/
const IAL_LINE = /^ {0,3}\{:[ \t]/
// An own-line IAL inside a blockquote or list item; kramdown renders these
// literally when unterminated rather than swallowing to the next `}`
const CONTAINER_IAL_LINE =
  /^\s*(?:(?:>[ \t]*)|(?:[-*+]|\d+[.)])[ \t]+)+\{:[ \t]/
// kramdown's `ALD_TYPE_ANY`, minus bare-word ALD references (unsupported here)
const ALD_TOKEN =
  /(?<=^|\s)(?:\w[\w-]*=(?:"[^"]*"|'[^']*')|(?:#[A-Za-z][\w:-]*|\.[^\s.#]+)+)(?=\s|$)/gm

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

/** True when `}` closes the IAL outside a quoted value */
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
 * Deletes unterminated own-line IALs, which make the plugin throw
 *
 * kramdown's IAL regex is not line-bounded, so `{: .-shortcuts` with no `}`
 * swallows everything to the next `}` anywhere in the document, and the
 * classes in that span apply to the preceding block. Measured on spacemacs.md:
 * the heading and table between the braces vanish, and the Toggle table gains
 * both classes
 */
export function dropUnterminatedIALs(md: string): string {
  const lines = md.split('\n')
  const fenced = fenceFlags(lines)
  const out: string[] = []

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]
    const container = CONTAINER_IAL_LINE.test(line)
    if (fenced[index] || (!container && !IAL_LINE.test(line))) {
      out.push(line)
      continue
    }
    if (isTerminatedIAL(line)) {
      out.push(line)
      continue
    }

    // Inside a container kramdown never swallows: the token stays literal text
    if (container) {
      out.push(neutralizeIAL(line))
      continue
    }

    // A `}` on this line only: kramdown found no usable attributes
    if (line.includes('}')) continue

    let close = -1
    for (let scan = index + 1; scan < lines.length; scan++) {
      if (lines[scan].includes('}')) {
        close = scan
        break
      }
    }
    if (close === -1) {
      // No closing brace anywhere: kramdown renders the token as literal text
      out.push(neutralizeIAL(line))
      continue
    }

    // kramdown scans the swallowed text (up to the closing `}`) for
    // class/id/key-value tokens and applies them to the preceding block
    const region = lines.slice(index, close + 1).join('\n')
    const span = region.slice(region.indexOf('{:') + 2, region.indexOf('}'))
    const tokens = span.match(ALD_TOKEN) ?? []
    if (tokens.length > 0) out.push(`{: ${tokens.join(' ')} }`)
    index = close
  }

  return out.join('\n')
}

/** Escapes the `{` of an IAL so remark leaves it as literal text */
function neutralizeIAL(line: string): string {
  const at = line.indexOf('{:')
  return at < 0 ? line : `${line.slice(0, at)}\\${line.slice(at)}`
}

/**
 * kramdown leaves a single backtick literal when whitespace precedes and
 * follows it: `` `  ` `` and `` ` x` `` are text, while `` `x ` `` is a code
 * span. Escape the literal ones so remark agrees
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
          // kramdown leaves this backtick literal
          out += '\\`'
          i++
          continue
        }

        // Opens a code span: skip past the closing backtick
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

/** Moves a blank-line IAL to the end of the next block */
export function refloatIALs(md: string): string {
  const lines = md.split('\n')
  const fenced = fenceFlags(lines)
  const isBlank = (line: string) => line.trim() === ''

  const moves: Array<{ ial: number; after: number }> = []
  for (let i = 1; i < lines.length; i++) {
    if (fenced[i] || !IAL_LINE.test(lines[i]) || !isTerminatedIAL(lines[i]))
      continue
    if (!isBlank(lines[i - 1])) continue

    // Walk to the end of the block the IAL floats over
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

/** kramdown drops `id=""` for an empty slug; run after rehype-slug */
export function dropEmptyHeadingIds() {
  return (tree: HastRoot) => {
    visit(tree, 'element', (node: Element) => {
      if (/^h[1-6]$/.test(node.tagName) && node.properties?.id === '') {
        delete node.properties.id
      }
    })
  }
}
