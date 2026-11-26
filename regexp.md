---
title: regexp
subtitle: Regular expression syntax
category: Others
intro: |
  A reference for regular expression syntax: character classes, anchors, groups, quantifiers, and lookarounds in JavaScript and PCRE2.
links:
  - title: MDN regular expressions guide
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
  - title: MDN regular expression syntax reference
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions
  - title: PCRE2 syntax reference
    url: https://www.pcre2.org/doc/pcre2syntax/
tier: t3
weight: -1
authors:
  - github: rizqyhi
  - github: izzergh
  - github: kolapsys
  - github: samtrion
updated: 2026-11-26
last_verified_with: "Node 26.13.1, PCRE2 10.49."
description: |
  Regular expression syntax reference with patterns, anchors, groups, and flags.
---

## RegExp

<!-- {: .-three-column} -->

### Character classes

| Pattern       | Description                              |
| ------------- | ---------------------------------------- |
| `.`           | Any character, except newline            |
| `\w`          | Word                                     |
| `\d`          | Digit                                    |
| `\s`          | Whitespace                               |
| ---           | ---                                      |
| `\W`          | Not word                                 |
| `\D`          | Not digit                                |
| `\S`          | Not whitespace                           |
| ---           | ---                                      |
| `[abc]`       | Any of a, b, or c                        |
| `[a-e]`       | Characters between `a` and `e`           |
| `[1-9]`       | Digit between `1` and `9`                |
| `[[:print:]]` | Any printable character including spaces |
| `[^abc]`      | Any character except `a`, `b` or `c`     |

See: [Character class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class), [Character class escape](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class_escape)

### Anchors

| Pattern | Description            |
| ------- | ---------------------- |
| `\G`    | Start of match (PCRE2) |
| `^`     | Start of string \*     |
| `$`     | End of string \*       |
| `\A`    | Start of string        |
| `\Z`    | End of string          |
| `\z`    | Absolute end of string |
| ---     | ---                    |
| `\b`    | A word boundary        |
| `\B`    | Non-word boundary      |
| ---     | ---                    |
| `^abc`  | Start with `abc`       |
| `abc$`  | End with `abc`         |

For multiline patterns (`m` flag), `^` and `$` will act as start and end of line.

See: [Input boundary assertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion), [Buffer boundary assertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Buffer_boundary_assertion)

### Escaped characters

| Pattern    | Description                            |
| ---------- | -------------------------------------- |
| `\. \* \\` | Escape special character used by regex |
| `\t`       | Tab                                    |
| `\n`       | Newline                                |
| `\r`       | Carriage return                        |

See: [Character escape](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escape)

### Groups

| Pattern   | Description                                              |
| --------- | -------------------------------------------------------- |
| `(abc)`   | Capture group                                            |
| `(a|b)`   | Match `a` or `b`                                         |
| `(?:abc)` | Match `abc`, but don't capture                           |
| `\1`      | Substituted with text matched of the 1st capturing group |

See: [Capturing group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Capturing_group), [Non-capturing group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Non-capturing_group), [Disjunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction), [Backreference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference)


### Quantifiers

| Pattern  | Description           |
| -------- | --------------------- |
| `a*`     | Match 0 or more       |
| `a+`     | Match 1 or more       |
| `a?`     | Match 0 or 1          |
| `a{5}`   | Match exactly 5       |
| `a{0,3}` | Match up to 3         |
| `a{3,}`  | Match 3 or more       |
| `a{1,3}` | Match between 1 and 3 |

See: [Quantifier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier)

### Lookahead & Lookbehind

| Pattern      | Description                               |
| ---          | ---                                       |
| `a(?=b)`     | Match `a` in `baby` but not in `bay`      |
| `a(?!b)`     | Match `a` in `Stan` but not in `Stab`     |
| ---          | ---                                       |
| `(?<=a)b`    | Match `b` in `crabs` but not in `cribs`   |
| `(?<!a)b`    | Match `b` in `fib` but not in `fab`       |

See: [Lookahead assertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion), [Lookbehind assertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion)
