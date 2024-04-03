---
title: Fish shell
category: CLI
prism_languages: [fish]
updated: 2018-01-31
weight: -1
---

### Keys

| Shortcut            | Description                           |
| ---                 | ---                                   |
| `^A ←`/`^E →`       | Move to the line beginning/end        |
| `Alt ←`/`Alt →`     | Jump to the previous/next word        |
| `↑`/`↓`             | Switch to the previous/next command   |
| `Alt ↑`/`Alt ↓`     | Switch to the previous/next arguments |
| ---                 | ---                                   |
| `^U`                | Delete to the beginning               |
| `^C`                | Cancel the line                       |
| ---                 | ---                                   |
| `Alt H`             | Show the command man page description |
| `Alt W`             | Show the short command description    |
| ---                 | ---                                   |
| `Alt .`             | Repeat last argument                  |

### Sample program

```fish
#!/usr/bin/env fish

echo 'Hello from Fish!'
```

### Comments

```fish
# my comment
```

### Printing text

```fish
echo 'Hello from Fish!'
# or
printf '%s\n' 'Hello from Fish!'
```

Print the string with a trailing `\n`.

### Reading from stdin

```fish
read my_variable
```

Reads the string to a variable `my_variable`.

### Loops

```fish
for i in (seq 1 10)
  ...
end
```

## Variables

### Defining and erasing

```fish
# Declare the global/local variable:
set my_variable 'Hello from Fish!'

i# Remove the variable:
set --erase my_variable
```

### Slicing

```fish
echo $my_variable[1..10]
echo $my_variable[2..]
echo $my_variable[..-2]
```

## Numbers

### Incrementing and decrementing

```fish
set my_variable (math $my_variable + 1)
set my_variable (math $my_variable - 1)
```

### Arithmetic

```fish
echo (math 1 + 2)
```

| Operator            | Performs       |
| ---                 | ---            |
| `+`                 | Addition       |
| `-`                 | Subtraction    |
| `*`                 | Multiplication |
| `/`                 | Division       |
| `%`                 | Modulo         |
| `^`                 | Exponentiation |

## Strings

### Matching

Match the string against a regular expression:

```fish
string match --regex --entire 'Fish' 'Hello from Fish!'
```

| Pattern             | Matches                   |
| ---                 | ---                       |
| `x?`                | Zero or one `x` chars     |
| `x*`                | Any count `x` chars       |
| `x+`                | One or more  `x` chars    |
| `x{n}`              | n times `x` chars         |
| `x{n,m}`            | n to m times `x` chars    |
| `x{n,}`             | n or more times `x` chars |
| `[xy]`              | `x` or y char             |
| `[^xy]`             | not `x` or y char         |
| ---                 | ---                 |
| `\w`                | Word character      |
| `\d`                | Digit character     |
| `\W`                | Not word character  |
| `\D`                | Not digit character |

Perl compatible regular expressions are described here.

### Replacing

```fish
# Replaces the first match
string replace --regex 'Fish' 'fish' 'Hello from Fish!'

# Replaces all matches
string replace --regex --all 'Fish' 'fish' 'Hello from Fish!'
```

## Conditionals

### If/else

```fish
if test $my_variable -lt $another_variable
  ···
else if test $my_variable -eq $another_variable
  ···
else
  ···
end
```

### Comparisons

#### Numbers

| Number operator     | Meaning                                   |
| ---                 | ---                                       |
| `-lt`               | [L]ess [t]han                             |
| `-eq`               | [Eq]ual                                   |
| `-gt`               | [G]reater [t]han                          |
| `-le`               | [L]ess than or [e]qual to                 |
| `-ge`               | [G]reater than or [e]qual to              |
| `-ne`               | [N]ot [E]qual                             |

#### Strings

| String operator     | Meaning                                   |
| ---                 | ---                                       |
| `=`                 | [Eq]ual                                   |
| `!=`                | [N]ot [E]qual                             |

#### Files

| File operator       | Meaning                                   |
| ---                 | ---                                       |
| `-f`                | [F]ile exists                             |
| `-d`                | [D]irectory exists                        |
| `-r`                | File or directory exists and [r]eadable   |
| `-w`                | File or directory exists and [w]ritable   |
| `-x`                | File or directory exists and e[x]ecutable |


## Process communication

### Writing to files

```fish
# Overwrite file
echo 'Hello from Fish!' > my_file

# Append to file
echo 'Hello from Fish!' >> my_file
```

### Piping

```fish
my_command | another_command
```

Passes the first command stdout output as an input to a second command.

### Command substitution

```fish
echo (math $my_variable + 1)
```

The `(...)` expression is substituted with the output of the command inside it.


### Process substitution

```fish
echo (math $my_variable + 1 | psub)
```

The `(... | psub)` expression is substituted with a temporary file with the command's output.

## Functions

### Defining and erasing

```fish
# Declare the function
function my_function --description 'My description'
  ···
end

# Remove the function
functions --erase my_function
```

## Events

### Emitting

```fish
emit my_event
```

Emits an event that can be picked up by other functions.

### Event handling

```fish
function my_hook --on-event my_event
  ···
end
```

Reacts to the `my_event` event.

## Abbreviations

### Defining and erasing

```fish
# Declare the abbreviation
abbr --add grh "git reset --hard HEAD"
```


```fish
# Remove the abbreviation
abbr --erase grh
```

## Completions

### Defining completions

```fish
complete --command mycommand --arguments 'install uninstall'
complete --command mycommand --short-option 'h' --long-option 'help' --description 'Display help'
```

| Option              | Description                                          |
| ---                 | ---                                                  |
| `--arguments`       | Arguments to the command itself or option            |
| `--short-option`    | Short option                                         |
| `--long-option`     | Long option                                          |
| `--no-files`        | Don't suggest files                                  |
| `--force-files`     | Suggest files                                        |
| `--condition`       | Display the hint only when a given condition is true |
| `--description`     | Description                                          |

Declares the completion for a command.

### Removing completions

```fish
complete --command mycommand --erase
```

## Useful built-in functions

| Function                              | Description                                                   |
| ---                                   | ---                                                           |
| `__fish_seen_argument`                | Check whether the specified argument is used                  |
| `__fish_seen_subcommand_from`         | Check whether the specified subcommand is used                |
| `__fish_use_subcommand`               | Check whether any subcommand is used                          |
| ---                                   | ---                                                           |
| `__fish_complete_directories`         | Complete directories with the specified letters in their name |
| `__fish_complete_suffix`              | Complete files with the specified suffix                      |
| ---                                   | ---                                                           |
| `__fish_complete_users`               | List all users                                                |
| `__fish_complete_groups`              | List all user groups                                          |
| `__fish_print_hostnames`              | List all host names                                           |
| `__fish_complete_pids`                | List all PIDs                                                 |
| `__fish_print_filesystems`            | List all known filesystems                                    |
| `__fish_print_interfaces`             | List all network interfaces                                   |
