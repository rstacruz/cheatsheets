---
title: zsh
category: CLI
layout: 2017/sheet
---

This is a cheat sheet for how to perform various actions to ZSH, which can be tricky to find on the web as the syntax is not intuitive and it is generally not very well-documented.

### Change default shell

```bash
chsh -s `which zsh`
```

### Process Substitution

| Expression        | Example                                               | Description
| ---               | ---                                                   | ---
| `<(COMMAND)`      | `grep "needle" <(curl "https://haystack.io")`         | Replace argument with _named pipe/FIFO_ (read-only) with command output
| `=(COMMAND)`      | `vim =(curl "https://haystack.io")`                   | Replace argument with _file_ (writable) containing command output
{: .-headers}

### Expressions

| Expression        | Example             | Description
| ---               | ---                 | ---
| `!!`              | `sudo !!`           | Last command (`sudo !!`)
| ---               | ---                 | ---
| `!*`              | `vim !*`            | Last command's parameters (`vim !*`)
| `!^`              |                     | Last command's first parameter
| `!$`              |                     | Last command's last parameter
| ---               | ---                 | ---
| `!?ls` `<tab>`    | `sudo !?mv` `<tab>` | Command and params of last `ls` command
| `!?ls?:*` `<tab>` |                     | Params of last `ls` command
| ---               | ---                 | ---
| `*(m0)`           | `rm *(m0)`          | Last modified today
| `*(m-4)`          |                     | Last modified <4 days ago
{: .-headers}

### Strings

| Description                                      | Syntax                              |
| ------------------------------------------------ | ----------------------------------- |
| Get a single character                           | `${VARNAME[index]}`                 |
| Get the string from a specific index             | `${VARNAME[index,-1]}`              |
| Get a substring                                  | `${VARNAME[from,to]}`               |
| Replace the first occurrence in a string         | `${VARNAME/toreplace/replacement}`  |
| Replace all occurrences in a string              | `${VARNAME//toreplace/replacement}` |
| Cut a string after a model                       | `${VARNAME%%model*}`                |
| Check if a string starts by a specific substring | `if [[ $VARNAME = "startstr"* ]]`   |

### Arrays

| Description                                    | Syntax                                          |
| ---------------------------------------------- | ----------------------------------------------- |
| Create an array                                | `VARNAME=()`                                    |
| Create an array with initial values            | `VARNAME=(value1 value2 value3)`                |
| Push to an array                               | `VARNAME+=(value)`                              |
| Access an array's element                      | `VARNAME[index]`                                |
| Remove first element from an array (shift)     | `shift VARNAME`                                 |
| Remove last element from an array (pop)        | `shift -p VARNAME`                              |
| Get an array's length                          | `${#VARNAME}`                                   |
| Iterate over an array's values                 | `for value in $VARNAME;`                        |
| Get index of a value in an array               | `${VARNAME[(i)value]}`                          |
| Get an array slice _after_ the specified index | `${VARNAME:index}`                              |
| Get an array slice _after_ the specified index | `${VARNAME:index:length}`                       |
| Check if a value is contained in an array      | `if (( ${VARNAME[(i)value]} <= ${#VARNAME} ));` |
| Check if an array is empty                     | `if [[ -z $VARNAME ]]`                          |
| Check if an array is not empty                 | `if [[ ! -z $VARNAME ]]`                        |

### Associative arrays (= maps / dictionaries)

Associate arrays are the equivalent of hash maps or dictionaries in many other programming languages: unlike arrays, they can use string keys, and these don't necessary have an order.

| Description                                     | Syntax                                               |
| ----------------------------------------------- | ---------------------------------------------------- |
| Create an associative array                     | `typeset -A VARNAME=()`                              |
| Create an associative array with initial values | `typeset -A VARNAME=( [key1]=value1 [key2]=value2 )` |
| Add a new key to the array                      | `VARNAME[key]=value`                                 |
| Access the array's elements                     | `$VARNAME[key]`                                      |
| Remove a key from the array                     | `unset 'VARNAME[key]`                                |
| Get the array's number of elements              | `${#VARNAME}`                                        |
| Iterate over the array's values                 | `for value in $VARNAME;`                             |
| Iterate over the array's keys                   | `for key in ${(k)VARNAME};`                          |
| Iterate over the array's key-value pairs        | `for key value in ${(kv)VARNAME};`                   |

### Arithmetics

