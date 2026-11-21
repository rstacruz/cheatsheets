---
title: ripgrep
subtitle: Fast recursive search tool
category: Shell
updated: 2026-11-21
tier: t1
fragments:
  - "rg TODO"
  - "rg --files"
  - "rg -g '*.rs'"
  - "-n"
  - "-C 1"
  - "-i"
  - "-F"
  - "-w"
  - "-e TODO"
  - "-t rust"
  - "--hidden"
  - "--no-ignore"
  - "-l"
  - "-c"
  - "-o"
  - "-r '$1!'"
  - "-U"
  - "-P"
  - "git ls-files"
  - "-exec rg"
keywords:
  - ripgrep
  - rg
  - regex search
  - glob filters
intro: |
  [ripgrep](https://github.com/BurntSushi/ripgrep) searches files recursively
  with regular expressions. It skips hidden and gitignored files by default.
links:
  - title: ripgrep repository
    url: https://github.com/BurntSushi/ripgrep
  - title: Regex crate syntax
    url: https://docs.rs/regex/latest/regex/#syntax
  - title: PCRE2 syntax
    url: https://pcre.org/current/doc/html/pcre2syntax.html
---

## Getting started

### Basic search
<!-- {: .-prime} -->

#### Command

```bash
rg TODO
```

#### Output

```
tests/main_test.rs:// TODO: add a test
src/lib.rs:    // TODO: validate input
src/main.rs:    // TODO: bind the port
```

Each match prints its path, line number, and line.

See: [ripgrep repository](https://github.com/BurntSushi/ripgrep)

### Paths

```bash
rg TODO src
rg -n 'TODO' src/main.rs tests
```

Pass files or directories after the pattern to narrow the search.

See: `rg --help` (USAGE)

### Files to search

```bash
rg --files
```

#### Output

```
scratch.md
notes.txt
config.yml
README.md
tests/main_test.rs
src/lib.rs
src/main.rs
```

`--files` lists what rg would search, after ignore rules are applied.

See: `rg --help` (--files)

## Search patterns

### Fixed strings and regex

#### Regex

```bash
rg 'a.b' notes.txt
# → path a.b
# → path axb
```

#### Fixed string

```bash
rg -F 'a.b' notes.txt
# → path a.b
```

`.` is a regex wildcard; `-F` treats the pattern as literal text.

See: [regex syntax](https://docs.rs/regex/latest/regex/#syntax)

### Case and words

```bash
rg -i todo
rg -S todo
rg -w port
```

`-i` always ignores case; `-S`, the default, ignores case only when the pattern is all lowercase. `-w` requires whole words.

See: `rg --help` (-i, -S, -w)

### Whole lines and inversion

```bash
rg -x 'port: 8080' config.yml
rg -v TODO src/lib.rs
```

`-x` matches the entire line; `-v` selects the lines without a match.

See: `rg --help` (-x, -v)

### Multiple patterns

```bash
rg 'TODO|FIXME'
rg -e TODO -e FIXME
```

Both forms find the same four matches; `-e` may be repeated.

See: [regex syntax](https://docs.rs/regex/latest/regex/#syntax)

## Files and globs

### Include globs

```bash
rg -g '*.rs' TODO
```

#### Output

```
tests/main_test.rs:// TODO: add a test
src/lib.rs:    // TODO: validate input
src/main.rs:    // TODO: bind the port
```

`-g` uses gitignore-style patterns and may be repeated.

See: [gitignore patterns](https://git-scm.com/docs/gitignore#_pattern_format)

### Exclude globs

```bash
rg -g '!tests/**' TODO
```

#### Output

```
scratch.md:TODO: untracked scratch note
src/lib.rs:    // TODO: validate input
src/main.rs:    // TODO: bind the port
```

A leading `!` removes paths from the search.

See: [gitignore patterns](https://git-scm.com/docs/gitignore#_pattern_format)

### File types

```bash
rg -t rust TODO
rg -T rust TODO
```

`-T` inverts the type filter; `rg --type-list` lists the known types.

See: `rg --help` (--type, --type-list)

### Hidden and ignored files

#### Hidden

```bash
rg --hidden -g '!.git/**' token
# → .hidden.toml:token = "hidden-token"
```

#### Ignored

```bash
rg --no-ignore TODO
```

#### Output

```
build/output.log:TODO: ignored build line
tests/main_test.rs:// TODO: add a test
src/lib.rs:    // TODO: validate input
src/main.rs:    // TODO: bind the port
scratch.md:TODO: untracked scratch note
```

`--hidden` also enters `.git`; exclude it with a glob. `--no-ignore` overrides `.gitignore` and `.ignore`.

See: `rg --help` (--hidden, --no-ignore)

## Output and context

### Context lines

#### Command

```bash
rg -n -C 1 TODO src/main.rs
```

#### Output

```
2-    let port = 8080;
3:    // TODO: bind the port
4-}
```

#### Options

| Flag  | Prints                    |
| ---   | ---                       |
| `-A N` | N lines after each match  |
| `-B N` | N lines before each match |
| `-C N` | N lines on both sides     |

See: `rg --help` (-A, -B, -C)

### Paths and line numbers

#### With paths

```bash
rg -n -H port src
```

#### Output

```
src/main.rs:2:    let port = 8080;
src/main.rs:3:    // TODO: bind the port
```

#### Without paths

```bash
rg -I -n port src
```

#### Output

```
2:    let port = 8080;
3:    // TODO: bind the port
```

`-H` forces paths; `-I` removes them. `--column` adds a column number.

See: `rg --help` (-H, -I, --column)

### Counts and file lists

#### Counting lines

```bash
rg -c TODO src tests
```

#### Output

```
tests/main_test.rs:1
src/lib.rs:1
src/main.rs:1
```

#### Listing files

```bash
rg -l TODO
```

#### Output

```
scratch.md
tests/main_test.rs
src/lib.rs
src/main.rs
```

`--count-matches` counts matches rather than matching lines.

See: `rg --help` (-c, -l, --count-matches)

### Only matching text

```bash
rg -n -o 'port: \d+' config.yml
# → 2:port: 8080
```

`-o` prints each match instead of its whole line.

See: [regex syntax](https://docs.rs/regex/latest/regex/#syntax)

## Replacement

### Replace printed matches

```bash
rg -o 'TODO: (\w+)' -r '$1!' src
```

#### Output

```
src/main.rs:bind!
src/lib.rs:validate!
```

`-r` changes only printed output, never the files. Capture groups use `$1`.

See: `rg --help` (-r)

### Keep non-matching lines

```bash
rg --passthru -r '<todo>' TODO src/main.rs
```

#### Output

```
fn main() {
    let port = 8080;
    // <todo>: bind the port
}
```

`--passthru` prints every line, replacing matches in place.

See: `rg --help` (--passthru)

## Multiline and PCRE2

### Multiline search

```bash
rg -U '(?s)fn main\(\).*?TODO' src/main.rs
```

#### Output

```
fn main() {
    let port = 8080;
    // TODO: bind the port
}
```

`-U` lets a pattern span lines. `(?s)` makes `.` match newlines; `--multiline-dotall` does the same for every pattern.

See: [regex syntax](https://docs.rs/regex/latest/regex/#syntax)

### PCRE2 lookaround

```bash
rg -P '(?<=TODO: )\w+' src tests
```

#### Output

```
tests/main_test.rs:// TODO: add a test
src/lib.rs:    // TODO: validate input
src/main.rs:    // TODO: bind the port
```

The default engine rejects look-around; `-P` switches to PCRE2.

See: [PCRE2 syntax](https://pcre.org/current/doc/html/pcre2syntax.html)

### Engine selection

| Flag              | Engine                  |
| ---               | ---                     |
| `-P`, `--pcre2`   | PCRE2                   |
| `--engine pcre2`  | PCRE2, long form        |
| `--no-pcre2`      | Restore the default     |
| `--engine default`| Default regex engine    |

See: `rg --help` (--engine)

## Integration

### With find

#### xargs

```bash
find src tests -name '*.rs' -print0 | xargs -0 rg -H -n TODO
```

#### Output

```
tests/main_test.rs:1:// TODO: add a test
src/main.rs:3:    // TODO: bind the port
src/lib.rs:2:    // TODO: validate input
```

#### exec

```bash
find src tests -name '*.rs' -exec rg -H -n TODO {} +
```

#### Output

```
src/lib.rs:2:    // TODO: validate input
src/main.rs:3:    // TODO: bind the port
tests/main_test.rs:1:// TODO: add a test
```

`-print0`/`-0` handle spaces in paths; `-H` keeps filenames when a batch contains only one file.

See: [find(1)](https://man7.org/linux/man-pages/man1/find.1.html)

### With git

```bash
git ls-files -z | xargs -0 rg -n TODO
```

#### Output

```
tests/main_test.rs:1:// TODO: add a test
src/main.rs:3:    // TODO: bind the port
src/lib.rs:2:    // TODO: validate input
```

rg already skips gitignored files; `git ls-files` narrows the search to tracked files.

See: [git-ls-files](https://git-scm.com/docs/git-ls-files)
