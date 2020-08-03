---
title: Ruby
category: Ruby
tags: [WIP]
layout: 2017/sheet
intro: |
  Quick reference to some features of the Ruby programming language.
---

### Reference

{:.-one-column}

| Code                    | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| `$!`                    | latest error message                                      |
| `$@`                    | location of error                                         |
| `$_`                    | string last read by gets                                  |
| `$.`                    | line number last read by interpreter                      |
| `$&`                    | string last matched by regexp                             |
| `$~`                    | the last regexp match, as an array of subexpressions      |
| `$n`                    | the nth subexpression in the last match (same as `$~[n]`) |
| `$=`                    | case-insensitivity flag                                   |
| `$/`                    | input record separator                                    |
| `$\`                    | output record separator                                   |
| `$0`                    | the name of the ruby script file                          |
| `$*` (or `ARGV`)        | the command line arguments                                |
| `$$`                    | interpreter's process ID                                  |
| `$?`                    | exit status of last executed child process                |
| `$-i` `$-l` `$-p` `$-v` | Command line switches                                     |
| `$-v` (or `$VERBOSE`)   | verbose mode                                              |
