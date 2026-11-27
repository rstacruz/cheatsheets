---
title: Xargs
subtitle: Command-line argument builder
logo: { set: icon-park-outline, name: command }
category: Shell
updated: 2026-11-21
last_verified_with: "GNU xargs 0.8.0."
tier: t2
fragments:
  - "xargs -t -n 1"
  - "-print0"
  - "| xargs -0"
  - "-n 2"
  - "-P 4"
  - "-I {}"
  - "-r"
  - "-t"
  - "-d,"
  - "a b\\0c d\\0"
  - "xargs -0 -n 1"
  - "xargs -0 -P 4"
  - "xargs -I {}"
  - "xargs -r"
  - "xargs -t"
  - "echo 'item: {}'"
intro: |
  xargs turns standard input into command arguments. It batches long lists, handles awkward filenames with NUL-delimited input, and runs jobs in parallel.
links:
  - title: xargs(1) manual
    url: https://man7.org/linux/man-pages/man1/xargs.1.html
  - title: POSIX xargs
    url: https://pubs.opengroup.org/onlinepubs/9799919799.2024edition/utilities/xargs.html
---

## Getting started

<!-- {: .-three-column} -->

### Standard input

<!-- {: .-prime} -->

```bash
$ printf 'a b\nc\n' | xargs echo
a b c
```

xargs splits items on whitespace and appends them to `echo` (the default command), batching as many as fit on one command line.

See: [xargs(1)](https://man7.org/linux/man-pages/man1/xargs.1.html)

### Items per command

```bash
$ printf 'a b c d e\n' | xargs -n 2 echo
a b
c d
e
```
<!-- {: data-highlight="-n 2"} -->

`-n` caps the arguments per invocation; the last batch may be shorter.

See: `-n/--max-args` in [xargs(1)](https://man7.org/linux/man-pages/man1/xargs.1.html)

### Verbose execution

```bash
$ printf 'a b\n' | xargs -t -n 1 echo 2>&1
echo a
a
echo b
b
```
<!-- {: data-highlight="-t"} -->

`-t` prints each command to stderr before running it.

See: `-t/--verbose` in [xargs(1)](https://man7.org/linux/man-pages/man1/xargs.1.html)

### Empty input

#### GNU default

```bash
$ printf '' | xargs echo | wc -l
1
```

#### With -r

```bash
$ printf '' | xargs -r echo | wc -l
0
```
<!-- {: data-highlight="-r"} -->

GNU xargs runs the command once with no arguments; `-r` skips it.

See: [POSIX xargs](https://pubs.opengroup.org/onlinepubs/9799919799.2024edition/utilities/xargs.html)

## NUL-delimited input

<!-- {: .-three-column} -->

### NUL input from find

```bash
$ find . -name '*.txt' -print0 \
    | xargs -0 -n 1 echo
./my file.txt
./notes.txt
```
<!-- {: data-highlight="-0"} -->

`-0` reads NUL-terminated items, so spaces and newlines stay in one argument.

See: [xargs(1), -0](https://man7.org/linux/man-pages/man1/xargs.1.html)

### NUL-delimited strings

```bash
$ printf 'a b\0c d\0' | xargs -0 -n 1 echo
a b
c d
```
<!-- {: data-highlight="\0"} -->

Pair `-0` with a producer that emits `\0`-terminated records.

See: [xargs(1), --null](https://man7.org/linux/man-pages/man1/xargs.1.html)

### Other delimiters

```bash
$ printf 'a,b,c' | xargs -d, -n 1 echo
a
b
c
```
<!-- {: data-highlight="-d,"} -->

`-d` sets a single-character delimiter; it is a GNU extension.

See: [xargs(1), -d](https://man7.org/linux/man-pages/man1/xargs.1.html)

## Replacing arguments

### Placeholder

```bash
$ printf 'one\ntwo words\n' | xargs -I {} echo 'item: {}'
item: one
item: two words
```
<!-- {: data-highlight="-I {}"} -->

`-I` replaces each `{}` and runs the command once per item.

See: `-I/--replace` in [xargs(1)](https://man7.org/linux/man-pages/man1/xargs.1.html)

### Placeholder with NUL input

```bash
$ find . -name '*.txt' -print0 | xargs -0 -I {} echo 'file: {}'
file: ./my file.txt
file: ./notes.txt
```
<!-- {: data-highlight="-0 -I {}"} -->

`-I` implies one item per command, so keep `-0` when names may contain spaces.

See: [POSIX xargs](https://pubs.opengroup.org/onlinepubs/9799919799.2024edition/utilities/xargs.html)

## Parallel jobs

### Fixed worker count

```bash
$ find . -name '*.txt' -print0 | xargs -0 -P 4 -n 1 wc -l
1 ./my file.txt
2 ./notes.txt
```
<!-- {: data-highlight="-P 4"} -->

`-P` runs up to four commands at once; output order follows completion.

See: `-P/--max-procs` in [xargs(1)](https://man7.org/linux/man-pages/man1/xargs.1.html)

### One item per job

```bash
$ printf 'a\nb\n' | xargs -P 2 -I {} \
    sh -c 'echo "start {}"; sleep 0.1; echo "end {}"'
start a
start b
end b
end a
```
<!-- {: data-highlight="-P 2 -I {}"} -->

Combine `-P` with `-I` for one independent job per item.

See: [xargs(1), -P](https://man7.org/linux/man-pages/man1/xargs.1.html)

## Options reference

### Input and batching

| Flag | Meaning |
| --- | --- |
| `-0` | Read NUL-delimited items |
| `-d,` | Split on a single character |
| `-n 2` | Two items per command |
| `-I {}` | Replace a placeholder |

See: [xargs(1)](https://man7.org/linux/man-pages/man1/xargs.1.html)

### Execution

| Flag | Meaning |
| --- | --- |
| `-t` | Print commands to stderr |
| `-r` | Skip empty input |
| `-P 4` | Run up to four jobs |

See: [xargs(1)](https://man7.org/linux/man-pages/man1/xargs.1.html)
