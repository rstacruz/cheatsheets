---
title: AppleScript
subtitle: Mac automation language
last_verified_with: "AppleScript 2.8."
updated: 2018-12-06
tier: t3
category: Apps
prism_languages: [applescript]
---

### Running

```applescript
osascript -e "..."
```

```applescript
display notification "X" with title "Y"
```

See: [Running a script](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/RunaScript.html)

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

See: [Lexical conventions](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/conceptual/ASLR_lexical_conventions.html)

### Say

```applescript
-- default voice
say "Hi I am a Mac"
```

```applescript
-- specified voice
say "Hi I am a Mac" using "Zarvox"
```

See: [say](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_cmds.html#//apple_ref/doc/uid/TP40000983-CH216-DontLinkElementID_800)

### Beep

```applescript
-- beep once
beep
```

```applescript
-- beep 10 times
beep 10
```

See: [beep](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_cmds.html#//apple_ref/doc/uid/TP40000983-CH216-DontLinkElementID_665)

### Delay

```applescript
-- delay for 5 seconds
delay 5
```

See: [delay](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_cmds.html#//apple_ref/doc/uid/TP40000983-CH216-DontLinkElementID_714)

### Handlers

```applescript
on doubleNumber(n)
	return n * 2
end doubleNumber

set doubledValue to my doubleNumber(2)
```

See: [About handlers](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/conceptual/ASLR_about_handlers.html)
