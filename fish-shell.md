---
title: Fish shell
category: CLI
prism_languages: [fish]
updated: 2026-11-14
weight: -1
intro: |
  fish ships with autosuggestions, syntax highlighting, and tab completions for
  common commands. Scripts use fish's own syntax rather than POSIX sh.
links:
  - title: Documentation
    url: https://fishshell.com/docs/current/index.html
  - title: GitHub repository
    url: https://github.com/fish-shell/fish-shell
---

## Basics

### Comments and printing

```fish
# my comment
echo 'Hello from Fish!'
printf '%s\n' 'Hello from Fish!'
```

`echo` adds a newline; `printf` takes a format string.

See: [Comments](https://fishshell.com/docs/current/language.html#comments)

### Variables

```fish
set my_variable 'Hello from Fish!'
set --erase my_variable
```

`set` stores a list even when given one value; `echo $my_variable` expands it.

See: [Variables](https://fishshell.com/docs/current/language.html#variables)

### Variable scope

```fish
set -l local_var 1     # current block
set -g global_var 1    # current session
set -U universal_var 1 # every session
set -x EDITOR nvim     # exported to children
```

`-l`, `-g`, and `-U` choose where a variable lives; `-x` exports it.

See: [Variables](https://fishshell.com/docs/current/language.html#variables)

### Inspecting variables

```fish
set --show PATH
set --query EDITOR; and echo 'editor is set'
```

`--show` prints scope and value; `--query` sets `$status` without printing.

See: [set](https://fishshell.com/docs/current/cmds/set.html)

## Keys

### Moving around

| Shortcut                 | Description               |
| ---                      | ---                       |
| `Left` / `Right`         | Move one character        |
| `Alt Left` / `Alt Right` | Move one word             |
| `Alt <` / `Alt >`        | Start/end of commandline  |
| `^A` / `^E`              | Start/end of line         |

See: [Shared bindings](https://fishshell.com/docs/current/interactive.html#shared-bindings)

### Editing the line

| Shortcut        | Description                     |
| ---             | ---                             |
| `^U`            | Kill to start of line           |
| `^K`            | Kill to end of line             |
| `^W`            | Kill previous path component    |
| `Alt Backspace` | Kill previous word              |
| ---             | ---                             |
| `^C`            | Cancel the line                 |
| `^D`            | Delete character; exit if empty |
| `^L`            | Clear the screen                |
| `^Z` / `^_`     | Undo the last edit              |

See: [Emacs mode](https://fishshell.com/docs/current/interactive.html#emacs-mode)

### History and completion

| Shortcut              | Description                     |
| ---                   | ---                             |
| `Tab`                 | Complete the current token      |
| `Shift Tab`           | Complete and search the pager   |
| `Up` / `Down`         | Previous/next command           |
| `Alt Up` / `Alt Down` | Previous/next argument          |
| `^R`                  | Search history                  |

See: [History search](https://fishshell.com/docs/current/interactive.html#searchable-command-history)

## Lists and math

### Slicing

```fish
set v a b c
echo $v[1]    # a
echo $v[1..2] # a b
echo $v[2..]  # b c
echo $v[-1]   # c
```

Indexes count from 1; negative indexes start at the end.

See: [Slices](https://fishshell.com/docs/current/language.html#expand-slices)

### Numbers

```fish
set count (math $count + 1)
echo (math '2 ^ 10')
```

`math` prints the result; capture it with `(...)`.

#### Operators

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

`--quiet` sets `$status` instead of printing.

#### Patterns

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

See: [string match](https://fishshell.com/docs/current/cmds/string.html#match-subcommand)

### Replacing

```fish
# Replaces the first match
string replace --regex 'Fish' 'fish' 'Hello from Fish!'

# Replaces all matches
string replace --regex --all 'Fish' 'fish' 'Hello from Fish!'
```

Add `--all` to replace every match.

See: [string replace](https://fishshell.com/docs/current/cmds/string.html#replace-subcommand)

### Transforming

```fish
string upper 'Hello'  # HELLO
string lower 'Hello'  # hello
string trim '  hi  '  # hi
string length 'Hello' # 5
```

See: [string upper](https://fishshell.com/docs/current/cmds/string.html#upper-subcommand)

### Splitting and joining

```fish
string split , 'a,b,c'   # a b c
string join , a b c      # a,b,c
string collect (printf 'a\nb\n')  # joins lines
```

`string split` returns a list; `string join` takes one.

See: [string split](https://fishshell.com/docs/current/cmds/string.html#split-and-split0-subcommands)

## Control flow

### If/else

```fish
if test $my_variable -lt $another_variable
  echo 'less'
else if test $my_variable -eq $another_variable
  echo 'equal'
else
  echo 'greater'
end
```

See: [Conditions](https://fishshell.com/docs/current/language.html#syntax-conditional)

### Tests

```fish
test -d /tmp; and echo 'directory'
test -f /nope; or echo 'missing'
```

`and` and `or` run the next command based on `$status`; `&&` and `||` work too.

#### Numbers

| Operator | Meaning               |
| ---      | ---                   |
| `-lt`    | Less than             |
| `-eq`    | Equal                 |
| `-gt`    | Greater than          |
| `-le`    | Less than or equal    |
| `-ge`    | Greater than or equal |
| `-ne`    | Not equal             |

#### Strings

| Operator | Meaning   |
| ---      | ---       |
| `=`      | Equal     |
| `!=`     | Not equal |

#### Files

| Operator | Meaning               |
| ---      | ---                   |
| `-f`     | File exists           |
| `-d`     | Directory exists      |
| `-r`     | Exists and readable   |
| `-w`     | Exists and writable   |
| `-x`     | Exists and executable |

See: [Conditions](https://fishshell.com/docs/current/language.html#conditions)

### Switch

```fish
switch $my_variable
  case 'Yes'
    echo 'Affirmative'
  case '*'
    echo 'Anything else'
end
```

`case '*'` is the default branch.

See: [Conditions](https://fishshell.com/docs/current/language.html#conditions)

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

Arguments arrive in `$argv`.

See: [Functions](https://fishshell.com/docs/current/language.html#functions)

### Editing functions

```fish
funced my_function    # edit in $EDITOR
funcsave my_function  # write to config
```

`funced` opens the function; `funcsave` persists it.

See: [funced](https://fishshell.com/docs/current/cmds/funced.html)

## Processes

### Pipes and redirection

```fish
my_command | another_command
my_command &| another_command  # pipes stdout and stderr
my_command > out.txt 2>&1
my_command < in.txt
```

`&|` pipes both streams; `2>&1` merges stderr into stdout.

See: [Pipes](https://fishshell.com/docs/current/language.html#pipes)

### Command substitution

```fish
echo (math 1 + 2)
echo $(math 1 + 2)        # fish 3.4+
echo (my_command | psub)  # gives a temp file path
```

`psub` turns command output into a file for programs that need one.

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

See: [path](https://fishshell.com/docs/current/cmds/path.html)

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

`complete` registers options for tab completion.

#### Completion options

| Option           | Description                        |
| ---              | ---                                |
| `--arguments`    | Arguments to the command or option |
| `--short-option` | Short option                       |
| `--long-option`  | Long option                        |
| `--no-files`     | Don't suggest files                |
| `--force-files`  | Suggest files                      |
| `--condition`    | Only suggest under a condition     |
| `--description`  | Description in the pager           |

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
