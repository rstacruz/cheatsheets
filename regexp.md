---
title: regexp
category: Others
layout: 2017/sheet
weight: -1
authors:
  - github: rizqyhi
  - github: izzergh
  - github: kolapsys
  - github: samtrion
updated: 2020-03-10
description: |
  Basic cheatsheets for regular expression
---

## RegExp
{: .-three-column}

### Character classes

| Pattern       | Description                              |
| ------------- | ---------------------------------------- |
| `.`           | Any character, except newline            |
| `\w`          | Word                                     |
| `\d`          | Digit                                    |
| `\s`          | Whitespace                               |
| `\W`          | Not word                                 |
| `\D`          | Not digit                                |
| `\S`          | Not whitespace                           |
| `[abc]`       | Any of a, b, or c                        |
| `[a-e]`       | Characters between `a` and `e`           |
| `[1-9]`       | Digit between `1` and `9`                |
| `[[:print:]]` | Any printable character including spaces |
| `[^abc]`      | Any character except `a`, `b` or `c`     |

### Anchors

| Pattern | Description             |
| ------- | ----------------------- |
| `\G`    | Start of match          |
| `^`     | Start of string         |
| `$`     | End of string           |
| `\A`    | Start of string         |
| `\Z`    | End of string           |
| `\z`    | Absolute end of string  |
| `\b`    | A word boundry          |
| `\B`    | Non-word boundry        |
| `^abc`  | Start with `abc`        |
| `abc$`  | End with `abc`          |

### Escaped characters

| Pattern    | Description                            |
| ---------- | -------------------------------------- |
| `\. \* \\` | Escape special character used by regex |
| `\t`       | Tab                                    |
| `\n`       | Newline                                |
| `\r`       | Carriage return                        |

### Groups

| Pattern   | Description                    |
| --------- | ------------------------------ |
| `(abc)`   | Capture group                  |
| `(a|b)`   | Match `a` or `b`               |
| `(?:abc)` | Match `abc`, but don't capture |


### Quantifiers

| Pattern  | Description           |
| -------- | --------------------- |
| `a*`     | Match 0 or more       |
| `a+`     | Match 1 or more       |
| `a?`     | Match 0 or 1          |
| `a{5}`   | Match exactly 5       |
| `a{,3}`  | Match up to 3         |
| `a{3,}`  | Match 3 or more       |
| `a{1,3}` | Match between 1 and 3 |

### Lookahead & Lookbehind

| Pattern      | Description                               |
| ---          | ---                                       |
| `a(?=b)`     | Match `a` in `baby` but not in `bay`      |
| `a(?!b)`     | Match `a` in `Stan` but not in `Stab`     |
| ---          | ---                                       |
| `(?<=a)b`    | Match `b` in `crabs` but not in `cribs`   |
| `(?<!a)b`    | Match `b` in `fib` but not in `fab`       |
