---
title: Projectionist
subtitle: Vim file projection plugin
category: Vim
tier: t3
last_verified_with: "vim-projectionist 1.3."
updated: 2026-11-25
---

### Basic usage

#### .projectionist.vim

```json
{
  "app/assets/react/components/*.jsx": {
    "type": "component",
    "template": [
      "import React from 'react'",
      "export default {} = React.createClass({ ... })"
    ]
  }
```
<!-- {: data-highlight="template"} -->

See: [Configuration](https://github.com/tpope/vim-projectionist)

### Available options

```js
{
  "lib/*.rb": {
    "type": "lib", /* enables :Elib */
    "alternate": "test/{}_spec.rb", /* for :A */
    "template": [ ... ],

    "path": "include", /* for `gf` i think */

    "console": "node", /* for :Console */
    "dispatch": "node", /* for :Dispatch (dispatch.vim) */
    "start": "rails server", /* for :Start (dispatch.vim) */
    "make": "node", /* for makeprg */
  }
}
```
<!-- {: data-highlight="alternate; dispatch; make"} -->

See: [Configuration](https://github.com/tpope/vim-projectionist)

### Commands

| Command | Description |
|---------|-------------|
| `:A` | Edit alternate |
| `:A {file}` | Edit file |
|---------|-------------|
| `:AS` | Edit in split |
| `:AV` | Edit in vsplit |
| `:AT` | Edit in tab |
|---------|-------------|
| `:AD` | Replace with template |
|---------|-------------|
| `:Cd` | cd to root |
| `:Cd {path}` | cd to path in root |
| `:Lcd` | cd to root using :lcd |
|---------|-------------|
| `:ProjectDo {cmd}` | run command in root |

See: [Commands](https://github.com/tpope/vim-projectionist)

### Reference

See [vim-projectionist](https://github.com/tpope/vim-projectionist).
