import type { Properties } from 'hast'
import {
  ATTRIBUTE_COMMENT,
  mergeAttributes,
  parseAttributes
} from '~/lib/markdown/comments'
import { loadBaseline, saveBaseline, updatingBaseline } from './baseline'
import { collectSheetFindings } from './sheets'
import { SEP_LINE, scanFences } from './utils'

type Finding = { line: number; text: string }
type TableKind = 'option' | 'slash' | 'shortcut' | 'none'

const OPTION = /^-{1,2}[a-z]/i
const SLASH = /^\/[a-z]/i
const NAMED_KEY =
  /^(?:[CSM]-)*(?:Tab|Esc(?:ape)?|Enter|Return|Home|End|Page(?:Up|Down)|Backspace|Delete|Arrow(?:Up|Down|Left|Right)|Up|Down|Left|Right|F(?:[1-9]|1[0-2]))\b/i

const SHORTCUT_PATTERNS = [
  /ctrl[-+]/i,
  /[⌘⌥⇧⌃]/,
  /shift\+/i,
  /alt\+/i,
  /prefix\+/i,
  /\bSPC\b/,
  /^\^x/i,
  /^[CSM]-\S/i,
  NAMED_KEY,
  /[←→↑↓]/
]

/** Strip the markup used around key names so hints compare as plain text */
function keyText(cell: string) {
  return cell
    .replace(/`/g, '')
    .replace(/<\/?(?:code|kbd)>/gi, '')
    .replace(/&[a-z#0-9]+;/gi, '')
    .replace(/<([^>]+)>/g, '$1')
    .trim()
}

function cellsOf(row: string) {
  return row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split(/(?<!\\)\|/)
    .map(keyText)
}

/** Classes from every attribute comment directly below the table */
function classesBelow(lines: string[], start: number): string[] {
  const properties: Properties = {}
  let index = start

  const skipBlank = () => {
    while (index < lines.length && lines[index].trim() === '') index++
  }
  skipBlank()
  while (index < lines.length) {
    const attributes = parseAttributes(
      ATTRIBUTE_COMMENT.exec(lines[index].trim())?.[1] ?? ''
    )
    if (!attributes) break
    mergeAttributes(properties, attributes)
    index++
    skipBlank()
  }

  return String(properties.className ?? '')
    .split(/\s+/)
    .filter(Boolean)
}

function matches(keys: string[], pattern: (key: string) => boolean) {
  return keys.length > 0 && keys.filter(pattern).length / keys.length >= 0.8
}

function classify(keys: string[]): TableKind {
  if (matches(keys, (key) => OPTION.test(key))) return 'option'
  if (matches(keys, (key) => SLASH.test(key))) return 'slash'
  if (
    matches(keys, (key) =>
      SHORTCUT_PATTERNS.some((pattern) => pattern.test(key))
    )
  ) {
    return 'shortcut'
  }
  return 'none'
}

/** Flags key tables whose `.-shortcuts` class disagrees with their content */
function findShortcutTableClasses(source: string): Finding[] {
  const lines = source.split('\n')
  const { fenced } = scanFences(lines)
  const found: Finding[] = []

  for (let index = 0; index + 1 < lines.length; index++) {
    if (fenced[index] || fenced[index + 1]) continue
    if (!lines[index].trim().startsWith('|')) continue
    if (!SEP_LINE.test(lines[index + 1].trim())) continue

    let end = index + 2
    while (
      end < lines.length &&
      !fenced[end] &&
      lines[end].trim().startsWith('|')
    ) {
      end++
    }

    const classes = classesBelow(lines, end)
    const styled = classes.some(
      (name) => name === '-shortcuts' || name === '-shortcuts-right'
    )
    const keyOnRight = classes.includes('-shortcuts-right')
    const keys: string[] = []
    for (let row = index + 2; row < end; row++) {
      if (SEP_LINE.test(lines[row].trim())) continue
      const cells = cellsOf(lines[row])
      const key = keyOnRight ? cells.at(-1) : cells[0]
      if (key) keys.push(key)
    }

    const kind = classify(keys)
    if (kind === 'option' || kind === 'slash') {
      if (styled) {
        found.push({
          line: index + 1,
          text: 'remove .-shortcuts from option/slash table'
        })
      }
    } else if (kind === 'shortcut' && !styled) {
      found.push({ line: index + 1, text: 'add .-shortcuts to shortcut table' })
    }

    index = end - 1
  }

  return found
}

describe('tables/shortcut-keys: findShortcutTableClasses()', () => {
  const table = (keys: string[], comment = '') =>
    [
      '| Key | Description |',
      '| --- | --- |',
      ...keys.map((key) => `| ${key} | Action |`),
      '',
      comment
    ].join('\n')

  it.each([
    {
      rows: ['`-a`', '`--all`'],
      text: 'remove .-shortcuts from option/slash table'
    },
    {
      rows: ['`/new`', '`/clear`'],
      text: 'remove .-shortcuts from option/slash table'
    }
  ])('flags a styled option/slash table', ({ rows, text }) => {
    expect(
      findShortcutTableClasses(table(rows, '<!-- {: .-shortcuts} -->'))
    ).toEqual([{ line: 1, text }])
  })

  it.each([
    '`⌘A`',
    '`⇧⌘B`',
    '`ctrl+c`',
    '`F12`',
    '`Tab`',
    '<C-R>',
    '<C-[>',
    '<Tab>'
  ])('flags an unstyled shortcut row %s', (key) => {
    const input = table([key, '`⌘D`'])
    expect(findShortcutTableClasses(input)).toEqual([
      { line: 1, text: 'add .-shortcuts to shortcut table' }
    ])
  })

  it.each(['', '<!-- {: .-shortcuts} -->'])(
    'allows a mixed vim table with one /pattern row (%s)',
    (comment) => {
      const input = table(['`dd`', '`/pattern`', '`p`'], comment)
      expect(findShortcutTableClasses(input)).toEqual([])
    }
  )

  it('reads the last column of a -shortcuts-right table', () => {
    const input = [
      '| Action | Key |',
      '| --- | --- |',
      '| Copy | `⌘C` |',
      '| Paste | `⌘V` |',
      '| --- | --- |',
      '| Save | `⌘S` |',
      '',
      '<!-- {:.-shortcuts-right} -->'
    ].join('\n')
    expect(findShortcutTableClasses(input)).toEqual([])
  })

  it('ignores a description-first table without -shortcuts-right', () => {
    const input = [
      '| Action | Key |',
      '| --- | --- |',
      '| Copy | `⌘C` |',
      '| Paste | `⌘V` |'
    ].join('\n')
    expect(findShortcutTableClasses(input)).toEqual([])
  })

  it('skips extra separator rows in the table body', () => {
    const input = [
      '| Key | Description |',
      '| --- | --- |',
      '| `⌘A` | Action |',
      '| --- | --- |',
      '| `⌘B` | Action |'
    ].join('\n')
    expect(findShortcutTableClasses(input)).toEqual([
      { line: 1, text: 'add .-shortcuts to shortcut table' }
    ])
  })

  it('allows blank lines and multiple comments below the table', () => {
    const input = [
      ...table(['`⌘A`', '`⌘B`']).split('\n').slice(0, -1),
      '',
      '<!-- {: .-headers} -->',
      '',
      '<!-- {: .-shortcuts} -->'
    ].join('\n')
    expect(findShortcutTableClasses(input)).toEqual([])
  })

  it('ignores pipe tables inside fenced code', () => {
    const input = [
      '```md',
      ...table(['`-a`', '`--all`'], '<!-- {: .-shortcuts} -->').split('\n'),
      '```'
    ].join('\n')
    expect(findShortcutTableClasses(input)).toEqual([])
  })
})

test('tables/shortcut-keys: every key table carries the matching class', async () => {
  const findings = await collectSheetFindings(findShortcutTableClasses)
  if (updatingBaseline)
    return saveBaseline('tables-shortcut-keys.json', findings)

  const allowed = new Set(
    loadBaseline<string[]>('tables-shortcut-keys.json', [])
  )
  expect(findings.filter((finding) => !allowed.has(finding))).toEqual([])
})
