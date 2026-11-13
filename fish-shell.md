---
title: Fish shell
category: CLI
prism_languages: [fish]
updated: 2026-11-14
weight: -1
intro: |
  [fish](https://fishshell.com/) is a user-friendly command-line shell. This
  sheet targets fish 4.x; most scripting syntax also works on fish 3.x.
---

## Basics

### About
<!-- {: .-intro} -->

fish ships with autosuggestions, syntax highlighting, and tab completions
for common commands. Scripts use fish's own syntax rather than POSIX sh.

- [Documentation](https://fishshell.com/docs/current/index.html) _(fishshell.com)_
- [GitHub repository](https://github.com/fish-shell/fish-shell) _(github.com)_

### Keys

| Shortcut                 | Description                     |
| ---                      | ---                             |
| `Tab`                    | Complete the current token      |
| `Shift Tab`              | Complete and search the pager   |
| `Left` / `Right`         | Move one character              |
| `Alt Left` / `Alt Right` | Move one word                   |
| `Up` / `Down`            | Previous/next command           |
| `Alt Up` / `Alt Down`    | Previous/next argument          |
| ---                      | ---                             |
| `^A` / `^E`              | Start/end of line               |
| `^U`                     | Kill to start of line           |
| `^K`                     | Kill to end of line             |
| `^W`                     | Kill previous path component    |
| ---                      | ---                             |
| `^C`                     | Cancel the line                 |
| `^D`                     | Delete character; exit if empty |
| `^L`                     | Clear the screen                |
| `^R`                     | Search history                  |

See: [Shared bindings](https://fishshell.com/docs/current/interactive.html#shared-bindings)

### Comments and printing

```fish
# my comment
echo 'Hello from Fish!'
printf '%s\n' 'Hello from Fish!'
```

`echo` adds a newline; `printf` takes a format string.

### Variables

```fish
set my_variable 'Hello from Fish!'
set --erase my_variable
```

Pass a flag to choose where a variable lives:

```fish
set -l local_var 1     # current block
set -g global_var 1    # current session
set -U universal_var 1 # every session
set -x EDITOR nvim     # exported to children
```

Inspect and test:

```fish
set --show PATH
set --query EDITOR; and echo 'editor is set'
```

See: [Variables](https://fishshell.com/docs/current/language.html#variables)

### Slicing

```fish
set v a b c
echo $v[1]    # a
echo $v[1..2] # a b
echo $v[2..]  # b c
echo $v[-1]   # c
```

Indexes count from 1; negative indexes start at the end.

### Numbers

```fish
set count (math $count + 1)
echo (math '2 ^ 10')
```

| Operator | Performs       |
| ---      | ---            |
| `+`      | Addition       |
| `-`      | Subtraction    |
| `*`      | Multiplication |
| `/`      | Division       |
| `%`      | Modulo         |
| `^`      | Exponentiation |

See: [math](https://fishshell.com/docs/current/cmds/math.html)

## Strings

### Matching

```fish
string match --regex --entire 'Fish' 'Hello from Fish!'
string match --quiet 'Fish*' 'Hello from Fish!'
```

| Pattern   | Matches                   |
| ---       | ---                       |
| `x?`      | Zero or one `x` chars     |
| `x*`      | Any count of `x` chars    |
| `x+`      | One or more `x` chars     |
| `x{n}`    | n times `x` chars         |
| `x{n,m}`  | n to m times `x` chars    |
| `x{n,}`   | n or more `x` chars       |
| `[xy]`    | `x` or `y` char           |
| `[^xy]`   | Not `x` or `y` char       |
| ---       | ---                       |
| `\w`      | Word character            |
| `\d`      | Digit character           |
| `\W`      | Not word character        |
| `\D`      | Not digit character       |

See: [string](https://fishshell.com/docs/current/cmds/string.html)

### Replacing

```fish
# Replaces the first match
string replace --regex 'Fish' 'fish' 'Hello from Fish!'

# Replaces all matches
string replace --regex --all 'Fish' 'fish' 'Hello from Fish!'
```

### Transforming

```fish
string upper 'Hello'  # HELLO
string lower 'Hello'  # hello
string trim '  hi  '  # hi
string length 'Hello' # 5
```

### Splitting and joining

```fish
string split , 'a,b,c'   # a b c
string join , a b c      # a,b,c
string collect (printf 'a\nb\n')  # joins lines
```

`string split` returns a list; `string join` takes one.

## Control flow

### Conditionals

```fish
if test $my_variable -lt $another_variable
  echo 'less'
else if test $my_variable -eq $another_variable
  echo 'equal'
else
  echo 'greater'
end
```

Short-circuit with `and`/`or`, or `&&`/`||`:

```fish
test -d /tmp; and echo 'directory'
test -f /nope; or echo 'missing'
```

#### Numbers

| Operator | Meaning                  |
| ---      | ---                      |
| `-lt`    | [L]ess [t]han            |
| `-eq`    | [E]qual                  |
| `-gt`    | [G]reater [t]han         |
| `-le`    | Less than or equal       |
| `-ge`    | Greater than or equal    |
| `-ne`    | Not equal                |

#### Strings

| Operator | Meaning    |
| ---      | ---        |
| `=`      | Equal      |
| `!=`     | Not equal  |

#### Files

| Operator | Meaning                   |
| ---      | ---                       |
| `-f`     | File exists               |
| `-d`     | Directory exists          |
| `-r`     | Exists and readable       |
| `-w`     | Exists and writable       |
| `-x`     | Exists and executable     |

#### Switch

```fish
switch $my_variable
  case 'Yes'
    echo 'Affirmative'
  case '*'
    echo 'Anything else'
end
```

See: [Conditions](https://fishshell.com/docs/current/language.html#syntax-conditional)

### Loops

```fish
for i in (seq 1 3)
  echo "i=$i"
end

for file in *.txt
  echo $file
end

while true
  break
end
```

`break` and `continue` work inside loops.

See: [Loops](https://fishshell.com/docs/current/language.html#syntax-loops-and-blocks)

### Functions

```fish
function my_function --description 'My description'
  echo $argv[1]
end

functions --erase my_function
```

Arguments arrive in `$argv`. Edit and persist functions:

```fish
funced my_function    # edit in $EDITOR
funcsave my_function  # write to config
```

See: [Functions](https://fishshell.com/docs/current/language.html#functions)

## Processes

### Pipes and redirection

```fish
my_command | another_command
my_command &| another_command  # pipes stdout and stderr
my_command > out.txt 2>&1
my_command < in.txt
```

See: [Pipes](https://fishshell.com/docs/current/language.html#pipes)

### Command substitution

```fish
echo (math 1 + 2)
echo $(math 1 + 2)        # fish 3.4+
echo (my_command | psub)  # gives a temp file path
```

See: [Command substitution](https://fishshell.com/docs/current/language.html#command-substitution)

### Background jobs

```fish
my_command &
jobs
fg %1
bg %1
```

Job specs look like `%1`.

See: [Job control](https://fishshell.com/docs/current/language.html#job-control)

### Input

```fish
read name
read -s password      # no echo
read -P 'Name: ' name # prompt
```

`-s` hides typed input; `-P` prints a prompt.

See: [read](https://fishshell.com/docs/current/cmds/read.html)

## Paths

### The path builtin

```fish
path basename /usr/local/bin/fish  # fish
path dirname /usr/local/bin/fish   # /usr/local/bin
path extension src/main.rs         # .rs
path change-extension .js src/a.ts # src/a.js
path normalize ./src/../a.txt      # a.txt
```

`path filter` and `path is` take `-d`, `-f`, `-r`, `-w`, `-x`.

### Adding to PATH

```fish
fish_add_path ~/.local/bin
fish_add_path --prepend /opt/bin
```

It edits `fish_user_paths` and records it in universal variables.

See: [fish_add_path](https://fishshell.com/docs/current/cmds/fish_add_path.html)

## Interactive

### Abbreviations

```fish
abbr --add grh 'git reset --hard HEAD'
abbr --show
abbr --erase grh
```

Abbreviations expand while typing, in interactive shells only.

See: [Abbreviations](https://fishshell.com/docs/current/interactive.html#abbreviations)

### History

```fish
history search 'git commit'
history delete --contains 'secret'
history merge
```

`^R` opens the history pager.

See: [History](https://fishshell.com/docs/current/interactive.html#searchable-command-history)

### Completions

```fish
complete --command mycommand --arguments 'install uninstall'
complete --command mycommand --short-option h --long-option help
complete --command mycommand --erase
```

| Option           | Description                          |
| ---              | ---                                  |
| `--arguments`    | Arguments to the command or option   |
| `--short-option` | Short option                         |
| `--long-option`  | Long option                          |
| `--no-files`     | Don't suggest files                  |
| `--force-files`  | Suggest files                        |
| `--condition`    | Only suggest under a condition       |
| `--description`  | Description in the pager             |

See: [complete](https://fishshell.com/docs/current/cmds/complete.html)

### Key bindings

```fish
bind \cy 'echo hi'
bind --erase \cy
```

`fish_key_reader` prints the notation for a pressed key.

See: [bind](https://fishshell.com/docs/current/cmds/bind.html)

## Configuration

### Config files

```fish
# ~/.config/fish/config.fish
set -gx EDITOR nvim
fish_add_path ~/.local/bin
```

Snippets in `~/.config/fish/conf.d/` run first, in name order, then
`config.fish`. Universal variables persist in
`~/.local/share/fish/fish_variables`.

See: [Configuration](https://fishshell.com/docs/current/language.html#configuration-files)

### Status checks

```fish
status is-interactive
status is-login
status fish-path
```

`$status` holds the exit code of the last command.

See: [status](https://fishshell.com/docs/current/cmds/status.html)

## Also see

- [Tutorial](https://fishshell.com/docs/current/tutorial.html)
- [Fish for bash users](https://fishshell.com/docs/current/fish_for_bash_users.html)
- [Release notes](https://fishshell.com/docs/current/relnotes.html)
