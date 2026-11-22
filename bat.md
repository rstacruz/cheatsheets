---
title: bat
subtitle: Cat clone with syntax highlighting
category: Shell
updated: 2026-11-23
last_verified_with: "bat 0.26.1."
tier: t2
fragments:
  - "bat hello.py"
  - "bat -n"
  - "-A"
  - "-l json"
  - "bat -p"
  - "-H 3"
  - "-r 2:4"
  - "--theme=TwoDark"
  - "--style=plain"
  - "BAT_THEME"
  - "--list-themes"
  - "--list-languages"
  - "--paging=never"
  - "--file-name"
  - "bat cache"
  - "-d"
  - "-P"
keywords:
  - cat replacement
  - pager
  - syntax highlighting
  - git diff
intro: |
  [bat](https://github.com/sharkdp/bat) prints files with syntax highlighting, line numbers, and Git change markers. It pages long output and behaves like `cat` when piped.
links:
  - title: bat README
    url: https://github.com/sharkdp/bat#readme
  - title: Customization guide
    url: https://github.com/sharkdp/bat#customization
---

## Print a file
<!-- {: .-three-column} -->

### Show a file
<!-- {: .-prime} -->

```bash
bat hello.py
```

#### Output

```
─────┬──────────────────────────────────
     │ File: hello.py
─────┼──────────────────────────────────
   1 │ def greet(name):
   2 │     message = f"Hello, {name}!"
   3 │     print(message)
   4 │     return message
─────┴──────────────────────────────────
```
<!-- {: .-box-chars} -->

The header, line numbers, and colors appear on a terminal; color is omitted here. Piped output is plain text.

See: [Syntax highlighting](https://github.com/sharkdp/bat#syntax-highlighting)

### Read from a pipe

```bash
printf '{"ok": true}\n' | bat -l json
```

#### Output

```
─────┬──────────────────────────────────
     │ STDIN
─────┼──────────────────────────────────
   1 │ {"ok": true}
─────┴──────────────────────────────────
```
<!-- {: .-box-chars} -->

`bat` labels piped input `STDIN`. `-l` sets the language when there is no filename to infer one from; piping bat's own output drops the decorations.

See: [File concatenation](https://github.com/sharkdp/bat#file-concatenation)

### Print several files

```bash
bat hello.py config.yml
```

Each file gets its own header; the contents are concatenated in order.

See: `bat --help` (FILE)

## Highlighting
<!-- {: .-three-column} -->

### Set the language

```bash
bat -l json config.json
bat --list-languages
bat --file-name hello.py < snippet
```
<!-- {: data-highlight="-l json"} -->

`-l` accepts a language name or file extension. Use `--file-name` with stdin so `bat` can infer the language.

See: [Syntax highlighting](https://github.com/sharkdp/bat#syntax-highlighting)

### Set the theme

```bash
bat --theme=TwoDark hello.py
BAT_THEME=TwoDark bat hello.py
bat --list-themes
```

The theme follows the terminal's light or dark background by default. `BAT_THEME` makes a choice permanent.

See: [Highlighting theme](https://github.com/sharkdp/bat#highlighting-theme)

### Highlight lines

```bash
bat -H 3 hello.py
bat -H 2:4 hello.py
bat -H :3 hello.py
```
<!-- {: data-highlight="-H 2:4"} -->

`-H` draws a background behind the selected lines. It accepts line numbers and ranges such as `N:M`, `:N`, `N:` and `N:+M`.

See: `bat --help` (--highlight-line)

## Display options
<!-- {: .-three-column} -->

### Numbers and plain text

```bash
bat -n hello.py
bat -p hello.py
bat --style=plain hello.py
bat -pp hello.py
```

`-n` shows only line numbers. `-p` is shorthand for `--style=plain`; `-pp` also disables paging.

See: `bat --help` (-n, -p)

### Style components

```bash
bat --style=numbers hello.py
bat --style=numbers,changes,header \
  hello.py
bat --style=default,-grid hello.py
```

#### Components

| Component         | Effect                      |
| ----------------- | --------------------------- |
| `numbers`         | Line numbers                |
| `changes`         | Git change markers          |
| `header-filename` | Filename above the content  |
| `header`          | Alias for `header-filename` |
| `grid`            | Lines around the sidebar    |
| `snip`            | Separator between ranges    |

`--style` replaces the default set. Prefix components with `+` or `-` to adjust it instead.

See: [Output style](https://github.com/sharkdp/bat#output-style)

### Show whitespace

```bash
bat -A config.yml
```
<!-- {: data-highlight="-A config.yml"} -->

#### Output

```
─────┬──────────────────────────────────
     │ File: config.yml
─────┼──────────────────────────────────
   1 │ name:·bat␊
   2 │ langs:·[rust,·python]␊
   3 │ enabled:·true␊
─────┴──────────────────────────────────
```
<!-- {: .-box-chars} -->

`-A` marks spaces, tabs, and line endings. `--tabs 2` sets the displayed tab width.

See: [Show non-printable characters](https://github.com/sharkdp/bat#show-non-printable-characters)

### Handle long lines

```bash
bat --wrap=character hello.py
bat -S hello.py
bat --terminal-width 80 hello.py
```
<!-- {: data-highlight="--wrap=character"} -->

`--wrap=character` wraps long lines; `-S` chops them. `--terminal-width` overrides the detected width.

See: `bat --help` (--wrap, -S, --terminal-width)

## Output views

### Print a range

```bash
bat -r 2:4 hello.py
```
<!-- {: data-highlight="-r 2:4"} -->

#### Output

```
─────┬──────────────────────────────────
     │ File: hello.py
─────┼──────────────────────────────────
   2 │     message = f"Hello, {name}!"
   3 │     print(message)
   4 │     return message
─────┴──────────────────────────────────
```
<!-- {: .-box-chars} -->

`N:M` prints a range; `:40` starts at the top, `40:` runs to the end, and `30:+10` prints lines 30 through 40.

See: `bat --help` (-r)

### Page the output

```bash
bat --paging=never hello.py
bat -P hello.py
bat --pager='less -R' hello.py
```

`bat` pages only when the output exceeds one screen. Piped output never pages. `-P` is short for `--paging=never`.

See: [Automatic paging](https://github.com/sharkdp/bat#automatic-paging)

### Show Git changes

```bash
bat -d notes.txt
bat -d --diff-context=1 notes.txt
```
<!-- {: data-highlight="--diff-context=1"} -->

#### Output

```
───────┬────────────────────────────────
       │ File: notes.txt
───────┼────────────────────────────────
   1   │ one
   2 ~ │ TWO
   3   │ three
   4 + │ four
───────┴────────────────────────────────
```
<!-- {: .-box-chars} -->

`~` marks modified lines and `+` marks added ones. `--diff-context` controls the surrounding context.

See: [Git integration](https://github.com/sharkdp/bat#git-integration)

## Work with other tools
<!-- {: .-three-column} -->

### Preview in fzf

```bash
fzf --preview "bat --color=always \
  --style=numbers --line-range=:500 {}"
```
<!-- {: data-highlight="--line-range=:500"} -->

Force colors for previews; `--line-range` keeps long files fast to load.

See: [Integration with other tools](https://github.com/sharkdp/bat#integration-with-other-tools)

### Follow a log

```bash
tail -f app.log | bat --paging=never \
  -l log
```

Disable paging for a live stream, and name the language when a path cannot provide it.

See: [Integration with other tools](https://github.com/sharkdp/bat#integration-with-other-tools)

### View a Git revision

```bash
git show HEAD:src/main.py | bat -l py
```

Older file versions have no path on disk, so set the language explicitly.

See: [Integration with other tools](https://github.com/sharkdp/bat#integration-with-other-tools)

### Colorize man pages

```bash
export MANPAGER="bat -plman"
man 2 select
```
<!-- {: data-highlight="-plman"} -->

`-plman` combines plain style with the manpage syntax.

See: [Integration with other tools](https://github.com/sharkdp/bat#integration-with-other-tools)

## Configure

### Config file

```bash
bat --config-file
bat --generate-config-file
bat cache --build
```

The config file holds default flags, one per line. Rebuild the cache after adding themes or syntaxes.

See: [Configuration file](https://github.com/sharkdp/bat#configuration-file)

### Environment variables

| Variable          | Effect                     |
| ----------------- | -------------------------- |
| `BAT_THEME`       | Default theme              |
| `BAT_STYLE`       | Default style components   |
| `BAT_PAGER`       | Pager command              |
| `BAT_PAGING`      | `auto`, `never`, `always`   |
| `BAT_CONFIG_PATH` | Config file location       |

Flags take precedence over environment variables, which take precedence over the config file.

See: [Customization](https://github.com/sharkdp/bat#customization)
