import { mapGlobToPages } from './page'
import {
  WEEKLY_SNIPPET_COUNT,
  isoWeekKey,
  selectWeeklySnippets
} from './weeklySnippets'

const pages = Object.values(
  mapGlobToPages(
    Object.fromEntries(
      Array.from({ length: 12 }, (_, index) => [
        `snippet-${index}`,
        [
          '---',
          `title: Snippet ${index}`,
          'category: Git',
          'layout: snippet',
          '---',
          'x'
        ].join('\n')
      ])
    )
  )
)

test.each([
  ['2026-11-27', '2026-W48'],
  ['2026-11-29T23:59:59Z', '2026-W48'],
  ['2026-11-30', '2026-W49'],
  ['2026-12-31', '2026-W53'],
  ['2027-01-01', '2026-W53'],
  ['2027-01-04', '2027-W01'],
  ['2025-12-29', '2026-W01']
])('isoWeekKey(%s) is %s', (input, expected) => {
  expect(isoWeekKey(new Date(input))).toEqual(expected)
})

test('the same week always picks the same sheets', () => {
  const monday = selectWeeklySnippets(pages, new Date('2026-11-23T00:00:00Z'))
  const sunday = selectWeeklySnippets(pages, new Date('2026-11-29T23:59:59Z'))

  expect(sunday).toEqual(monday)
  expect(monday).toHaveLength(WEEKLY_SNIPPET_COUNT)
})

test('a new week picks a different set', () => {
  const thisWeek = selectWeeklySnippets(pages, new Date('2026-11-23'))
  const nextWeek = selectWeeklySnippets(pages, new Date('2026-11-30'))

  expect(nextWeek.map((page) => page.slug)).not.toEqual(
    thisWeek.map((page) => page.slug)
  )
})

test('selection is unique and leaves the input untouched', () => {
  const before = pages.map((page) => page.slug)
  const selected = selectWeeklySnippets(pages, new Date('2026-11-27'), 4)

  expect(selected).toHaveLength(4)
  expect(new Set(selected.map((page) => page.slug)).size).toBe(4)
  expect(pages.map((page) => page.slug)).toEqual(before)
})
