import { formatShortDate } from './dates'

test.each([
  ['2026-11-25', 'Nov 25, 2026'],
  ['2026-01-05', 'Jan 5, 2026'],
  ['2026-12-31T23:00:00Z', 'Dec 31, 2026']
])('formats %s as %s', (input, expected) => {
  expect(formatShortDate(new Date(input))).toEqual(expected)
})
