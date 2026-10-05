---
title: Parsimmon
category: JavaScript libraries
---

### Basic usage
```js
const P = require('parsimmon')

P.regexp(/[a-z]+/)
.parse('hello')
//=> { status: true, value: ['hello'] }
```

### Atoms

```js
P.regexp(/[a-z]+/)
P.string('hello')
P.oneOf('abc')             // like P.regexp(/[abc]/)

P.whitespace
P.optWhitespace
P.eof
```

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

### Formatting

```js
P.seq(P.number, P.oneOf('+-*/'), P.number)
.map(([left, oper, right]) => ({ oper, left, right }))
```

### Reference

- <https://github.com/jneen/parsimmon/blob/master/API.md>
