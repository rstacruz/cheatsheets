---
title: Grep
category: CLI
layout: 2017/sheet
updated: 2019-10-04
---

### Usage
{: .-prime}

```bash
grep <options> pattern <file...>
```

### Matching Options

```bash
-e PATTERN, --regexp=PATTERN
-f FILE, --file=FILE
-i, --ignore-case
-v, --invert-match
-w, --word-regexp
-x, --line-regexp
```

### Pattern Options

```bash
-E, --extended-regexp # extended regular expression
-F, --fixed-strings   # list of fixed strings
-G, --basic-regexp    # basic regular expression (default)
-P, --perl-regexp     # perl compatible regular expression
```

### Output Options

```bash
-c, --count               # print the count of matching lines. suppresses normal output
--color[=WHEN]            # applies color to the matches. WHEN is never, always, or auto
-m NUM, --max-count=NUM   # stop reading after max count is reached
-o, --only-matching       # only print the matched part of a line
-q, --quiet, --silent
-s, --no-messages         # suppress error messages about nonexistent or unreadable files
```

### Context Options

```bash
-A NUM, --after-context=NUM   # print NUM lines after a match
-B NUM, --before-context=NUM  # print NUM lines before a match
-C NUM, -NUM, --context=NUM   # print NUM lines before and after a match
```

### Examples

```bash
grep -i bar foo.txt         # match any line in foo.txt that contains "bar" (case insensitive)
grep -E "foo|oof" bar.txt   # match any line in bar.txt that contains either "foo" or "oof"
grep -oE "https?:\/\/((\w+[_-]?)+\.?)+" foo.txt   # match anything that resembles a URL in foo.txt and only print out the match

# can also be used with pipes:
grep "export" .bash_profile | grep "PATH"   # match any line that contains "export" in .bash_profile, pipe to another grep that matches any of the first set of matches containing "PATH"
tail -f server.log | grep -iC 5 error       # follow the tail of server.log, pipe to grep and print out any line that contains "error" and include 5 lines of context
```
