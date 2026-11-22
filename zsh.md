---
title: Zsh
seo_title: Zsh cheatsheet — commands, globbing, completion
description: "Zsh commands: globbing, completion, prompt, options and startup files. Copy-paste reference."
subtitle: Interactive shell
category: Shell
tier: t2
updated: 2026-11-18
last_verified_with: "Zsh 5.9.2."
fragments:
  - "setopt"
  - "bindkey"
  - "autoload -Uz"
  - "${(f)var}"
  - "${(j:,:)arr}"
  - "$arr[1]"
  - "typeset -A map"
  - "*(.)"
  - "*(m-1)"
  - "**/*.js"
  - "^*.txt"
  - "zmv '(*).txt'"
  - "=(curl url)"
  - "%F{green}%~"
  - "precmd() {"
  - "emulate -L zsh"
intro: |
  zsh adds globbing, completion, and line editing on top of bash. This sheet
  covers those extras; see the [Bash cheatsheet](./bash) for shared syntax.
links:
  - title: Zsh manual
    url: https://zsh.sourceforge.io/Doc/Release/
  - title: Zsh FAQ
    url: https://zsh.sourceforge.io/FAQ/
keywords:
  - Globbing
  - Qualifiers
  - Parameter expansion flags
  - Completion
  - ZLE
  - Prompt
  - Options
  - Startup files
---

## Globbing

### Recursive globs

```bash
ls **/*.js          # any depth
setopt globdots     # * matches dotfiles too
ls **/*.js(N)       # N: drop if no match
```

`**/` works with no options; `globdots` makes wildcards match leading dots.

See: [Filename generation](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Filename-Generation)

### Qualifiers

```bash
ls *(.)           # regular files only
ls *(m0)          # modified today
ls *(m-4)         # modified within 4 days
ls *(om[1,3])     # three newest files
```

#### Qualifiers

| Qualifier | Matches |
| --- | --- |
| `(.)` | Regular files |
| `(/)` | Directories |
| `(@)` | Symbolic links |
| `(*)` | Executable plain files |
| `(D)` | Include dotfiles |
| --- | --- |
| `(m0)` | Modified today |
| `(m-1)` | Modified within 1 day |
| `(m-4)` | Modified within 4 days |
| `(Lk+100)` | Larger than 100 KB |
| `(om)` | Newest first |
| `(On)` | Names descending |
| `(u:root)` | Owned by root |

Qualifiers combine, as in `*(.om[1])` for the newest regular file.

See: [Glob qualifiers](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Glob-Qualifiers)

### Excluding matches

```bash
setopt extendedglob
ls ^*.txt          # everything except .txt
ls *.js~test*      # .js files not starting test
```

Both `^` and `~` need `extendedglob`. `^` negates a whole pattern; `~` subtracts a pattern.

See: [Glob operators](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Glob-Operators)

### Extended globs

```bash
setopt extendedglob
ls (#i)*readme*    # case-insensitive
ls file<1-9>.txt   # one digit
ls a##b            # one or more a's
```

`#` repeats the preceding pattern zero or more times, `##` one or more. `(#b)` turns on backreferences for `[[ = ]]`.

See: [Globbing flags](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Globbing-Flags)

### Renaming

```bash
autoload -Uz zmv
zmv -n '(*).txt' '$1.md'    # dry run
zmv '(*).txt' '$1.md'       # rename
zmv -W '*.txt' '*.md'       # wildcard form
```

`-n` prints what would change. `-W` captures `*` automatically, so no `$1` is needed.

