---
title: OS X
layout: 2017/sheet
category: macOS
---

### Locations of startup items

    ~/Library/LaunchAgents
    /System/Library/LaunchAgents/
    /System/Library/LaunchDaemons/
    /Library/LaunchAgents/
    /Library/LaunchDaemons/

    __Running `launchctl list` show you what launch scripts are currently loaded.__

### Hide desktop icons

    defaults write com.apple.finder CreateDesktop -bool false
    killall Finder

### Auto-hide other windows on dock switch

    defaults write com.apple.dock single-app -bool TRUE
    killall Dock

    defaults delete com.apple.dock single-app
    killall Dock

### Flush DNS

    killall -HUP mDNSResponder   # 10.8+
    dscacheutil -flushcache      # 10.7 below

### Disable spotlight indexing

    mdutil -a -i off                    # disable indexing for all volumes
    mdutil -i off MOUNT_POINT           # disable for specific volume
    touch FOLDER/.metadata_never_index  # disable for FOLDER
                                        

### Turn on/off proxy

    sudo networksetup -setsocksfirewallproxystate Wi-Fi off
    sudo networksetup -setsocksfirewallproxystate Ethernet off
    sudo networksetup -setsocksfirewallproxy Wi-Fi 127.0.0.1 9999
    sudo networksetup -setsocksfirewallproxy Ethernet 127.0.0.1 9999
    sudo networksetup -setsocksfirewallproxystate Wi-Fi on
    sudo networksetup -setsocksfirewallproxystate Ethernet on

### System utils

 - `networksetup` - Configure network (ip, dns, proxy, etc)
 - `tmutil` - Configure Time Machine (enable/disable, exclude path, delete snapshots, etc)
 - `mdutil` - Manage Spotlight (enable/disable, exclude, etc)
 - `diskutil` - Control disk (format, eject, unmount, etc)
 - `launchctl` - Control running "agents"

### Useful utils

 - `open` - open files and directories ([man](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/open.1.html))
 - `textutil` - manipulate text files of various formats ([man](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/textutil.1.html))
 - `pbcopy` / `pbpaste` - provide copying and pasting to the pasteboard ([man](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/pbcopy.1.html))
 - `sips` - scriptable image processing system ([man](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/sips.1.html))
 - `mdfind` - finds files matching a given query ([man](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/mdfind.1.html))
 - `screencapture` - capture images from the screen ([man](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/screencapture.1.html))
 - `defaults` - access the Mac OS X user defaults system ([man](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/defaults.1.html))
 - `/usr/libexec/airportd`
 - `scutil`

 __INFO: `brew` ([link](https://brew.sh)) is highly recommended utility__
