import { loadBaseline, saveBaseline, updatingBaseline } from './baseline'
import { collectSheetFindings } from './sheets'
import { SEP_LINE, scanFences } from './utils'

type Finding = { line: number; text: string }

/** A cell that starts with a backticked slash command, optionally with args */
const COMMAND_CELL = /^\s*`\/[a-z][\w-]*(?:\s+[^`]*)?`/i

function cellsOf(row: string) {
  return row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

/** Flags table rows that put a slash command after another column */
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
          COMMAND_CELL.test(cell)
        )
        if (column > 0) {
          found.push({
            line: index + 1,
            text: `command in column ${column + 1}; commands belong in the first column`
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
        text: 'command in column 2; commands belong in the first column'
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

  test('ignores backticked paths in later columns', () => {
    const input = [
      '| Package | Cache |',
      '| --- | --- |',
      '| npm | `/root/.npm` |'
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
