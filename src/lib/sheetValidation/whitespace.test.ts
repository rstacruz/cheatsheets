import { collectSheetFindings } from './sheets'
import {
  BLOCK_START,
  HTML_BLOCK,
  LINK_DEFINITION,
  PREV_BLOCK_START,
  scanFences
} from './utils'

// The remark pipeline marked these whitespace shapes so kramdown's output
// could be reproduced (see preserveWhitespace in src/lib/markdown/index.ts).
// Sheets keep them out so that pass can stay deleted.

type WhitespaceIssue = {
  line: number
  text: string
  reason: 'trailing-space' | 'continuation-indent' | 'fence-whitespace'
}

function findShimWhitespace(source: string): WhitespaceIssue[] {
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
  const findings = await collectSheetFindings((source) =>
    findShimWhitespace(source).map(({ line, text, reason }) => ({
      line,
      text: `${JSON.stringify(text)} [${reason}]`
    }))
  )

  expect(findings).toEqual([])
})
