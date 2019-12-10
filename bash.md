---
title: "Shell/Bash scripting"
category: CLI
layout: 2017/sheet
tags: [Featured]
updated: 2019-21-10
keywords:
  - Variables
  - Functions
  - Interpolation
  - Brace expansions
  - Loops
  - Conditional execution
  - Command substitution
---

Getting started
---------------
{: .-three-column}

**ALWAYS USE SHELLCHECK IF YOU ARE WRITING SHELL/BASH SCRIPT!!**
- https://github.com/koalaman/shellcheck

### Example

```sh
#!/bin/sh

die() {
    err_code="$1"
    message="$2"

    case $err_code in
        0) printf 'DEBUG: %s\n' "Script returned true" ;;
        1)
            if [ -n "$message" ]; then
                printf 'FATAL: %s\n' "$message"
            elif [ -z "$message" ]; then
                printf 'FATAL: %s\n' "Script returned false"
            fi
        ;;
        2) printf 'FATAL: %s\n' "Syntax error" ;;
        3) printf 'FATAL: %s\n' "Insufficient permission" ;;
        *) printf 'FATAL: %s\n' "Unknown error code '$err_code' has been parsed in function die()"
    esac

    [ "$err_code" != 0 ] && exit $err_code

    unset message err_code
}

# Exit if end-user is not root
[ -n "$(id -u)" ] && die 3

# Capture arguments
## While amount of arguments is greater then '1' do case in first argument in..
while [ $# -gt 1 ]; do case $1 in
    /*) # Full unix path
        destdir="$1'
        shift 1

        if [ ! -d "$destdir" ]; then
            mkdir "$destdir" || die 1 "Unable to make new directory in $destdir"
        elif [ -d "$destdir" ]; then
            printf 'DEBUG: %s\n' "Directory '$destdir' already exists"
        fi

        url="https://dev.exherbo.org/stages/exherbo-x86_64-pc-linux-gnu-current.tar.xz"

        if ! command -v wget 2>/dev/null; then die 1 "wget is not available on this system"; fi

        wget https://dev.exherbo.org/stages/exherbo-x86_64-pc-linux-gnu-current.tar.xz -O "$destdir/${url##}https://dev.exherbo.org/stages/"

        unset url
    ;;
    *) die 2
esac; done
```

### Basics

```sh
name="John"
printf '%s\n' "${name}"        # Returns John
printf '%s\n' "${name/J/j}"    # Returns "john" (substitution)
printf '%s\n' "${name:0:2}"    # Returns "Jo" (slicing)
printf '%s\n' "${name::2}"     # Returns "Jo" (slicing)
printf '%s\n' "${name::-1}"    # Returns "Joh" (slicing)
printf '%s\n' "${name:(-1)}"   # Returns "n" (slicing from right)
printf '%s\n' "${name:(-2):1}" # Returns "h" (slicing from right)
printf '%s\n' "${food:-Cake}"  # Returns $food or "Cake"
```

```sh
length=2
printf '%s\n' "${name:0:length}"  # Returns "Jo"
```

