---
title: Tabular
category: Vim
updated: 2017-10-11
weight: -1
intro: |
  [Tabular](https://github.com/godlygeek/tabular) is a Vim script for text alignment.
---

## Common usage
{: .-three-column}

### Tables

```
:Tab /|
```
{: .-setup}

```
| Fruit  | Color  |
| -----  | -----  |
| Apple  | Red    |
| Banana | Yellow |
| Kiwi   | Green  |
```

### Variables

```
:Tab /=
```
{: .-setup}

```
title = "Hello"
src   = "image.jpg"
width = 640
```

### Colons

```
:Tab /:\zs/l0l1
```
{: .-setup}

```
title:       "Hello world"
description: "This is a description"
src:         "image.jpg"
height:      320
width:       640
```

## Tab command
{: .-three-column}

### Basic example

```
:Tab /:
```
{: .-setup}

```bash
title : My picture
src   : img.jpg
```

### Right align

```
:Tab /:/r0
```
{: .-setup}

```bash
title:My picture
  src:   img.jpg
```

### The \zs atom

```
:Tab /:\zs
```
{: .-setup}

```
title:  My picture
src:    img.jpg
```

The `\zs` atom will exclude the `:` from the search match.

### Specifier

```
:Tab /:/r1c1l0
```
{: .-setup}

```bash
title : My picture
  src : img.jpg
```

#### Explanation

- `r1` -- Right align with 1 space
- `c1` -- Center align the comma with 1 space
- `l0` -- Left align with 0 spaces

### Regexp

```
:Tab /^[^,]*\zs,/r0
```
{: .-setup}

```bash
abc,hello
  c,hi there
  a,yo
```

### Specifiers

| Specifier | Description |
| --- | --- |
| `r1c1l0` |  multiple specifiers, one per column<br>(the separator counts as a column) |
| --- | --- |
| `lN` | Left-align (with N spaces padding) |
| `rN` | Right-align (with N spaces padding) |
| `cN` | Center-align (with N spaces padding) |

## Also see

- [godlygeek/tabular](https://github.com/godlygeek/tabular) _(github.com)_
- [Aligning text with Tabular.vim](http://vimcasts.org/episodes/aligning-text-with-tabular-vim/) _(vimcasts.org)_
