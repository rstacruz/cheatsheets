---
title: OS X
---

### Locations of startup items

    /System/Library/LaunchAgents/
    /System/Library/LaunchDaemons/
    /Library/LaunchAgents/
    /Library/LaunchDaemons/

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

### Turn off spotlight

    sudo vim /etc/hostconfig  # change SPOTLIGHT=-YES- to SPOTLIGHT=-NO-
    mdutil -i off /
