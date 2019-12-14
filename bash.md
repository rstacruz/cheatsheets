---
title: Bash scripting
category: CLI
layout: 2017/sheet
tags: [Featured]
updated: 2019-10-02
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
{: .-five-column}

You should always use a shellcheck (https://github.com/koalaman/shellcheck) if you are writing bash/shell script to avoid unnecesary issues.

Best practice is to write a POSIX shell script to make the script more functional (working on platforms without dynamic linking) and use bash only if the function is not available on shell (complicated regex, etc..)

Example
-----
{: .-seven-column}

```sh
die() {
    err_code="$1"
    message="$2"

    case $err_code in
        0) true ;;
        1)
            if [ -n "$message" ]; then
                printf 'FATAL: %s\n' "$message"
            elif [ -z "$message" ]; then
                printf 'FATAL: %s\n' "Script returned false"
            fi
        ;;
        2) printf 'FATAL: %s\n' "Syntax error" ;;
        3) printf 'FATAL: %s\n' "Insufficient permission" ;;
        *) printf 'FATAL: %s\n' "Unknown error code '$err_code' has been parsed in function die()" ; exit 2
    esac

    # Do not exit on '0'
    [ "$err_code" != 0 ] && exit "$err_code"

    unset message err_code
}

# Exit if end-user is not root
[ -n "$(id -u)" ] && die 3

# In case anyone decides to run this
die 1 "Do not run this script, used for an example"

# Capture arguments
## While amount of arguments is greater then '1' do case in first argument in..
while [ $# -ge 1 ]; do case $1 in
    /*) # Full unix path
        destdir="$1'
        shift 1

        url="https://dev.exherbo.org/stages/exherbo-x86_64-pc-linux-gnu-current.tar.xz"

        if [ ! -d "$destdir" ]; then
            mkdir "$destdir" || die 1 "Unable to make new directory in $destdir"
        elif [ -d "$destdir" ]; then
            printf 'DEBUG: %s\n' "Directory '$destdir' already exists"
        else
            printf 'Unexpected: %s\n' "Unexpecte happend while checking for '$destdir'"
        fi

        if ! command -v wget 2>/dev/null; then die 1 "wget is not available on this system"; fi

        wget https://dev.exherbo.org/stages/exherbo-x86_64-pc-linux-gnu-current.tar.xz -O "$destdir/${url##https://dev.exherbo.org/stages/}"

        # Extract the tarball only if it's not already extracted
        [ ! -e "$destdir/etc/paludis" ] && tar xpf "$destdir/${url##https://dev.exherbo.org/stages/}" -C "$destdir"

        # Mount dev for example
        if ! grep -qF "$destdir/dev" /proc/mounts; then mount --rbind /dev "$destdir/dev/" || die 1 "Unable to mount '/dev' as rbind on '$destdir/dev'"; fi

        unset url
    ;;
    *) die 2
esac; done
```

Comments
-----
{: .-five-column}

Comments are used to set parts of the code to be ignored by the program

```sh
# Single line comment

```sh
: '
This is a
multi line
comment
'
```

```sh
printf '%s\n' "Hello!" # In-line comment
```

Variables
-----
{: .-five-column}

### Declaration

```sh
# Store value 'John' in variable 'NAME'
NAME=John

printf '%s\n' $NAME      # Outputs 'John'
printf '%s\n' "$NAME"    # Outputs 'John'
printf '%s\n' "${NAME}"  # Outputs 'John'
```

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

### Substrings

| `${FOO:0:3}`  | Substring _(position, length)_ |
| `${FOO:-3:3}` | Substring from the right |

### Length

| `${#FOO}` | Length of `$FOO` |

### Manipulation

```sh
STR="HELLO WORLD!"
printf '%s\n' ${STR,}   # Outputs "hELLO WORLD!" (lowercase 1st letter)
printf '%s\n' ${STR,,}  # Outputs "hello world!" (all lowercase)

STR="hello world!"
printf '%s\n' ${STR^}   # Outputs "Hello world!" (uppercase 1st letter)
printf '%s\n' ${STR^^}  # Outputs "HELLO WORLD!" (all uppercase)
```

### Default values

| `${FOO:-val}`        | `$FOO`, or `val` if not set |
| `${FOO:=val}`        | Set `$FOO` to `val` if not set |
| `${FOO:+val}`        | `val` if `$FOO` is set |
| `${FOO:?message}`    | Show error message and exit if `$FOO` is not set |

The `:` is optional (eg, `${FOO=word}` works)

### String manipulation

```sh
name=John

printf '%s\n' ${name}
printf '%s\n' ${name/J/j}    # Outputs 'john' (substitution)
printf '%s\n' ${name:0:2}    # Outputs 'Jo' (slicing)
printf '%s\n' ${name::2}     # Outputs 'Jo' (slicing)
printf '%s\n' ${name::-1}    # Outputs 'Joh' (slicing)
printf '%s\n' ${name:(-1)}   # Outputs 'n' (slicing from right)
printf '%s\n' ${name:(-2):1} # Outputs 'h' (slicing from right)
printf '%s\n' ${food:-Cake}  # Outputs value of 'food' variable or "Cake" if Cake is stored
```

```bash
length=2
printf '%s\n' ${name:0:length}  # Outputs 'Jo'
#                      ^^^^^^ - Using the value '2' of variable 'lenght' in string manipulation
```

See: [Parameter expansion](http://wiki.bash-hackers.org/syntax/pe)

```sh
STR=/path/to/foo.cpp

# Symbol '#' means to slice from the start where '%' means slicing from then end of the string

printf '%s\n' ${STR%.cpp}    # Outputs '/path/to/foo'
printf '%s\n' ${STR%.cpp}.o  # Outputs '/path/to/foo.o'

printf '%s\n' ${STR##*.}     # Outputs 'cpp' (extension)
printf '%s\n' ${STR##*/}     # Outputs 'foo.cpp' (basepath)

printf '%s\n' ${STR#*/}      # Outputs 'path/to/foo.cpp'
printf '%s\n' ${STR##*/}     # Outputs 'foo.cpp'

printf '%s\n' ${STR/foo/bar} # Outputs '/path/to/bar.cpp'
```

```sh
STR="Hello world"

printf '%s\n' ${STR:6:5}   # Outputs 'world'
printf '%s\n' ${STR:-5:5}  # Outputs 'Hello' and 'World' on new line
```

```sh
SRC=/path/to/foo.cpp

BASE=${SRC##*/}   # Outputs 'foo.cpp' (basepath)
DIR=${SRC%$BASE}  # Outputs '/path/to/' (dirpath)
```

### String quotes

```sh
NAME="John"

printf '%s\n' "Hi $NAME"  # Outputs Hi John
printf '%s\n' 'Hi $NAME'  # Outputs Hi $NAME (Taken literally)
```

Brace expansion
-----
{: .-three-column}

```sh
printf '%s\n' {A,B}.js
```

| `{A,B}` | Same as `A B` |
| `{A,B}.js` | Same as `A.js B.js` |
| `{1..5}` | Same as `1 2 3 4 5` |

See: [Brace expansion](http://wiki.bash-hackers.org/syntax/expansion/brace)

Functions
-----
{: .-three-column}

{: id='functions-example'}

Functions are used to store a code to be executed on demand

### Defining functions

```sh
identifier() {
  # Code here
}

# Same as above (alternative syntax)
function identifier() {
  # Code here
}
```

### Arguments

| Expression | Description                        |
| ---        | ---                                |
| `$#`       | Number of arguments                |
| `$*`       | All arguments                      |
| `$@`       | All arguments, starting from first |
| `$1`       | First argument                     |

See [Special parameters](http://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables).

### Input in a function

```sh
# Square the number
square() {
    number="$1"

    printf '%s\n' "$1 * $1" | bc

    unset number
}

square 5 # Outputs '25'
```

### Returning values

```sh
# Output 'John' if called
get_name() {
  printf '%s\n' "John"
}

get_name # Outputs 'John'
```


Loops
-----
{: .-three-column}

### Basic for loop

```sh
for i in /etc/rc.*; do
  printf '%s\n' $i
done
```

### C-like for loop

```sh
for ((i = 0 ; i < 100 ; i++)); do
  printf '%s\n' $i
done
```

### Ranges

```sh
for i in {1..5}; do
    printf '%s\n' "Welcome $i"
done
```

#### With step size

```sh
for i in {5..50..5}; do
    printf '%s\n' "Welcome $i"
done
```

### Reading lines

```sh
< file.txt | while read line; do
  printf '%s\n' $line
done
```

### Forever

```sh
while true; do
  ···
done
```

### Defining functions

```sh
myfunc() {
    printf '%s\n' "hello $1"
}
```

```sh
# Same as above (alternate syntax)
function myfunc() {
    printf '%s\n' "hello $1"
}
```

```sh
myfunc "John"
```

### Returning values

```sh
myfunc() {
    local myresult='some value'
    printf '%s\n' $myresult
}
```

```sh
result="$(myfunc)"
```

### Raising errors

```sh
myfunc() {
  return 1
}
```

```sh
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

| Condition                | Description              |
| ---                      | ---                      |
| `[ -z STRING ]`          | Empty string             |
| `[ -n STRING ]`          | Not empty string         |
| `[ STRING = STRING ]`    | Equal                    |
| `[[ STRING == STRING ]]` | Equal (bash)             |
| `[ STRING != STRING ]`   | Not Equal                |
| ---                      | ---                      |
| `[ NUM -eq NUM ]`        | Equal                    |
| `[ NUM -ne NUM ]`        | Not equal                |
| `[ NUM -lt NUM ]`        | Less than                |
| `[ NUM -le NUM ]`        | Less than or equal       |
| `[ NUM -gt NUM ]`        | Greater than             |
| `[ NUM -ge NUM ]`        | Greater than or equal    |
| ---                      | ---                      |
| `[[ STRING =~ STRING ]]` | Regexp (bash)            |
| ---                      | ---                      |
| `(( NUM < NUM ))`        | Numeric conditions       |

| Condition                | Description              |
| ---                      | ---                      |
| `[ -o noclobber ]`       | If OPTIONNAME is enabled |
| ---                      | ---                      |
| `[ ! EXPR ]`             | Not                      |
| `[ X ] && [ Y ]`         | And                      |
| `[ X ] || [ Y ]`         | Or                       |

### File conditions

| Condition               | Description               |
| ---                     | ---                       |
| `[ -e FILE ]`           | Exists                    |
| `[ -r FILE ]`           | Readable                  |
| `[ -h FILE ]`           | Symlink                   |
| `[ -d FILE ]`           | Directory                 |
| `[ -w FILE ]`           | Writable                  |
| `[ -s FILE ]`           | Size is > 0 bytes         |
| `[ -f FILE ]`           | File                      |
| `[ -x FILE ]`           | Executable                |
| ---                     | ---                       |
| `[ FILE1 -nt FILE2 ]`   | 1 is more recent than 2   |
| `[ FILE1 -ot FILE2 ]`   | 2 is more recent than 1   |
| `[ FILE1 -ef FILE2 ]`   | Same files                |


### Examples

```sh
# String
if [ -z "$string" ]; then
  printf '%s\n' "String is empty"
elif [ -n "$string" ]; then
  printf '%s\n' "String is not empty"
fi
```

```sh
# Combinations
if [ X ] && [ Y ]; then
    # Code here
fi
```

```sh
# Equal
if [ "$A" = "$B" ]; then
    # Code here
fi
```

```sh
# Not equal
if [ "$A" != "$B" ]; then
    # Code here
fi

# Not equal
if [ "$A" -ne "$B" ]; then 
    # Code here
fi
```

```sh
# Regex (Bash only)
if [[ "A" =~ "." ]]; then
    # Code here
fi
```

```sh
if (( $a < $b )); then
   printf '%s\n' "$a is smaller than $b"
fi
```

```sh
if [ -e "file.txt" ]; then
  printf '%s\n' "file exists"
fi
```

```sh
# If file contains string 'something'
if grep -qF something path/to/file; then
    # code here
fi
```

### Case statements

Case statements are generally used to simplify complex conditionals when you have multiple different choices.

On POSIX shell case statemetns are also used for a RegEx.

```sh
case "$argument" in
    melon|peach) printf '%s\n' "If variable 'argument' stores either 'melon' or 'peach" ;;
    banana)
        printf '%s\n' "If variable 'argument' stores 'banana'" 
    ;;
    Hon*)
        printf '%s\n' "If variable 'argument' stores anything that starts with 'Hon' 
    ;;
    *)
        printf '%s\n' "If none above matched"
esac
```

Arrays
------

Arrays are supported only on bash

### Defining arrays

```sh
Fruits=('Apple' 'Banana' 'Orange')
```

```sh
Fruits[0]="Apple"
Fruits[1]="Banana"
Fruits[2]="Orange"
```

### Working with arrays

```sh
printf '%s\n' ${Fruits[0]}           # Element #0
printf '%s\n' ${Fruits[@]}           # All elements, space-separated
printf '%s\n' ${#Fruits[@]}          # Number of elements
printf '%s\n' ${#Fruits}             # String length of the 1st element
printf '%s\n' ${#Fruits[3]}          # String length of the Nth element
printf '%s\n' ${Fruits[@]:3:2}       # Range (from position 3, length 2)
```

### Operations

```sh
Fruits=("${Fruits[@]}" "Watermelon")    # Push
Fruits+=('Watermelon')                  # Also Push
Fruits=( ${Fruits[@]/Ap*/} )            # Remove by regex match
unset Fruits[2]                         # Remove one item
Fruits=("${Fruits[@]}")                 # Duplicate
Fruits=("${Fruits[@]}" "${Veggies[@]}") # Concatenate
lines=(`cat "logfile"`)                 # Read from file
```

### Iteration

```sh
for i in "${arrayName[@]}"; do
  printf '%s\n' $i
done
```

Dictionaries
------------
{: .-three-column}

### Defining

```sh
declare -A sounds
```

```sh
sounds[dog]="bark"
sounds[cow]="moo"
sounds[bird]="tweet"
sounds[wolf]="howl"
```

Declares `sound` as a Dictionary object (aka associative array).

### Working with dictionaries

```sh
printf '%s\n' ${sounds[dog]} # Dog's sound
printf '%s\n' ${sounds[@]}   # All values
printf '%s\n' ${!sounds[@]}  # All keys
printf '%s\n' ${#sounds[@]}  # Number of elements
unset sounds[dog]   # Delete dog
```

### Iteration

#### Iterate over values

```sh
for val in "${sounds[@]}"; do
  printf '%s\n' $val
done
```

#### Iterate over keys

```sh
for key in "${!sounds[@]}"; do
  printf '%s\n' $key
done
```

Options
-------

### Options

```sh
set -o noclobber  # Avoid overlay files (printf '%s\n' "hi" > foo)
set -o errexit    # Used to exit upon error, avoiding cascading errors
set -o pipefail   # Unveils hidden failures
set -o nounset    # Exposes unset variables
```

### Glob options

```sh
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

### Shell execution

```sh
# Change directory in '/usr'
cd /usr

printf '%s\n' "I am in $(pwd)" # Outputs 'I am in /usr'

# Avoid! Breaks SC2006 (https://github.com/koalaman/shellcheck/wiki/SC2006)
printf '%s\n' "I am in `pwd`"  # Outputs 'I am in /usr'
```

See [Command substitution](http://wiki.bash-hackers.org/syntax/expansion/cmdsubst)

### Numeric calculations

```sh
$((a + 200))      # Add 200 to $a
```

```sh
$((RANDOM%=200))  # Random number 0..200
```

### Strict mode

```sh
set -euo pipefail
IFS=$'\n\t'
```

See: [Unofficial bash strict mode](http://redsymbol.net/articles/unofficial-bash-strict-mode/)

### Subshells

```sh
(cd somedir; printf '%s\n' "I'm now in $PWD")
pwd # still in first directory
```

### Redirection

```sh
python hello.py > output.txt   # stdout to (file)
python hello.py >> output.txt  # stdout to (file), append
python hello.py 2> error.log   # stderr to (file)
python hello.py 2>&1           # stderr to stdout
python hello.py 2>/dev/null    # stderr to (null)
python hello.py &>/dev/null    # stdout and stderr to (null)
```

```sh
python hello.py < foo.txt      # feed foo.txt to stdin for python
```

### Inspecting commands

```sh
command -V cd
# Outputs "cd is a function/alias/whatever"
```

### Trap errors

```sh
trap 'printf '%s\n' Error at about $LINENO' ERR
```

or

```sh
traperr() {
  printf '%s\n' "ERROR: ${BASH_SOURCE[1]} at about ${BASH_LINENO[0]}"
}

set -o errtrace
trap traperr ERR
```

### Source relative

```sh
source "${0%/*}/../share/foo.sh"
```

### printf

```sh
printf "Hello %s, I'm %s" Sven Olga
# Outputs "Hello Sven, I'm Olga

printf "1 + 1 = %d" 2
# Outputs "1 + 1 = 2"

printf "This is how you print a float: %f" 2
# Outputs "This is how you print a float: 2.000000"
```

### Directory of script

```sh
DIR="${0%/*}"
```

### Getting options

```sh
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

```sh
printf '%s\n' -n "Proceed? [y/n]: "
read ans
printf '%s\n' $ans
```

```sh
read -n 1 ans    # Just one character
```

### Special variables

| `$?` | Exit status of last task |
| `$!` | PID of last background task |
| `$$` | PID of shell |
| `$0` | Filename of the shell script |

See [Special parameters](http://wiki.bash-hackers.org/syntax/shellvars#special_parameters_and_shell_variables).

### Go to previous directory

```sh
pwd # /home/user/foo
cd bar/
pwd # /home/user/foo/bar
cd -
pwd # /home/user/foo
```

### Check for command's result

```sh
if ping -c 1 google.com; then
  printf '%s\n' "It appears you have a working internet connection"
fi
```

### Grep check

```sh
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
