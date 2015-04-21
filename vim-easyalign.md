---
title: Vim Easyalign
html_class: key-codes
---

### [vim-easy-align](https://github.com/junegunn/vim-easy-align)
This plugin allows you to align things.

| `{Visual}` `⏎`  | activate for selection          |
| `ga` `{motion}` | activate for motion/text object |
{:.greycode}

After activating, press a delimiter key. Available delimeters are:<br>
`<Space>` `=` `:` `.` `,` `&` `#` `|`

## Example

```
a = foo
pi = 3.1415
hello = 'world'
```

Press `vip ⏎` or `gaip` to activate via *ip* (inner paragraph). Then press `=`

```
a     = foo
pi    = 3.1415
hello = 'world'
```

## Useful delimiters

### Variable assignments
`gaip` `=` will align 1st occurence of equal sign

```js
var one   = 1;
var three = 3;
```

### JSON or YAML
`gaip` `:` will align 1st occurence of colon

```yaml
url:      jdbc:mysql://localhost/test
database: test
```

### Markdown tables
`*|` Align all table delimeters

```nohighlight
| `<Enter>` | right align                  |
| `1`       | on 1st occurence             |
| `2`       | on 2nd occurence (and so on) |
```

### Ruby or Python comments
`#` Align comments

```
let x = true     # one
let y = false    # two
let z = "abcdef" # three
```

## Modifiers

| `1`  | on 1st occurence (default)   |
| `2`  | on 2nd occurence             |
| `3`  | on 3rd occurence (and so on) |
| `*`  | on all occurences            |
| `-`  | on last occurence            |
| `-2` | on 2nd to the last occurence |

You may type modifiers before a delimiter. Example: `gaip` `*|` will align all `|` delimiters.

## Alignment

| `⏎`  | change alignment align |

**Example:** `gaip` `⏎` `=` right aligns whatever is before the first delimeter (equal sign).

```
express = require('express')
  xtend = require('xtend')
    pip = require('pip')
```

**Example:** `gaip` `⏎` `2|` right aligns the 1st Markdown table column (ie, before the 2nd delimiter).

```
|     apple | $ 20 |
|    orange | $ 42 |
| pineapple | $ 11 |
```

## Margins

| `<ctrl-l>` `4 ⏎` | Set `left_margin` (to the left of the delimeter) |
| `<ctrl-r>` `4 ⏎` | Set `right_margin`                               |
| `↓`              | no margin                                        |

**Example**: `gaip` `<ctrl-l>` `8⏎` `=` puts 8 spaces before the equal sign

```
var x         = "one"
var xyz       = "two"
```

## See also

* [Examples](https://github.com/junegunn/vim-easy-align#examples)
* [Alignment options](https://github.com/junegunn/vim-easy-align#alignment-options)
