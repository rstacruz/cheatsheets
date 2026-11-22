---
title: Yazi
subtitle: Terminal file manager
category: CLI
tier: t1
fragments:
  - "yazi"
  - "gg"
  - "G"
  - "<Space>"
  - "y"
  - "p"
  - "d"
  - "a"
  - "r"
  - "v"
  - "t"
  - "z"
  - "cc"
  - "<C-a>"
updated: 2026-11-16
last_verified_with: "Yazi 26.9.1."
keywords:
  - yazi
  - yazi.toml
  - keymap.toml
  - terminal file manager
intro: |
  [Yazi](https://yazi-rs.github.io/) is a fast terminal file manager written in
  Rust. It previews images, video, PDFs, and archives, and is configured with
  three TOML files.
links:
  - title: Yazi documentation
    url: https://yazi-rs.github.io/docs/quick-start/
  - title: GitHub repository
    url: https://github.com/sxyazi/yazi
  - title: Default keymap
    url: https://github.com/sxyazi/yazi/blob/shipped/yazi-config/preset/keymap-default.toml
---

## Getting started

### Install

```bash
# Arch Linux
sudo pacman -S yazi ffmpeg 7zip jq poppler fd ripgrep fzf zoxide
```

```bash
# macOS
brew install yazi ffmpeg sevenzip jq poppler fd ripgrep fzf zoxide
```

```bash
# Debian/Ubuntu: use the official APT repo
curl -fsSL https://yazi-rs.github.io/builds/yazi-keyring.gpg \
  | sudo tee /usr/share/keyrings/yazi-keyring.gpg >/dev/null
printf '%s %s\n' \
  'deb [signed-by=/usr/share/keyrings/yazi-keyring.gpg]' \
  'https://yazi-rs.github.io/builds/ stable main' \
  | sudo tee /etc/apt/sources.list.d/yazi.list
sudo apt update && sudo apt install yazi
```

`file(1)` is required; `ffmpeg`, `7z`, `jq`, `poppler`, `fd`, `rg`, `fzf`, and
`zoxide` unlock extra previews and searches. A Nerd Font is recommended.

See: [Installation](https://yazi-rs.github.io/docs/installation)

### Start

```bash
yazi                  # current directory
yazi ~/Downloads      # start elsewhere
yazi a.txt b.txt      # preset the selection
yazi --version
```

`q` quits and `Q` quits without writing the cwd file. `~` or `F1` opens help.

See: [Quick start](https://yazi-rs.github.io/docs/quick-start)

### Shell wrapper

```bash
function y() {
	local tmp cwd; tmp="$(mktemp -t "yazi-cwd.XXXXXX")"
	command yazi "$@" --cwd-file="$tmp"
	IFS= read -r -d '' cwd < "$tmp"
	[ "$cwd" != "$PWD" ] && [ -d "$cwd" ] && builtin cd -- "$cwd"
	command rm -f -- "$tmp"
}
```

<!-- {: data-line="3"} -->

Add it to your shell rc and run `y` instead of `yazi`; the parent shell then
follows Yazi's last directory. Fish, Nushell, PowerShell, and other ports are
in the docs.

See: [Shell wrapper](https://yazi-rs.github.io/docs/quick-start#shell-wrapper)

## Navigation
<!-- {: .-three-column} -->

### Cursor

| Key | Action |
| --- | --- |
| `k` / `j` | Up / down |
| `gg` / `G` | Top / bottom |
| `<C-u>` / `<C-d>` | Half page up / down |
| `<C-b>` / `<C-f>` | Full page up / down |
| `K` / `J` | Seek preview up / down |

Arrow keys work too. `J` and `K` scroll the preview without moving the cursor.

See: [cursor motion](https://yazi-rs.github.io/docs/configuration/keymap#mgr.arrow)

### Directories

| Key | Action |
| --- | --- |
| `l` / `h` | Enter child / leave to parent |
| `H` / `L` | Back / forward in history |
| `gh` | Home |
| `gc` | `~/.config` |
| `gd` | `~/Downloads` |
| `g<Space>` | Go to a typed path |
| `z` / `Z` | Jump with fzf / zoxide |

`z` needs fzf; `Z` needs fzf and zoxide.

See: [leave](https://yazi-rs.github.io/docs/configuration/keymap#mgr.leave)

### Tabs

| Key | Action |
| --- | --- |
| `t` `t` | New tab in current directory |
| `1` - `9` | Switch to tab N |
| `[` / `]` | Previous / next tab |
| `{` / `}` | Swap tab left / right |
| `<C-c>` | Close the current tab |

Closing the last tab quits Yazi.

See: [tab_create](https://yazi-rs.github.io/docs/configuration/keymap#mgr.tab_create)

## Files

### Open

| Key | Action |
| --- | --- |
| `<Enter>` / `o` | Open with the default opener |
| `O` / `<S-Enter>` | Choose an opener |
| `;` | Run a shell command |
| `:` | Run a shell command, blocking |

`O` lists every opener the matching `[open]` rule allows. `;` and `:` run in
the current directory.

See: [open](https://yazi-rs.github.io/docs/configuration/keymap#mgr.open)

### Yank and paste

| Key | Action |
| --- | --- |
| `y` | Yank (copy) |
| `x` | Yank (cut) |
| `p` | Paste |
| `P` | Paste, overwriting existing files |
| `Y` / `X` | Cancel the yank |

#### Selection

| Key | Action |
| --- | --- |
| `<Space>` | Toggle selection |
| `<C-a>` / `<C-r>` | Select all / invert selection |
| `v` / `V` | Visual mode |

`y` copies and `x` cuts; both act on the selection, or on the hovered file
when nothing is selected.

See: [yank](https://yazi-rs.github.io/docs/configuration/keymap#mgr.yank)

### Create and rename

| Key | Action |
| --- | --- |
| `a` | Create a file (`/` suffix: directory) |
| `A` | Bulk create, one path per line |
| `r` | Rename, cursor before extension |

A trailing `/` makes a directory. `A` opens a text buffer, then creates every
path in it. `r` renames the selection together when several files are marked.

See: [create](https://yazi-rs.github.io/docs/configuration/keymap#mgr.create)

### Delete and copy paths

| Key | Action |
| --- | --- |
| `d` | Move to the trash |
| `D` | Delete permanently |
| `cc` | Copy the path |
| `cd` | Copy the directory path |
| `cf` | Copy the filename |
| `cn` | Copy the filename without extension |

`d` moves files to the trash; `D` skips it.

See: [remove](https://yazi-rs.github.io/docs/configuration/keymap#mgr.remove)

### Hidden files and sorting

| Key | Action |
| --- | --- |
| `.` | Toggle hidden files |

#### Sorting

| Key | Action |
| --- | --- |
| `,m` / `,M` | Sort by modified time |
| `,b` / `,B` | Sort by birth time |
| `,a` / `,A` | Sort alphabetically |
| `,n` / `,N` | Sort naturally |
| `,e` / `,E` | Sort by extension |
| `,s` / `,S` | Sort by size |
| `,r` | Sort randomly |

Uppercase variants reverse the order. Defaults live under `[mgr]` in
`yazi.toml`.

See: [sort](https://yazi-rs.github.io/docs/configuration/keymap#mgr.sort)

## Find and filter
<!-- {: .-three-column} -->

### Find

| Key | Action |
| --- | --- |
| `/` | Find the next match |
| `?` | Find the previous match |
| `n` / `N` | Next / previous found |
| `<Esc>` | Cancel find |

Find matches names in the current directory as you type.

See: [find](https://yazi-rs.github.io/docs/configuration/keymap#mgr.find)

### Filter

| Key | Action |
| --- | --- |
| `f` | Filter the file list |
| `<Esc>` | Clear the filter |

The filter narrows the listing until you clear it.

See: [filter](https://yazi-rs.github.io/docs/configuration/keymap#mgr.filter)

### Search

| Key | Action |
| --- | --- |
| `s` | Search names with fd |
| `S` | Search contents with ripgrep |
| `<C-s>` | Cancel the search |

Search covers subdirectories and needs `fd` or `rg` on `PATH`.

See: [search](https://yazi-rs.github.io/docs/configuration/keymap#mgr.search)

## Previews

### Spot

| Key | Action |
| --- | --- |
| `<Tab>` | Toggle file details |
| `<Esc>` | Close the spot |

<!-- {: .-shortcuts} -->

Spot shows the MIME type, size, and permissions — useful when writing `[open]`
rules.

See: [spot](https://yazi-rs.github.io/docs/configuration/keymap#mgr.spot)

### Image preview

#### tmux.conf

```sh
set -g allow-passthrough on
set -ga update-environment TERM
set -ga update-environment TERM_PROGRAM
```

<!-- {: data-line="1"} -->

These settings let tmux pass image protocols through. Yazi picks kitty,
iTerm2, WezTerm, Sixel, Überzug++, or Chafa automatically. Outside a
supported terminal, install `ueberzugpp` or `chafa`. Code, JSON, folders,
PDFs, and archives preview through built-in plugins.

See: [image preview](https://yazi-rs.github.io/docs/image-preview)

### Preview settings

#### ~/.config/yazi/yazi.toml

```toml
[preview]
max_width  = 1000
max_height = 1000
wrap       = "yes"
tab_size   = 2
```

Images render at the smaller of these limits and the terminal size. Run
`ya cache clear` after changing the image limits.

See: [preview](https://yazi-rs.github.io/docs/configuration/yazi#preview)

## CLI and integration

### Flags

```bash
yazi --chooser-file=/tmp/picked   # write opened paths, then quit
yazi --cwd-file=/tmp/cwd          # write the cwd on exit
yazi --local-events=hover,cd      # stream local events to stdout
yazi --client-id=12345            # stable ID for ya emit-to
```

Positional arguments set the starting entries.

See: `yazi --help`

### Chooser file

```bash
tmp="$(mktemp)"
yazi --chooser-file="$tmp"
cat "$tmp"          # one selected path per line
rm -f "$tmp"
```

With `--chooser-file`, `Enter` or `o` writes the selected paths and exits, so
shells and editors can use Yazi as a file picker.

See: [Helix picker example](https://yazi-rs.github.io/docs/tips#helix)

### Editor

#### ~/.config/yazi/yazi.toml

```toml
[[opener.edit]]
run   = "$EDITOR %s"
block = true
for   = "unix"

[[open.prepend_rules]]
mime = "text/*"
use  = "edit"
```

`block = true` hands the terminal to the editor and waits. `%s` expands to the
selected paths; `for` limits the opener to an OS.

See: [opener](https://yazi-rs.github.io/docs/configuration/yazi#opener)

## Configuration

### Config files

| File | Purpose |
| --- | --- |
| `yazi.toml` | General settings and openers |
| `keymap.toml` | Keybindings |
| `theme.toml` | Colors and flavors |
| `init.lua` | Plugin setup |

Files live in `~/.config/yazi/` (`%AppData%\yazi\config\` on Windows). Set
`YAZI_CONFIG_HOME` to use another directory.

See: [configuration](https://yazi-rs.github.io/docs/configuration/overview)

### yazi.toml

#### ~/.config/yazi/yazi.toml

```toml
[mgr]
show_hidden = true
sort_by     = "natural"
linemode    = "size"

[preview]
max_width   = 1000
```

Only the keys you set override the defaults; the shipped file is the full
reference.

See: [yazi.toml](https://yazi-rs.github.io/docs/configuration/yazi)

### keymap.toml

#### ~/.config/yazi/keymap.toml

```toml
[[mgr.prepend_keymap]]
on   = [ "g", "d" ]
run  = "cd ~/Downloads"
desc = "Go to Downloads"

[[mgr.append_keymap]]
on   = "T"
run  = "tab_create --current"
desc = "New tab here"
```

`prepend_keymap` wins over the defaults, `append_keymap` loses to them, and
`keymap` replaces the layer.

See: [keymap.toml](https://yazi-rs.github.io/docs/configuration/keymap)

### theme.toml

#### ~/.config/yazi/theme.toml

```toml
[flavor]
dark  = "catppuccin-mocha"
light = "catppuccin-latte"

[mgr]
cwd = { fg = "#89b4fa" }
```

Install flavors with `ya pkg add yazi-rs/flavors:catppuccin-mocha`. Colors take
hex values or named colors.

See: [theme.toml](https://yazi-rs.github.io/docs/configuration/theme)

### Openers

#### ~/.config/yazi/yazi.toml

```toml
[opener]
edit = [
	{ run = "$EDITOR %s", block = true, for = "unix" },
	{ run = "code --wait %s", block = true },
]
play = [ { run = "mpv %s", orphan = true } ]

[open]
prepend_rules = [
	{ mime = "text/*", use = "edit" },
	{ mime = "video/*", use = "play" },
]
```

`%s` expands to all selected paths, `%s1` to the first. `block` waits for the
program; `orphan` keeps it running after Yazi exits.

See: [opener](https://yazi-rs.github.io/docs/configuration/yazi#opener)

## Plugins

### Package manager

```bash
ya pkg add yazi-rs/plugins:git   # install a plugin
ya pkg add owner/my-plugin       # install a whole repo
ya pkg list                      # show installed packages
ya pkg install                   # restore from package.toml
ya pkg upgrade                   # update all packages
```

`ya pkg` clones packages into `plugins/` or `flavors/` and records them in
`package.toml`.

See: [package manager](https://yazi-rs.github.io/docs/cli#pm)

### Actions and events

```bash
ya emit cd /tmp                # run an action in Yazi
ya emit reveal /tmp/foo
ya pub my-event --str hello    # publish a DDS message
ya env                         # print environment info
```

`ya emit` targets the current instance through `$YAZI_ID`; `ya emit-to` takes
an explicit ID.

See: [ya emit](https://yazi-rs.github.io/docs/dds#ya-emit)

### Plugin config

#### ~/.config/yazi/yazi.toml

```toml
[plugin]
prepend_previewers = [
	{ mime = "image/heic", run = "heic" },
]
prepend_preloaders = [
	{ mime = "image/heic", run = "heic" },
]
```

Previewers draw a file type; preloaders cache it. Initialize plugins in
`init.lua`.

See: [plugin rules](https://yazi-rs.github.io/docs/configuration/yazi#plugin)
