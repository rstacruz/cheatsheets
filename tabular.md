---
title: Tabular
subtitle: Vim text alignment plugin
logo: { src: /assets/logos/vim.svg }
category: Vim
tier: t3
last_verified_with: "Tabular 1.0.0."
updated: 2026-11-26
weight: -1
intro: |
  Tabular is a Vim script for text alignment.
links:
  - title: Tabular
    url: https://github.com/godlygeek/tabular
---

## Common usage

<!-- {: .-three-column} -->

### Tables

```
:Tab /|
```

#### Result

```
| Fruit  | Color  |
| -----  | -----  |
| Apple  | Red    |
| Banana | Yellow |
| Kiwi   | Green  |
```

See: [Tabular help](https://github.com/godlygeek/tabular/blob/master/doc/Tabular.txt)

### Variables

```
:Tab /=
```

#### Result

```
title = "Hello"
src   = "image.jpg"
width = 640
```

See: [Aligning on `=`](https://github.com/godlygeek/tabular/blob/master/doc/Tabular.txt)

### Colons

```
:Tab /:\zs/l0l1
```

#### Result

```
title:       "Hello world"
description: "This is a description"
src:         "image.jpg"
height:      320
width:       640
```

See: [Aligning colons](https://github.com/godlygeek/tabular/blob/master/doc/Tabular.txt)

## Tab command

<!-- {: .-three-column} -->

### Basic example

```
:Tab /:
```

#### Result

```bash
title : My picture
src   : img.jpg
```

See: [`:Tab` command](https://github.com/godlygeek/tabular/blob/master/doc/Tabular.txt)

### Right align

```
:Tab /:/r0
```

#### Result

```bash
title:My picture
  src:   img.jpg
```

See: [Right alignment](https://github.com/godlygeek/tabular/blob/master/doc/Tabular.txt)

### The \zs atom

```
:Tab /:\zs
```

#### Result

```
title:  My picture
src:    img.jpg
```

The `\zs` atom will exclude the `:` from the search match.

See: [`\zs` atom](https://github.com/godlygeek/tabular/blob/master/doc/Tabular.txt)

### Specifier

```
:Tab /:/r1c1l0
```

#### Result

```bash
title : My picture
  src : img.jpg
```

#### Explanation

- `r1` -- Right align with 1 space
- `c1` -- Center align the comma with 1 space
- `l0` -- Left align with 0 spaces

See: [Specifiers](https://github.com/godlygeek/tabular/blob/master/doc/Tabular.txt)

### Regexp

```
:Tab /^[^,]*\zs,/r0
```

#### Result

```bash
abc,hello
  c,hi there
  a,yo
```

See: [Alignment regexps](https://github.com/godlygeek/tabular/blob/master/doc/Tabular.txt)

### Specifiers

| Specifier | Description |
| --- | --- |
| `r1c1l0` |  multiple specifiers, one per column<br>(the separator counts as a column) |
| --- | --- |
| `lN` | Left-align (with N spaces padding) |
| `rN` | Right-align (with N spaces padding) |
| `cN` | Center-align (with N spaces padding) |
<!-- {: .-headers} -->

See: [Specifiers](https://github.com/godlygeek/tabular/blob/master/doc/Tabular.txt)

## Also see

- [godlygeek/tabular](https://github.com/godlygeek/tabular) _(github.com)_
- [Aligning text with Tabular.vim](http://vimcasts.org/episodes/aligning-text-with-tabular-vim/) _(vimcasts.org)_
