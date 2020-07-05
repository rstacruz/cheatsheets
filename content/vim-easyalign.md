---
title: Vim Easyalign
html_class: key-codes
hljs_languages: [vim]
category: Vim
---

## Command mode

### Align by delimiters

```vim
:EasyAlign :       " preset characters (\=:.,&#|)
:EasyAlign |
:EasyAlign \       " \ means space
```

### Align by regexp

```vim
:EasyAlign /[:;]+/
```

### Specify which

```vim
:EasyAlign |       " align by 1st `|`
:EasyAlign 3 |     " align by 3rd `|`
:EasyAlign * |     " align by all `|`s
```

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

### Spaces are optional

```vim
:EasyAlign * /[;:]+/ l3
:EasyAlign*/[;:]+/l3
```

## Examples

### `:EasyAlign = dr` (delimiter_align right)

```
apple    = 1
banana  += apple
cake   ||= banana
```

### `:EasyAlign :` (for json or yaml)

```
url:      jdbc:mysql://localhost/test
database: test
```

### `:EasyAlign *|` (markdown tables)

```nohighlight
| `<Enter>` | right align                   |
| `1`       | on 1st occurrence             |
| `2`       | on 2nd occurrence (and so on) |
```

## Interactive mode

| `{Visual}` `⏎` | activate for selection |
| `ga` `{motion}` | activate for motion/text object |
{:.greycode}

Then press options (if available), then a delimiter.

### Interactive mode options

| `⏎` | Set `alignment` |
| `<ctrl-l>` `4 ⏎` | Set `left_margin` (to the left of the delimiter) |
| `<ctrl-r>` `4 ⏎` | Set `right_margin` |
| `↓` | no margin |
{:.greycode}

### Example

- `gaip` `<ctrl-l>` `8⏎` `=` - puts 8 spaces before the equal sign

## Also see

- [vim-easy-align](https://github.com/junegunn/vim-easy-align)
- [Examples](https://github.com/junegunn/vim-easy-align#examples)
- [Alignment options](https://github.com/junegunn/vim-easy-align#alignment-options)
