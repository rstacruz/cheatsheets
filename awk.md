---
title: awk
category: CLI
layout: 2017/sheet
intro: |
  Here's some hints on using AWK.
---
AWK is a data-driven scripting language for processing textual data. 
- [Learn AWK in 20 minutes](https://ferd.ca/awk-in-20-minutes.html) _(ferd.ca/awk-in-20-minutes.html)_
- [Learn AWK in y minutes](https://learnxinyminutes.com/docs/bash/) _(learnxinyminutes.com)_
- [GNU AWK Manual](https://www.gnu.org/software/gawk/manual/html_node) _(www.gnu.org/software/gawk)_

The name AWK is derived from the initials of the language's three developers: A. Aho, B. W. Kernighan and P. Weinberger.


Usage options
-------------

```bash
awk -F, '{print $2}' example.csv  # Use other field seperator
awk -v foo=2 'BEGIN{print foo^2}' # Import variable(s)
awk -f program.awk input1 input2  # Use file for commands
```

Program structure
-----------------
An AWK program may consist a BEGIN part, one or multiple patterns and an END part. Each of them is followed by an __action__ defined in __{ }__. If no action is defined, the input line, known as variable __$0__, will be printed.

```bash
awk 'BEGIN {print 2}'           # Action before processing any file
awk '/abc/ {i++}'    file1.txt  # Do for every matched pattern...
awk '/a/{a++}/b/b++' file1.txt  # Multiple patterns allowed
awk 'END{print i}'   file1.txt  # Finally execute END part
```

Actions
-------
The statements in an action can include:
- `expressions` with constants, variables, assignments, function call etc.
- __print__ expression-list
- __printf(__ format,expression-list __)__
- __if (__ expression __)__ statement_
- __if (__ expression __)__ statement __else__ statement
- ___while__ __(__ expression __)__ statement_
- __do__ statement __while__ expression
- __for__ __(__ expression1, expression2, expression3 __)__ statement
- __for__ __(__ variable __in__ array __)__ statement
- __delete__ arrayname\[expression\]
- Flow control: __break__, __continue__, __next__, __exit__, __exit expression__
- Grouping __{statement; statement; ...}__




Patterns
--------

Column 1 Heading          | Column 2 Heading
------------------------- | ---
`expression`              | Matches when the expression is true
`/regexpr/`               | Matches when the current input line contains a substring matched by __regexpr__
`expression~/regpexpr/`   | Matches if the string value of __expression__ contains matched by __regexpr__
`expression!~/regpexpr/`  | Matches if the string value of __expression does not__ contain a substring matched by regexpr
`beginpat,endpat`         | Matches starting at the begin pattern and stop matching after end pattern.
--- | ---



```bash
awk -F, 'NF>3' unequalnumcol.csv # Print only rows with more
                                 # than three columns
awk '/G/,/T/' sortednames.txt    # Print names starting with
                                 # G till (including first) T
```
See also [regular expressions](https://devhints.io/regexp)


Special variables
-----------------

| -------- | -------------------------------------------- | --------- |
| Variable | Description                                  | Default   |
| -------- | -------------------------------------------- | --------- |
| ARGC     | Number of commandline arguments              |           |
| ARGV     | Array of commandline arguments               |           |
| FILENAME | Name of current input file                   |           |
| FNR      | Record number in current file                |           |
| FS       | Input field seperator                        | _(space)_ |
| NF       | Number of fields in current record           |           |
| NR       | Number of records read so far                |           |
| OFMT     | Output format for numbers                    |  `%.6g`   |
| OFS      | Output field seperator                       | _(space)_ |
| ORS      | Output record seperator                      |  `\n`     |
| RLENGTH  | Length of string matched by `match` function |           |
| RS       | Input record seperator                       | `\n`      |
| RSTART   | Start of string matched by `match` function  |           |
| SUBSEP   | Array subscript seperator                    | `\034`    |
{: .-headers}

See also in the GNU manual on [special variables](https://www.gnu.org/software/gawk/manual/html_node/Built_002din-Variables.html)


Operators
---------

| Type           | Description                  |
| -------------- | ---------------------------- |
| arithmetic     | `+ - * / % ^`                |
| assignment     | `= += -= *= /= %= ^= ++ -- ` |
| logical        | `\|\| && !`                  |
| matching       | `~ !~`                       |
| relational     | `< <= == != > >=`            |
| concatenation  | _(no explicit operator)_     |
| unary          | `+ - `                       |
| conditional    | `?:`                         |
| grouping       | `( )`                        |
{: .-headers}


Functions
---------

### String functions

| Function        | Description                                          |
| --------------- | ----------------------------------------------------- |
| `gsub(r,s)`     | substitute __s__ for __r__ globally in $0, return number of substitutions made        |
| `gsub(r,s,t)`   | substitute __s__ for __r__ globally in string __t__, return number of substitutions made|
| `index(s,t)`    | return the first position of string __t__ in __s__, or 0 if __t__ is not present        |
| `length(s)`     | return number of characters __s__                                                   |
| `match(s,r)`    | test whether __s__ contains a sbstring matched by __r__, return index or 0. Set special variables RSTART and RLENGTH |
{: .-headers}

### Math functions

| Function        | Return value                                              |
| --------------- | --------------------------------------------------------- |
| `atan2(y,x)`    | arctangent of __y__/__x__                                 |
| `cos(x)`        | cosine of __x__ , with __x__ in radians                   |
| `exp(x)`        | exponential function of __x__                             |
| `int(x)`        | integer part of __x__, truncated towards 0 when __x < 0__ |
| `log(x)`        | natural (base __e__) logarithm of __x__                   |
| `rand()`        | random number __r__, where __0 <= r < 1__                 |
| `sin(x)`        | sine of __x__ , with __x__ in radians                     |
| `sqrt(x)`       | square root of __x__                                      |
| `srand(x)`      | set __x__ as new seed for __rand()__                      |
{: .-headers}

Output Formating
----------------

### Print function



| Format       | Description                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| `%c`         | character                                                                    |
| `%[-][n]c`   | string, optionally with leading `[-]` using `[n]` positions                  |
| `%[-][n]d`   | decimal integer                                                              |
| `%[-][n]o`   | octal integer                                                                |
| `%[-][n]x`   | hexadecimal integer                                                          |
| `%[-][n]u`   | unsigned decimal integer                                                     |
| `%[-][n.m]f` | floating number                                                              |
| `%[-][n.m]e` | scientific notation                                                          |
| `%[-][n.m]g` | Format __e__ or __f__, whichever is shorter with non-significant zeros suppressed |
{: .-headers}

```bash
awk 'BEGIN{printf("pi = %2.3e\n",22/7)}'
awk 'BEGIN{printf("%c %d %o %x",65,65,65,65)}'
```

### Escape sequences

| Format   | Description                                                        |
| -------- | ------------------------------------------------------------------ |
| `\r`     | carriage return                                                    |
| `\n`     | newline                                                            |
| `\t`     | tab                                                                |
| `\f`     | formfeed                                                           |
| `\ddd`   | octal value `ddd`, where `ddd` is 1 to 3 digits between 0 and 7    |
| `\c`     | any other character `c` literally: `\\` for backslash, `\"` for `"`|
{: .-headers}

```bash
awk 'BEGIN{printf("\110\145\154\154\157\n")}'
```
