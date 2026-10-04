import { getPages } from '../page'

// The remark pipeline marked these whitespace shapes so kramdown's output
// could be reproduced (see preserveWhitespace in src/lib/markdown/index.ts).
// Sheets keep them out so that pass can stay deleted.

const BLOCK_START =
  /^(?:[#>|{}]|[-*+](\s|$)|\d+[.)](\s|$)|-{2,}\s*$|={2,}\s*$|`{3,}|~{3,})/
const LINK_DEFINITION = /^\[[^\]]*\]:/
const HTML_BLOCK =
  /^<(?:!--|\?|!\[CDATA\[|!DOCTYPE|\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>))/i
// A list marker does not end a paragraph, so `- item` is not a block start
const PREV_BLOCK_START = /^(?:[#>|{}]|-{2,}\s*$|={2,}\s*$|`{3,}|~{3,})/
const FENCE_LINE = /^( {0,3})(`{3,}|~{3,})(.*)$/

/** Fence membership and opening indent, following CommonMark's fence rules */
function scanFences(lines: string[]) {
  const fenced = new Array<boolean>(lines.length).fill(false)
  const indent = new Array<number>(lines.length).fill(0)
  let fence: string | null = null
  let opener = 0

  lines.forEach((line, index) => {
    const match = FENCE_LINE.exec(line)
    if (fence) {
      fenced[index] = true
      indent[index] = opener
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

export type WhitespaceIssue = {
  line: number
  text: string
  reason: 'trailing-space' | 'continuation-indent' | 'fence-whitespace'
}

export function findShimWhitespace(source: string): WhitespaceIssue[] {
  const lines = source.split('\n')
  const { fenced, indent } = scanFences(lines)
  const issues: WhitespaceIssue[] = []

  lines.forEach((line, index) => {
    if (fenced[index]) {
      // kramdown kept the spaces of whitespace-only lines inside an indented
      // fence; CommonMark strips the fence's indent
      if (indent[index] > 0 && /^ +$/.test(line)) {
        issues.push({ line: index + 1, text: line, reason: 'fence-whitespace' })
      }
      return
    }

    const previous = lines[index - 1] ?? ''
    const next = lines[index + 1]
    const previousIsText =
      index > 0 &&
      !fenced[index - 1] &&
      /^ {0,3}\S/.test(previous) &&
      !PREV_BLOCK_START.test(previous.trimStart()) &&
      !LINK_DEFINITION.test(previous.trimStart()) &&
      !HTML_BLOCK.test(previous.trimStart())
    const nextContinues =
      next !== undefined &&
      !fenced[index + 1] &&
      next.trim() !== '' &&
      !BLOCK_START.test(next.trimStart()) &&
      !LINK_DEFINITION.test(next.trimStart()) &&
      !HTML_BLOCK.test(next.trimStart())
    const currentIsText =
      !BLOCK_START.test(line.trimStart()) &&
      !LINK_DEFINITION.test(line.trimStart()) &&
      !HTML_BLOCK.test(line.trimStart())

    if (line.trim() !== '' && nextContinues && /(?<![ \t]) $/.test(line)) {
      issues.push({ line: index + 1, text: line, reason: 'trailing-space' })
    }
    if (previousIsText && /^ +\S/.test(line) && currentIsText) {
      issues.push({
        line: index + 1,
        text: line,
        reason: 'continuation-indent'
      })
    }
  })

  return issues
}

describe('findShimWhitespace()', () => {
  test('flags a trailing space before a continuation line', () => {
    expect(
      findShimWhitespace('a paragraph that wraps \nonto the next line')
    ).toEqual([
      { line: 1, text: 'a paragraph that wraps ', reason: 'trailing-space' }
    ])
  })

  test('allows a hard break', () => {
    expect(findShimWhitespace('a line  \nnext')).toEqual([])
  })

  test('flags an indented paragraph continuation', () => {
    expect(findShimWhitespace('text\n  continued')).toEqual([
      { line: 2, text: '  continued', reason: 'continuation-indent' }
    ])
  })

  test('allows an indented line after a block start', () => {
    expect(findShimWhitespace('# heading\n  continued')).toEqual([])
  })

  test('flags whitespace-only lines in an indented fence', () => {
    expect(findShimWhitespace('- item\n\n  ```\n  code\n  \n  ```')).toEqual([
      { line: 5, text: '  ', reason: 'fence-whitespace' }
    ])
  })

  test('allows whitespace-only lines in a top-level fence', () => {
    expect(findShimWhitespace('```\ncode\n  \n```')).toEqual([])
  })
})

test('every sheet avoids shim-only whitespace', async () => {
  const pages = await getPages()
  const includes = import.meta.glob('../../../_includes/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  }) as Record<string, string>

  const findings: string[] = []
  const collect = (slug: string, source: string) => {
    for (const issue of findShimWhitespace(source)) {
      findings.push(
        `${slug}:${issue.line}: [${issue.reason}] ${JSON.stringify(issue.text)}`
      )
    }
  }

  for (const page of Object.values(pages)) collect(page.slug, page.markdown)
  for (const [filePath, source] of Object.entries(includes)) {
    collect(filePath, source)
  }

  expect(findings).toEqual([])
})