See: [Parameter expansion](http://wiki.bash-hackers.org/syntax/pe)

```sh
STR=/path/to/foo.cpp
printf '%s\n' "${STR%.cpp}"    # Returns /path/to/foo
printf '%s\n' "${STR%.cpp}.o"  # Returns /path/to/foo.o

printf '%s\n' "${STR##*.}"     # Returns cpp (extension)
printf '%s\n' "${STR##*/}"     # Returns foo.cpp (basepath)

printf '%s\n' "${STR#*/}"      # Returns path/to/foo.cpp
printf '%s\n' "${STR##*/}"     # Returns foo.cpp

printf '%s\n' "${STR/foo/bar}" # Returns /path/to/bar.cpp
```

```sh
SRC=/path/to/foo.cpp
BASE="${SRC##*/}"   # Stores 'foo.cpp' (basepath) in BASE variable
DIR="${SRC%$BASE}"  # Stores '/path/to/' (dirpath) in DIR variable
```

See [Manipulating Strings](https://www.tldp.org/LDP/abs/html/string-manipulation.html)

### Variables

Declaring variables
```sh
# Declare variable 'NAME' for current program
NAME="John"

# Declare variable 'NAME' for terminal session
export NAME="John

# Declare variable 'NAME' for in function only

# Bash only (Not compatible with POSIX)
func() {
    local NAME="John"
    printf '%s\n' "$NAME" # Returns John
}
printf '%s\n' "$NAME" # Returns blank

# Shell/Bash (Preffered for POSIX compatibility)
func() {
    NAME="John"
    printf '%s\n' "$NAME" # Returns John

    # Unset value of variable 'NAME'
    unset NAME

    printf '%s\n' "$NAME" # Returns blank
}
printf '%s\n' "$NAME" # Returns blank
```

### String quotes

```ba
NAME="John"
printf '%s\n' "Hi $NAME"  # Returns 'Hi John'
printf '%s\n' 'Hi $NAME'  # Returns 'Hi $NAME' (single quotes are used to take the value literally)
```

### Shell execution

```sh
# Valid
printf '%s\n' "I'm in $(pwd)" # Returns 'I'm in <current_working_directory>'
# Same, but not recommended -> breaks SC2006 (https://github.com/koalaman/shellcheck/wiki/SC2006)
printf '%s\n' "I'm in `pwd`" # Returns 'I'm in <current_working_directory>'
```

See [Command substitution](http://wiki.bash-hackers.org/syntax/expansion/cmdsubst)

### Conditional execution

&& = AND
|| = OR

```sh
# Executes nothing if something returned true
# Does NOT execute nothing is something returned false
something && nothing

# Executes nothing if something returned false
something || nothing

# Examples

## Git commit and push
git commit -m something && git push
git commit -m something || printf '%s\n' "Commit failed"

## Executes 'git commit -m something' and depending on exit status executes either 'printf ..' or 'git push'
{ git commit -m something || printf '%s\n' "Commit failed" ;} && git push
```

Exit code can be check using `$?` after the command was executed
```console
user@system~$ true
user@system~$ printf '%s\n' "$?"
0
user@system~$ false
user@system~$ printf '%s\n' "$?"
1
```

See [Exit codes](http://tldp.org/LDP/abs/html/exitcodes.html#EXITCODESREF)

### Functions
{: id='functions-example'}

```sh
get_name() {
  printf '%s\n' "John"
}

printf '%s\n' "You are $(get_name)" # Returns 'You are John'
```

See: [Functions](#functions)

### Conditionals
{: id='conditionals-example'}

```sh
if [ -z "$string" ]; then
  printf '%s\n' "String is empty"
elif [ -n "$string" ]; then
  printf '%s\n' "String is not empty"
fi
```

See: [Conditionals](#conditionals)

### Strict mode

```bash
set -euo pipefail
IFS=$'\n\t'
```

See: [Unofficial bash strict mode](http://redsymbol.net/articles/unofficial-bash-strict-mode/)

### Brace expansion

```bash
printf '%s\n' {A,B}.js
```

| `{A,B}` | Same as `A B` |
| `{A,B}.js` | Same as `A.js B.js` |
| `{1..5}` | Same as `1 2 3 4 5` |

See: [Brace expansion](http://wiki.bash-hackers.org/syntax/expansion/brace)


Parameter expansions
--------------------
{: .-three-column}

### Substitution

| Code | Description |
| --- | --- |
| `${FOO%suffix}` | Remove suffix |
| `${FOO#prefix}` | Remove prefix |
| --- | --- |
| `${FOO%%suffix}` | Remove long suffix |
| `${FOO##prefix}` | Remove long prefix |
| --- | --- |
| `${FOO/from/to}` | Replace first match |
| `${FOO//from/to}` | Replace all |
| --- | --- |
| `${FOO/%from/to}` | Replace suffix |
| `${FOO/#from/to}` | Replace prefix |

### Comments

```bash
# Single line comment
```

```bash
: '
This is a
multi line
comment
'
```

### Substrings

| `${FOO:0:3}`  | Substring _(position, length)_ |
| `${FOO:-3:3}` | Substring from the right |

### Length

| `${#FOO}` | Length of `$FOO` |

### Manipulation

```bash
STR="HELLO WORLD!"
printf '%s\n' ${STR,}   #=> "hELLO WORLD!" (lowercase 1st letter)
printf '%s\n' ${STR,,}  #=> "hello world!" (all lowercase)

STR="hello world!"
printf '%s\n' ${STR^}   #=> "Hello world!" (uppercase 1st letter)
printf '%s\n' ${STR^^}  #=> "HELLO WORLD!" (all uppercase)
```


### Default values

| `${FOO:-val}`        | `$FOO`, or `val` if not set |
| `${FOO:=val}`        | Set `$FOO` to `val` if not set |
| `${FOO:+val}`        | `val` if `$FOO` is set |
| `${FOO:?message}`    | Show error message and exit if `$FOO` is not set |

The `:` is optional (eg, `${FOO=word}` works)

Loops
-----
{: .-three-column}

### Basic for loop

```bash
for i in /etc/rc.*; do
  printf '%s\n' $i
done
```

### C-like for loop

```bash
for ((i = 0 ; i < 100 ; i++)); do
  printf '%s\n' $i
done
```

### Ranges

```bash
for i in {1..5}; do
    printf '%s\n' "Welcome $i"
done
```

#### With step size

```bash
for i in {5..50..5}; do
    printf '%s\n' "Welcome $i"
done
```

### Reading lines

```bash
< file.txt | while read line; do
  printf '%s\n' $line
done
```

### Forever

```bash
while true; do
  ···
done
```

Functions
---------
{: .-three-column}

### Defining functions

```bash
myfunc() {
    printf '%s\n' "hello $1"
}
```

```bash
# Same as above (alternate syntax)
function myfunc() {
    printf '%s\n' "hello $1"
}
```

```bash
myfunc "John"
```

### Returning values

```bash
myfunc() {
    local myresult='some value'
    printf '%s\n' $myresult
}
```

```bash
result="$(myfunc)"
```

### Raising errors

```bash
myfunc() {
  return 1
}
```

```bash
if myfunc; then
  printf '%s\n' "success"
else
  printf '%s\n' "failure"
fi
```

### Arguments

| Expression | Description                        |
| ---        | ---                                |
| `$#`       | Number of arguments                |
| `$*`       | All arguments                      |
| `$@`       | All arguments, starting from first |
| `$1`       | First argument                     |

See [Special parameters](http://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables).

Conditionals
------------
{: .-three-column}

### Conditions

Note that `[[` is actually a command/program that returns either `0` (true) or `1` (false). Any program that obeys the same logic (like all base utils, such as `grep(1)` or `ping(1)`) can be used as condition, see examples.

| Condition                | Description           |
| ---                      | ---                   |
| `[[ -z STRING ]]`        | Empty string          |
| `[[ -n STRING ]]`        | Not empty string      |
| `[[ STRING == STRING ]]` | Equal                 |
| `[[ STRING != STRING ]]` | Not Equal             |
| ---                      | ---                   |
| `[[ NUM -eq NUM ]]`      | Equal                 |
| `[[ NUM -ne NUM ]]`      | Not equal             |
| `[[ NUM -lt NUM ]]`      | Less than             |
| `[[ NUM -le NUM ]]`      | Less than or equal    |
| `[[ NUM -gt NUM ]]`      | Greater than          |
| `[[ NUM -ge NUM ]]`      | Greater than or equal |
| ---                      | ---                   |
| `[[ STRING =~ STRING ]]` | Regexp                |
| ---                      | ---                   |
| `(( NUM < NUM ))`        | Numeric conditions    |

| Condition              | Description              |
| ---                    | ---                      |
| `[[ -o noclobber ]]`   | If OPTIONNAME is enabled |
| ---                    | ---                      |
| `[[ ! EXPR ]]`         | Not                      |
| `[[ X ]] && [[ Y ]]`   | And                      |
| `[[ X ]] || [[ Y ]]`   | Or                       |

### File conditions

| Condition               | Description             |
| ---                     | ---                     |
| `[[ -e FILE ]]`         | Exists                  |
| `[[ -r FILE ]]`         | Readable                |
| `[[ -h FILE ]]`         | Symlink                 |
| `[[ -d FILE ]]`         | Directory               |
| `[[ -w FILE ]]`         | Writable                |
| `[[ -s FILE ]]`         | Size is > 0 bytes       |
| `[[ -f FILE ]]`         | File                    |
| `[[ -x FILE ]]`         | Executable              |
| ---                     | ---                     |
| `[[ FILE1 -nt FILE2 ]]` | 1 is more recent than 2 |
| `[[ FILE1 -ot FILE2 ]]` | 2 is more recent than 1 |
| `[[ FILE1 -ef FILE2 ]]` | Same files              |

### Example

```bash
# String
if [[ -z "$string" ]]; then
  printf '%s\n' "String is empty"
elif [[ -n "$string" ]]; then
  printf '%s\n' "String is not empty"
fi
```

```bash
# Combinations
if [[ X ]] && [[ Y ]]; then
  ...
fi
```

```bash
# Equal
if [[ "$A" == "$B" ]]
```

```bash
# Regex
if [[ "A" =~ "." ]]
```

```bash
if (( $a < $b )); then
   printf '%s\n' "$a is smaller than $b"
fi
```

```bash
if [[ -e "file.txt" ]]; then
  printf '%s\n' "file exists"
fi
```

Arrays
------

### Defining arrays

```bash
Fruits=('Apple' 'Banana' 'Orange')
```

```bash
Fruits[0]="Apple"
Fruits[1]="Banana"
Fruits[2]="Orange"
```

### Working with arrays

```bash
printf '%s\n' ${Fruits[0]}           # Element #0
printf '%s\n' ${Fruits[@]}           # All elements, space-separated
printf '%s\n' ${#Fruits[@]}          # Number of elements
printf '%s\n' ${#Fruits}             # String length of the 1st element
printf '%s\n' ${#Fruits[3]}          # String length of the Nth element
printf '%s\n' ${Fruits[@]:3:2}       # Range (from position 3, length 2)
```

### Operations

```bash
Fruits=("${Fruits[@]}" "Watermelon")    # Push
Fruits+=('Watermelon')                  # Also Push
Fruits=( ${Fruits[@]/Ap*/} )            # Remove by regex match
unset Fruits[2]                         # Remove one item
Fruits=("${Fruits[@]}")                 # Duplicate
Fruits=("${Fruits[@]}" "${Veggies[@]}") # Concatenate
lines=(`cat "logfile"`)                 # Read from file
```

### Iteration

```bash
for i in "${arrayName[@]}"; do
  printf '%s\n' $i
done
```

Dictionaries
------------
{: .-three-column}

### Defining

```bash
declare -A sounds
```

```bash
sounds[dog]="bark"
sounds[cow]="moo"
sounds[bird]="tweet"
sounds[wolf]="howl"
```

Declares `sound` as a Dictionary object (aka associative array).

### Working with dictionaries

```bash
printf '%s\n' ${sounds[dog]} # Dog's sound
printf '%s\n' ${sounds[@]}   # All values
printf '%s\n' ${!sounds[@]}  # All keys
printf '%s\n' ${#sounds[@]}  # Number of elements
unset sounds[dog]   # Delete dog
```

### Iteration

#### Iterate over values

```bash
for val in "${sounds[@]}"; do
  printf '%s\n' $val
done
```

#### Iterate over keys

```bash
for key in "${!sounds[@]}"; do
  printf '%s\n' $key
done
```

Options
-------

### Options

```bash
set -o noclobber  # Avoid overlay files (printf '%s\n' "hi" > foo)
set -o errexit    # Used to exit upon error, avoiding cascading errors
set -o pipefail   # Unveils hidden failures
set -o nounset    # Exposes unset variables
```

### Glob options

```bash
set -o nullglob    # Non-matching globs are removed  ('*.foo' => '')
set -o failglob    # Non-matching globs throw errors
set -o nocaseglob  # Case insensitive globs
set -o globdots    # Wildcards match dotfiles ("*.sh" => ".foo.sh")
set -o globstar    # Allow ** for recursive matches ('lib/**/*.rb' => 'lib/a/b/c.rb')
```

Set `GLOBIGNORE` as a colon-separated list of patterns to be removed from glob
matches.

History
-------

### Commands

| `history` | Show history |
| `shopt -s histverify` | Don't execute expanded result immediately |

### Expansions

| `!$` | Expand last parameter of most recent command |
| `!*` | Expand all parameters of most recent command |
| `!-n` | Expand `n`th most recent command |
| `!n` | Expand `n`th command in history |
| `!<command>` | Expand most recent invocation of command `<command>` |

### Operations

| `!!` | Execute last command again |         
| `!!:s/<FROM>/<TO>/` | Replace first occurrence of `<FROM>` to `<TO>` in most recent command |
| `!!:gs/<FROM>/<TO>/` | Replace all occurrences of `<FROM>` to `<TO>` in most recent command |
| `!$:t` | Expand only basename from last parameter of most recent command |
| `!$:h` | Expand only directory from last parameter of most recent command |

`!!` and `!$` can be replaced with any valid expansion.

### Slices

| `!!:n` | Expand only `n`th token from most recent command (command is `0`; first argument is `1`) |
| `!^` | Expand first argument from most recent command |
| `!$` | Expand last token from most recent command |
| `!!:n-m` | Expand range of tokens from most recent command |
| `!!:n-$` | Expand `n`th token to last from most recent command |

`!!` can be replaced with any valid expansion i.e. `!cat`, `!-2`, `!42`, etc.


Miscellaneous
-------------

### Numeric calculations

```bash
$((a + 200))      # Add 200 to $a
```

```bash
$((RANDOM%=200))  # Random number 0..200
```

### Subshells

```bash
(cd somedir; printf '%s\n' "I'm now in $PWD")
pwd # still in first directory
```

### Redirection

```bash
python hello.py > output.txt   # stdout to (file)
python hello.py >> output.txt  # stdout to (file), append
python hello.py 2> error.log   # stderr to (file)
python hello.py 2>&1           # stderr to stdout
python hello.py 2>/dev/null    # stderr to (null)
python hello.py &>/dev/null    # stdout and stderr to (null)
```

```bash
python hello.py < foo.txt      # feed foo.txt to stdin for python
```

### Inspecting commands

```bash
command -V cd
#=> "cd is a function/alias/whatever"
```

### Trap errors

```bash
trap 'printf '%s\n' Error at about $LINENO' ERR
```

or

```bash
traperr() {
  printf '%s\n' "ERROR: ${BASH_SOURCE[1]} at about ${BASH_LINENO[0]}"
}

set -o errtrace
trap traperr ERR
```

### Case/switch

```bash
case "$1" in
  start | up)
    vagrant up
    ;;

  *)
    printf '%s\n' "Usage: $0 {start|stop|ssh}"
    ;;
esac
```

### Source relative

```bash
source "${0%/*}/../share/foo.sh"
```

### printf

```bash
printf "Hello %s, I'm %s" Sven Olga
#=> "Hello Sven, I'm Olga

printf "1 + 1 = %d" 2
#=> "1 + 1 = 2"

printf "This is how you print a float: %f" 2
#=> "This is how you print a float: 2.000000"
```

### Directory of script

```bash
DIR="${0%/*}"
```

### Getting options

```bash
while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  -V | --version )
    printf '%s\n' $version
    exit
    ;;
  -s | --string )
    shift; string=$1
    ;;
  -f | --flag )
    flag=1
    ;;
esac; shift; done
if [[ "$1" == '--' ]]; then shift; fi
```

### Heredoc

```sh
cat <<END
hello world
END
```

### Reading input

```bash
printf '%s\n' -n "Proceed? [y/n]: "
read ans
printf '%s\n' $ans
```

```bash
read -n 1 ans    # Just one character
```

### Special variables

| `$?` | Exit status of last task |
| `$!` | PID of last background task |
| `$$` | PID of shell |
| `$0` | Filename of the shell script |

See [Special parameters](http://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables).

### Go to previous directory

```bash
pwd # /home/user/foo
cd bar/
pwd # /home/user/foo/bar
cd -
pwd # /home/user/foo
```

### Check for command's result

```bash
if ping -c 1 google.com; then
  printf '%s\n' "It appears you have a working internet connection"
fi
```

### Grep check

```bash
if grep -q 'foo' ~/.bash_history; then
  printf '%s\n' "You appear to have typed 'foo' in the past"
fi
```

## Also see
{: .-one-column}

* [Bash-hackers wiki](http://wiki.bash-hackers.org/) _(bash-hackers.org)_
* [Shell vars](http://wiki.bash-hackers.org/syntax/shellvars) _(bash-hackers.org)_
* [Learn bash in y minutes](https://learnxinyminutes.com/docs/bash/) _(learnxinyminutes.com)_
* [Bash Guide](http://mywiki.wooledge.org/BashGuide) _(mywiki.wooledge.org)_
* [ShellCheck](https://www.shellcheck.net/) _(shellcheck.net)_
