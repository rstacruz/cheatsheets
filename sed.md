---
title: sed
category: CLI
intro: |
  Here's some hints on using sed.
---

### Replacements

#### In-place replacement (GNU)

```bash
sed -i -e 's/foo/bar/' example.md
```

In GNU sed: use `-i` without arg.

#### In-place replacement (BSD)

```bash
sed -i '' -e 's/foo/bar/' example.md
```

In OSX, `-i ''` is required.

#### In-place Multiple replacements

```bash
sed -i 's/match1/replace1/g; s/match2/replace2/g' \

```

replace different matches with different values

```bash
sed -i 's/\(MATCH1\|MATCH2\)/VALUE/g' \

```

replace multiple matches with the same value

## File regions
{:.-three-column}

### Print until a certain line is met

```bash
sed '/begin api/q'
```

### Print until a certain line is met, but not that line

```bash
sed '/^# begin/,$d'
```

### Print everything after a given line

```bash
sed -n '/end api/,$p'
```

Print after a given line is found.

### Print everything except matching

```bash
sed -n '/regex/!p'
```

Print everything except lines matching regex. Useful for printing files with comments.

#### Printing REGEX ranges

```bash
sed -n -e '/^START$/,/^END$/p'
```

suppress output and print REGEX range
include (^START$,^END$) lines.

**OR** without "-n" (same result)

```bash
sed -e '/^START$/,/^END$/p;d'
```

print REGEX range and delete other
output, the [;] character means run another
expression on the input file which is 'd' stands for delete .

### Append a text after a specific line number

```bash
sed -e "1a ## HEADING 02:" README.md
```

this appends "## HEADING 02:" after the first line in the file README.md
and print the result to stdout replace -e with -i to write the file .

### Insert text before a specific line number

```bash
sed -e "1i # HEADING 01:" README.md
```

the same as appending but before the first line.

### Deleting text

#### With line number

```bash
sed -e "1,5d" README.md
```

delete a RANGE (i.e. including lines 1 to 5)

```bash
sed -e '1,5!d' README.md
```

delete everything (i.e. excluding lines 1 to 5)
it is better to quote sed expressions with single quotes
especially when there is a [!] character.

#### With REGEX matching

```bash
sed -e "/REGEX/Id" README.md
```

delete lines with /REGEX/ matched
/I is for insensitive search

```bash
sed -e '/REGEX/Ip;d' README.md
```

this invert the previous sed command
delete everything (excluding lines with REGEX)
