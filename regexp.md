---
title: regexp
category: Others
layout: 2017/sheet
weight: -1
authors:
  - github: rizqyhi
updated: 2019-03-24
description: |
  Basic cheatsheets for regular expression
---

##

{: .-three-column}

### Character classes

| Pattern | Description                    |
| ------- | ------------------------------ |
| `.`     | Any character, except newline  |
| `\w`    | Word                           |
| `\d`    | Digit                          |
| `\s`    | Whitespace                     |
| `\W`    | Not word                       |
| `\D`    | Not digit                      |
| `\S`    | Not whitespace                 |
| `[abc]` | Any of a, b, or c              |
| `[a-e]` | Characters between `a` and `e` |
| `[1-9]` | Digit between `1` and `9`      |

### Anchors

| Pattern | Description      |
| ------- | ---------------- |
| `^abc`  | Start with `abc` |
| `abc$`  | End with `abc`   |

### Escaped characters

| Pattern    | Description                            |
| ---------- | -------------------------------------- |
| `\. \* \\` | Escape special character used by regex |
| `\t`       | Tab                                    |
| `\n`       | Newline                                |
| `\r`       | Carriage return                        |

### Groups

| Pattern | Description   |
| ------- | ------------- |
| `(abc)` | Capture group |

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

