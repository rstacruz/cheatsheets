import { rankGroupOrder } from './SearchResults.core'

it('orders groups by their best result, not their browse position', () => {
  const groups = [['react'], ['next'], ['react-native']]

  expect(
    rankGroupOrder(groups, ['react-native', 'next', 'react'], true)
  ).toEqual([2, 1, 0])
})

it('keeps browse order when there is no query', () => {
  const groups = [['react'], ['next'], ['react-native']]

  expect(rankGroupOrder(groups, [], false)).toEqual([0, 1, 2])
})
