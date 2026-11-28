---
title: Mouse Acceleration
subtitle: Fix for macOS mouse acceleration
category: Hidden
# macOS 14 moved this to System Settings; com.apple.mouse.scaling no longer works.
tags: [Archived]
archived: |
  macOS 14 Sonoma moved this to System Settings › Mouse › Advanced › Pointer
  acceleration; `com.apple.mouse.scaling -1` no longer turns acceleration off.
  See [Mouse settings](https://support.apple.com/guide/mac-help/mouse-settings-mh29222/mac)
  in Apple's Mac User Guide.
created_at: 2018-03-20
updated: 2018-03-20
weight: -1
keywords:
  - "defaults write .GlobalPreferences com.apple.mouse.scaling -1"
intro: |
  Disable mouse acceleration with this one weird trick.
links:
  - title: Disabling mouse acceleration
    url: https://stackoverflow.com/questions/5782884/disabling-mouse-acceleration-in-mac-os-x
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
