---
title: awk
subtitle: Text processing language
logo: { set: icon-park-outline, name: data-file }
category: Shell
updated: 2026-11-18
last_verified_with: "awk 1.32.0."
tier: t2
fragments:
  - "awk '{print $1}'"
  - "-F:"
  - "NR==1"
  - "$NF"
  - "BEGIN"
  - "END { print NR }"
  - 'gsub(/x/, "y")'
  - 'split(s, a, ",")'
  - "substr(s, 2, 3)"
  - 'printf "%5.2f"'
  - "-v x=1"
  - "a[$1]++"
  - "for (k in a)"
  - "next"
  - "$1 > 100"
  - "-f prog.awk"
  - "length($0)"
  - "sort | uniq -c"
intro: |
  awk is a line-by-line text processor built into every Unix. Patterns
  match records and run actions. This sheet covers portable awk and GNU
  extensions.
links:
  - title: GNU awk manual
    url: https://www.gnu.org/software/gawk/manual/gawk.html
  - title: POSIX awk
    url: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/awk.html
  - title: awk(1)
    url: https://man7.org/linux/man-pages/man1/awk.1p.html
---

## Getting started

### Invocation

```bash
awk '{ print $1 }' file.log       # First column
awk -F: '{ print $1 }' /etc/passwd
awk -v limit=10 '$3 > limit' data.tsv
awk -f report.awk data.tsv
```
<!-- {: data-highlight="-F; -v; -f"} -->

`-F` sets the field separator and `-v` defines a variable before the program runs.

