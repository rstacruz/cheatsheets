---
title: AppleScript
updated: 2018-12-06
category: macOS
prism_languages: [applescript]
---

### Running

```applescript
osascript -e "..."
```

```applescript
display notification "X" with title "Y"
```

### Comments

```applescript
-- This is a single line comment
```

```applescript
# This is another single line comment
```

```applescript
(*
This is
a multi
line comment
*)
```

### Say

```applescript
-- default voice
say "Hi I am a Mac"
```

```applescript
-- specified voice
say "Hi I am a Mac" using "Zarvox"
```

### Beep

```applescript
-- beep once
beep
```

```applescript
-- beep 10 times
beep 10
```

### Delay

```applescript
-- delay for 5 seconds
delay 5
```

### Handlers

```applescript
on doubleNumber(n)
	return n * 2
end doubleNumber

set doubledValue to my doubleNumber(2)
```
