---
title: Mouse Acceleration
category: macOS
updated: 2018-03-20
weight: -1
keywords:
  - "defaults write .GlobalPreferences com.apple.mouse.scaling -1"
intro: |
  Disable mouse acceleration with this one weird trick.
---

## Acceleration


### Disabling

```bash
defaults write .GlobalPreferences com.apple.mouse.scaling -1
```

Note: Log out to take effect. If you change *Tracking Speed* under System Preferences, it will undo this fix. Only affects the mouse, not the trackpad.

### Re-enabling

Under *System Preferences* → *Mouse*, change *Tracking Speed*.

### Trackpad acceleration

```bash
defaults write .GlobalPreferences com.apple.trackpad.scaling -1
```

Works the same way, but only affects trackpads.

## References

- [Disabling mouse acceleration](https://stackoverflow.com/questions/5782884/disabling-mouse-acceleration-in-mac-os-x) _(stackoverflow.com)_
