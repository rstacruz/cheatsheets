---
title: editorconfig
subtitle: Editor config format
logo: { src: /assets/logos/editorconfig.svg, mono: true }
prism_languages: [ini]
weight: -1
updated: 2026-11-23
tier: t3
last_verified_with: "EditorConfig spec 0.17.2."
category: Apps
---

### Short example

<!-- {: .-prime} -->

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

This example should be fine for most projects indented by 2 spaces. See: [animate.css editorconfig](https://github.com/animate-css/animate.css/blob/main/.editorconfig)

### Properties

```ini
indent_style = {space|tab}
indent_size = {4|tab}
tab_width = 2
end_of_line = {cr|lf|crlf}
charset = {utf-8|utf-8-bom|utf-16be|utf-16le|latin1}
spelling_language = en-US
trim_trailing_whitespace = false
insert_final_newline = true
max_line_length = 80
```

`utf-8-bom` is allowed but discouraged; `unset` clears any key.

See: [Supported properties](https://editorconfig.org/#supported-properties)

### Full example

#### Root

```ini
# top-most EditorConfig file
root = true
```

#### All files

```ini
# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true
```

#### Python files

```ini
# 4 space indentation
[*.py]
indent_style = space
indent_size = 4
```

#### JavaScript files

```ini
# Tab indentation (no size specified)
[*.js]
indent_style = tab
```

#### Library JavaScript

```ini
# Indentation override for all JS under lib directory
[lib/**.js]
indent_style = space
indent_size = 2
```

#### Config files

```ini
# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

See: [Example file](https://editorconfig.org/#example-file)

### References

- <https://editorconfig.org/>
- [EditorConfig specification 0.17.2](https://spec.editorconfig.org/)
