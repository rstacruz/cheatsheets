---
title: zoxide
category: CLI
updated: 2026-08-08
keywords:
  - zoxide commands
  - z command
  - smarter cd
  - directory jumping
  - shell navigation
---

## Getting started
{: .-three-column}

### Install

```bash
# Linux and BSD
curl -sSfL https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | sh

# macOS or Linuxbrew
brew install zoxide

# Any platform with Rust
cargo install zoxide --locked
```

```powershell
# Windows
winget install ajeetdsouza.zoxide
```

### Initialize your shell

```bash
# Bash
eval "$(zoxide init bash)"

# Zsh
eval "$(zoxide init zsh)"

# Fish
zoxide init fish | source
```

Add the matching line to your shell configuration file.

### PowerShell and Nushell

```powershell
# PowerShell profile
Invoke-Expression (& { (zoxide init powershell | Out-String) })
```

```nu
# Nushell environment and config files
zoxide init nushell | save -f ~/.zoxide.nu
source ~/.zoxide.nu
```

## Directory navigation
{: .-three-column}

### Jump by keyword
{: .-prime}

```bash
z project            # Best match for "project"
z client api         # Match both keywords
z foo/               # Match a child directory
z ~/src              # Use a regular path
z ..                 # Move one level up
z -                  # Return to the previous directory
```

### Choose interactively

```bash
zi project           # Pick a match with fzf
zi                   # Browse all known directories
```

Interactive selection requires [fzf](https://github.com/junegunn/fzf).

### Replace `cd`

```bash
# Bash
eval "$(zoxide init bash --cmd cd)"

# Zsh
eval "$(zoxide init zsh --cmd cd)"

# Fish
zoxide init fish --cmd cd | source
```

Valid paths still behave like regular `cd` paths.

## Database commands
{: .-three-column}

### Query matches

```bash
zoxide query project                 # Best path only
zoxide query --list project          # List matching paths
zoxide query --list --score project  # Include frecency scores
zoxide query --interactive project   # Select with fzf
```

### Add and remove paths

```bash
zoxide add ~/src/project       # Add or increase rank
zoxide remove ~/src/old-app    # Remove a database entry
```

### Import history

```bash
zoxide import autojump --merge
zoxide import fasd --merge
zoxide import z --merge
zoxide import z.lua --merge
zoxide import zsh-z --merge
```

## Initialization options
{: .-three-column}

### Command names

```bash
zoxide init zsh --cmd j    # Create j and ji
zoxide init zsh --cmd cd   # Replace cd
zoxide init zsh --no-cmd   # Define no commands
```

### Hooks

```bash
zoxide init zsh --hook pwd     # Update after directory changes
zoxide init zsh --hook prompt  # Update at each prompt
zoxide init zsh --hook none    # Disable automatic updates
```

### Other POSIX shells

```bash
eval "$(zoxide init posix --hook prompt)"
```

## Configuration
{: .-two-column}

### Environment variables

| Variable               | Purpose                       |
| ---------------------- | ----------------------------- |
| `_ZO_DATA_DIR`         | Change the database directory |
| `_ZO_ECHO`             | Print the matched directory   |
| `_ZO_EXCLUDE_DIRS`     | Exclude matching paths        |
| `_ZO_FZF_OPTS`         | Pass options to fzf           |
| `_ZO_MAXAGE`           | Limit total database age      |
| `_ZO_RESOLVE_SYMLINKS` | Store resolved paths          |

### Exclude directories

```bash
# Bash or Zsh
export _ZO_EXCLUDE_DIRS="$HOME/private:$HOME/tmp/*"

# Fish
set -gx _ZO_EXCLUDE_DIRS "$HOME/private:$HOME/tmp/*"
```

Use the platform path-list separator (`:` on Unix, `;` on Windows).

## Troubleshooting
{: .-three-column}

### `z` is not found

```bash
zoxide --version          # Verify the binary
zoxide init "$(basename "$SHELL")"  # Inspect generated setup
```

Add the correct initialization line, then restart the shell.

### A directory does not match

```bash
zoxide query --list --score keyword
zoxide add /exact/path
```

The score combines frequency and recency.

### Interactive mode fails

```bash
fzf --version
zoxide query --interactive keyword
```

Install a supported fzf version and restart the shell.

## Also see

- [Official zoxide repository](https://github.com/ajeetdsouza/zoxide) _(github.com)_
- [zoxide commands reference](https://zoxide.org/blog/zoxide-commands/) _(zoxide.org)_