See: [Invoking awk](https://www.gnu.org/software/gawk/manual/gawk.html#Invoking-Awk)

### Program shape

```
BEGIN      { ... }        # Once, before any input
/pattern/  { ... }        # Lines matching the regex
$3 > 100   { ... }        # Lines matching a condition
NR == 1                   # Pattern only: print the line
           { print $2 }   # Action only: every line
END        { ... }        # Once, after all input
```

A program is a list of `pattern { action }` rules; either part is optional.

See: [Patterns and actions](https://www.gnu.org/software/gawk/manual/gawk.html#Patterns-and-Actions)

### Ranges

```bash
awk '/BEGIN/,/END/' file           # Between two markers
awk '/start/ { on = 1 } on { print } /end/ { on = 0 }'
```
<!-- {: data-highlight="/BEGIN/,/END/"} -->

A comma pattern turns on at the first match and off after the second.

See: [Range patterns](https://www.gnu.org/software/gawk/manual/gawk.html#Ranges)

### Options

```
-F fs          # Field separator
-v var=value   # Set a variable
-f prog.awk    # Read the program from a file
--posix        # Strict POSIX mode (gawk)
--version      # Version (gawk)
```

`gawk -i inplace` edits files in place, but it is a GNU extension.

See: [Command-line options](https://www.gnu.org/software/gawk/manual/gawk.html#Command_002dLine-Options)

## Fields

### $0 and $n

```bash
awk '{ print $0 }' file            # The whole line
awk '{ print $1, $NF }' file       # First and last field
awk '{ print $(NF-1) }' file       # Second to last
```
<!-- {: data-highlight="$0; $NF"} -->

Fields are split on `FS` before the action runs; `$0` is the whole record.

See: [Fields](https://www.gnu.org/software/gawk/manual/gawk.html#Fields)

### FS and OFS

```bash
awk -F, '{ print $2 }' file.csv
awk 'BEGIN { FS = ","; OFS = "\t" } { $1 = $1; print }'
```
<!-- {: data-highlight="FS; OFS"} -->

Assigning a field rebuilds `$0` with `OFS`, which is the usual CSV-to-TSV trick. The default `FS = " "` splits on runs of spaces and tabs.

See: [Field separators](https://www.gnu.org/software/gawk/manual/gawk.html#Field-Separators)

### RS and ORS

```bash
awk 'BEGIN { RS = "" } { print NF }'     # Paragraph mode
gawk 'BEGIN { RS = "\n\n"; ORS = "\n--\n" } { print }'
```
<!-- {: data-highlight="RS; ORS"} -->

`RS` splits input into records and `ORS` terminates each `print`.

See: [Record separators](https://www.gnu.org/software/gawk/manual/gawk.html#Record-Separators)

## Variables

### Built-in variables

| Variable | Holds |
| --- | --- |
| `$0` | The current record |
| `$1` … `$NF` | Fields |
| `NF` | Number of fields |
| `NR` | Records read so far |
| `FNR` | Records in the current file |
| `FILENAME` | Current file name |
| --- | --- |
| `FS` / `OFS` | Input / output field separator |
| `RS` / `ORS` | Input / output record separator |
| `RSTART` / `RLENGTH` | `match()` result |
| `SUBSEP` | Key separator for `a[i,j]` |
| `ENVIRON["HOME"]` | Environment variables |

`ARGV` and `ARGC` are standard; `ARGIND` is a gawk addition.

See: [Built-in variables](https://www.gnu.org/software/gawk/manual/gawk.html#Built_002din-Variables)

### Setting variables

```bash
awk -v n=3 'NR <= n' file
awk '{ total += $2 } END { print total }' file
awk 'BEGIN { OFS = ":" } { $1 = $1; print }' file
```
<!-- {: data-highlight="-v n=3"} -->

`-v` sets a variable before `BEGIN`; an assignment after the program sets one while reading.

See: [Variables](https://www.gnu.org/software/gawk/manual/gawk.html#Using-Variables)

## Strings

### sub and gsub

```bash
awk '{ sub(/foo/, "bar"); print }' file     # First match
awk '{ gsub(/[0-9]+/, "N"); print }' file   # Every match
awk '{ gsub(/a/, "&!"); print }' file       # & is the match
```
<!-- {: data-highlight="sub; gsub"} -->

`sub` and `gsub` edit `$0` unless you pass a target variable.

See: [String functions](https://www.gnu.org/software/gawk/manual/gawk.html#String-Functions)

### split

```bash
awk '{ n = split($0, parts, ","); print n, parts[1] }' file
```
<!-- {: data-highlight="split"} -->

`split` fills an array from 1 and returns its length.

See: [split](https://www.gnu.org/software/gawk/manual/gawk.html#String-Functions)

### substr and index

```bash
awk '{ print substr($0, 1, 10) }' file     # First 10 chars
awk '{ print substr($0, 5) }' file         # From char 5
awk '{ print index($0, "error") }' file    # 0 if absent
```
<!-- {: data-highlight="substr; index"} -->

String positions start at 1, and `length($0)` counts characters.

See: [substr](https://www.gnu.org/software/gawk/manual/gawk.html#String-Functions)

### match and case

```bash
awk '{ if (match($0, /[0-9]+/)) print RSTART, RLENGTH }' file
awk '{ print toupper($1), tolower($2) }' file
```
<!-- {: data-highlight="RSTART; RLENGTH"} -->

`match()` sets `RSTART` and `RLENGTH`; `~` tests a regex without setting them.

See: [match](https://www.gnu.org/software/gawk/manual/gawk.html#String-Functions)

## Numbers and printf

### printf formats

```bash
awk '{ printf "%-10s %5.2f\n", $1, $2 }' file
awk 'BEGIN { printf "%03d %x %c\n", 7, 255, 65 }'
awk '{ s = sprintf("%s: %d", $1, $2); print s }' file
```
<!-- {: data-highlight="printf; sprintf"} -->

`printf` takes a format and a comma-separated list; `print` separates its arguments with `OFS` and ends with `ORS`.

See: [Printf](https://www.gnu.org/software/gawk/manual/gawk.html#Printf)

### Math functions

```bash
awk '{ sum += $1 } END { print sum, sum/NR }' file
awk 'BEGIN { print int(3.9), sqrt(16), 2^10 }'
awk 'BEGIN { srand(); print int(rand() * 100) }'
```
<!-- {: data-highlight="int; sqrt; rand"} -->

`int()` truncates toward zero; `%` is modulo; `^` means power.

See: [Numeric functions](https://www.gnu.org/software/gawk/manual/gawk.html#Numeric-Functions)

### Strings and numbers

```bash
awk '{ print $1 + 0 }' file          # Coerce to a number
awk 'BEGIN { print "10" < "9" }'     # String compare: 1
awk 'BEGIN { print 10 < 9 }'         # Numeric compare: 0
```
<!-- {: data-highlight="+ 0"} -->

A field is a numeric string when it looks like a number; `+0` forces a number.

See: [Conversion](https://www.gnu.org/software/gawk/manual/gawk.html#Conversion)

## Arrays

### Counting

```bash
awk '{ count[$1]++ } END { for (k in count) print count[k], k }' file
awk '$0 in seen { next } { seen[$0] = 1; print }' file
```
<!-- {: data-highlight="count[$1]++; seen[$0]"} -->

Array keys are strings, and a missing entry reads as 0.

See: [Arrays](https://www.gnu.org/software/gawk/manual/gawk.html#Arrays)

### Iteration

```bash
gawk 'BEGIN { PROCINFO["sorted_in"] = "@ind_str_asc" }
      { count[$1]++ }
      END { for (k in count) print k }' file
```
<!-- {: data-highlight="sorted_in"} -->

`for (k in a)` visits keys in unspecified order unless gawk's `sorted_in` is set.

See: [Array traversal](https://www.gnu.org/software/gawk/manual/gawk.html#Controlling-Array-Traversal)

### Delete and multiple keys

```bash
awk '{ delete count[$1] }' file
awk '{ total[$1, $2] += $3 } END { for (k in total) print k }'
awk 'BEGIN { a["x", "y"] = 1; if (("x", "y") in a) print "yes" }'
```
<!-- {: data-highlight='delete count[$1]; total[$1, $2]; a["x", "y"]'} -->

`a[i,j]` joins the keys with `SUBSEP`. `delete a` clears the whole array in gawk.

See: [Delete](https://www.gnu.org/software/gawk/manual/gawk.html#Delete)

## Control flow

### if and else

```bash
awk '{ if ($3 > 100) print "high"; else print "low" }' file
awk '$3 > 100 && $4 ~ /ok/ { count++ } END { print count }' file
```
<!-- {: data-highlight="if"} -->

Patterns are conditions, so simple filters need no `if`.

See: [Control statements](https://www.gnu.org/software/gawk/manual/gawk.html#Statements)

### Loops

```bash
awk '{ for (i = 1; i <= NF; i++) print i, $i }' file
awk 'BEGIN { while ((getline line < "file") > 0) print line }'
```
<!-- {: data-highlight="for; while"} -->

`break` and `continue` work as they do in C.

See: [While statement](https://www.gnu.org/software/gawk/manual/gawk.html#While-Statement)

### next and exit

```bash
awk '/^#/ { next } { print }' file
awk 'NR == 10 { exit } { print }' file
```
<!-- {: data-highlight="next; exit"} -->

`next` skips the rest of the record; `exit` runs `END` unless it is already in `END`.

See: [Next statement](https://www.gnu.org/software/gawk/manual/gawk.html#Next-Statement)

## One-liners

### Lines and columns

```bash
awk 'NR >= 2 && NR <= 5' file      # Lines 2 to 5
awk 'NF' file                      # Skip blank lines
awk '{ print NR": "$0 }' file      # Number lines
awk '!seen[$0]++' file             # Drop duplicates
```
<!-- {: data-highlight="NR; NF; !seen[$0]++"} -->

`NF` is false on a blank line, so `awk 'NF'` filters them out.

See: [Simple examples](https://www.gnu.org/software/gawk/manual/gawk.html#Simple-Examples)

### Summaries

```bash
awk '{ s += $1 } END { print s }' file
awk '{ s += $1 } END { print s/NR }' file
awk '{ c[$1]++ } END { for (k in c) print c[k], k }' file
```
<!-- {: data-highlight="print s"} -->

An unset variable is empty, which counts as 0 in arithmetic.

See: [END](https://www.gnu.org/software/gawk/manual/gawk.html#END)

### Two files

```bash
awk 'NR == FNR { seen[$0] = 1; next }
     $0 in seen' a.txt b.txt       # Lines in both files
```
<!-- {: data-highlight="NR == FNR"} -->

`NR == FNR` holds while the first file is read; an empty first file breaks the trick.

See: [FNR](https://www.gnu.org/software/gawk/manual/gawk.html#Auto_002dset)

## Output

### Redirection

```bash
awk '{ print > "out.txt" }' file
awk '{ print >> "out.txt" }' file
awk '{ print > "/dev/stderr" }' file
```
<!-- {: data-highlight=">; >>"} -->

`>` truncates on first use and appends afterwards; `>>` always appends.

See: [Redirection](https://www.gnu.org/software/gawk/manual/gawk.html#Redirection)

### Pipes

```bash
awk '{ print $1 }' file | sort | uniq -c | sort -rn
awk '{ print $1 | "sort -u" }' file
```
<!-- {: data-highlight='"sort -u"'} -->

A pipe inside the program stays open; the shell pipe is usually simpler.

See: [Pipes](https://www.gnu.org/software/gawk/manual/gawk.html#Pipes)
