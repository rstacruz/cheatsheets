---
title: Tabular
category: Vim
layout: 2017/sheet
updated: 2017-10-11
weight: -1
intro: |
  [Tabular](https://github.com/godlygeek/tabular) is a Vim script for text alignment.
---

## Examples
{: .-three-column}

### Basic example

```
:Tab /,
```
{: .-setup}

```bash
hello , there
hi    , you
```

### Right align

```
:Tab /,/r0
```
{: .-setup}

```bash
hello,there
   hi,  you
```

### Specifier

```
:Tab /,/r1c1l0
```
{: .-setup}

```bash
hello , etc
   hi , etc
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
