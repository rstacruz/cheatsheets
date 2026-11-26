import { parseAttributes } from '~/lib/markdown/comments'
import { parseHighlightSpec } from '~/lib/markdown/inlineHighlight'
import {
  isSheetSlug,
  loadBaseline,
  saveBaseline,
  updatingBaseline
} from './baseline'
import { commentsAfter } from './attributes'
import { sheetSources } from './sheets'
import { findFences } from './utils'

const BARE = /^[A-Za-z_][A-Za-z0-9_]*$/
const KEYWORD = /^(?:import|export|require|from|default)$/
const SETUP_LINE =
  /^import\b[^\n]*\bfrom\b|^export\b[^\n]*\bfrom\b|^(?:const|let|var)\s+\w+\s*=\s*require\(|^(?:const|let|var)\s*\{[^}]*\}\s*=\s*require\(/

type Finding = { line: number; token: string }

/** Flags a bare highlight whose first match is an import, not a call */
export function findHighlightsOnImports(source: string): Finding[] {
  const lines = source.split('\n')
  const found: Finding[] = []

  for (const fence of findFences(lines)) {
    const tokens = commentsAfter(lines, fence.closeLine).flatMap(
      ({ attributes }) => {
        const spec = parseAttributes(attributes)?.['data-highlight']
        return spec === undefined ? [] : parseHighlightSpec(spec)
      }
    )

    for (const token of tokens) {
      if (!BARE.test(token) || KEYWORD.test(token)) continue
      const pattern = new RegExp(`\\b${token}\\b`)
      const index = fence.code.findIndex((line) => pattern.test(line))
      if (index === -1) continue
      if (!SETUP_LINE.test(fence.code[index]?.trim() ?? '')) continue

      // An import-only block has no call site to prefer
      if (!new RegExp(`\\b${token}\\s*\\(`).test(fence.code.join('\n'))) {
        continue
      }

      found.push({
        line: fence.closeLine - fence.code.length + index,
        token
      })
    }
  }

  return found
}

describe('findHighlightsOnImports()', () => {
  const body = (code: string[], highlight: string) =>
    [
      '### A',
      '',
      '```js',
      ...code,
      '```',
      `<!-- {: data-highlight="${highlight}"} -->`
    ].join('\n')

  test('flags a bare highlight that first matches an import', () => {
    const input = body(
      [
        "import isBetween from 'dayjs/plugin/isBetween.js'",
        'dayjs.extend(isBetween)',
        'd.isBetween(a, b)'
      ],
      'isBetween'
    )
    expect(findHighlightsOnImports(input)).toEqual([
      { line: 4, token: 'isBetween' }
    ])
  })

  test('flags a require line', () => {
    const input = body(
      ["const af = require('dayjs/plugin/advancedFormat')", 'af()'],
      'af'
    )
    expect(findHighlightsOnImports(input)).toEqual([{ line: 4, token: 'af' }])
  })

  test('allows a bare highlight that first matches a call', () => {
    const input = body(['humanize(1)'], 'humanize')
    expect(findHighlightsOnImports(input)).toEqual([])
  })

  test('allows a token that includes the call syntax', () => {
    const input = body(
      [
        "import isBetween from 'dayjs/plugin/isBetween.js'",
        'd.isBetween(a, b)'
      ],
      '.isBetween('
    )
    expect(findHighlightsOnImports(input)).toEqual([])
  })

  test('ignores non-JS imports and shell exports', () => {
    const go = body(['import "fmt"', 'fmt.Println(1)'], 'fmt')
    expect(findHighlightsOnImports(go)).toEqual([])

    const shell = body(['export GH_TOKEN=x', 'gh auth login'], 'GH_TOKEN')
    expect(findHighlightsOnImports(shell)).toEqual([])
  })

  test('ignores blocks without highlights', () => {
    const input = ['### A', '', '```js', "import x from 'x'", '```'].join('\n')
    expect(findHighlightsOnImports(input)).toEqual([])
  })
})

test('every bare highlight lands on a call', async () => {
  const findings: Array<{ slug: string } & Finding> = []

  for (const { slug, source } of await sheetSources()) {
    if (!isSheetSlug(slug)) continue
    for (const finding of findHighlightsOnImports(source)) {
      findings.push({ slug, ...finding })
    }
  }

  const keys = [
    ...new Set(findings.map(({ slug, token }) => `${slug}#${token}`))
  ].sort()
  if (updatingBaseline)
    return saveBaseline('code-highlight-call-site.json', keys)

  const allowed = new Set(
    loadBaseline<string[]>('code-highlight-call-site.json', [])
  )
  const unexpected = findings
    .filter(({ slug, token }) => !allowed.has(`${slug}#${token}`))
    .map(
      ({ slug, line, token }) =>
        `${slug}:${line}: highlight "${token}" first matches an import; tint the call`
    )
  expect(unexpected).toEqual([])
})
