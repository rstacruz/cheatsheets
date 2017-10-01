/* eslint-env jest */
import qs from '../qs'

describe('qs()', () => {
  test('basic', run({
    input: '?preview=1',
    output: { preview: '1' }
  }))

  test('two fragments', run({
    input: '?a=1&b=2',
    output: { a: '1', b: '2' }
  }))

  function run ({ input, output }) {
    return function () {
      const result = qs(input)
      expect(result).toEqual(output)
    }
  }
})
