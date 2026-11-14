---
title: Bash scripting
category: CLI
tags: [Featured]
updated: 2026-11-11
tier: t1
keywords:
  - Variables
  - Functions
  - Interpolation
  - Brace expansions
  - Loops
  - Conditional execution
  - Command substitution
intro: |
  This is a quick reference to getting started with Bash scripting.
links:
  - title: Bash reference manual
    url: https://www.gnu.org/software/bash/manual/bash.html
  - title: Bash FAQ
    url: https://tiswww.case.edu/php/chet/bash/FAQ
  - title: GNU Bash
    url: https://www.gnu.org/software/bash/
---

## Getting started

<!-- {: .-three-column} -->

### Example

```bash
#!/usr/bin/env bash

name="John"
echo "Hello $name!"
```

See: [Shell scripts](https://www.gnu.org/software/bash/manual/html_node/Shell-Scripts.html)

### Variables

```bash
name="John"
echo $name  # see below
echo "$name"
echo "${name}!"
```

Generally quote your variables unless they contain wildcards to expand or command fragments.

```bash
wildcard="*.txt"
options="iv"
cp -$options $wildcard /tmp
```

See: [Shell parameters](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameters.html)

### String quotes

```bash
name="John"
echo "Hi $name"  #=> Hi John
echo 'Hi $name'  #=> Hi $name
echo $'Hi\nJohn'  # Hi, then John
```

See: [Quoting](https://www.gnu.org/software/bash/manual/html_node/Quoting.html)

### Shell execution

```bash
echo "I'm in $(pwd)"
echo "I'm in `pwd`"  # deprecated
echo "$(< file.txt)"  # no fork
echo "${ printf hi; }"  # 5.3, no fork
```

See: [Command substitution](https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html)

### Conditional execution

```bash
git commit && git push
git commit || echo "Commit failed"
```

See: [Lists](https://www.gnu.org/software/bash/manual/html_node/Lists.html)

### Functions

<!-- {: id='functions-example'} -->

```bash
get_name() {
  echo "John"
}

echo "You are $(get_name)"
```

See: [Functions](#functions)

### Conditionals

<!-- {: id='conditionals-example'} -->

```bash
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
fi
```

See: [Conditionals](#conditionals)

### Strict mode

```bash
set -euo pipefail
IFS=$'\n\t'
```

`errexit` skips failures in conditions, in all but the last command of `&&`/`||` lists and pipelines, and in commands negated with `!`.

See: [The set builtin](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html)

### Brace expansion

```bash
echo {A,B}.js
```

#### Expansion forms

| Expression             | Description           |
| ---------------------- | --------------------- |
| `{A,B}`                | Same as `A B`         |
| `{A,B}.js`             | Same as `A.js B.js`   |
| `{1..5}`               | Same as `1 2 3 4 5`   |
| <code>&lcub;{1..3},{7..9}}</code> | Same as `1 2 3 7 8 9` |

See: [Brace expansion](https://www.gnu.org/software/bash/manual/html_node/Brace-Expansion.html)

## Parameter expansions

<!-- {: .-three-column} -->

### Basics

```bash
name="John"
echo "${name}"        # John
echo "${name/J/j}"    # john (replace)
echo "${name:0:2}"    # Jo (slice)
echo "${name::2}"     # Jo (slice)
echo "${name::-1}"    # Joh (drop last)
echo "${name:(-1)}"   # n (from right)
echo "${name:(-2):1}" # h (from right)
echo "${food:-Cake}"  # food, or Cake
```

A negative offset needs a space or parentheses: `${name: -1}`.

```bash
length=2
echo "${name:0:length}"  # Jo
```

```bash
str="/path/to/foo.cpp"
echo "${str%.cpp}"    # /path/to/foo
echo "${str%.cpp}.o"  # /path/to/foo.o
echo "${str%/*}"      # /path/to

echo "${str##*.}"     # cpp (extension)
echo "${str##*/}"     # foo.cpp (basename)

echo "${str#*/}"      # path/to/foo.cpp
echo "${str##*/}"     # foo.cpp

echo "${str/foo/bar}" # /path/to/bar.cpp
```

```bash
str="Hello world"
echo "${str:6:5}"    # world
echo "${str: -5:5}"  # world
```

```bash
src="/path/to/foo.cpp"
base=${src##*/}   # foo.cpp (basename)
dir=${src%$base}  # /path/to/ (dirname)
dir=${src%/*}     # /path/to (dirname)
```

See: [Parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)

### Prefix name expansion

```bash
prefix_a=one
prefix_b=two
echo "${!prefix_*}"  # prefix_a prefix_b
```

See: [Shell parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)

### Indirection

```bash
name=joe
pointer=name
echo "${!pointer}"  # => joe
```

See: [Shell parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)

### Substitution

| Code              | Description                |
| ----------------- | -------------------------- |
| `${foo%suffix}`   | Remove shortest suffix     |
| `${foo#prefix}`   | Remove shortest prefix     |
| ---               | ---                        |
| `${foo%%suffix}`  | Remove longest suffix      |
| `${foo/%suffix}`  | Remove suffix (anchored)   |
| `${foo##prefix}`  | Remove longest prefix      |
| `${foo/#prefix}`  | Remove prefix (anchored)   |
| ---               | ---                        |
| `${foo/from/to}`  | Replace first match        |
| `${foo//from/to}` | Replace all                |
| ---               | ---                        |
| `${foo/%from/to}` | Replace suffix             |
| `${foo/#from/to}` | Replace prefix             |

See: [Shell parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)

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

See: [Comments](https://www.gnu.org/software/bash/manual/html_node/Comments.html)

### Substrings

| Expression      | Description                    |
| --------------- | ------------------------------ |
| `${foo:0:3}`    | Substring _(position, length)_ |
| `${foo:(-3):3}` | Substring from the right       |

See: [Shell parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)

### Length

| Expression | Description      |
| ---------- | ---------------- |
| `${#foo}`  | Length of `$foo` |

See: [Shell parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)

### Manipulation

```bash
str="HELLO WORLD!"
echo "${str,}"   # hELLO WORLD!
echo "${str,,}"  # hello world!

str="hello world!"
echo "${str^}"   # Hello world!
echo "${str^^}"  # HELLO WORLD!
```

See: [Shell parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)

### Transformations

| Expression     | Description                |
| -------------- | -------------------------- |
| `"${foo@Q}"`   | Quoted, reusable as input  |
| `"${foo@U}"`   | Uppercase                  |
| `"${foo@L}"`   | Lowercase                  |
| `"${foo@u}"`   | Uppercase first character  |
| `"${foo@E}"`   | Expand `$'…'` escapes      |
| `"${foo@P}"`   | Expand as a prompt string  |
| ---            | ---                        |
| `"${foo@A}"`   | Assignment or declare form |
| `"${foo@a}"`   | Attribute flags            |
| `"${foo[@]@K}"` | Quoted key-value pairs    |
| `"${foo[@]@k}"` | Key-value pairs, split    |

See: [Shell parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)

### Default values

| Expression        | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `${foo:-val}`     | `$foo`, or `val` if unset (or null)                      |
| `${foo:=val}`     | Set `$foo` to `val` if unset (or null)                   |
| `${foo:+val}`     | `val` if `$foo` is set (and not null)                    |
| `${foo:?message}` | Error if `$foo` is unset (or null)                        |

Omitting the `:` removes the (non)nullity checks, e.g. `${foo-val}` expands to `val` if unset otherwise `$foo`.

See: [Shell parameter expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)

## Loops

<!-- {: .-three-column} -->

### Basic for loop

```bash
for i in /etc/rc.*; do
  echo "$i"
done
```

See: [Looping constructs](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html)

### C-like for loop

```bash
for ((i = 0; i < 100; i++)); do
  echo "$i"
done
```

See: [Looping constructs](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html)

### Ranges

```bash
for i in {1..5}; do
    echo "Welcome $i"
done
```

#### With step size

```bash
for i in {5..50..5}; do
    echo "Welcome $i"
done
```

See: [Brace expansion](https://www.gnu.org/software/bash/manual/html_node/Brace-Expansion.html)

### Reading lines

```bash
while IFS= read -r line; do
  echo "$line"
done <file.txt
```

```bash
mapfile -t lines < file.txt
```

`read` in a pipeline runs in a subshell. `shopt -s lastpipe` (plus `set +m` interactively) keeps the last stage in the current shell.

See: [read](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html#index-read), [mapfile](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html#index-mapfile)

### Forever

```bash
while true; do
  ···
done
```

See: [Looping constructs](https://www.gnu.org/software/bash/manual/html_node/Looping-Constructs.html)

## Functions

<!-- {: .-three-column} -->

### Defining functions

```bash
myfunc() {
    echo "hello $1"
}
```

```bash
# Same as above (alternate syntax)
function myfunc {
    echo "hello $1"
}
```

```bash
myfunc "John"
```

See: [Shell functions](https://www.gnu.org/software/bash/manual/html_node/Shell-Functions.html)

### Returning values

```bash
myfunc() {
    local myresult='some value'
    echo "$myresult"
}
```

```bash
result=$(myfunc)
```

See: [Command substitution](https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html)

### Raising errors

```bash
myfunc() {
  return 1
}
```

```bash
if myfunc; then
  echo "success"
else
  echo "failure"
fi
```

See: [Exit status](https://www.gnu.org/software/bash/manual/html_node/Exit-Status.html)

### Arguments

| Expression | Description                                    |
| ---------- | ---------------------------------------------- |
| `$#`       | Number of arguments                            |
| `$*`       | All positional arguments (as a single word)    |
| `$@`       | All positional arguments (as separate strings) |
| `$1`       | First argument                                 |
| `$_`       | Last argument of the previous command          |

**Note**: `$@` and `$*` must be quoted in order to perform as described.
Otherwise, they do exactly the same thing (arguments as separate strings).

See [Special parameters](https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html).

## Conditionals

<!-- {: .-three-column} -->

### Conditions

`[[` is a shell keyword returning `0` (true) or `1` (false); any command with that exit-status logic works too.

| Condition                | Description           |
| ------------------------ | --------------------- |
| `[[ -z STRING ]]`        | Empty string          |
| `[[ -n STRING ]]`        | Not empty string      |
| `[[ STRING == STRING ]]` | Equal (glob pattern)  |
| `[[ STRING != STRING ]]` | Not equal (glob)      |
| ---                      | ---                   |
| `[[ NUM -eq NUM ]]`      | Equal                 |
| `[[ NUM -ne NUM ]]`      | Not equal             |
| `[[ NUM -lt NUM ]]`      | Less than             |
| `[[ NUM -le NUM ]]`      | Less than or equal    |
| `[[ NUM -gt NUM ]]`      | Greater than          |
| `[[ NUM -ge NUM ]]`      | Greater than or equal |
| ---                      | ---                   |
| `[[ STRING =~ STRING ]]` | Regexp match          |
| ---                      | ---                   |
| `(( NUM < NUM ))`        | Arithmetic comparison |

#### More conditions

| Condition            | Description              |
| -------------------- | ------------------------ |
| `[[ -o noclobber ]]` | If OPTIONNAME is enabled |
| `[[ -v VAR ]]`       | Variable is set          |
| ---                  | ---                      |
| `[[ ! EXPR ]]`       | Not                      |
| `[[ X && Y ]]`       | And                      |
| `[[ X || Y ]]`       | Or                       |

See: [Bash conditional expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)

### File conditions

| Condition               | Description             |
| ----------------------- | ----------------------- |
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
| `[[ FILE1 -ef FILE2 ]]` | Same file (inode)       |

See: [Bash conditional expressions](https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html)

### Example

```bash
# String
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
else
  echo "This never happens"
fi
```

```bash
# Combinations
if [[ -n "$X" && -n "$Y" ]]; then
  echo "Both are set"
fi
```

```bash
# Equal
if [[ "$A" == "$B" ]]
```

```bash
# Regex
if [[ "$date" =~ ^([0-9]{4})- ]]; then
  echo "${BASH_REMATCH[1]}"
fi
```

`BASH_REMATCH` holds the whole match, then each capture group.

```bash
if (( a < b )); then
   echo "$a is smaller than $b"
fi
```

```bash
if [[ -e "file.txt" ]]; then
  echo "file exists"
fi
```

See: [Conditional constructs](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html)

## Arrays

### Defining arrays

```bash
Fruits=('Apple' 'Banana' 'Orange')
```

```bash
Fruits[0]="Apple"
Fruits[1]="Banana"
Fruits[2]="Orange"
```

See: [Arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html)

### Working with arrays

```bash
echo "${Fruits[0]}"      # Element #0
echo "${Fruits[-1]}"     # Last element
echo "${Fruits[@]}"      # All elements
echo "${#Fruits[@]}"     # Number of elements
echo "${#Fruits}"        # Length of the 1st element
echo "${#Fruits[3]}"     # Length of the Nth element
echo "${Fruits[@]:3:2}"  # From position 3, length 2
echo "${!Fruits[@]}"     # Indices
```

See: [Arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html)

### Operations

```bash
Fruits=("${Fruits[@]}" "Watermelon")    # Push
Fruits+=('Watermelon')                  # Also push
Fruits=("${Fruits[@]/Ap*/}")            # Blank matching elements
unset 'Fruits[2]'                       # Remove one item
Fruits=("${Fruits[@]}")                 # Duplicate
Fruits=("${Fruits[@]}" "${Veggies[@]}") # Concatenate
mapfile -t lines < datafile             # One line per element
```

See: [Arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html)

### Iteration

```bash
for i in "${arrayName[@]}"; do
  echo "$i"
done
```

See: [Arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html)

## Dictionaries

<!-- {: .-three-column} -->

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

`declare -A` creates an associative array (bash 4+).

See: [Arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html)

### Working with dictionaries

```bash
echo "${sounds[dog]}" # Dog's sound
echo "${sounds[@]}"   # All values
echo "${!sounds[@]}"  # All keys
echo "${#sounds[@]}"  # Number of elements
unset sounds[dog]     # Delete dog
```

See: [Arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html)

### Iteration

#### Iterate over values

```bash
for val in "${sounds[@]}"; do
  echo "$val"
done
```

#### Iterate over keys

```bash
for key in "${!sounds[@]}"; do
  echo "$key"
done
```

See: [Arrays](https://www.gnu.org/software/bash/manual/html_node/Arrays.html)

## Options

### Options

```bash
set -o noclobber  # Prevent > from overwriting files
set -o errexit    # Exit on error
set -o pipefail   # Fail if any pipe stage fails
set -o nounset    # Error on unset variables
```

See: [The set builtin](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html)

### Glob options

```bash
shopt -s nullglob    # Non-matching globs are removed
shopt -s failglob    # Non-matching globs throw errors
shopt -s nocaseglob  # Case insensitive globs
shopt -s dotglob     # Wildcards match dotfiles
shopt -s globstar    # ** matches recursively
shopt -s extglob     # Extended patterns: @(a|b), !(a)
```

`globskipdots` is on by default since bash 5.2. `GLOBSORT` picks the glob sort key (`name`, `size`, `mtime`), with `-` to reverse (bash 5.3).

Set `GLOBIGNORE` as a colon-separated list of patterns to be removed from glob
matches.

See: [The shopt builtin](https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html)

## History

### Commands

| Command               | Description                               |
| --------------------- | ----------------------------------------- |
| `history`             | Show history                              |
| `shopt -s histverify` | Don't execute expanded result immediately |

See: [Bash history facilities](https://www.gnu.org/software/bash/manual/html_node/Bash-History-Facilities.html)

### Expansions

| Expression   | Description                                          |
| ------------ | ---------------------------------------------------- |
| `!$`         | Expand last parameter of most recent command         |
| `!*`         | Expand all parameters of most recent command         |
| `!-n`        | Expand `n`th most recent command                     |
| `!n`         | Expand `n`th command in history                      |
| `!<command>` | Expand most recent invocation of command `<command>` |

See: [Event designators](https://www.gnu.org/software/bash/manual/html_node/Event-Designators.html)

### Operations

| Code                 | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| `!!`                 | Execute last command again                                            |
| `!!:s/<FROM>/<TO>/`  | Replace first occurrence of `<FROM>` to `<TO>` in most recent command |
| `!!:gs/<FROM>/<TO>/` | Replace all occurrences of `<FROM>` to `<TO>` in most recent command  |
| `!$:t`               | Expand only basename from last parameter of most recent command       |
| `!$:h`               | Expand only directory from last parameter of most recent command      |

`!!` and `!$` can be replaced with any valid expansion.

See: [Modifiers](https://www.gnu.org/software/bash/manual/html_node/Modifiers.html)

### Slices

| Code     | Description                                                                              |
| -------- | ---------------------------------------------------------------------------------------- |
| `!!:n`   | Expand only `n`th token from most recent command (command is `0`; first argument is `1`) |
| `!^`     | Expand first argument from most recent command                                           |
| `!$`     | Expand last token from most recent command                                               |
| `!!:n-m` | Expand range of tokens from most recent command                                          |
| `!!:n-$` | Expand `n`th token to last from most recent command                                      |

`!!` can be replaced with any valid expansion i.e. `!cat`, `!-2`, `!42`, etc.

See: [Word designators](https://www.gnu.org/software/bash/manual/html_node/Word-Designators.html)

## Miscellaneous

### Numeric calculations

```bash
echo $((a + 200))      # Add 200 to $a
```

```bash
echo $((RANDOM % 200))  # Random number 0..199
```

```bash
declare -i count  # Declare as type integer
count+=1          # Increment
```

See: [Shell arithmetic](https://www.gnu.org/software/bash/manual/html_node/Shell-Arithmetic.html)

### Subshells

```bash
(cd somedir; echo "I'm now in $PWD")
pwd # still in first directory
```

See: [Command grouping](https://www.gnu.org/software/bash/manual/html_node/Command-Grouping.html)

### Redirection

```bash
python hello.py > output.txt     # stdout to file
python hello.py >> output.txt    # stdout to file, append
python hello.py 2> error.log     # stderr to file
python hello.py 2>&1             # stderr to stdout
python hello.py 2>/dev/null      # stderr to null
python hello.py >output.txt 2>&1 # both, same as &>
python hello.py &>/dev/null      # both to null
echo "$0: warning: too many users" >&2  # diagnostic
```

```bash
python hello.py < foo.txt      # feed foo.txt to stdin for python
diff <(ls -r) <(ls)            # Compare two stdout without files
```

See: [Redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)

### Inspecting commands

```bash
command -V cd
#=> cd is a shell builtin
```

See: [Bash builtins](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html)

### Trap errors

```bash
trap 'echo Error at about $LINENO' ERR
```

or

```bash
traperr() {
  echo "ERROR: ${BASH_SOURCE[1]} at about ${BASH_LINENO[0]}"
}

set -o errtrace
trap traperr ERR
```

See: [The trap builtin](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html)

### Case/switch

```bash
case "$1" in
  start | up)
    vagrant up
    ;;

  *)
    echo "Usage: $0 {start|stop|ssh}"
    ;;
esac
```

See: [Conditional constructs](https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html)

### Source relative

```bash
source "${BASH_SOURCE[0]%/*}/../share/foo.sh"
```

`BASH_SOURCE` points at the file even when the script is sourced.

Bash 5.3 adds `source -p dirs` to search a colon-separated list instead of `$PATH`.

See: [BASH_SOURCE](https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html#index-BASH_005fSOURCE)

### printf

```bash
printf "Hello %s, I'm %s" Sven Olga
#=> Hello Sven, I'm Olga

printf "1 + 1 = %d" 2
#=> "1 + 1 = 2"

printf "This is how you print a float: %f" 2
#=> "This is how you print a float: 2.000000"

printf '%s\n' '#!/bin/bash' 'echo hello' >file
# format string is applied to each group of arguments
printf '%i+%i=%i\n' 1 2 3  4 5 9
```

See: [The printf builtin](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html)

### Transform strings

| Command option | Description                                         |
| -------------- | --------------------------------------------------- |
| `-c`           | Operations apply to characters not in the given set |
| `-d`           | Delete characters                                   |
| `-s`           | Replaces repeated characters with single occurrence |
| `-t`           | Truncates                                           |
| ---            | ---                                                 |
| `[:upper:]`    | All upper case letters                              |
| `[:lower:]`    | All lower case letters                              |
| `[:digit:]`    | All digits                                          |
| `[:space:]`    | All whitespace                                      |
| `[:alpha:]`    | All letters                                         |
| `[:alnum:]`    | All letters and digits                              |

#### Example

```bash
echo "Welcome To Devhints" | tr '[:lower:]' '[:upper:]'
WELCOME TO DEVHINTS
```

See: [tr invocation](https://www.gnu.org/software/coreutils/manual/html_node/tr-invocation.html)

### Directory of script

```bash
dir=${BASH_SOURCE[0]%/*}
```

`BASH_SOURCE` is the path as invoked; `shopt -s bash_source_fullpath` (bash 5.3) makes it absolute.

See: [BASH_SOURCE](https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html#index-BASH_005fSOURCE)

### Getting options

#### Short options

```bash
while getopts ":Vs:f" opt; do
  case $opt in
    V) echo "$version"; exit ;;
    s) string=$OPTARG ;;
    f) flag=1 ;;
    :) echo "Missing argument for -$OPTARG" >&2; exit 1 ;;
    *) echo "Usage: $0 [-V] [-s string] [-f]"; exit 1 ;;
  esac
done
shift $((OPTIND - 1))
```

`OPTARG` holds the option value; `OPTIND` is the next argument index.

#### Long options

```bash
while [[ "$1" == -* && "$1" != "--" ]]; do
  case $1 in
    -V | --version) echo "$version"; exit ;;
    -s | --string) shift; string=$1 ;;
    -f | --flag) flag=1 ;;
  esac
  shift
done
if [[ "$1" == "--" ]]; then shift; fi
```

See: [getopts](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-getopts)

### Heredoc

```sh
cat <<EOF
hello world
EOF
```

Heredoc feeds multiple lines to stdin. Unquoted markers expand variables; `'EOF'` disables expansion.

See: [Here documents](https://www.gnu.org/software/bash/manual/html_node/Redirections.html#Here-Documents)

### Herestring

```sh
tr '[:lower:]' '[:upper:]' <<< "Will be uppercased, even $variable"
```

Herestring allows a string to be treated as a standard input (stdin). See [Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/Redirections.html#Here-Strings).

### Process substitution

```sh
# loop on myfunc output lines
while IFS= read -r line; do
  echo "$line"
done < <(myfunc)

# compare content of two folders
diff <(ls "$dir1") <(ls "$dir2")
```

Process substitution treats a command's input or output as a file.

See: [Process substitution](https://www.gnu.org/software/bash/manual/html_node/Process-Substitution.html)

### Reading input

```bash
read -r -p "Proceed? [y/n] " ans
IFS= read -s -r -p "Password: " pass  # no echo
echo "$ans"
```

`-r` keeps backslashes literal, `-p` prints a prompt, and `-s` hides input.

```bash
read -n 1 ans    # One character
```

See: [The read builtin](https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html#index-read)

### Special variables

| Expression         | Description                            |
| ------------------ | -------------------------------------- |
| `$?`               | Exit status of last task               |
| `$!`               | PID of last background task            |
| `$$`               | PID of shell                           |
| ---                | ---                                    |
| `$0`               | Name of the shell or script            |
| `$_`               | Last argument of the previous command  |
| ---                | ---                                    |
| `${PIPESTATUS[n]}` | Exit status of piped commands (array)  |
| `$EPOCHSECONDS`    | Seconds since the Unix epoch           |
| `$SRANDOM`         | 32-bit random number                   |

See [Special parameters](https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html).

### Go to previous directory

```bash
pwd # /home/user/foo
cd bar/
pwd # /home/user/foo/bar
cd -
pwd # /home/user/foo
```

See: [The cd builtin](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html)

### Check for command's result

```bash
if ping -c 1 google.com; then
  echo "It appears you have a working internet connection"
fi
```

See: [Exit status](https://www.gnu.org/software/bash/manual/html_node/Exit-Status.html)

### Grep check

```bash
if grep -q 'foo' ~/.bash_history; then
  echo "You appear to have typed 'foo' in the past"
fi
```

See: [GNU grep manual](https://www.gnu.org/software/grep/manual/grep.html)

## Also see

<!-- {: .-one-column} -->

- [ShellCheck](https://www.shellcheck.net/) _(shellcheck.net)_
- [Bash changelog](https://tiswww.case.edu/php/chet/bash/CHANGES) _(case.edu)_
