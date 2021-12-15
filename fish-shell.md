---
title: Fish shell
category: CLI
layout: 2017/sheet
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

### Help

| `Alt H`             | Show the command man page description |
| `Alt W`             | Show the short command description    |

## Variables

### Defining and erasing

```fish
set my_variable "Hello from Fish!"
```

```fish
set --erase my_variable
```

### Incrementing and decrementing

```fish
set my_variable (math $my_variable + 1)
set my_variable (math $my_variable - 1)
```

### Slicing

```fish
set my_variable $another_variable[1..10]
set my_variable $another_variable[2..]
set my_variable $another_variable[..-2]
```

## Arithmetic

```fish
math 1 + 2
```

| Operator            | Performs       |
| ---                 | ---            |
| `+`                 | Addition       |
| `-`                 | Subtraction    |
| `*`                 | Multiplication |
| `/`                 | Division       |
| `%`                 | Modulo         |
| `^`                 | Exponentiation |

## String manipulation

```fish
string match --regex --entire 'Fish' 'Hello from Fish!'
```

```fish
string replace --regex 'Fish' 'fish' 'Hello from Fish!'
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

| Class               | Description         |
| ---                 | ---                 |
| `\w`                | Word character      |
| `\d`                | Digit character     |
| `\W`                | Not word character  |
| `\D`                | Not digit character |

## Conditionals

```fish
if test $my_variable -lt $another_variable
  ···
else if test $my_variable -eq $another_variable
  ···
else
  ···
end
```

| Operator            | Meaning                                   |
| ---                 | ---                                       |
| `-lt`               | [L]ess [t]han                             |
| `-eq`               | [Eq]ual                                   |
| `-gt`               | [G]reater [t]han                          |
| `-le`               | [L]ess than or [e]qual to                 |
| `-ge`               | [G]reater than or [e]qual to              |
| `-ne`               | [N]ot [E]qual                             |
| `-f`                | [F]ile exists                             |
| `-d`                | [D]irectory exists                        |
| `-r`                | File or directory exists and [r]eadable   |
| `-w`                | File or directory exists and [w]ritable   |
| `-x`                | File or directory exists and e[x]ecutable |

## Loops

```fish
for i in (seq 1 10)
  ...
end
```

## Command substitution

```fish
set my_variable (math $my_variable + 1)
```

## Functions

### Defining and erasing

```fish
function my_function --description "My description"
  ···
end
```

```fish
functions --erase my_function
```

### Event handling

```fish
function my_hook --on-event my_event
  ···
end
```

## Events

### Emitting

```fish
emit my_event
```

## Abbreviations

### Defining and erasing

```fish
abbr --add my_abbreviation echo "Hello from Fish!"
```

```fish
abbr --erase my_abbreviation
```

## Completions

### Defining and erasing

```fish
complete --command mycommand --arguments 'install uninstall'
complete --command mycommand --short-option 'h' --long-option 'help' --description 'Display help'
```

```fish
complete --command mycommand --erase
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
