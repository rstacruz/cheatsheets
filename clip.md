---
title: Command Line Interface Pages
category: CLI
layout: 2023/sheet
tags: [Featured]
updated: 2023-02-23
keywords:
  - CLI
---

### Page layout

```md
# command

> Some command description
> More information: https://some/link/to/url

- Some code description:

`command argument1 argument2`
```

### [Primitive placeholders](https://github.com/emilyseville7cfg-better-tldr/syntax/blob/main/syntax.md#page-examples)

```md
- Delay in [s]econds:

`sleep {int seconds: 2}s`
```

### [Primitive repeated placeholders](https://github.com/emilyseville7cfg-better-tldr/syntax/blob/main/syntax.md#page-examples)

```md
- [c]reate an archive and write it to a [f]ile:

`tar {option mode: --create, -c} {option: --file, -f} {/?file archive: target.tar} {/?path+ input}`
```

### Also see
{: .-one-column}

* [Render](https://github.com/emilyseville7cfg-better-tldr/prototypes/tree/main/clip-view)
* [Page's repository](https://github.com/emilyseville7cfg-better-tldr/cli-pages)
* [Syntax](https://github.com/emilyseville7cfg-better-tldr/syntax/blob/main/syntax.md)
