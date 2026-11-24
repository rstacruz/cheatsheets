---
title: OS X
subtitle: Mac administration commands
category: Apps
last_verified_with: "macOS 27.2.1."
updated: 2026-11-24
---

## Services

### Plist locations

```sh
~/Library/LaunchAgents         # per-user agents
/Library/LaunchAgents          # all-user agents
/Library/LaunchDaemons         # all-user daemons
/System/Library/LaunchAgents   # Apple agents
/System/Library/LaunchDaemons  # Apple daemons
```

Agents run in the logged-in user's session; daemons run as root at boot.

### Load and unload

```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/x.plist
launchctl bootout gui/$(id -u)/com.example.x
launchctl kickstart -k gui/$(id -u)/com.example.x
```

`load` and `unload` are the legacy spellings; daemons use `sudo` and the `system/` domain instead of `gui/$(id -u)`.

### Inspect

```bash
launchctl list                        # loaded jobs
launchctl print gui/$(id -u)/com.example.x   # one job
sudo launchctl print system           # system domain
```

### Keep a job off

```bash
sudo launchctl disable system/com.example.daemon
```

`enable`/`disable` take the `system/` or `user/` domain, and the state survives reboots.

## Maintenance

### Flush DNS

```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

### Spotlight index

```bash
sudo mdutil -a -i off             # stop indexing every volume
sudo mdutil -i on /Volumes/Data   # start one volume again
sudo mdutil -E /Volumes/Data      # erase and rebuild its index
```

A `.metadata_never_index` file in a folder keeps Spotlight out of it.

### Proxy

```bash
sudo networksetup -setsocksfirewallproxy Wi-Fi 127.0.0.1 9999
sudo networksetup -setsocksfirewallproxystate Wi-Fi on
sudo networksetup -setsocksfirewallproxystate Wi-Fi off
```

Service names come from `networksetup -listallnetworkservices`.

## Finder and Dock

### Hide desktop icons

```bash
defaults write com.apple.finder CreateDesktop -bool false
killall Finder
```

Use `-bool true` to bring the icons back.

### Single-app Dock

```bash
defaults write com.apple.dock single-app -bool true
killall Dock
defaults delete com.apple.dock single-app   # undo
killall Dock
```

## Utilities

### System tools

| Command | Purpose |
| --- | --- |
| `networksetup` | Network: IP, DNS, proxy |
| `scutil` | System and DNS resolver settings |
| `tmutil` | Time Machine backups and snapshots |
| `mdutil` | Spotlight indexing |
| `diskutil` | Format, mount, eject disks |
| `launchctl` | Agents and daemons |

### Everyday tools

| Command | Purpose |
| --- | --- |
| `open` | Open files, folders, and apps |
| `pbcopy`, `pbpaste` | Clipboard read and write |
| `mdfind` | Spotlight queries from the shell |
| `screencapture` | Screen and window shots |
| `sips` | Resize and convert images |
| `textutil` | Convert text file formats |
| `defaults` | Read and write preferences |

Each one ships a man page, so `man sips` answers the rest.
