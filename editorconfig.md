---
title: editorconfig
prism_languages: [ini]
weight: -1
updated: 2019-09-25
category: Apps
---

### Short example
{: .-prime}

```ini
# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
tab_width = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

This example should be fine for most projects indented by 2 spaces. See: [animate.css editorconfig](https://github.com/daneden/animate.css/blob/master/.editorconfig)

### Properties

```ini
indent_style = {space|tab}
indent_size = {4|tab}
tab_width = 2
end_of_line = {cr|lf|crlf}
charset = {utf-8|utf-16be|utf-16le|latin1}
trim_trailing_whitespace = false
insert_final_newline = true
max_line_length = 80
```

### Full example

```ini
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

### References

- <https://EditorConfig.org>
