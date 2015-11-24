---
title: Vim helpfiles
category: Vim
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

### Example

```nohighlight
*ack.txt*   Plugin that integrates ack with Vim

==============================================================================
USAGE INSTRUCTIONS                                                 *ack-usage*

:Ack[!] {pattern}                                                       *:Ack*

    Search recursively for {pattern}. See |:AckAdd|.
    Also see http://beyondgrep.com for more information.
```

## Syntax reference

| Code                 | Description                         | Example |
| -----                | -----                               | -----:  |
| `*tags*`             | Tags                                |
| `|link-to-tags|`     | Links to tags | `|:command|`    |
| `'vimoption'`        | Vim option | `'textwidth'`      |
| -----                | -----                               |
| `{code-text}`        | Code text | `{Visual}gf`        |
| `<code-text>`        | Code text | `<PageDown>`        |
| `` `code-text` ``    | Code text | `` `set fo=want` `` |
| `CTRL-X`             | Code text                           |
| -----                | -----                               |
| `INTRODUCTION *tag*` | Section header                      |
| `Column heading~`    | Highlighting                        |
| `www.url.com`        | Web URL                             |
| -----                | -----                               |
| `=====`              | Separator                           |
| `-----`              | Separator                           |
{:.greycode}

### Tags

 * Tags are created with asterisks, eg, `*potion-usage*`
 * Links to tags are `|potion-usage|`
 * Press `^]` to jump to a tag

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
