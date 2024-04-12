---
title: GNU grep
category: CLI
updated: 2021-08-23
---

### Usage
{: .-prime}

```bash
grep <options> pattern <file...>
```

### Matching options

```bash
-e, --regexp=PATTERN
-f, --file=FILE
-i, --ignore-case
-v, --invert-match
-w, --word-regexp
-x, --line-regexp
```

### Pattern options

```bash
-F, --fixed-strings   # list of fixed strings
-G, --basic-regexp    # basic regular expression (default)
-E, --extended-regexp # extended regular expression
-P, --perl-regexp     # perl compatible regular expression
```

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

### Output Options

```bash
-c, --count           # print the count of matching lines. suppresses normal output
    --color[=WHEN]    # applies color to the matches. WHEN is never, always, or auto
-m, --max-count=NUM   # stop reading after max count is reached
-o, --only-matching   # only print the matched part of a line
-q, --quiet, --silent
-s, --no-messages     # suppress error messages about nonexistent or unreadable files
```

### Context Options

```bash
-B NUM, --before-context=NUM  # print NUM lines before a match
-A NUM, --after-context=NUM   # print NUM lines after a match
-C NUM, -NUM, --context=NUM   # print NUM lines before and after a match
```

### Examples

```bash
# Case insensitive: match any line in foo.txt
# that contains "bar"
grep -i bar foo.txt

#  match any line in bar.txt that contains
# either "foo" or "oof"
grep -E "foo|oof" bar.txt

# match anything that resembles a URL in
# foo.txt and only print out the match
grep -oE "https?://((\w+[_-]?)+\.?)+" foo.txt

# can also be used with pipes:
# match any line that contains "export" in
# .bash_profile, pipe to another grep that
# matches any of the first set of matches
# containing "PATH"
grep "export" .bash_profile | grep "PATH"

# follow the tail of server.log, pipe to grep
# and print out any line that contains "error"
# and include 5 lines of context
tail -f server.log | grep -iC 5 error
```