| Description                                                                            | Syntax            |
| -------------------------------------------------------------------------------------- | ----------------- |
| Compute a mathematical expression (variables don't need to be prefixed with `$` in it) | `$((expression))` |

### Variables

| Description                                                   | Syntax             |
| ------------------------------------------------------------- | ------------------ |
| Get the value of a variable whose name is in another variable | `${(P)NAMEVAR}`    |
| Get the list of all defined variables, as an array            | `${(k)parameters}` |
| Delete a variable                                             | `unset VARNAME`    |

### Functions

| Description                                                       | Syntax                         |
| ----------------------------------------------------------------- | ------------------------------ |
| Declare a local variable (not accessible outside the function)    | `local varname=...`            |
| Get the original executable name                                  | `$0`                           |
| Get a parameter                                                   | `$1` (second is `$2`, etc.)    |
| Expand all parameters                                             | `$*`                           |
| Expand all parameters but keep them quoted if needed              | `$@` (tip: it's an array!)     |
| Get the number of parameters (so not counting `$0`)               | `$#`                           |
| Remove the first parameter from `$@`                              | `shift`                        |
| Remove the last parameter from `$@`                               | `shift -p`                     |
| Exit the function with a status code (behaves like for a command) | `return 1` (or any other code) |
| Get the list of all functions, as an array                        | `${(k()functions}`             |
| Delete a function                                                 | `unset -f func_name`           |

### Aliases

| Description                                      | Syntax                                    |
| ------------------------------------------------ | ----------------------------------------- |
| Display the list of all defined aliases          | `alias`                                   |
| Get the list of all defined aliases, as an array | `${(k)aliases}`                           |
| Define an alias                                  | `alias name="command arg1 arg2 arg3 ..."` |
| Remove an alias                                  | `unalias name`                            |
| Get the arguments, with escaped spaces           | `${@:q}`                                  |

### Conditionals

[A word on conditionals](#a-word-on-conditionals)

Syntaxes:

```zsh
# 1)
if expression
then
    # instructions
fi

# 2)
if expression; then
    # instructions
fi

# 3)
if expression; then ...; fi

# 4)
if expression; then
    # instructions
else
    # instructions
fi

# 5)
if expression; then
    # instructions
elif expression
    # instructions
else
    # instructions
fi
```

| Description                                                     | Syntax                       |
| --------------------------------------------------------------- | ---------------------------- |
| Check if a string is empty or not defined                       | `if [[ -z $VARNAME ]];`      |
| Check if a string is defined and not empty                      | `if [[ ! -n $VARNAME ]];`    |
| Check if a file exists                                          | `if [[ -f "filepath" ]];`    |
| Check if a directory exists                                     | `if [[ -d "dirpath" ]]; `    |
| Check if a symbolic link exists                                 | `if [[ -L "symlinkpath" ]];` |
| Check if a shell option is set                                  | `if [[ -o OPTION_NAME ]];`   |
| Check if two values are equal                                   | `if [[ $VAR1 = $VAR2 ]];`    |
| Check if two values are different                               | `if [[ $VAR1 != $VAR2 ]];`   |
| Check if a number is greater than another                       | `if (( $VAR1 > $VAR2 ));`    |
| Check if a number is smaller than another                       | `if (( $VAR1 < $VAR2 ));`    |
| Check if a command exits successfully (exit code `0`)           | `if command arg1 arg2 ...`   |
| Check if a command doesn't exit successfully (exit code != `0`) | `if ! command arg1 arg2 ...` |

Note that the `$` symbol preceding variables' names in arithmetic expression (`((...))`) are purely optional, so you can perfectly write `if (( VAR1 < VAR2 ));` for instance.

You can read all dash `-` options in ZSH's manual, as there are many different ones: http://zsh.sourceforge.net/Doc/Release/Conditional-Expressions.html

### Loops

Syntaxes:

```zsh
# 1)
for itervarname in iterable
do
    # instructions
done

# 2)
for itervarname in iterable; do
    # instructions
done

# 3)
for itervaname in iterable; do ...; done
```

| Description                                                              | Syntax                     |
| ------------------------------------------------------------------------ | -------------------------- |
| Iterate over a range (inclusive)                                         | `for i in {from..to};`     |
| Iterate over a list of filesystem items                                  | `for i in globpattern;`    |
| Iterate over a list of filesystem items, fail silently if no match found | `for i in globpattern(N);` |

### Examples cheat sheet

Return a value from within a function:

```zsh
function add() {
    local sum=$(($1 + $2))
    echo $sum
}

function add_twice() {
    local sum=$(add $1 $2) # get the callee's STDOUT
    local sum_twice=$(add $sum $sum)
    echo $sum_twice
}

echo $(add 2 3) # 5
echo $(add_twice 2 3) # 10
```

### A word on conditionals

Conditionals use expressions, such as in `if [[ -z $VARNAME ]];` the expression is `[[ -z $VARNAME ]]`. These can also be used in `while` loops, as well as be used outside of blocks:

```zsh
[[ -z $VARNAME ]] && echo "VARNAME is not defined or empty!"
[[ -f $FILEPATH ]] && echo "File exists!"
```

This works because conditional expressions (`[[ ... ]]` and `(( ... ))`) don't actually return a value; they behave like commands and as such set the status code to `0` if the condition is true, or `1` else.

If we want to display the message only if the condition is falsey:

```zsh
[[ -z $VARNAME ]] || echo "VARNAME is not empty!"
[[ -f $FILEPATH ]] || echo "File does not exist!"
```

### Also see

- [Bash cheatsheet](./bash)

Zsh is mostly compatible with Bash, so most everything in Bash's cheatsheet also applies.
