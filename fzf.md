---
title: fzf
subtitle: Interactive fuzzy finder for terminals
logo: { set: icon-park-outline, name: search }
category: Terminal
updated: 2026-11-28
last_verified_at: 2026-11-28
last_verified_with: "fzf 0.75.0."
tier: t2
fragments:
  - "fzf"
  - "fzf -m"
  - "fzf -f music"
  - "'foo"
  - "^music"
  - ".mp3$"
  - "!fire"
  - "|"
  - "--preview"
  - "cat {}"
  - "--height 40%"
  - "--layout reverse"
  - "--popup"
  - "Ctrl+T"
  - "Ctrl+R"
  - "Alt+C"
  - "**<Tab>"
  - "--walker-skip"
  - "FZF_DEFAULT"
  - "--print0"
keywords:
  - fuzzy finder
  - fzf preview
  - fzf search syntax
  - fzf history
intro: |
  [fzf](https://github.com/junegunn/fzf) filters lists interactively as you type: files, commands, processes, or any lines piped into it.
links:
  - title: fzf README
    url: https://github.com/junegunn/fzf#readme
  - title: fzf man page
    url: https://junegunn.github.io/fzf/man/
---

## Find files
<!-- {: .-three-column} -->

### Pick a file

#### Select

```bash
fzf
```

#### Open the selection

```bash
vim "$(fzf)"
```
<!-- {: data-highlight='"$(fzf)"'} -->

Without input, fzf walks the current directory. Enter prints the highlighted path.

See: [Usage](https://github.com/junegunn/fzf#usage)

### Pipe a list

```bash
find . -type f | fzf
```
<!-- {: data-highlight='| fzf'} -->

Piped input replaces the directory walk, so any lines can become candidates.

See: [Usage](https://github.com/junegunn/fzf#usage)

### Select multiple

#### Mark items

```bash
fzf -m
```
<!-- {: data-highlight='-m'} -->

#### Pass them on

```bash
fzf -m --print0 | xargs -0 -o vim
```
<!-- {: data-highlight='--print0'} -->

`Tab` and `Shift-Tab` mark items; Enter prints every marked line.

See: [Using the finder](https://github.com/junegunn/fzf#using-the-finder)

## Shell integration

### Set up a shell

#### Bash

```bash
eval "$(fzf --bash)"
```
<!-- {: data-highlight='--bash'} -->

#### Zsh

```bash
source <(fzf --zsh)
```

#### Fish

```fish
fzf --fish | source
```

Add the line for your shell to its startup file to enable keys and completion.

See: [Shell integration](https://github.com/junegunn/fzf#setting-up-shell-integration)

### Default keys

| Key      | Action                                    |
| -------- | ----------------------------------------- |
| `Ctrl+T` | Paste selected files onto the command line |
| `Ctrl+R` | Paste a selected command from history      |
| `Alt+C`  | Change to a selected directory             |
| `Ctrl+K` / `Ctrl+J` | Move the cursor up or down       |
| `Esc`    | Close the finder without selecting         |
<!-- {: .-shortcuts} -->

Move with the arrow keys too; `Enter` accepts the selection.

See: [Key bindings](https://github.com/junegunn/fzf#key-bindings-for-command-line)

### Fuzzy completion

```bash
vim **<Tab>
cd ~/src/**<Tab>
kill -9 **<Tab>
```
<!-- {: data-highlight='**<Tab>'} -->

The `**` trigger completes paths, directories, PIDs, hosts, and environment variables.

See: [Fuzzy completion](https://github.com/junegunn/fzf#fuzzy-completion)

## Search syntax

### Fuzzy match

```bash
printf 'music.mp3\nmusic.txt\nrock.mp3\n' | fzf -f music
```
<!-- {: data-highlight='music'} -->

#### Output

```text
music.mp3
music.txt
```

`-f` prints matches without opening the UI. The letters only need to appear in order.

See: [Search syntax](https://github.com/junegunn/fzf#search-syntax)

### Exact and quoted

```bash
printf 'foo bar\nfoobar\nbar foo\n' | fzf -f "'foo"
```
<!-- {: data-highlight="'foo"} -->

#### Output

```text
foobar
foo bar
bar foo
```

A leading `'` makes the term literal instead of fuzzy. Quote both ends to match word boundaries.

See: [Search syntax](https://github.com/junegunn/fzf#search-syntax)

### Anchors

```bash
printf 'music.mp3\njazz.mp3\n' |
  fzf -f '^music .mp3$'
```
<!-- {: data-highlight='^music; .mp3$'} -->

#### Output

```text
music.mp3
```

`^` anchors at the start of a line and `$` at the end; both also make the term exact.

See: [Search syntax](https://github.com/junegunn/fzf#search-syntax)

### Negation

```bash
printf 'fire.mp3\nwater.mp3\n' | fzf -f '!fire'
```
<!-- {: data-highlight='!fire'} -->

#### Output

```text
water.mp3
```

`!` removes lines that contain the term. Space-separated terms are combined with AND.

See: [Search syntax](https://github.com/junegunn/fzf#search-syntax)

### Or terms

```bash
printf 'core.go\ncore.rb\ncore.py\ncore.js\n' |
  fzf -f '^core go$ | rb$ | py$'
```
<!-- {: data-highlight='go$ | rb$ | py$'} -->

#### Output

```text
core.go
core.rb
core.py
```

A single `|` term acts as OR between the terms around it.

See: [Search syntax](https://github.com/junegunn/fzf#search-syntax)

## Preview and layout

### Preview files

#### Plain text

```bash
fzf --preview 'cat {}'
```
<!-- {: data-highlight="--preview 'cat {}'"} -->

#### With colors

```bash
fzf --preview 'bat --color=always {}'
```

`{}` is replaced with the highlighted line. Avoid previews that expect non-file input.

See: [Preview window](https://github.com/junegunn/fzf#preview-window)

### Preview size

```bash
fzf --preview 'cat {}' --preview-window down:3
```
<!-- {: data-highlight='--preview-window down:3'} -->

The default preview sits on the right at half width; `down:3` puts it below with three lines.

See: `fzf --help` (--preview-window)

### Compact window

```bash
fzf --height 40% --layout reverse --border
```
<!-- {: data-highlight='--height 40%'} -->

`--height` opens fzf below the cursor instead of taking the whole screen.

See: [Display modes](https://github.com/junegunn/fzf#display-modes)

### Floating popup

```bash
fzf --popup center,80%
```
<!-- {: data-highlight='--popup'} -->

Popups need tmux 3.3+ or Zellij 0.44+; outside them the option is ignored.

See: [Display modes](https://github.com/junegunn/fzf#display-modes)

## Ignore files

### Skip paths

```bash
fzf --walker-skip .git,node_modules,dist
```
<!-- {: data-highlight='--walker-skip'} -->

The built-in walker skips `.git` and `node_modules` by default.

See: `fzf --help` (--walker, --walker-skip)

### Respect gitignore

#### One-off

```bash
fd --type f --strip-cwd-prefix | fzf
```
<!-- {: data-highlight='fd --type f'} -->

#### Default source

```bash
export FZF_DEFAULT_COMMAND='fd --type f --strip-cwd-prefix'
```

`fd` and `rg` honor `.gitignore`, unlike the built-in walker.

See: [Respecting .gitignore](https://github.com/junegunn/fzf#respecting-gitignore)

## Scripting

### Filter without a UI

```bash
printf 'core.go\ncore.rb\n' | fzf --filter go
```
<!-- {: data-highlight='--filter go'} -->

#### Output

```text
core.go
```

`--filter` exits after printing the matches for its argument.

See: `fzf --help` (--filter)

### Auto-select and exit

```bash
fzf -1
fzf -0
```
<!-- {: data-highlight='-1; -0'} -->

`-1` accepts the only match; `-0` exits when there are no matches. Use them when a script must not wait for input.

See: `fzf --help` (-1, -0)

### Pass selection to a command

```bash
fzf --bind 'enter:become(vim {})'
```
<!-- {: data-highlight='become(vim {})'} -->

`become` replaces the fzf process with the command instead of returning the selection.

See: [Advanced topics](https://github.com/junegunn/fzf#advanced-topics)

### Start with a query

```bash
fzf -q 'src/'
```
<!-- {: data-highlight="-q 'src/'"} -->

`-q` opens the finder with the prompt already filled in.

See: `fzf --help` (-q)
