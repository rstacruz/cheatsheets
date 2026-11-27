---
title: Command line stuff
subtitle: Unix shell basics
logo: { set: icon-park-outline, name: terminal }
category: Shell
last_verified_with: "GNU coreutils 9.12, Bash 5.3."
updated: 2026-11-25
tier: t3
---

## List (ls)

<!-- {: .-three-column} -->

### Usage

```
ls [options] [paths]
```

See: [ls synopsis](https://man7.org/linux/man-pages/man1/ls.1.html#SYNOPSIS)

### Format

| Switch | Description |
|---|---|
| `-1` | One entry per line |
| `-l` | Long view |
| `-o` | Long view (without groups) |
| `-C` | Multicolumn (sorted horizontally) |
| `-x` | Multicolumn (sorted vertically) |
|---
| `-F` | Add / after directories |
| `-G` | Color |

See: [ls description](https://man7.org/linux/man-pages/man1/ls.1.html#DESCRIPTION)

### Options

| Switch | Description |
| --- | --- |
| `-R` | Recurse |
| `-a` | Include hidden (dotfiles) |
| `-A` | Include hidden (but not . and ..) |

See: [ls description](https://man7.org/linux/man-pages/man1/ls.1.html#DESCRIPTION)

### Sorting

| Switch | Description |
|---|---|
| `-r` | reverse order |
| `-S` | sort by size |
| `-t` | sort by time modified |
| `-u` | sort by time accessed |
| `-U` | sort by time created |
| `-c` | sort by time status was changed |
|---
| `-h` | Human-readable size (3k) |

See: [ls description](https://man7.org/linux/man-pages/man1/ls.1.html#DESCRIPTION)

## Tail

<!-- {: .-three-column} -->

### Usage

```
tail [-F | -f | -r] [-bN | -cN | -nN] \
  [file ...]
```

See: [tail synopsis](https://man7.org/linux/man-pages/man1/tail.1.html#SYNOPSIS)

### Modes

| Mode | Description |
| --- | --- |
| `-f` | follow |
| `-F` | follow by filename (accounts for log rotation) |
| `-r` | Reverse order |

See: [tail description](https://man7.org/linux/man-pages/man1/tail.1.html#DESCRIPTION)

### Options

| Option | Description |
| --- | --- |
| `-bN` | N*512 bytes |
| `-cN` | N bytes |
| `-nN` | N lines |
| `+N`  | Start from line N |

See: [tail description](https://man7.org/linux/man-pages/man1/tail.1.html#DESCRIPTION)

## Sudo

<!-- {: .-three-column} -->

### Usage

```
sudo [options] <command>
```

See: [sudo synopsis](https://man7.org/linux/man-pages/man8/sudo.8.html#SYNOPSIS)

### Listing

| Option | Description |
| --- | --- |
| `-l` | List allowed commands |

See: [sudo(8) description](https://man7.org/linux/man-pages/man8/sudo.8.html#DESCRIPTION)

### Options

| Option | Description |
| --- | --- |
| `-A` | Use $SUDO_ASKPASS |
| `-b` | Run in background |
| `-E` | Preserve environment |
| `-H` | use target's $HOME |
| `-n` | Don't prompt for password |
| `-P` | Preserve group vector |
| `-S` | Read password from stdin |

See: [sudo(8) description](https://man7.org/linux/man-pages/man8/sudo.8.html#DESCRIPTION)

### File descriptors

| Option | Description |
| --- | --- |
| `-C fd` | Close all open file descriptors |

See: [sudo(8) description](https://man7.org/linux/man-pages/man8/sudo.8.html#DESCRIPTION)

### Prompt

| Option | Description |
| --- | --- |
| `-p prompt` | Custom prompt (-p "%p password:") |

See: [sudo(8) description](https://man7.org/linux/man-pages/man8/sudo.8.html#DESCRIPTION)

### Interactive

| Switch | Description |
|---|---|
| `-i [cmd]` | Interactive shell without variables |
| `-s [cmd]` | Interactive shell |
|----
| `-u user` | run as this user |
| `-g group` | run as this group |

See: [sudo(8) description](https://man7.org/linux/man-pages/man8/sudo.8.html#DESCRIPTION)

### Timestamp

| Option | Description |
| --- | --- |
| `-v` | revalidate timestamp for 5 mins |
| `-k` | invalidate timestamp |
| `-K` | just like -k |

See: [sudo(8) description](https://man7.org/linux/man-pages/man8/sudo.8.html#DESCRIPTION)

## wc (Word count)

<!-- {: .-three-column} -->

### wc

```
... | wc [options]
```

See: [wc synopsis](https://man7.org/linux/man-pages/man1/wc.1.html#SYNOPSIS)

### Options

| Option | Description |
| --- | --- |
| `-c` | Bytes |
| `-l` | Lines |
| `-m` | Characters (incl multi-byte) |
| `-w` | Words |

See: [wc description](https://man7.org/linux/man-pages/man1/wc.1.html#DESCRIPTION)

## Grep

<!-- {: .-three-column} -->

### Usage

```
grep [options] [pattern] [file ...]
```

See: [grep synopsis](https://man7.org/linux/man-pages/man1/grep.1.html#SYNOPSIS)

### Options

| Switch | Description |
|---|---|
| `-A num` | Print `num` lines of training context |
|----
| `-G` | --basic-regexp (default) |
| `-E` | --extended-regexp |
| `-P` | --perl-regexp |
|----
| `-f file` | --file (Get patterns for file) |
| `-F` | --fixed-strings |
|----
| `-h` | --no-filename |
| `-H` | --with-filename |
|----
| `-l` | --files-with-matches (just print filenames) |
| `-L` | --files-without-match |
|----
| `-r, -R` | --recursive |
| `-v` | --invert-match |
| `-i` | --ignore-case |

See: [grep options](https://man7.org/linux/man-pages/man1/grep.1.html#OPTIONS)

### Synonyms

```
egrep  =>  grep -E
fgrep  =>  grep -F
```

See: [grep description](https://man7.org/linux/man-pages/man1/grep.1.html#DESCRIPTION)

### Search-and-replace in all files

```
perl -p -i -e 's/hello/HELLO/g' **/*
```

See: [perlrun -i](https://perldoc.perl.org/perlrun#-i%5Bextension%5D)
