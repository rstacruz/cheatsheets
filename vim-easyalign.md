---
title: Vim Easyalign
subtitle: Interactive alignment plugin
html_class: key-codes
hljs_languages: [vim]
category: Vim
intro: |
  The vim-easy-align plugin aligns text interactively by delimiters or regular expressions.
links:
  - title: vim-easy-align repository
    url: https://github.com/junegunn/vim-easy-align
  - title: Quick start guide
    url: https://github.com/junegunn/vim-easy-align#quick-start-guide
  - title: List of options
    url: https://github.com/junegunn/vim-easy-align#list-of-options
tier: t3
last_verified_with: "vim-easy-align 2.10.0, Vim 9.2."
updated: 2026-11-26
---

## Command mode

### Align by delimiters

```vim
:EasyAlign :       " preset characters (\=:.,&#|)
:EasyAlign |
:EasyAlign \       " \ means space
```

See: [Using predefined alignment rules](https://github.com/junegunn/vim-easy-align#using-predefined-alignment-rules)

### Align by regexp

```vim
:EasyAlign /[:;]+/
```

See: [Using regular expression](https://github.com/junegunn/vim-easy-align#using-regular-expression)

### Specify which

```vim
:EasyAlign |       " align by 1st `|`
:EasyAlign 3 |     " align by 3rd `|`
:EasyAlign * |     " align by all `|`s
```

See: [Alignments over multiple occurrences](https://github.com/junegunn/vim-easy-align#alignments-over-multiple-occurrences-of-delimiters)

### Add options

```vim
:EasyAlign * | l4r1

  l4     " lN - left_margin
  r1     " rN - right_margin
         "    spaces to the left/right of `|`
  ar     " a[lrc] - align
         "    align left/right/center
  dr     " d[lrc] - delimiter_align
         "    alignment of the delimiter itself
```

See: [List of options](https://github.com/junegunn/vim-easy-align#list-of-options)

### Spaces are optional

```vim
:EasyAlign * /[;:]+/ l3
:EasyAlign*/[;:]+/l3
```

See: [EasyAlign command](https://github.com/junegunn/vim-easy-align#easyalign-command)

## Examples

### `:EasyAlign = dr` (delimiter_align right)

```
apple    = 1
banana  += apple
cake   ||= banana
```

See: [Using predefined alignment rules](https://github.com/junegunn/vim-easy-align#using-predefined-alignment-rules)

### `:EasyAlign :` (for json or yaml)

```
url:      jdbc:mysql://localhost/test
database: test
```

See: [Using predefined alignment rules](https://github.com/junegunn/vim-easy-align#using-predefined-alignment-rules)

### `:EasyAlign *|` (markdown tables)

```nohighlight
| `<Enter>` | right align                   |
| `1`       | on 1st occurrence             |
| `2`       | on 2nd occurrence (and so on) |
```

See: [Aligning table cells](https://github.com/junegunn/vim-easy-align#aligning-table-cells)

## Interactive mode

### Activation

| Shortcut | Description |
| --- | --- |
| `{Visual}` `⏎` | activate for selection |
| `ga` `{motion}` | activate for motion/text object |

<!-- {: .-shortcuts} -->

Then press options (if available), then a delimiter.

See: [Quick start guide](https://github.com/junegunn/vim-easy-align#quick-start-guide)

### Interactive mode options

| Shortcut | Description |
| --- | --- |
| `⏎` | Set `alignment` |
| `<ctrl-l>` `4 ⏎` | Set `left_margin` (to the left of the delimiter) |
| `<ctrl-r>` `4 ⏎` | Set `right_margin` |
| `↓` | no margin |

<!-- {: .-shortcuts} -->

See: [Alignment options in interactive mode](https://github.com/junegunn/vim-easy-align#alignment-options-in-interactive-mode)

### Example

- `gaip` `<ctrl-l>` `8⏎` `=` - puts 8 spaces before the equal sign

See: [Examples using predefined rules](https://github.com/junegunn/vim-easy-align#examples-using-predefined-rules)

## Also see

- [vim-easy-align](https://github.com/junegunn/vim-easy-align)
- [Examples](https://github.com/junegunn/vim-easy-align#examples-using-predefined-rules)
- [List of options](https://github.com/junegunn/vim-easy-align#list-of-options)
