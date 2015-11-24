---
title: editorconfig
---

### Example

```conf
# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# 4 space indentation
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)
[*.js]
indent_style = tab

# Indentation override for all JS under lib directory
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

### Properties

```conf
indent_style = {space|tab}
indent_size = {4|tab}
tab_width = 2
end_of_line = {cr|lf|crlf}
charset = {utf-8|utf-16be|utf-16le|latin1}
trim_trailing_whitespace = false
insert_final_newline = true
max_line_length = 80
```

### References

See: http://EditorConfig.org


