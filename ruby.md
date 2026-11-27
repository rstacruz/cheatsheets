---
title: Ruby
subtitle: Object-oriented scripting language
logo: { src: /assets/logos/ruby.svg }
category: Hidden
# Unfinished stub: a single global-variable table.
tags: [Archived]
archived: |
  This unfinished page contains only a global-variable table, not a Ruby
  reference. Use the [Ruby documentation](https://docs.ruby-lang.org/en/).
intro: |
  Quick reference to some features of the Ruby programming language.
links:
  - title: Ruby documentation
    url: https://docs.ruby-lang.org/en/
last_verified_with: "Ruby 4.1.0."
updated: 2026-11-26
---

### Reference

| Code                    | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| `$!`                    | latest error message                                      |
| `$@`                    | location of error                                         |
| ---                     | ---                                                       |
| `$_`                    | string last read by gets                                  |
| `$.`                    | line number last read by interpreter                      |
| ---                     | ---                                                       |
| `$&`                    | string last matched by regexp                             |
| `$~`                    | the last regexp match, as an array of subexpressions      |
| `$n`                    | the nth subexpression in the last match (same as `$~[n]`) |
| ---                     | ---                                                       |
| `$=`                    | case-insensitivity flag                                   |
| `$/`                    | input record separator                                    |
| `$\`                    | output record separator                                   |
| ---                     | ---                                                       |
| `$0`                    | the name of the ruby script file                          |
| `$*` (or `ARGV`)        | the command line arguments                                |
| `$$`                    | interpreter's process ID                                  |
| `$?`                    | exit status of last executed child process                |
| ---                     | ---                                                       |
| `$-i` `$-l` `$-p` `$-v` | Command line switches                                     |
| `$-v` (or `$VERBOSE`)   | verbose mode                                              |

See: [Global variables](https://docs.ruby-lang.org/en/master/language/globals_md.html)
