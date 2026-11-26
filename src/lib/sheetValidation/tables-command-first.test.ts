import { loadBaseline, saveBaseline, updatingBaseline } from './baseline'
import { collectSheetFindings } from './sheets'
import { SEP_LINE, scanFences } from './utils'

type Finding = { line: number; text: string }

/** A cell made only of backticked code tokens, optionally comma-separated */
const CODE_CELL = /^\s*`[^`]+`(?:\s*,\s*`[^`]+`)*\s*$/

function cellsOf(row: string) {
  return row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

/** Flags table rows that put a code cell after another column */
function findLateCommandCells(source: string): Finding[] {
  const lines = source.split('\n')
  const { fenced } = scanFences(lines)
  const found: Finding[] = []
  let index = 0

  while (index < lines.length) {
    if (
      fenced[index] ||
      !lines[index].trimStart().startsWith('|') ||
      index + 1 >= lines.length ||
      !SEP_LINE.test(lines[index + 1])
    ) {
      index++
      continue
    }

    index += 2
    while (
      index < lines.length &&
      !fenced[index] &&
      lines[index].trimStart().startsWith('|')
    ) {
      if (!SEP_LINE.test(lines[index])) {
        const column = cellsOf(lines[index]).findIndex((cell) =>
          CODE_CELL.test(cell)
        )
        if (column > 0) {
          found.push({
            line: index + 1,
            text: `code cell in column ${column + 1}; code belongs in the first column`
          })
        }
      }
      index++
    }
  }

  return found
}

describe('tables/command-first: findLateCommandCells()', () => {
  test('flags a command that sits after the description', () => {
    const input = [
      '| Situation | Command |',
      '| --- | --- |',
      '| Idea is fuzzy, no repo | `/grill-me` |'
    ].join('\n')
    expect(findLateCommandCells(input)).toEqual([
      {
        line: 3,
        text: 'code cell in column 2; code belongs in the first column'
      }
    ])
  })

  test('allows a command in the first column', () => {
    const input = [
      '| Command | Situation |',
      '| --- | --- |',
      '| `/grill-me` | Idea is fuzzy, no repo |'
    ].join('\n')
    expect(findLateCommandCells(input)).toEqual([])
  })

  test('ignores commands mentioned inside prose', () => {
    const input = [
      '| Start | End |',
      '| --- | --- |',
      '| Loose idea | Handed to `/to-spec` |'
    ].join('\n')
    expect(findLateCommandCells(input)).toEqual([])
  })

  test('flags a non-command code cell that sits after the description', () => {
    const input = [
      '| Setting | Value |',
      '| --- | --- |',
      '| Hook type | `command` |'
    ].join('\n')
    expect(findLateCommandCells(input)).toHaveLength(1)
  })

  test('allows a code mention at the start of a description', () => {
    const input = [
      '| Event | Fires when |',
      '| --- | --- |',
      '| `SessionStart` | Session begins or resumes |',
      '| `DirectoryAdded` | `/add-dir` adds a directory |'
    ].join('\n')
    expect(findLateCommandCells(input)).toEqual([])
  })

  test('ignores pipe tables inside fenced code', () => {
    const input = [
      '```md',
      '| Situation | Command |',
      '| --- | --- |',
      '| Idea is fuzzy | `/grill-me` |',
      '```'
    ].join('\n')
    expect(findLateCommandCells(input)).toEqual([])
  })
})

test('tables/command-first: command tables put the command first', async () => {
  const findings = await collectSheetFindings(findLateCommandCells)
  if (updatingBaseline)
    return saveBaseline('tables-command-first.json', findings)

  const allowed = new Set(
    loadBaseline<string[]>('tables-command-first.json', [])
  )
  expect(findings.filter((finding) => !allowed.has(finding))).toEqual([])
})
