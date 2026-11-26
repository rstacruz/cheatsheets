---
title: Vim helpfiles
subtitle: Help file authoring reference
category: Vim
intro: |
  Vim helpfiles document plugins and features in `:help`.
links:
  - title: Writing Vim help files
    url: https://vimhelp.org/helphelp.txt.html#help-writing
  - title: Help notation
    url: https://vimhelp.org/helphelp.txt.html#help-notation
  - title: Tags
    url: https://vimhelp.org/tagsrch.txt.html#tag
updated: 2026-11-26
last_verified_with: "Vim 9.2."
tier: t3
---

## Writing help files

<!-- {: .-left-reference} -->

### Creating a document

```nohighlight
:e doc/potion.txt
:set ft=help
:set ft=text
```
<!-- {: data-highlight="ft=help; ft=text"} -->

Use `ft=help` to preview it, and `ft=text` to edit it.

See: [Writing help files](https://vimhelp.org/helphelp.txt.html#help-writing)

### Example

```nohighlight
*ack.txt*   Plugin that integrates ack with Vim

======================================================================
USAGE INSTRUCTIONS                                         *ack-usage*

:Ack[!] {pattern}                                               *:Ack*

    Search recursively for {pattern}. See |:AckAdd|.
    Also see http://beyondgrep.com for more information.

vim:tw=78:ts=8:ft=help:norl:
```

This is a cheatsheet for writing Vim help files.

See: [Writing help files](https://vimhelp.org/helphelp.txt.html#help-writing)

## Syntax

### Reference

| Code                 | Description    | Example             |
| -----                | -----          | -----               |
| *Inline items*                                              |
| -----                | -----          | -----               |
| `*tags*`             | Tags           |                     |
| `|link-to-tags|`     | Links to tags  | `|:command|`        |
| `'vimoption'`        | Vim option     | `'textwidth'`       |
| -----                | -----          | -----               |
| `{code-text}`        | Code text      | `{Visual}gf`        |
| `<code-text>`        | Code text      | `<PageDown>`        |
| `` `code-text` ``    | Code text      | `` `set fo=want` `` |
| `CTRL-X`             | Code text      |                     |
| -----                | -----          | -----               |
| *Block items*                                               |
| -----                | -----          | -----               |
| `INTRODUCTION *tag*` | Section header |                     |
| `Column heading~`    | Highlighting   |                     |
| `www.url.com`        | Web URL        |                     |
| -----                | -----          | -----               |
| `=====`              | Separator      |                     |
| `-----`              | Separator      |                     |

See: [Help notation](https://vimhelp.org/helphelp.txt.html#help-notation)

### Tags

 * Tags are created with asterisks, eg, `*potion-usage*`
 * Links to tags are `|potion-usage|`
 * Press `^]` to jump to a tag

See: [Tags](https://vimhelp.org/tagsrch.txt.html#tag)

### Code blocks

```
Example: >
 xyz
<
```

Surround with `>` and `<` characters

See: [Writing help files](https://vimhelp.org/helphelp.txt.html#help-writing)

### File header

```
*potion.txt*  functionality for the potion programming language
```

It's customary to start a file with a tag of the filename, plus a description.

See: [Writing help files](https://vimhelp.org/helphelp.txt.html#help-writing)

### Heading

```
======================================================================
CONTENTS                                             *potion-contents*
```

Starts with `ALL CAPS`, ends with `*a-tag*`

See: [Writing help files](https://vimhelp.org/helphelp.txt.html#help-writing)

### Notes

```
	*Todo something to do
	*Error something wrong
```
<!-- {: data-highlight="*Todo; *Error"} -->

Using `*Todo` and `*Error` will highlight your notes.

See: [Writing help files](https://vimhelp.org/helphelp.txt.html#help-writing)

### Final modeline

```nohighlight
vim:tw=78:ts=8:ft=help:norl:
```
<!-- {: data-highlight="vim:tw=78:ts=8:ft=help:norl:"} -->

See: [Modeline](https://vimhelp.org/options.txt.html#modeline)

## Conventions

### Table of contents

#### Tag links

```nohighlight
|rails-introduction|            Introduction and Feature Summary
|rails-commands|                General Commands
|rails-navigation|              Navigation
```

#### Numbered entries

```nohighlight
    1.Intro...................................|ergonomic|
    2.Note to use..............................|CAPSLOCK|
    3.Insert Mode Remappings............|ergonomicInsert|
```

See: [Writing help files](https://vimhelp.org/helphelp.txt.html#help-writing)

### Author lines

```nohighlight
Author:  Jack Hackness <captain@time.com>         *xyz-author*
License: Same terms as Vim itself (see |license|)
```

See: [Writing help files](https://vimhelp.org/helphelp.txt.html#help-writing)
