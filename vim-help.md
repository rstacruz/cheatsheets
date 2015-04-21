---
title: Vim helpfiles
---

```
:help help-writing
```
{:.light}

### Creating a document
Use `help` to preview it, and `text` to edit it.

```nohighlight
:e doc/potion.txt
:set ft=help
:set ft=text
```

### Tags

 * Tags are created with asterisks, eg, `*potion-usage*`
 * Links to tags are `|potion-usage|`
 * Press `^]` to jump to a tag

## Syntax reference

| `*tags*`          | Tags                              |
| `INTRO *tag*`     | Section header                    |
| `|link-to-tags|`  | Links to tags (eg, `|:command|`)  |
| `'vimoption'`     | Vim option (eg, `'textwidth'`)    |
| `{code-text}`     | Code text (eg, `{Visual}gf`)      |
| `[code-text]`     | Code text (eg, `[xyz]`)           |
| `<code-text>`     | Code text (eg, `<PageDown>`)      |
| `` `command` ``   | Code text (eg, `cmd`)             |
| `CTRL-X`          | Code text                         |
| `www.url.com`     | Web URL                           |
| `Column heading~` | Highlighting                      |
| `=====`           | Separator                         |
| `-----`           | Separator                         |
{:.greycode}

### Code blocks
Surround with `>` and `<` characters

```
Example: >
 xyz
<
```

### File header
It's customary to start a file with a tag of the filename, plus a description

```
*potion.txt*  functionality for the potion programming language
```

### Heading
Starts with `ALL CAPS`, ends with `*a-tag*`

```
==============================================================================
CONTENTS                                                     *potion-contents*
```

### Notes
Using `*Todo` and `*Error` will highlight your notes.

```
	*Todo something to do
	*Error something wrong
```

### Final modeline

```nohighlight
vim:tw=78:ts=8:ft=help:norl:
```

## Conventions

### Table of contents

```nohighlight
|rails-introduction|            Introduction and Feature Summary
|rails-commands|                General Commands
|rails-navigation|              Navigation
```

```nohighlight
    1.Intro...................................|ergonomic|
    2.Note to use..............................|CAPSLOCK|
    3.Insert Mode Remappings............|ergonomicInsert|
```

### Author lines

```nohighlight
Author:  Jack Hackness <captain@time.com>         *xyz-author*
License: Same terms as Vim itself (see |license|)
```

### Command reference


```nohighlight
:Ack[!] [options] {pattern} [{directory}]                               *:Ack*

    Search recursively in {directory} (which defaults to the current
    directory) for the {pattern}.  Behaves just like the |:grep| command, but
    will open the |Quickfix| window for you. If [!] is not given the first
    occurence is jumped to.
```
