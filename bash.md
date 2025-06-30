---
title: Bash scripting
category: CLI
tags: [Featured]
updated: 2020-07-05
keywords:
  - Variables
  - Functions
  - Interpolation
  - Brace expansions
  - Loops
  - Conditional execution
  - Command substitution
---

## Getting started
{: .-three-column}

### Introduction
{: .-intro}

This is a quick reference to getting started with Bash scripting.

- [Learn bash in y minutes](https://learnxinyminutes.com/docs/bash/) _(learnxinyminutes.com)_
- [Bash Guide](http://mywiki.wooledge.org/BashGuide) _(mywiki.wooledge.org)_
- [Bash Hackers Wiki](https://web.archive.org/web/20230406205817/https://wiki.bash-hackers.org/) _(wiki.bash-hackers.org)_

### Example

```bash
#!/usr/bin/env bash

name="John"
echo "Hello $name!"
```

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

### String quotes

```bash
name="John"
echo "Hi $name"  #=> Hi John
echo 'Hi $name'  #=> Hi $name
```

### Shell execution

```bash
echo "I'm in $(pwd)"
echo "I'm in `pwd`"  # obsolescent
# Same
```

See [Command substitution](https://web.archive.org/web/20230326081741/https://wiki.bash-hackers.org/syntax/expansion/cmdsubst)

### Conditional execution

```bash
git commit && git push
git commit || echo "Commit failed"
```

### Functions
{: id='functions-example'}

```bash
get_name() {
  echo "John"
}

echo "You are $(get_name)"
```

See: [Functions](#functions)

### Conditionals
{: id='conditionals-example'}

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

See: [Unofficial bash strict mode](http://redsymbol.net/articles/unofficial-bash-strict-mode/)

### Brace expansion

```bash
echo {A,B}.js
```

| Expression             | Description           |
| ---------------------- | --------------------- |
| `{A,B}`                | Same as `A B`         |
| `{A,B}.js`             | Same as `A.js B.js`   |
| `{1..5}`               | Same as `1 2 3 4 5`   |
| <code>&lcub;{1..3},{7..9}}</code> | Same as `1 2 3 7 8 9` |

See: [Brace expansion](https://web.archive.org/web/20230207192110/https://wiki.bash-hackers.org/syntax/expansion/brace)

## Parameter expansions
{: .-three-column}

### Basics

```bash
name="John"
echo "${name}"
echo "${name/J/j}"    #=> "john" (substitution)
echo "${name:0:2}"    #=> "Jo" (slicing)
echo "${name::2}"     #=> "Jo" (slicing)
echo "${name::-1}"    #=> "Joh" (slicing)
echo "${name:(-1)}"   #=> "n" (slicing from right)
echo "${name:(-2):1}" #=> "h" (slicing from right)
echo "${food:-Cake}"  #=> $food or "Cake"
```

```bash
length=2
echo "${name:0:length}"  #=> "Jo"
```

See: [Parameter expansion](https://web.archive.org/web/20230408142504/https://wiki.bash-hackers.org/syntax/pe)

```bash
str="/path/to/foo.cpp"
echo "${str%.cpp}"    # /path/to/foo
echo "${str%.cpp}.o"  # /path/to/foo.o
echo "${str%/*}"      # /path/to

echo "${str##*.}"     # cpp (extension)
echo "${str##*/}"     # foo.cpp (basepath)

echo "${str#*/}"      # path/to/foo.cpp
echo "${str##*/}"     # foo.cpp

echo "${str/foo/bar}" # /path/to/bar.cpp
```

```bash
str="Hello world"
echo "${str:6:5}"    # "world"
echo "${str: -5:5}"  # "world"
```

```bash
src="/path/to/foo.cpp"
base=${src##*/}   #=> "foo.cpp" (basepath)
dir=${src%$base}  #=> "/path/to/" (dirpath)
```

### Prefix name expansion

```bash
prefix_a=one
prefix_b=two
echo ${!prefix_*}  # all variables names starting with `prefix_`
prefix_a prefix_b
```

### Indirection

```bash
name=joe
pointer=name
echo ${!pointer}
joe
```

### Substitution

| Code              | Description         |
| ----------------- | ------------------- |
| `${foo%suffix}`   | Remove suffix       |
| `${foo#prefix}`   | Remove prefix       |
| ---               | ---                 |
| `${foo%%suffix}`  | Remove long suffix  |
| `${foo/%suffix}`  | Remove long suffix  |
| `${foo##prefix}`  | Remove long prefix  |
| `${foo/#prefix}`  | Remove long prefix  |
| ---               | ---                 |
| `${foo/from/to}`  | Replace first match |
| `${foo//from/to}` | Replace all         |
| ---               | ---                 |
| `${foo/%from/to}` | Replace suffix      |
| `${foo/#from/to}` | Replace prefix      |

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

| Expression      | Description                    |
| --------------- | ------------------------------ |
| `${foo:0:3}`    | Substring _(position, length)_ |
| `${foo:(-3):3}` | Substring from the right       |

### Length

| Expression | Description      |
| ---------- | ---------------- |
| `${#foo}`  | Length of `$foo` |

### Manipulation

```bash
str="HELLO WORLD!"
echo "${str,}"   #=> "hELLO WORLD!" (lowercase 1st letter)
echo "${str,,}"  #=> "hello world!" (all lowercase)

str="hello world!"
echo "${str^}"   #=> "Hello world!" (uppercase 1st letter)
echo "${str^^}"  #=> "HELLO WORLD!" (all uppercase)
```

### Default values

| Expression        | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `${foo:-val}`     | `$foo`, or `val` if unset (or null)                      |
| `${foo:=val}`     | Set `$foo` to `val` if unset (or null)                   |
| `${foo:+val}`     | `val` if `$foo` is set (and not null)                    |
| `${foo:?message}` | Show error message and exit if `$foo` is unset (or null) |

Omitting the `:` removes the (non)nullity checks, e.g. `${foo-val}` expands to `val` if unset otherwise `$foo`.

## Loops
{: .-three-column}

### Basic for loop

```bash
for i in /etc/rc.*; do
  echo "$i"
done
```

### C-like for loop

```bash
for ((i = 0 ; i < 100 ; i++)); do
  echo "$i"
done
```

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

### Reading lines

```bash
while read -r line; do
  echo "$line"
done <file.txt
```

### Forever

```bash
while true; do
  ···
done
```

## Functions
{: .-three-column}

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

See [Special parameters](https://web.archive.org/web/20230318164746/https://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables).

## Conditionals
{: .-three-column}

### Conditions

Note that `[[` is actually a command/program that returns either `0` (true) or `1` (false). Any program that obeys the same logic (like all base utils, such as `grep(1)` or `ping(1)`) can be used as condition, see examples.

| Condition                | Description           |
| ------------------------ | --------------------- |
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

#### More conditions

| Condition            | Description              |
| -------------------- | ------------------------ |
| `[[ -o noclobber ]]` | If OPTIONNAME is enabled |
| ---                  | ---                      |
| `[[ ! EXPR ]]`       | Not                      |
| `[[ X && Y ]]`       | And                      |
| `[[ X || Y ]]`       | Or                       |

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
| `[[ FILE1 -ef FILE2 ]]` | Same files              |

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
if [[ X && Y ]]; then
  ...
fi
```

```bash
# Equal
if [[ "$A" == "$B" ]]
```

```bash
# Regex
if [[ "A" =~ . ]]
```

```bash
if (( $a < $b )); then
   echo "$a is smaller than $b"
fi
```

```bash
if [[ -e "file.txt" ]]; then
  echo "file exists"
fi
```

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

### Working with arrays

```bash
echo "${Fruits[0]}"           # Element #0
echo "${Fruits[-1]}"          # Last element
echo "${Fruits[@]}"           # All elements, space-separated
echo "${#Fruits[@]}"          # Number of elements
echo "${#Fruits}"             # String length of the 1st element
echo "${#Fruits[3]}"          # String length of the Nth element
echo "${Fruits[@]:3:2}"       # Range (from position 3, length 2)
echo "${!Fruits[@]}"          # Keys of all elements, space-separated
```

### Operations

```bash
Fruits=("${Fruits[@]}" "Watermelon")    # Push
Fruits+=('Watermelon')                  # Also Push
Fruits=( "${Fruits[@]/Ap*/}" )          # Remove by regex match
unset Fruits[2]                         # Remove one item
Fruits=("${Fruits[@]}")                 # Duplicate
Fruits=("${Fruits[@]}" "${Veggies[@]}") # Concatenate
words=($(< datafile))                   # From file (split by IFS)
```

### Iteration

```bash
for i in "${arrayName[@]}"; do
  echo "$i"
done
```

## Dictionaries
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
echo "${sounds[dog]}" # Dog's sound
echo "${sounds[@]}"   # All values
echo "${!sounds[@]}"  # All keys
echo "${#sounds[@]}"  # Number of elements
unset sounds[dog]     # Delete dog
```

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

## Options

### Options

```bash
set -o noclobber  # Avoid overlay files (echo "hi" > foo)
set -o errexit    # Used to exit upon error, avoiding cascading errors
set -o pipefail   # Unveils hidden failures
set -o nounset    # Exposes unset variables
```

### Glob options

```bash
shopt -s nullglob    # Non-matching globs are removed  ('*.foo' => '')
shopt -s failglob    # Non-matching globs throw errors
shopt -s nocaseglob  # Case insensitive globs
shopt -s dotglob     # Wildcards match dotfiles ("*.sh" => ".foo.sh")
shopt -s globstar    # Allow ** for recursive matches ('lib/**/*.rb' => 'lib/a/b/c.rb')
```

Set `GLOBIGNORE` as a colon-separated list of patterns to be removed from glob
matches.

## History

### Commands

| Command               | Description                               |
| --------------------- | ----------------------------------------- |
| `history`             | Show history                              |
| `shopt -s histverify` | Don't execute expanded result immediately |

### Expansions

| Expression   | Description                                          |
| ------------ | ---------------------------------------------------- |
| `!$`         | Expand last parameter of most recent command         |
| `!*`         | Expand all parameters of most recent command         |
| `!-n`        | Expand `n`th most recent command                     |
| `!n`         | Expand `n`th command in history                      |
| `!<command>` | Expand most recent invocation of command `<command>` |

### Operations

| Code                 | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| `!!`                 | Execute last command again                                            |
| `!!:s/<FROM>/<TO>/`  | Replace first occurrence of `<FROM>` to `<TO>` in most recent command |
| `!!:gs/<FROM>/<TO>/` | Replace all occurrences of `<FROM>` to `<TO>` in most recent command  |
| `!$:t`               | Expand only basename from last parameter of most recent command       |
| `!$:h`               | Expand only directory from last parameter of most recent command      |

`!!` and `!$` can be replaced with any valid expansion.

### Slices

| Code     | Description                                                                              |
| -------- | ---------------------------------------------------------------------------------------- |
| `!!:n`   | Expand only `n`th token from most recent command (command is `0`; first argument is `1`) |
| `!^`     | Expand first argument from most recent command                                           |
| `!$`     | Expand last token from most recent command                                               |
| `!!:n-m` | Expand range of tokens from most recent command                                          |
| `!!:n-$` | Expand `n`th token to last from most recent command                                      |

`!!` can be replaced with any valid expansion i.e. `!cat`, `!-2`, `!42`, etc.

## Miscellaneous

### Numeric calculations

```bash
$((a + 200))      # Add 200 to $a
```

```bash
$(($RANDOM%200))  # Random number 0..199
```

```bash
declare -i count  # Declare as type integer
count+=1          # Increment
```

### Subshells

```bash
(cd somedir; echo "I'm now in $PWD")
pwd # still in first directory
```

### Redirection

```bash
python hello.py > output.txt            # stdout to (file)
python hello.py >> output.txt           # stdout to (file), append
python hello.py 2> error.log            # stderr to (file)
python hello.py 2>&1                    # stderr to stdout
python hello.py 2>/dev/null             # stderr to (null)
python hello.py >output.txt 2>&1        # stdout and stderr to (file), equivalent to &>
python hello.py &>/dev/null             # stdout and stderr to (null)
echo "$0: warning: too many users" >&2  # print diagnostic message to stderr
```

```bash
python hello.py < foo.txt      # feed foo.txt to stdin for python
diff <(ls -r) <(ls)            # Compare two stdout without files
```

### Inspecting commands

```bash
command -V cd
#=> "cd is a function/alias/whatever"
```

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

printf '%s\n' '#!/bin/bash' 'echo hello' >file
# format string is applied to each group of arguments
printf '%i+%i=%i\n' 1 2 3  4 5 9
```

### Transform strings

| Command option | Description                                         |
| -------------- | --------------------------------------------------- |
| `-c`           | Operations apply to characters not in the given set |
| `-d`           | Delete characters                                   |
| `-s`           | Replaces repeated characters with single occurrence |
| `-t`           | Truncates                                           |
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

### Directory of script

```bash
dir=${0%/*}
```

### Getting options

```bash
while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  -V | --version )
    echo "$version"
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

Heredoc allows a section of your source code to be treated as a file. See [Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/Redirections.html#Here-Documents).

### Herestring

```sh
tr '[:lower:]' '[:upper:]' <<< "Will be uppercased, even $variable"
```

Herestring allows a string to be treated as a standard input (stdin). See [Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/Redirections.html#Here-Strings).

### Process substitution

```sh 
# loop on myfunc output lines
while read -r line; do
  echo "$line"
done < <(myfunc)

# compare content of two folders
diff <(ls "$dir1") <(ls "$dir2")
```

Process substitution allows the input (or output) of a command to be treated as a file. See [Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/Process-Substitution.html).

### Reading input

```bash
echo -n "Proceed? [y/n]: "
read -r ans
echo "$ans"
```

The `-r` option disables a peculiar legacy behavior with backslashes.

```bash
read -n 1 ans    # Just one character
```

### Special variables

| Expression         | Description                            |
| ------------------ | -------------------------------------- |
| `$?`               | Exit status of last task               |
| `$!`               | PID of last background task            |
| `$$`               | PID of shell                           |
| `$0`               | Filename of the shell script           |
| `$_`               | Last argument of the previous command  |
| `${PIPESTATUS[n]}` | return value of piped commands (array) |

See [Special parameters](https://web.archive.org/web/20230318164746/https://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables).

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
  echo "It appears you have a working internet connection"
fi
```

### Grep check

```bash
if grep -q 'foo' ~/.bash_history; then
  echo "You appear to have typed 'foo' in the past"
fi
```

## Also see
{: .-one-column}

- [Bash-hackers wiki](https://web.archive.org/web/20230406205817/https://wiki.bash-hackers.org/) _(bash-hackers.org)_
- [Shell vars](https://web.archive.org/web/20230318164746/https://wiki.bash-hackers.org/syntax/shellvars) _(bash-hackers.org)_
- [Learn bash in y minutes](https://learnxinyminutes.com/docs/bash/) _(learnxinyminutes.com)_
- [Bash Guide](http://mywiki.wooledge.org/BashGuide) _(mywiki.wooledge.org)_
- [ShellCheck](https://www.shellcheck.net/) _(shellcheck.net)_
