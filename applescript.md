---
title: AppleScript
updated: 2023-04-05
layout: 2017/sheet
category: macOS
prism_languages: [applescript]
intro: AppleScript is a scripting language for automating macOS.
---

### Running

```applescript
osascript -e "..."
```

```applescript
display notification "X" with title "Y"
```

## Language Features

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

### Text

```applescript
set myText to "Hello, world!"

-- Text properties
text 1 thru 5 of myText -- "Hello"
length of myText -- 13
words of myText -- {"Hello", "world"}
offset of "world" in myText -- 8

-- Concatenation
myText & " Goodbye!" -- "Hello, world! Goodbye!"

-- Comparing Strings
myText is "Hello, world!" -- true
"Hello" is in myText -- true
myText contains "Goodbye" -- false

considering white space but ignoring case and punctuation
	myText is "hElLo, WoRlD" -- true
	myText is "Hello,world!" -- false
end considering
```

### Numbers

```applescript
set x1 to 1 + 2 - 3 * 4 / 5 -- 0.6
set x2 to 3 ^ 2 -- 9.0
set x3 to 9 ^ 0.5 -- 3.0
set x4 to 9 mod 3 -- 0
set x5 to 9 div 2 -- 4
```

```applescript
set y1 to 1.0 as integer -- 1
set y2 to 2 as real -- 2.0
set y3 to "5" as number -- 5
set y4 to true as integer -- 1
```

```applescript
set z1 to 5 = 4 + 1 -- true
set z2 to 5 <= 4 + 1 -- true
set z3 to 5 > 4 + 1 -- false
set z4 to true or false -- true
set z5 to true and false -- false
```

### Lists

```applescript
set myList to {1, 2, 3, 4}
set listSize to count of myList

-- Accessing list items
set item1 to item 1 of myList
set sublist to items 2 thru 4 of myList

-- Manipulating list elements
set item 3 of myList to -3
copy 5 to the end of myList
set beginning of myList to 0
set theReverse to reverse of myList

-- Checking list membership
5 is in myList -- false
myList contains 4 -- true
```

### Handlers

```applescript
-- Define the handler
on doTheThing()
	-- Do something
	return true
end doTheThing

-- Call the handler
doTheThing()
```

### Script Objects

```applescript
-- Defining a script
script myScript
	property exampleProperty : "Hello, world!"
	
	on doTheThing()
		-- Do something
	end doTheThing
end script

-- Using a script
log myScript's exampleProperty
tell myScript to doTheThing()
```

## File Manipulation

### Reading

```applescript
set myFile to POSIX file "/Users/exampleUser/Documents/example.txt"
set fileRef to open for access myFile with write permission
try
	set fileText to read fileRef
	close access fileRef
on error err
	close access fileRef
end try
```

### Writing

```applescript
set myFile to POSIX file "/Users/exampleUser/Documents/example.txt"
set fileRef to open for access myFile with write permission
try
	write "Hello, world!" to fileRef starting at eof
	close access fileRef
on error err
	close access fileRef
end try
```

## Commands

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

### Display Dialog

```applescript
-- dialog with custom buttons
display dialog "Hello, world!" buttons {"Cancel", "Continue"} default button "Continue" cancel button "Cancel"
```

### Do Shell Script

```applescript
-- ping apple.com 3 times
do shell script "ping -c 3 apple.com"
```

## Useful Links

* [AppleScript Language Guide](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html) _(developer.apple.com)_
* [AppleScript Users Mailing List](http://lists.apple.com/mailman/listinfo/applescript-users) _(lists.apple.com)_
* [macOS Automation Sites](https://www.macosxautomation.com) _(macosxautomation.com)_
* [MacScripter](https://www.macscripter.net) _(macscripter.net)_
* [Late Night Software Forum](https://forum.latenightsw.com) _(forum.latenightsw.com)_
