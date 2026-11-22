---
title: Shell text utilities
subtitle: Filter and transform text streams
category: Shell
tier: t2
updated: 2026-11-23
last_verified_with: "GNU coreutils 9.8 (sort, uniq, cut, tr, tee)."
fragments:
  - "sort -u"
  - "sort -rn"
  - "uniq -c"
  - "cut -d, -f1"
  - "cut -c1-3"
  - "-k2,2n"
  - "-t,"
  - "-f1,3"
  - "tr -d '\\r'"
  - "tr -s ' '"
  - "tr ',' '\\n'"
  - "[:upper:]"
  - "tee -a"
  - "tee out.txt"
  - "| sort | uniq -c"
intro: |
  Coreutils filter and reshape text streams: sort lines, count duplicates, extract fields, translate characters, and save output while a pipeline keeps running.
links:
  - title: GNU coreutils manual
    url: https://www.gnu.org/software/coreutils/manual/html_node/
  - title: POSIX sort
    url: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/sort.html
keywords:
  - sort
  - uniq
  - cut
  - tr
  - tee
---

## Sort and count
<!-- {: .-three-column} -->

### Frequency count
<!-- {: .-prime} -->

#### Sample lines

```bash
$ cat colors.txt
red
blue
red
green
blue
red
```

#### Count

```bash
$ sort colors.txt | uniq -c | sort -rn
      3 red
      2 blue
      1 green
```

`sort` groups equal lines, `uniq -c` counts each run, and `sort -rn` orders by count, largest first.

See: [uniq invocation](https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html)

### Sort lines

```bash
$ sort colors.txt
blue
blue
green
red
red
red
```

#### Options

| Flag | Effect |
| --- | --- |
| `-r` | Reverse order |
| `-u` | Keep one of each line |
| `-n` | Compare as numbers |
| `-k` | Sort by a key field |
<!-- {: .-headers} -->

By default, `sort` compares whole lines using the current locale.

See: [sort invocation](https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html)

### Unique lines

```bash
$ sort -u colors.txt
blue
green
red
```

`-u` sorts and removes duplicate lines in one pass.

See: [sort invocation](https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html)

### Adjacent duplicates

```bash
$ printf 'red\nred\nblue\nred\n' | uniq
red
blue
red
```

`uniq` compares only neighbouring lines; sort first when duplicates can be apart.

See: [uniq invocation](https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html)

### Repeated lines only

```bash
$ sort colors.txt | uniq -d
blue
red
```

`-d` prints one copy of each repeated line; `-u` prints lines that occur once.

See: [uniq invocation](https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html)

## Sort by key
<!-- {: .-three-column} -->

### Numeric field

#### Sample rows

```bash
$ cat people.csv
ann,30,dev
bob,25,ops
cy,41,dev
```

#### Sort

```bash
$ sort -t, -k2,2n people.csv
bob,25,ops
ann,30,dev
cy,41,dev
```

`-t,` splits on commas; `-k2,2n` sorts field two as a number.

See: [sort invocation](https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html)

### Text field

```bash
$ sort -t, -k3,3 people.csv
ann,30,dev
cy,41,dev
bob,25,ops
```

`-k3,3` limits the key to field three; adding `r` reverses the order.

See: [sort invocation](https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html)

### Multiple keys

```bash
$ sort -t, -k3,3 -k2,2nr people.csv
cy,41,dev
ann,30,dev
bob,25,ops
```

The first key groups by role; the second sorts each group by descending age.

See: [sort invocation](https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html)

## Extract fields
<!-- {: .-three-column} -->

### By delimiter

```bash
$ cut -d, -f1 people.csv
ann
bob
cy
```

`-d` sets the delimiter; `-f` selects fields, starting at one.

See: [cut invocation](https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html)

### By byte position

```bash
$ cut -c1-3 colors.txt
red
blu
red
gre
blu
red
```

`-c` selects columns by position; `-c1-8` is a range, `-c5-` runs to the end.

See: [cut invocation](https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html)

### Field lists

```bash
$ cut -d, -f1,3 people.csv
ann,dev
bob,ops
cy,dev
```

`-f1,3` picks two fields; `-f2-` keeps a field and everything after it.

See: [cut invocation](https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html)

## Translate characters
<!-- {: .-three-column} -->

### Uppercase

```bash
$ echo 'Hello, World!' \
    | tr '[:lower:]' '[:upper:]'
HELLO, WORLD!
```

`tr` maps each character in the first set to the one at the same position in the second. Ranges like `'a-z'` work too.

See: [tr invocation](https://www.gnu.org/software/coreutils/manual/html_node/tr-invocation.html)

### Delete characters

```bash
$ echo 'a-b-c' | tr -d '-'
abc
```

`-d` removes matching characters; use `tr -d '\r'` to strip carriage returns.

See: [tr invocation](https://www.gnu.org/software/coreutils/manual/html_node/tr-invocation.html)

### Squeeze repeats

```bash
$ echo 'too   many    spaces' | tr -s ' '
too many spaces
```

`-s` collapses each run of matching characters into one.

See: [tr invocation](https://www.gnu.org/software/coreutils/manual/html_node/tr-invocation.html)

### Split on a separator

```bash
$ echo 'a,b,c' | tr ',' '\n'
a
b
c
```

Mapping a delimiter to a newline turns a list into one item per line.

See: [tr invocation](https://www.gnu.org/software/coreutils/manual/html_node/tr-invocation.html)

## Save output with tee
<!-- {: .-three-column} -->

### Write and display

```bash
$ echo hello | tee out.txt
hello
```

`tee` writes stdin to a file and to stdout, so the pipeline keeps running.

See: [tee invocation](https://www.gnu.org/software/coreutils/manual/html_node/tee-invocation.html)

### Append

```bash
$ echo again | tee -a out.txt
again
```

`-a` appends instead of replacing the file.

See: [tee invocation](https://www.gnu.org/software/coreutils/manual/html_node/tee-invocation.html)

### Multiple files

```bash
$ echo shared | tee a.txt b.txt
shared
```

Several paths write the same stream to each file.

See: [tee invocation](https://www.gnu.org/software/coreutils/manual/html_node/tee-invocation.html)

## Combine tools

### Column frequencies

```bash
$ cut -d, -f3 people.csv \
    | sort | uniq -c | sort -rn
      2 dev
      1 ops
```

`cut` picks the column, then `sort | uniq -c` counts its values.

See: [cut invocation](https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html)

### Top two lines

```bash
$ sort colors.txt | uniq -c \
    | sort -rn | head -n 2
      3 red
      2 blue
```

`head` stops the pipeline after the ranked results you need.

See: [sort invocation](https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html)
