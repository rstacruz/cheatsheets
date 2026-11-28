---
title: Readline
subtitle: Line editing for CLI prompts
logo: { set: icon-park-outline, name: enter-key }
category: Shell
tier: t2
last_verified_with: "GNU Readline 8.3."
fragments:
  - "~/.inputrc"
  - "C-a"
  - "C-e"
  - "C-r"
  - "C-k"
  - "C-u"
  - "C-y"
  - "C-w"
  - "M-f"
  - "M-b"
  - "M-d"
  - "C-x C-u"
  - "M-."
  - "set -o vi"
updated: 2026-11-16
last_verified_at: 2026-11-16
intro: |
  [GNU Readline](https://tiswww.case.edu/php/chet/readline/rltop.html) edits
  the input line in bash, psql, python, and most REPLs. This reference covers
  the default Emacs-style keys, history expansion, and `~/.inputrc`.
links:
  - title: GNU Readline manual
    url: https://tiswww.case.edu/php/chet/readline/rltop.html
  - title: Readline init file
    url: https://www.gnu.org/software/bash/manual/html_node/Readline-Init-File.html
  - title: History expansion
    url: https://www.gnu.org/software/bash/manual/html_node/History-Interaction.html
  - title: Python readline
    url: https://docs.python.org/3/library/readline.html
---

## Editing

### Movement

| Key | Action |
| --- | --- |
| `C-a` | Start of line |
| `C-e` | End of line |
| `C-f` / `C-b` | Forward / back one character |
| `C-l` | Redraw the screen |
| `C-g` | Abort the current command |
| `C-d` | Delete char under cursor (EOF if empty) |
| `Backspace` | Delete char before cursor |

<!-- {: .-shortcuts} -->

These Emacs-style keys work in every prompt that links Readline, including bash, psql, and python. Arrow keys work too when the terminal sends the expected escape sequences.

See: [Readline movement commands](https://tiswww.case.edu/php/chet/readline/readline.html#Readline-Movement-Commands)

### Word motions

| Key | Action |
| --- | --- |
| `M-f` / `M-b` | Forward / back one word |
| `M-d` | Kill forward to the end of a word |
| `M-DEL` | Kill back to the start of a word |
| `C-w` | Kill back to whitespace |

<!-- {: .-shortcuts} -->

`C-w` stops only at whitespace, so it removes `--flag=value` whole. `M-DEL` stops at punctuation too.

See: [Readline killing commands](https://tiswww.case.edu/php/chet/readline/readline.html#Readline-Killing-Commands)

### Kill and yank

| Key | Action |
| --- | --- |
| `C-k` | Kill to end of line |
| `C-u` | Kill to start of line |
| `C-y` | Paste the last kill |
| `M-y` | Swap in an earlier kill |
| `M-.` | Insert the last word of the previous command |

<!-- {: .-shortcuts} -->

Killed text lands on the kill ring; press `C-y` then `M-y` to cycle older entries. In bash `C-u` is line discard, not the Emacs number prefix.

See: [Readline killing commands](https://tiswww.case.edu/php/chet/readline/readline.html#Readline-Killing-Commands)

### Undo and transpose

| Key | Action |
| --- | --- |
| `C-x C-u` / `C-_` | Undo the last edit |
| `M-r` | Revert every change to this line |
| `C-t` | Transpose two characters |
| `M-t` | Transpose two words |

<!-- {: .-shortcuts} -->

Undo is remembered per history line and steps all the way back to an empty line. `M-r` discards the whole edit instead of one step at a time.

See: [Miscellaneous commands](https://tiswww.case.edu/php/chet/readline/readline.html#Some-Miscellaneous-Commands)

### Numeric arguments

```bash
M-3 C-b                     # back three characters
M-2 M-d                     # kill two words forward
M-5 C-h                     # delete five characters backward
```
<!-- {: data-highlight="M-3; M-2; M-5"} -->

Digits and `M--` build a count for the next command. `C-u` is the prefix in stock Emacs, but bash binds it to `unix-line-discard`.

See: [Numeric arguments](https://tiswww.case.edu/php/chet/readline/readline.html#Specifying-Numeric-Arguments)

## History

### Incremental search

| Key | Action |
| --- | --- |
| `C-r` | Search backward as you type |
| `C-s` | Search forward as you type |
| `C-r` again | Next older match |
| `RET` | Accept the match and run the line |
| `C-g` | Cancel, keep the typed line |
| `M-p` / `M-n` | Non-incremental search back / forward |

<!-- {: .-shortcuts} -->

`C-r` is the fastest way to find an earlier command: type a fragment, press `C-r` again to walk matches, then `RET`. `M-p` asks for a string instead of searching live.

See: [Searching for commands in the history](https://tiswww.case.edu/php/chet/readline/readline.html#Searching-for-Commands-in-the-History)

### Repeat a command

```bash
apt install ripgrep
sudo !!                     # sudo apt install ripgrep
```
<!-- {: data-highlight="!!"} -->

#### Event designators

| Syntax | Expands to |
| --- | --- |
| `!!` | Previous command |
| `!n` | Command number n |
| `!-n` | n commands back |
| `!string` | Most recent command starting with string |
| `!?string?` | Most recent command containing string |

Event designators pick the history entry to reuse; `!n` takes the number printed by `history`.

See: [Event designators](https://www.gnu.org/software/bash/manual/html_node/Event-Designators.html)

### Reuse arguments

```bash
cp report.txt /tmp/backup.txt
echo !^ !$                  # report.txt /tmp/backup.txt
```
<!-- {: data-highlight="!^; !$"} -->

#### Word designators

| Syntax | Expands to |
| --- | --- |
| `!$` | Last word of the previous command |
| `!*` | All arguments of the previous command |
| `!^` | First argument of the previous command |
| `!:2` | Second word of the previous command |
| `!:2-4` | Words 2 through 4 |

Words count from 0 at the command name; `!$` is shorthand for the last word.

See: [Word designators](https://www.gnu.org/software/bash/manual/html_node/Word-Designators.html)

### Substitute parts

```bash
grep -r todo src
^todo^FIXME^                # repeat with todo replaced
ls /usr/local/bin
cd !$:h                     # cd /usr/local
```
<!-- {: data-highlight="^todo^FIXME^; !$:h"} -->

#### Modifiers

| Syntax | Expands to |
| --- | --- |
| `^old^new` | Previous command with `old` replaced |
| `!!:p` | Print the command without running it |
| `!$:h` | Directory part of the last word |
| `!$:t` | Filename part of the last word |

Single quotes suppress expansion, a backslash escapes `!`, and `set +H` turns it off for the session. Add `:p` to any designator to preview the result.

See: [Modifiers](https://www.gnu.org/software/bash/manual/html_node/Modifiers.html)

### History limits

```bash
HISTCONTROL=ignorespace:ignoredups:erasedups
HISTIGNORE='ls:cd:pwd:exit:&'
HISTSIZE=10000
HISTFILESIZE=20000
shopt -s histappend
```
<!-- {: data-highlight="HISTCONTROL; HISTIGNORE; HISTSIZE; HISTFILESIZE"} -->

#### Values

| Setting | Effect |
| --- | --- |
| `ignorespace` | Skip lines starting with a space |
| `ignoredups` | Skip a repeat of the last line |
| `ignoreboth` | `ignorespace` plus `ignoredups` |
| `erasedups` | Remove older copies before saving |
| --- | --- |
| `HISTIGNORE` | Colon-separated patterns to skip |
| `HISTSIZE` | Entries kept in memory |
| `HISTFILESIZE` | Entries kept in the history file |
| `histappend` | Append on exit instead of overwriting |

`HISTIGNORE` patterns must match the whole line, and `&` matches the previous history line. Prefix a one-off command with a space once `ignorespace` is set.

See: [Bash variables](https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html)

## Configuration

### Common settings

```ini
# ~/.inputrc
set editing-mode emacs
set completion-ignore-case on
set show-all-if-ambiguous on
set enable-bracketed-paste on
set bell-style none
set history-size 10000
```
<!-- {: data-highlight="completion-ignore-case; show-all-if-ambiguous; enable-bracketed-paste; history-size"} -->

`show-all-if-ambiguous` lists completions on the first TAB. Bracketed paste inserts a pasted block as one string instead of running each character as a key. `history-size` caps Readline's list; in bash raise `HISTSIZE` too.

See: [Init file syntax](https://www.gnu.org/software/bash/manual/html_node/Readline-Init-File-Syntax.html)

### Rebinding keys

```ini
"\C-x\C-r": re-read-init-file
"\e[1;5C": forward-word
"\e[A": history-search-backward
```
<!-- {: data-highlight="re-read-init-file; forward-word; history-search-backward"} -->

`C-x C-r` reloads `~/.inputrc`. Binding `\e[A` to `history-search-backward` makes Up search by the prefix already typed. Keys are written `\C-a` (Control), `\M-a` (Meta), or spelled out (`Control-u`).

See: [Readline init file](https://www.gnu.org/software/bash/manual/html_node/Readline-Init-File.html)

### Macros

```ini
"\C-o": "> output"
"\C-g": "git status\C-m"
```
<!-- {: data-highlight="\C-m"} -->

A macro inserts its text into the line. A trailing `\C-m` presses Return, so the second macro runs `git status`.

See: [Keyboard macros](https://tiswww.case.edu/php/chet/readline/readline.html#Keyboard-Macros)

### Conditionals

```ini
$include /etc/inputrc

$if Bash
  # C-x C-e opens the line in $EDITOR
  "\C-x\C-e": edit-and-execute-command
$endif

$if mode=vi
  set keymap vi-insert
  "\C-l": clear-screen
$endif
```
<!-- {: data-highlight="$if; $endif; $include"} -->

`$if` tests the application, the editing mode, the terminal, or the Readline version. Close each branch with `$endif`; `$else` adds an alternative. `$include` reads another init file.

See: [Conditional init constructs](https://tiswww.case.edu/php/chet/readline/readline.html#Conditional-Init-Constructs)

## vi mode

### Switching modes

#### Persist

```ini
set editing-mode vi
```
<!-- {: data-highlight="editing-mode vi"} -->

#### This shell

```bash
set -o vi
```
<!-- {: data-highlight="set -o vi"} -->

`Esc` enters command mode; `i`, `a`, `I`, and `A` return to insert mode. `set -o vi` changes the running shell, while the inputrc line covers new sessions.

See: [Readline vi mode](https://tiswww.case.edu/php/chet/readline/readline.html#Readline-vi-Mode)

### Command mode

| Key | Action |
| --- | --- |
| `Esc` | Enter command mode |
| `h` / `l` | Left / right |
| `w` / `b` / `e` | Word forward / back / end |
| `0` / `$` | Start / end of line |
| `f` / `t` | Jump to a character |

`Esc` leaves insert mode. Readline implements the POSIX `sh` vi subset, not full vi; motions take an operator such as `d` or `c`.

See: [Readline vi mode](https://tiswww.case.edu/php/chet/readline/readline.html#Readline-vi-Mode)

### Editing text

| Key | Action |
| --- | --- |
| `i` / `a` | Insert before / after cursor |
| `I` / `A` | Insert at start / end of line |
| `x` | Delete the character |
| `dd` / `dw` | Delete line / word |
| `cw` / `cc` | Change word / line |
| `p` / `P` | Paste after / before |
| `u` | Undo |

`i` and `a` return to insert mode. An operator plus a motion edits a range, so `d$` deletes to the end of the line.

See: [Readline vi mode](https://tiswww.case.edu/php/chet/readline/readline.html#Readline-vi-Mode)

### Searching

| Key | Action |
| --- | --- |
| `/` / `?` | Search the history |
| `n` / `N` | Next / previous match |

Searches walk the command history; `n` repeats the match and `N` reverses the direction.

See: [Readline vi mode](https://tiswww.case.edu/php/chet/readline/readline.html#Readline-vi-Mode)

### Keymaps

#### inputrc

```ini
set keymap vi-insert
"\C-l": clear-screen
```
<!-- {: data-highlight="keymap vi-insert"} -->

#### bind

```bash
bind -m vi-insert '"\C-l": clear-screen'
```
<!-- {: data-highlight="bind -m"} -->

Keymaps keep vi insert and command bindings apart: `vi-insert`, `vi-command`, `emacs-standard`, `emacs-ctlx`. `bind -m` changes one without an inputrc edit.

See: [Keymaps](https://tiswww.case.edu/php/chet/readline/readline.html#Keymaps)

## Tools

### Bash bind

```bash
bind -P                      # current function bindings
bind -l                      # every Readline function name
bind -q kill-word            # keys bound to one function
bind -v                      # current variable values
bind -s                      # macros
```
<!-- {: data-highlight="bind -P; bind -l; bind -q; bind -v"} -->

#### Shell commands

```bash
bind -x '"\C-x\C-w": git status'
bind -m vi-insert '"\C-l": clear-screen'
```
<!-- {: data-highlight="bind -x"} -->

`bind -x` runs a shell command; the buffer is in `READLINE_LINE` and the cursor in `READLINE_POINT`. `bind -m keymap` scopes a binding to one keymap.

See: [Bash builtins: bind](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html)

### Python

```python
import readline

readline.parse_and_bind("set editing-mode vi")
readline.parse_and_bind('"\\C-l": clear-screen')

name = input("Name: ")
```
<!-- {: data-highlight="parse_and_bind"} -->

Importing `readline` makes `input()` use Readline, so the keys on this sheet apply. `parse_and_bind` takes the same syntax as `~/.inputrc`.

See: [Python readline](https://docs.python.org/3/library/readline.html)

## See also

[bash cheatsheet](./bash)
<!-- {: .-crosslink} -->

[Python cheatsheet](./python)
<!-- {: .-crosslink} -->
