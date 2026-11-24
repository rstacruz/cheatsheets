---
title: Command Line Interface Pages
subtitle: CLI cheatsheet format
category: CLI
updated: 2026-11-24
last_verified_with: "CLI Pages syntax 2.7.0."
keywords:
  - CLI
---

## Pages

### Page layout

```md
# command

> Some command description
> More information: https://some/link/to/url

- Some code description:

`command argument1 argument2`
```

Pages use the `.clip` extension: one `>` summary, then one `-` description per example.

### Summary tags

| Tag | Meaning |
| --- | --- |
| `More information:` | Link to the documentation |
| `See also:` | Comma-separated related commands |
| `Aliases:` | Other names for the command |
| `Help:` | Flags that print help |
| `Version:` | Flags that print the version |
| `Internal:` | Not called directly |
| `Deprecated:` | Marked deprecated |

## Placeholders

### [Primitive placeholders](https://github.com/command-line-interface-pages/syntax/blob/main/markdown-based/type-specific/cli.md#primitive-placeholders)

```md
- Delay in [s]econds:

`sleep {int seconds: 2}s`
```

### [Optional placeholders](https://github.com/command-line-interface-pages/syntax/blob/main/markdown-based/type-specific/cli.md#optional-primitive-placeholders)

```md
- Display a specific image:

`display {file? image: rose.jpg}`
```

### [Repeated placeholders](https://github.com/command-line-interface-pages/syntax/blob/main/markdown-based/type-specific/cli.md#repeated-primitive-placeholders)

```md
- [c]reate an archive of several [f]iles:

`tar -c {/?file archive: target.tar} {/?path+ input}`
```

#### Quantifiers

| Quantifier | Meaning |
| --- | --- |
| `*` | Zero or more arguments |
| `+` | One or more arguments |
| `2..10` | Between two and ten arguments |
| `*!` | Zero or more, no repeats |

## Also see

- [Render](https://github.com/command-line-interface-pages/v2-tooling/tree/main/clip-view)
- [Page repository](https://github.com/command-line-interface-pages/cli-pages)
- [Syntax reference](https://github.com/command-line-interface-pages/syntax/blob/main/markdown-based/base.md)
<!-- {: .-also-see} -->