See: [zmv](https://zsh.sourceforge.io/Doc/Release/User-Contributions.html#index-zmv)

### No matches

```bash
ls *.nope        # zsh: no matches found
setopt nullglob  # drop unmatched patterns
setopt nonomatch # keep the pattern as typed
```

The default error stops the whole command; the two options change that.

See: [Filename generation](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Filename-Generation)

## Getting started
<!-- {: .-three-column} -->

### Startup files

```bash
echo $ZDOTDIR     # empty means $HOME
ls ~/.zshenv ~/.zshrc
```

#### Read order

| File | Runs |
| --- | --- |
| `.zshenv` | Every zsh, including scripts |
| `.zprofile` | Login shells, before `.zshrc` |
| `.zshrc` | Interactive shells |
| `.zlogin` | Login shells, after `.zshrc` |
| `.zlogout` | Login shell exit |

See: [Startup files](https://zsh.sourceforge.io/Doc/Release/Files.html#Startup_002fShutdown-Files)

### Change default shell

```bash
chsh -s $(which zsh)
echo $SHELL      # verify
exec zsh         # switch now
```

`chsh` changes the login shell; `$SHELL` updates after you log in again.

See: man chsh

### Bash compatibility

```bash
setopt shwordsplit  # split unquoted $var
emulate sh -c 'echo hi'
```

zsh keeps unquoted parameters as one word and indexes arrays from 1.

[Bash cheatsheet](./bash)
<!-- {: .-crosslink} -->

See: [Shell emulation](https://zsh.sourceforge.io/Doc/Release/Options.html#Shell-Emulation)

### Clean shell

```bash
zsh -f     # no startup files
zsh -d     # no global rcs
exec zsh   # restart
```

`-f` also skips `.zshenv`; `-d` skips `/etc/zsh*`. Use either when debugging a broken config.

See: [Invocation](https://zsh.sourceforge.io/Doc/Release/Invocation.html)

## Expansion

### Parameter flags

```bash
v=a:b:c
print ${(s.:.)v}            # a b c
print ${(j:,:)${(s.:.)v}}   # a,b,c
print ${(U)${(q)v}}         # quoted, uppercase
```

#### Flags

| Flag | Effect |
| --- | --- |
| `(s:x:)` | Split on `x` |
| `(j:x:)` | Join with `x` |
| `(f)` | Split into lines |
| `(z)` | Split into shell words |
| `(q)` | Quote for re-entry |
| --- | --- |
| `(u)` | Keep unique words |
| `(o)` | Sort ascending |
| `(O)` | Sort descending |
| `(k)` | Keys of a map |
| `(v)` | Values of a map |
| --- | --- |
| `(U)` | Uppercase |
| `(L)` | Lowercase |
| `(t)` | Type of a parameter |
| `(l:3::0:)` | Pad left to width 3 with 0 |
| `(r:3::0:)` | Pad right to width 3 with 0 |

Flags nest inside-out: the inner expansion runs first.

See: [Parameter expansion](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Parameter-Expansion)

### Nested expansion

```bash
lines=$'one\ntwo\nthree'
print ${${(f)lines}[2]}      # two
arr=(c a b)
print ${(j:,:)${(o)arr}}     # a,b,c
```

Subscripts apply to the result of the braces around them, so nested expansions read from the inside out.

See: [Parameter expansion](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Parameter-Expansion)

### Modifiers

```bash
f=/tmp/archive.tar.gz
print ${f:h}    # /tmp
print ${f:t}    # archive.tar.gz
print ${f:r}    # /tmp/archive.tar
print ${f:gs/tmp/var}  # /var/archive.tar.gz
```

#### Modifiers

| Modifier | Effect |
| --- | --- |
| `:h` | Directory part |
| `:t` | Filename part |
| `:r` | Strip extension |
| `:e` | Extension only |
| --- | --- |
| `:l` | Lowercase |
| `:u` | Uppercase |
| `:s/a/b/` | Replace first match |
| `:gs/a/b/` | Replace every match |

Modifiers work on parameters and history references, as in `!!:h`.

See: [Modifiers](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Modifiers)

### Array expansion

```bash
arr=(a b c)
print -l $arr          # one word per line
print -l "$arr"        # one word: a b c
print -l "${(@)arr}"   # one word per element
print $arr[2]          # b
```

#### Cartesian product

```bash
arr=(a b)
print $^arr.txt        # a.txt b.txt
```

`"${(@)arr}"` keeps each element a separate word; `$^arr` joins each element with the text that follows.

See: [Array parameters](https://zsh.sourceforge.io/Doc/Release/Parameters.html#Array-Parameters)

### Word splitting

```bash
v="a b"
print -l $v     # a b (one word)
print -l $=v    # a and b
print -l $~v    # v used as a pattern
```

Unquoted parameters are not split; `$=` forces splitting and `$~` forces pattern interpretation.

See: [Parameter expansion](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Parameter-Expansion)

## Arrays

### Arrays

```bash
arr=(one two three)
print $arr[1]      # one
print $arr[-1]     # three
print $arr[2,3]    # two three
print ${#arr}      # 3
arr+=(four)
unset 'arr[2]'
```

Arrays are 1-indexed. Negative indexes count from the end, and `arr+=(x)` appends. Deleting an element leaves a gap, so `${#arr}` is not the highest index.

See: [Array parameters](https://zsh.sourceforge.io/Doc/Release/Parameters.html#Array-Parameters)

### Subscripts

```bash
arr=(foo bar baz)
print $arr[(i)ba*]    # 2, first match
print $arr[(I)ba*]    # 3, last match
print $arr[(r)ba*]    # bar, first value
```

`(i)` and `(I)` return indexes; `(r)` and `(R)` return values.

See: [Subscript flags](https://zsh.sourceforge.io/Doc/Release/Parameters.html#Subscript-Flags)

### Associative arrays

```bash
typeset -A map
map=(host localhost port 8080)
print ${(k)map}     # host port
print ${(v)map}     # localhost 8080
print ${(kv)map}    # host localhost port 8080
print ${(ok)map}    # keys sorted
```

Declare with `typeset -A`; `${(kv)map}` flattens key/value pairs.

See: [Parameters](https://zsh.sourceforge.io/Doc/Release/Parameters.html)

### Attributes

```bash
typeset -i n=42        # integer
typeset -F f=1.5       # float
typeset -l lower=ABC   # lowercase
typeset -T PATH path   # tie PATH to array
```

#### Attributes

| Flag | Effect |
| --- | --- |
| `-a` | Indexed array |
| `-A` | Associative array |
| `-i` | Integer arithmetic |
| `-F` | Floating point |
| `-l` | Lowercase on assign |
| --- | --- |
| `-u` | Uppercase on assign |
| `-x` | Export to environment |
| `-r` | Read-only |
| `-T` | Tie scalar to array |

Inside functions, `local` is the same as `typeset`.

See: [Parameters](https://zsh.sourceforge.io/Doc/Release/Parameters.html)

## History

### Event designators

```bash
sudo !!          # rerun last command
vim !*           # last command's arguments
git add !^       # first argument of last command
cat !$           # last argument of last command
!?ls             # last command containing ls
!-2              # two commands back
```

zsh expands these when the line is accepted. `setopt histverify` loads the expansion into the buffer for editing first.

See: [Event designators](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Event-Designators)

### Substitution

```bash
^old^new           # repeat last, old to new
!!:s/a/b/          # first a to b
!!:gs/a/b/         # every a to b
!$:h               # dirname of last argument
```

`^old^new` is shorthand for `!!:s/old/new/`; the `:s` modifier also works on any event.

See: [Modifiers](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Modifiers)

### History file

```bash
HISTFILE=~/.zsh_history
HISTSIZE=10000        # in memory
SAVEHIST=10000        # on disk
setopt share_history  # sync across sessions
setopt inc_append_history
```

`share_history` imports commands from other sessions as they run; `inc_append_history` appends each command immediately.

See: [Parameters used by the shell](https://zsh.sourceforge.io/Doc/Release/Parameters.html#Parameters-Used-By-The-Shell)

### Search and options

```bash
history 1          # last command, numbered
fc -l -10          # last ten commands
setopt hist_ignore_dups
setopt hist_ignore_space
setopt hist_verify
```

`Ctrl-R` starts incremental search. `hist_ignore_space` skips commands starting with a space.

See: [History options](https://zsh.sourceforge.io/Doc/Release/Options.html#History)

## Completion

### Setup

```bash
autoload -Uz compinit
compinit
compinit -C        # skip the security check
```

`compinit` scans `fpath` and writes `~/.zcompdump`; rerun it after adding completion functions.

See: [Completion system](https://zsh.sourceforge.io/Doc/Release/Completion-System.html)

### Styles

```bash
zstyle ':completion:*' menu select
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}'
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
```

Styles are looked up by context pattern; the matcher above ignores case.

See: [Completion configuration](https://zsh.sourceforge.io/Doc/Release/Completion-System.html#Completion-System-Configuration)

### Writing completions

```bash
_foo() {
  _arguments '-v[verbose]' '1:file:_files'
}
compdef _foo foo
```

`_arguments` describes options and their arguments. A file starting with `#compdef foo` is autoloaded from `fpath`.

See: [Completion functions](https://zsh.sourceforge.io/Doc/Release/Completion-System.html#Completion-Functions)

### Behaviour options

```bash
setopt auto_menu
setopt complete_in_word
setopt always_last_prompt
unsetopt beep
```

#### Options

| Option | Effect |
| --- | --- |
| `auto_menu` | Tab again cycles matches |
| `complete_in_word` | Complete at cursor, not end |
| `always_last_prompt` | Keep prompt above list |
| `beep` | Off silences the bell |

Completion options are plain shell options.

See: [Completion options](https://zsh.sourceforge.io/Doc/Release/Options.html#Completion-2)

## Line editing

### Keymaps

```bash
bindkey -e          # emacs bindings
bindkey -v          # vi bindings
bindkey -M vicmd    # list vi command keys
bindkey -l          # list keymaps
```

`-e` and `-v` switch the main keymap; `-M` selects another for listing.

See: [Zle builtins](https://zsh.sourceforge.io/Doc/Release/Zsh-Line-Editor.html#Zle-Builtins)

### Binding keys

```bash
bindkey '^R' history-incremental-search-backward
bindkey '^[[A' up-line-or-history
bindkey -s '^X^E' 'nvim\n'
```

#### Notation

| Notation | Key |
| --- | --- |
| `^A` | Ctrl-A |
| `\e` | Escape |
| `^[[A` | Up arrow |
| `^X^E` | Ctrl-X then Ctrl-E |

`bindkey -s` binds a string that is inserted into the buffer.

See: [Zle builtins](https://zsh.sourceforge.io/Doc/Release/Zsh-Line-Editor.html#Zle-Builtins)

### Custom widgets

```bash
my-widget() {
  LBUFFER="git status"
  zle reset-prompt
}
zle -N my-widget
bindkey '^G' my-widget
```

Widgets read and write `$LBUFFER` and `$RBUFFER` around the cursor.

See: [Zle widgets](https://zsh.sourceforge.io/Doc/Release/Zsh-Line-Editor.html#Zle-Widgets)

### Reading keys and input

```bash
read -k 1 key       # one keypress
read -q '?Continue? ' && echo yes
vared -p 'Name: ' name
```

`read -k` takes a character count and `-q` returns success for `y`.

See: [read](https://zsh.sourceforge.io/Doc/Release/Shell-Builtin-Commands.html#index-read)

### ZLE options

```bash
zle -l              # list widgets
bindkey -L          # list bindings
setopt no_beep
```

`bindkey -L` prints the commands that recreate the current bindings.

See: [Zle options](https://zsh.sourceforge.io/Doc/Release/Options.html#Zle)

## Prompt

### Prompt variables

```bash
PROMPT='%~ %# '
RPROMPT='%T'
PROMPT2='%_ '
PROMPT_EOL_MARK='%B%S%#%s%b'
```

`PROMPT` is the main prompt, `RPROMPT` sits at the right edge, and `PROMPT2` shows while a command continues.

See: [Prompt expansion](https://zsh.sourceforge.io/Doc/Release/Prompt-Expansion.html)

### Escapes

```bash
PROMPT='%F{green}%~%f %# '
RPROMPT='%? %T'
```

#### Escapes

| Escape | Shows |
| --- | --- |
| `%~` | Working directory, with `~` |
| `%n` | Username |
| `%m` | Hostname |
| `%#` | `#` for root, else `%` |
| `%?` | Exit status |
| --- | --- |
| `%T` | Time, HH:MM |
| `%*` | Time with seconds |
| `%D{...}` | strftime format |
| `%F{...}` | Foreground color |
| `%f` | Reset color |
| --- | --- |
| `%B` | Bold on |
| `%S` | Standout on |
| `%j` | Background job count |
| `%L` | Shell nesting level |
| `%{...%}` | Literal, zero width |

Pairs like `%B`/`%b` switch attributes on and off. `%D{...}` needs the `zsh/datetime` module.

See: [Prompt expansion](https://zsh.sourceforge.io/Doc/Release/Prompt-Expansion.html#Expansion-of-Prompt-Sequences)

### Dynamic prompts

```bash
setopt prompt_subst
PROMPT='$(date +%H:%M) %~ %# '
```

`prompt_subst` runs command and parameter substitution on every redraw.

See: [Prompt expansion](https://zsh.sourceforge.io/Doc/Release/Prompt-Expansion.html#Expansion-of-Prompt-Sequences)

### Git branch

```bash
setopt prompt_subst
autoload -Uz vcs_info
zstyle ':vcs_info:git:*' formats '%b'
precmd() { vcs_info }
PROMPT='%~ ${vcs_info_msg_0_}%# '
```

`vcs_info` sets `vcs_info_msg_0_`; calling it from `precmd` refreshes the branch before each prompt.

See: [vcs_info](https://zsh.sourceforge.io/Doc/Release/User-Contributions.html#Version-Control-Information)

## Options

### Setting options

```bash
setopt autocd
unsetopt beep
set -o noclobber
print ${options[autocd]}   # on
setopt                     # list enabled options
```

Option names ignore case and underscores, so `no_beep` and `nobeep` match.

See: [Options](https://zsh.sourceforge.io/Doc/Release/Options.html)

### Interactive options

```bash
setopt autocd extendedglob globdots
setopt hist_ignore_dups share_history
```

#### Common options

| Option | Effect |
| --- | --- |
| `autocd` | Type a directory to enter it |
| `correct` | Offer spelling corrections |
| `extendedglob` | `^`, `~`, `#` patterns |
| `globdots` | Wildcards match dotfiles |
| `hist_ignore_dups` | Drop repeated commands |
| --- | --- |
| `interactive_comments` | `#` starts a comment |
| `noclobber` | Block `>` over existing files |
| `prompt_subst` | Expand `$(...)` in prompts |
| `share_history` | Share history between sessions |

`correct` asks before running a word close to a file or command name.

See: [Options](https://zsh.sourceforge.io/Doc/Release/Options.html)

### Scripting options

```bash
setopt err_exit err_return
setopt no_unset pipe_fail
setopt xtrace
```

These mirror `set -e`, `set -u`, `pipefail`, and `set -x`. `err_return` returns from a function on a failed command.

See: [Scripts and functions](https://zsh.sourceforge.io/Doc/Release/Options.html#Scripts-and-Functions)

### Emulation

```bash
emulate -L zsh
emulate sh -c 'echo $0'
emulate -L sh
```

`emulate -L` sets options locally, so changes do not leak to the caller.

See: [Shell emulation](https://zsh.sourceforge.io/Doc/Release/Options.html#Shell-Emulation)

## Scripting

### Shebang

```bash
#!/usr/bin/env zsh
emulate -L zsh
setopt extendedglob
```

Start scripts with `emulate -L zsh` so user options and aliases do not change behaviour.

See: [Invocation](https://zsh.sourceforge.io/Doc/Release/Invocation.html)

### Functions and locals

```bash
greet() {
  local name=$1
  typeset -i count=0
  print "$name $count $0 $argv"
}
greet Ada one two
```

Inside a function `$0` is its name, `$argv` holds its arguments, and `$funcstack` lists the call chain.

See: [Functions](https://zsh.sourceforge.io/Doc/Release/Functions.html)

### Option parsing

```bash
zparseopts -D -E -A opts v f:
print ${opts[-f]}    # value passed to -f
```

`-D` removes parsed options from `$@`, `-E` keeps scanning past unknown words, and `-A` fills an associative array keyed by option name.

See: [zparseopts](https://zsh.sourceforge.io/Doc/Release/Zsh-Modules.html#index-zparseopts)

### Traps

```bash
TRAPZERR() { print "failed: $?" }
TRAPEXIT() { print "bye" }
TRAPINT() { print "interrupted"; return 1 }
```

`TRAPZERR` runs on a non-zero status, `TRAPEXIT` at shell exit, and `TRAPINT` on `Ctrl-C`.

See: [Trap functions](https://zsh.sourceforge.io/Doc/Release/Functions.html#Trap-Functions)

### Hooks

```bash
autoload -Uz add-zsh-hook
my_precmd() { print -r -- ready }
add-zsh-hook precmd my_precmd
```

`precmd` runs before each prompt, `preexec` after a command is read, and `chpwd` after a directory change.

See: [Hook functions](https://zsh.sourceforge.io/Doc/Release/Functions.html#Hook-Functions)

### Autoloading

```bash
fpath=(~/.zfunc $fpath)
autoload -Uz myfunc
myfunc
```

A file named `myfunc` in any `fpath` directory is read on first call.

See: [Autoloading](https://zsh.sourceforge.io/Doc/Release/Functions.html#Autoloading-Functions)

## Utilities

### Print

```bash
print -P '%F{green}%n%f'   # prompt escapes
print -r -- 'a\tb'         # raw, no escapes
print -l a b c             # one per line
print -f '%s\n' a b        # printf formatting
```

#### Options

| Flag | Effect |
| --- | --- |
| `-P` | Expand prompt escapes |
| `-r` | Ignore backslash escapes |
| `-l` | One argument per line |
| `-n` | No trailing newline |
| `-f` | Use printf format |

`--` ends options, so values starting with `-` print safely.

See: [print](https://zsh.sourceforge.io/Doc/Release/Shell-Builtin-Commands.html#index-print)

### Modules

```bash
zmodload zsh/datetime
print $EPOCHSECONDS
strftime '%Y-%m-%d' $EPOCHSECONDS
zmodload zsh/mapfile
print ${(f)mapfile[/etc/hosts]}
zmodload              # list loaded modules
```

`zsh/stat` adds `stat`, and `zsh/files` adds builtin file commands.

See: [Modules](https://zsh.sourceforge.io/Doc/Release/Zsh-Modules.html)

### Process substitution and multios

```bash
diff <(sort a) <(sort b)     # FIFOs
vim =(curl -s example.com)   # temp file
cat <a <b                    # read both
print hi >a >b               # write both
print =ls                    # path to ls
```

`<(cmd)` is read-only; `=(cmd)` is a regular file that programs can rewrite. Multios fan input or output across several redirections.

See: [Process substitution](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Process-Substitution)

### Helpers

```bash
autoload -Uz zargs
zargs -n 100 -- **/*.log -- gzip
autoload -Uz zcalc
zcalc -e '2**10'    # 1024
```

`zargs` batches a long argument list, like `xargs`; `zcalc` evaluates arithmetic, with `-f` for floats.

See: [User contributions](https://zsh.sourceforge.io/Doc/Release/User-Contributions.html)

## Also see

- [Bash cheatsheet](./bash)
- [Zsh manual](https://zsh.sourceforge.io/Doc/Release/)
- [Zsh FAQ](https://zsh.sourceforge.io/FAQ/)
- [zsh-lovers](https://grml.org/zsh/zsh-lovers.html)
