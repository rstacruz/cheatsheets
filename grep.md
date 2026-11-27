---
title: GNU grep
subtitle: Pattern search utility
logo: { set: icon-park-outline, name: search }
category: CLI
updated: 2026-11-23
last_verified_with: "GNU grep 3.12."
tier: t3
intro: |
  [GNU grep](https://www.gnu.org/software/grep/) searches files with regular expressions. This sheet covers options, patterns, and common examples.
links:
  - title: GNU grep manual
    url: https://www.gnu.org/software/grep/manual/
  - title: grep(1) reference
    url: https://www.gnu.org/software/grep/manual/grep.html
---
## Usage

### Basic usage
<!-- {: .-prime} -->

```bash
grep <options> pattern <file...>
```
<!-- {: data-highlight="grep"} -->

See: [Usage examples](https://www.gnu.org/software/grep/manual/grep.html#Usage)

### Examples

#### Case insensitive

```bash
grep -i bar foo.txt
```
<!-- {: data-highlight="-i"} -->

#### Alternation

```bash
grep -E "foo|oof" bar.txt
```
<!-- {: data-highlight="foo|oof"} -->

#### Extract URLs

```bash
grep -oE "https?://((\w+[_-]?)+\.?)+" foo.txt
```
<!-- {: data-highlight="-oE"} -->

#### Pipelines

```bash
grep "export" .bash_profile | grep "PATH"
```

#### Follow and filter

```bash
tail -f server.log | grep -iC 5 error
```
<!-- {: data-highlight="-iC"} -->

Follows the log with five context lines around each match.

See: [Usage examples](https://www.gnu.org/software/grep/manual/grep.html#Usage)

## Options

### Matching options

```bash
-e, --regexp=PATTERN
-f, --file=FILE
-i, --ignore-case
-v, --invert-match
-w, --word-regexp
-x, --line-regexp
```

See: [Matching Control](https://www.gnu.org/software/grep/manual/grep.html#Matching-Control)

### Pattern options

```bash
-F, --fixed-strings   # list of fixed strings
-G, --basic-regexp    # basic regular expression (default)
-E, --extended-regexp # extended regular expression
-P, --perl-regexp     # perl compatible regular expression
```
<!-- {: data-highlight="-F; -G; -E; -P"} -->

See: [`grep` Programs](https://www.gnu.org/software/grep/manual/grep.html#grep-Programs)

### Expressions

#### Basic Regular Expressions (BRE)

In BRE, these characters have a special meaning unless they are escaped with a backslash:

`^ $ . * [ ] \`

However, these characters do not have any special meaning unless they are escaped with a backslash:

`? + { } | ( )`

#### Extended Regular Expressions (ERE)

ERE gives all of these characters a special meaning unless they are escaped with a backslash:

`^ $ . * + ? [ ] ( ) | { }`

#### Perl Compatible Regular Expressions (PCRE)

PCRE has even more options such as additional anchors and character classes, lookahead/lookbehind, conditional expressions, comments, and more. See the [regexp cheatsheet](/regexp).

See: [Regular Expressions](https://www.gnu.org/software/grep/manual/grep.html#Regular-Expressions)

### Output options

```bash
-c, --count           # count matching lines, suppress normal output
    --color[=WHEN]    # color matches: never, always, or auto
-m, --max-count=NUM   # stop reading after max count is reached
-o, --only-matching   # only print the matched part of a line
-q, --quiet, --silent
-s, --no-messages     # suppress errors on unreadable files
```

See: [General Output Control](https://www.gnu.org/software/grep/manual/grep.html#General-Output-Control)

### Context options

```bash
-B NUM, --before-context=NUM  # print NUM lines before a match
-A NUM, --after-context=NUM   # print NUM lines after a match
-C NUM, -NUM, --context=NUM   # NUM lines before and after a match
```
<!-- {: data-highlight="-B; -A; -C"} -->

See: [Context Line Control](https://www.gnu.org/software/grep/manual/grep.html#Context-Line-Control)
