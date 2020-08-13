/**
 * Permutates a searcheable item.
 *
 *     permutate({
 *       slug: 'hello-world',
 *       category: 'greetings'
 *     })
 */

export default function permutate(data) {
  let words = []
  if (data.slug) {
    words = words.concat(permutateString(data.slug))
  }
  if (data.category) {
    words = words.concat(permutateString(data.category))
  }
  return words
}

/**
 * Permutates strings.
 *
 * @example
 *     permutateString('hi joe')
 *     => ['h', 'hi', 'j', 'jo', 'joe']
 */

export function permutateString(str) {
  let words = []
  let inputs = splitwords(str)

  inputs.forEach((word) => {
    words = words.concat(permutateWord(word))
  })

  return words
}

/**
 * Permutates a word.
 *
 * @example
 *     permutateWord('hello')
 *     => ['h', 'he', 'hel', 'hell', 'hello']
 */

export function permutateWord(str) {
  let words = []
  const len = str.length
  for (var i = 1; i <= len; ++i) {
    words.push(str.substr(0, i))
  }
  return words
}

/**
 * Helper for splitting to words.
 *
 * @example
 *     splitWords('Hello, world!')
 *     => ['hello', 'world']
 */

export function splitwords(str) {
  const words = str
    .toLowerCase()
    .split(/[ /\-_]/)
    .filter((k) => k && k.length !== 0)

  return words
}
