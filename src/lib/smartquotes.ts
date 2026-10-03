import type { Root, Text } from 'mdast'
import { visit } from 'unist-util-visit'

/**
 * kramdown's `TYPOGRAPHIC_SYMS` (parser/kramdown/typographic_symbol.rb),
 * measured: `---` and `--` become em/en dashes, `...` an ellipsis, `<< `/` >>`
 * a guillemet plus nbsp. Text nodes only, as in kramdown; `kramdownSmartQuotes`
 * below handles quotes
 */

const SYMBOLS = /---|--|\.\.\.|<< | >>|<<|>>/g

const SUBSTITUTIONS: Record<string, string> = {
  '---': '\u2014',
  '--': '\u2013',
  '...': '\u2026',
  '<< ': '\u00ab\u00a0',
  ' >>': '\u00a0\u00bb',
  '<<': '\u00ab',
  '>>': '\u00bb'
}

export function kramdownTypographicSymbols() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (
        parent &&
        index !== undefined &&
        insideRawCode(parent.children, index)
      )
        return
      node.value = node.value.replace(
        SYMBOLS,
        (match) => SUBSTITUTIONS[match] ?? match
      )
    })
  }
}

/**
 * kramdown leaves raw `<code>` content alone (unlike `<span>`, where it still
 * parses markdown): `<code>x -- y "q"</code>` keeps the dashes and quotes
 */
function insideRawCode(children: unknown[], index: number): boolean {
  let depth = 0
  for (let i = 0; i < index; i++) {
    const child = children[i] as { type?: string; value?: string }
    if (child?.type !== 'html' || typeof child.value !== 'string') continue
    depth += (child.value.match(/<code\b/gi) ?? []).length
    depth -= (child.value.match(/<\/code>/gi) ?? []).length
  }
  return depth > 0
}

/**
 * kramdown's `SQ_RULES` (parser/kramdown/smart_quotes.rb), ported for quote
 * direction: a whole-document pass flips opening quotes at the start of a
 * paragraph, table cell or emphasis span
 */

const SQ_PUNCT = '[!"#$%\'()*+,\\-./:;<=>?@\\[\\\\\\]^_`{|}~]'
const SQ_CLOSE = '[^ \\\\\t\r\n\\[{(-]'

type SmartQuoteRule = {
  re: RegExp
  replace: (match: RegExpExecArray) => string
}

const direction = (quote: string, opening: boolean) =>
  quote === '"'
    ? opening
      ? '\u201c'
      : '\u201d'
    : opening
      ? '\u2018'
      : '\u2019'

const SMART_QUOTE_RULES: SmartQuoteRule[] = [
  { re: /^("|')(?=[_*]{1,2}\S)/, replace: (m) => direction(m[1], true) },
  {
    re: new RegExp(`^("|')(?=${SQ_PUNCT}(?!\\.\\.)\\B)`),
    replace: (m) => direction(m[1], false)
  },
  { re: /^(\s?)"'(?=\w)/, replace: (m) => m[1] + '\u201c\u2018' },
  { re: /^(\s?)'"(?=\w)/, replace: (m) => m[1] + '\u2018\u201c' },
  { re: /^(\s?)'(?=\d\ds)/, replace: (m) => m[1] + '\u2019' },
  { re: /^(\s)('|")(?=\w)/, replace: (m) => m[1] + direction(m[2], true) },
  {
    re: new RegExp(`^(${SQ_CLOSE})('|")`),
    replace: (m) => m[1] + direction(m[2], false)
  },
  { re: /^("|')(?=\s|s\b|$)/, replace: (m) => direction(m[1], false) },
  { re: /^(.?)'/m, replace: (m) => m[1] + '\u2018' },
  { re: /^(.?)"/m, replace: (m) => m[1] + '\u201c' }
]

const QUOTE_RE = /[^\\]?["']/g

function applySmartQuotes(text: string): string {
  const out: string[] = []
  let position = 0

  while (position < text.length) {
    QUOTE_RE.lastIndex = position
    const match = QUOTE_RE.exec(text)
    if (!match) {
      out.push(text.slice(position))
      break
    }

    out.push(text.slice(position, match.index))
    const rest = text.slice(match.index)
    const rule = SMART_QUOTE_RULES.find((candidate) => candidate.re.test(rest))

    if (!rule) {
      out.push(match[0])
      position = match.index + match[0].length
      continue
    }

    const applied = rule.re.exec(rest) as RegExpExecArray
    out.push(rule.replace(applied))
    position = match.index + applied[0].length
  }

  return out.join('')
}

export function kramdownSmartQuotes() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (
        parent &&
        index !== undefined &&
        insideRawCode(parent.children, index)
      )
        return
      if (node.value.includes('"') || node.value.includes("'")) {
        node.value = applySmartQuotes(node.value)
      }
    })
  }
}
