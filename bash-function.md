---
title: How to define a Bash function
link_title: Bash function
subtitle: Reusable shell commands
category: Command line recipes
layout: snippet
last_verified_with: "Bash 5.3.0."
updated: 2026-11-24
links:
  - title: Bash shell functions
    url: https://www.gnu.org/software/bash/manual/html_node/Shell-Functions.html
  - title: Bourne shell builtins
    url: https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html
---

## Defining
<!-- {: .-snippets} -->

### Define and call
<!-- {: .-snippet} -->

```bash
greet() {
  echo "Hello, $1"
}

greet "world"
```
<!-- {: data-highlight="greet() {"} -->

#### Output

```text
Hello, world
```

**Defines a function and calls it by name.** The body runs in the current shell, so it can change variables and `cd`. See [shell functions](https://www.gnu.org/software/bash/manual/html_node/Shell-Functions.html).

### Function keyword
<!-- {: .-snippet} -->

```bash
function greet {
  echo "Hello, $1"
}
```
<!-- {: data-highlight="function"} -->

**Uses the `function` keyword instead of parentheses.** This is a Bash extension; the `greet()` form also works in POSIX shells. See [shell functions](https://www.gnu.org/software/bash/manual/html_node/Shell-Functions.html).

### Arguments
<!-- {: .-snippet} -->

```bash
args() {
  echo "$# args"
  for arg in "$@"; do
    echo "$arg"
  done
}

args one two
```
<!-- {: data-highlight='$#; "$@"'} -->

#### Output

```text
2 args
one
two
```

**Reads positional parameters inside the body.** `$1` and `$2` are the arguments, `$#` is the count, and `"$@"` expands to all of them. See [positional parameters](https://www.gnu.org/software/bash/manual/html_node/Positional-Parameters.html).

### Local variables
<!-- {: .-snippet} -->

```bash
greet() {
  local name="$1"
  echo "Hello, $name"
}
```
<!-- {: data-highlight="local"} -->

**Scopes a variable to the function.** Without `local`, the variable leaks into the caller's shell after the call. See [local](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html).

### Exit status
<!-- {: .-snippet} -->

```bash
is_dir() {
  [[ -d "$1" ]] || return 1
  echo "$1 is a directory"
}
```
<!-- {: data-highlight="return 1"} -->

**Returns a status code to the caller.** `return 1` stops early; without it the function reports the status of its last command. See [return](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html).
