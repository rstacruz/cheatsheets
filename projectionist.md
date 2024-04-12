---
title: Projectionist
category: Vim
---

### Basic usage

```json
/* .projectionist.vim */
{
  "app/assets/react/components/*.jsx": {
    "type": "component",
    "template": [
      "import React from 'react'",
      "export default {} = React.createClass({ ... })"
    ]
  }
```

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

### Reference

See [vim-projectionist](https://github.com/tpope/vim-projectionist).
