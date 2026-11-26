---
title: Parsimmon
subtitle: Parser combinator library
category: Node.js
last_verified_with: "Parsimmon 1.18.1."
updated: 2026-11-25
tier: t3
intro: |
  Parsimmon builds parsers by composing small atoms and combinators. This sheet covers basic usage, atoms, combinators, formatting, and the API reference.
links:
  - title: Parsimmon API
    url: https://github.com/jneen/parsimmon/blob/master/API.md
  - title: Parsimmon repository
    url: https://github.com/jneen/parsimmon
---

### Basic usage

```js
const P = require('parsimmon')

P.regexp(/[a-z]+/)
  .parse('hello')
//=> { status: true, value: ['hello'] }
```

<!-- {: data-highlight="P.regexp; .parse"} -->

See: [Parsimmon API](https://github.com/jneen/parsimmon/blob/master/API.md)

### Atoms

```js
P.regexp(/[a-z]+/)
P.string('hello')
P.oneOf('abc')             // like P.regexp(/[abc]/)

P.whitespace
P.optWhitespace
P.eof
```

<!-- {: data-highlight="P.string; P.oneOf; P.whitespace; P.eof"} -->

See: [Parsimmon API](https://github.com/jneen/parsimmon/blob/master/API.md)

### Combinators

```js
P.seq(a, b, c)             // sequence of these
P.alt(a, b)                // any of these
P.sepBy(a, P.string(','))  // sequence of `a`, separated by ','
P.sepBy1(a, P.string(',')) // same, at least once

a.or(b)                    // like P.alt(a, b)
a.skip(b)                  // parses `b` but discards it

a.many()
a.times(3)
a.times(1, 4)              // 1 <= x <= 4
a.atMost(10)
a.atLeast(10)
```

<!-- {: data-highlight="P.seq; P.alt; P.sepBy; a.or"} -->

See: [Parsimmon API](https://github.com/jneen/parsimmon/blob/master/API.md)

### Formatting

```js
P.seq(P.number, P.oneOf('+-*/'), P.number)
  .map(([left, oper, right]) => ({ oper, left, right }))
```

<!-- {: data-highlight=".map"} -->

See: [Parsimmon API](https://github.com/jneen/parsimmon/blob/master/API.md)

### Reference

See: [Parsimmon API](https://github.com/jneen/parsimmon/blob/master/API.md)
