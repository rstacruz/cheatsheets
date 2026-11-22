import { loadBaseline, saveBaseline, updatingBaseline } from './baseline'
import {
  collectEnumerationFindings,
  findEnumerationIssues
} from './enumeration'

const find = (source: string) => findEnumerationIssues(source, 'width')

describe('findEnumerationIssues(width)', () => {
  const list = (items: string[], suffix = '<!-- {: .-enum} -->') =>
    ['### A', '', ...items.map((item) => `- ${item}`), '', suffix].join('\n')

  it.each([
    ['short values', ['one', 'two'], '<!-- {: .-enum} -->', []],
    ['13 characters', ['abcdefghijklm', 'two'], '<!-- {: .-enum} -->', []],
    [
      '14 characters',
      ['abcdefghijklmn', 'two'],
      '<!-- {: .-enum} -->',
      ['enumeration item has 14 characters (max 13)']
    ],
    [
      'wide with a long value',
      ['article:tag', 'article:author'],
      '<!-- {: .-enum-wide} -->',
      []
    ],
    [
      'wide with only short values',
      ['short', 'value'],
      '<!-- {: .-enum-wide} -->',
      ['wide enumeration needs an item of 14+ characters']
    ],
    ['unopted long list', ['abcdefghijklmn', 'two'], '', []]
  ])('checks %s', (_label, items, suffix, reasons) => {
    expect(find(list(items, suffix)).map((f) => f.reason)).toEqual(reasons)
  })
})

test('lists/enumeration-width: the class matches item length', async () => {
  const findings = await collectEnumerationFindings('width')
  if (updatingBaseline)
    return saveBaseline('lists-enumeration-width.json', findings)

  const allowed = new Set(
    loadBaseline<string[]>('lists-enumeration-width.json', [])
  )
  expect(findings.filter((finding) => !allowed.has(finding))).toEqual([])
})
