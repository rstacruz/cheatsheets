---
title: Command line stuff
---

## List (ls)

    ls [options] [paths]

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
{:.shortcuts}

### Options

| `-R` | Recurse |
| `-a` | Include hidden (dotfiles) |
| `-A` | Include hidden (but not . and ..) |
{:.shortcuts}

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
{:.shortcuts}

<br>

## Tail

    tail [-F | -f | -r] [-bN | -cN | -nN] [file ...]

### Modes

| `-f` | follow |
| `-F` | follow by filename (accounts for log rotation) |
| `-r` | Reverse order |
{:.shortcuts}

### Options

| `-bN` | N*512 bytes |
| `-cN` | N bytes |
| `-nN` | N lines |
| `+N`  | Start from line N |
{:.shortcuts}

<br>

## Sudo

```
sudo [options] <command>
```

### Listing

| `-l` | List allowed commands |
{:.shortcuts}

### Options

| `-A` | Use $SUDO_ASKPASS |
| `-b` | Run in background |
| `-E` | Preserve environment |
| `-H` | use target's $HOME |
| `-n` | Don't prompt for password |
| `-P` | Preserve group vector |
| `-S` | Read password from stdin |
{:.shortcuts}

### File descriptors

| `-C fd` | Close all open file descriptors |
{:.shortcuts}

### Prompt

| `-p prompt` | Custom prompt (-p "%p password:") |
{:.shortcuts}

### Interactive

| Switch | Description |
|---|---|
| `-i [cmd]` | Interactive shell without variables |
| `-s [cmd]` | Interactive shell |
|----
| `-u user` | run as this user |
| `-g group` | run as this group |
{:.shortcuts}

### Timestamp

| `-v` | revalidate timestamp for 5 mins |
| `-k` | invalidate timestamp |
| `-K` | just like -k |
{:.shortcuts}

<br>

## wc (Word count)

```
... | wc [options]
```

| `-c` | Bytes |
| `-l` | Lines |
| `-m` | Characters (incl multi-byte) |
| `-w` | Words |
{:.shortcuts}

<br>

## Search-and-replace in all files

    perl -p -i -e 's/hello/HELLO/g' **/*

<br>

## Grep

```
grep [options] [pattern] [file ...]
```

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
{:.shortcuts}

### Synonyms

    egrep  =>  grep -E
    fgrep  =>  grep -F
