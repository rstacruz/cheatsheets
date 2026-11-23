---
title: How to search and replace with ripgrep
link_title: Ripgrep search and replace
subtitle: Preview replacements safely
category: Command line recipes
layout: snippet
last_verified_with: "ripgrep 15.1.0."
updated: 2026-11-23
links:
  - title: ripgrep guide
    url: https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md
  - title: sed manual
    url: https://www.gnu.org/software/sed/manual/sed.html
---

## Replacing
<!-- {: .-snippets} -->

### Preview replacements
<!-- {: .-snippet} -->

```bash
rg 'foo' -r 'bar'
```
<!-- {: data-highlight="-r"} -->

#### Input

```text
foo bar
baz
```

#### Output

```text
bar bar
baz
```

**Previews replacements without editing.** Prints the replaced lines; `-r` is short for `--replace`. See the [ripgrep guide](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md).

### Whole-word matches
<!-- {: .-snippet} -->

```bash
rg -w 'foo' -r 'bar'
```
<!-- {: data-highlight="-w"} -->

#### Input

```text
foo foobar
```

#### Output

```text
bar foobar
```

**Matches whole words only.** `-w` limits the replacement to whole-word matches; see [ripgrep options](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md#common-options).

### Rewrite files
<!-- {: .-snippet} -->

```bash
rg -l -0 'foo' | xargs -0 sed -i 's/foo/bar/g'
```
<!-- {: data-highlight="xargs -0"} -->

#### Input

```text
foo
```

#### Output

```text
bar
```

**Rewrites matching files in place.** `-l -0` lists NUL-separated paths, then `xargs -0` runs `sed -i` safely; see the [sed manual](https://www.gnu.org/software/sed/manual/sed.html#Invoking-sed).

### Capture groups
<!-- {: .-snippet} -->

```bash
rg -o '(\w+)@(\w+)' -r '$2:$1'
```
<!-- {: data-highlight="$2:$1"} -->

#### Input

```text
ada@example
```

#### Output

```text
example:ada
```

**Reorders capture groups.** `-o` prints only matches and `$1`/`$2` reuse groups; see [regex syntax](https://docs.rs/regex/latest/regex/#syntax).
