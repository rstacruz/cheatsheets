import { getInitialRedirectSlug } from './searchLanding'

const cases: Array<[string, string[], string | null]> = [
  ['   ', ['vim'], null],
  ['vim', [], null],
  ['vim', ['vim', 'vscode'], null],
  ['vim', ['vim'], 'vim'],
  [' vim ', ['vim'], 'vim']
]

it.each(cases)('query %j with %j hits returns %j', (query, slugs, expected) => {
  expect(getInitialRedirectSlug(query, slugs)).toBe(expected)
})
