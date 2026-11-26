import { loadBaseline, saveBaseline, updatingBaseline } from './baseline'
import {
  collectEnumerationFindings,
  findEnumerationIssues
} from './enumeration'

const find = (source: string) => findEnumerationIssues(source, 'items')

describe('findEnumerationIssues(items)', () => {
  const list = (items: string[], suffix = '<!-- {: .-enum} -->') =>
    ['### A', '', ...items.map((item) => `- ${item}`), '', suffix].join('\n')

  test('allows a valid opt-in list', () => {
    expect(find(list(['one', 'two', 'three']))).toEqual([])
  })

  test('flags a short list that has not opted in', () => {
    expect(find(list(['rust', 'js'], '')).map((f) => f.reason)).toEqual([
      'short list should use .-enum'
    ])
  })

  test('ignores lists whose items are links', () => {
    expect(find(list(['[Alpha](/a)', '[Beta](/b)'], ''))).toEqual([])
  })

  it.each([
    ['one item', ['one'], ['enumeration needs two or more items']],
    [
      'a nine-word item',
      ['a b c d e f g h i', 'two'],
      ['enumeration item has 9 words']
    ],
    [
      'a full stop',
      ['Done.', 'two'],
      ['enumeration item ends with punctuation']
    ],
    ['a bang', ['Done!', 'two'], ['enumeration item ends with punctuation']],
    [
      'a question',
      ['Done?', 'two'],
      ['enumeration item ends with punctuation']
    ],
    [
      'a link',
      ['[Alpha](/a)', 'two'],
      ['enumeration item contains a link; use a table']
    ]
  ])('flags %s', (_label, items, reasons) => {
    expect(find(list(items)).map((f) => f.reason)).toEqual(reasons)
  })

  test('flags a nested list', () => {
    const source = [
      '### A',
      '',
      '- one',
      '  - nested',
      '- two',
      '',
      '<!-- {: .-enum} -->'
    ].join('\n')
    expect(find(source)).toEqual([
      {
        line: 3,
        heading: 'A',
        reason: 'enumeration item must hold one paragraph'
      }
    ])
  })

  test('flags a second paragraph', () => {
    const source = [
      '### A',
      '',
      '- one',
      '',
      '  more',
      '- two',
      '',
      '<!-- {: .-enum} -->'
    ].join('\n')
    expect(find(source)).toEqual([
      {
        line: 3,
        heading: 'A',
        reason: 'enumeration item must hold one paragraph'
      }
    ])
  })
})

test('lists/enumeration-items: short lists opt into the grid', async () => {
  const findings = await collectEnumerationFindings('items')
  if (updatingBaseline)
    return saveBaseline('lists-enumeration-items.json', findings)

  const allowed = new Set(
    loadBaseline<string[]>('lists-enumeration-items.json', [])
  )
  expect(findings.filter((finding) => !allowed.has(finding))).toEqual([])
})
