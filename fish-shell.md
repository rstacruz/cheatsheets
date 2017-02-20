---
title: Fish shell
category: CLI
---

## Function

    function my_function
      ..
    end

    --description "My description"

### Conditional

    if test -f foo.txt
    else if test -f bar.txt
    else
    end

### Combining tests

    test -f foo.txt -a -f bar.txt
    test \( -f foo.txt \) -a -f \( bar.txt \)

### Events

    emit my_event

    function myhook --on-event my_event
      ...
    end

## Completions

### Creating completions

    # ~/.fish/completions/mycommand.fish
    complete -c mycommand ...
    complete -c mycommand ...
    complete -c mycommand ...

### Options

  -c command
  -s short option
  -l long option
  -r, --require-parameter
  -f, --no-files
  -x exclusive (-r -f)
  -n '__fish_use_subcommand' condition 
  --description ".."
  # complete -c $cmd -n '__fish_use_subcommand' -x -a hello --description 'lol'


### Conditions

    __fish_complete_directories STRING DESCRIPTION performs path completion on STRING, allowing only directories, and giving them the description DESCRIPTION.
    __fish_complete_path STRING DESCRIPTION performs path completion on STRING, giving them the description DESCRIPTION.
    __fish_complete_groups prints a list of all user groups with the groups members as description.
    __fish_complete_pids prints a list of all processes IDs with the command name as description.
    __fish_complete_suffix SUFFIX performs file completion allowing only files ending in SUFFIX. The mimetype database is used to find a suitable description.
    __fish_complete_users prints a list of all users with their full name as description.
    __fish_print_filesystems prints a list of all known file systems. Currently, this is a static list, and not dependent on what file systems the host operating system actually understands.
    __fish_print_hostnames prints a list of all known hostnames. This functions searches the fstab for nfs servers, ssh for known hosts and checks the /etc/hosts file.
    __fish_print_interfaces prints a list of all known network interfaces.
    __fish_print_packages prints a list of all installed packages. This function currently handles Debian, rpm and Gentoo packages.

    __fish_use_subcommand
    __fish_seen_subcommand_from init


    complete -c ruby -s X -x -a '(__fish_complete_directories (commandline -ct))' --description 'Directory'

### Examples

Start each example with `complete -c cmdname`

  -x
    # no filename completion
    
  -s d -x -a "read skip"
    # -d {read|skip}

  -s d -x
    # -d <something>
 
  -s f -r
    # -f FILE

  -s f -l force
    # -f, --force

  -a "(cat /etc/passwd | cut -d : -f 1)"
    # first argument as filename

### Keys

| `Alt ←` `Alt →` | Move word |
| `^U` | delete to beginning |
| `^W` | delete to previous `/` |
| `Alt D` | delete next word |
{:.shortcuts}

| `Alt H` | help on word (man) |
| `Alt W` | help on word (short descriptions) |
| `Alt L` | list directory on cursor |
{:.shortcuts}

| `Alt ↑` | search keywords |
{:.shortcuts}
