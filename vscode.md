---
title: Visual Studio Code
category: Apps
updated: 2026-11-14
weight: -5
keywords:
  - "⇧⌘P: Command palette"
  - "⌘P: Quick open"
  - "⌘B: Toggle sidebar"
  - "⌃`: Toggle terminal"
  - "F5: Start debugging"
intro: |
  Shortcuts below are the macOS defaults. On Windows and Linux, replace `⌘` with
  `Ctrl` and `⌥` with `Alt`.
links:
  - title: Keyboard shortcuts
    url: https://code.visualstudio.com/docs/configure/keybindings
  - title: Command line interface
    url: https://code.visualstudio.com/docs/configure/command-line
---

## Basics
<!-- {: .-three-column} -->

### Command palette

| Key     | Description                |
| ---     | ---                        |
| `⇧⌘P`   | Show all commands          |
| `⌘P`    | Quick open file            |
| ---     | ---                        |
| `⌘T`    | Go to symbol in workspace  |
| `⇧⌘O`   | Go to symbol in file       |
| `⌃G`    | Go to line                 |
| ---     | ---                        |
| `⌘K ⌘S` | Keyboard shortcuts         |

See: [Keyboard shortcuts](https://code.visualstudio.com/docs/configure/keybindings)

### Files

| Key     | Description             |
| ---     | ---                     |
| `⌘N`    | New file                |
| `⌘O`    | Open file               |
| `⌘S`    | Save                    |
| `⇧⌘S`   | Save as                 |
| `⌥⌘S`   | Save all                |
| ---     | ---                     |
| `⌘W`    | Close editor            |
| `⌘K ⌘W` | Close all editors       |
| `⇧⌘T`   | Reopen closed editor    |
| ---     | ---                     |
| `⌘K P`  | Copy path of active file|
| `⌘K R`  | Reveal active file      |

See: [User interface](https://code.visualstudio.com/docs/editing/getting-started/userinterface)

### Editing

| Key                   | Description                    |
| ---                   | ---                            |
| `⌘C` / `⌘X`           | Copy/cut line (no selection)    |
| `⌥Up` / `⌥Down`       | Move line up/down               |
| `⇧⌥Up` / `⇧⌥Down`     | Copy line up/down               |
| `⇧⌘K`                 | Delete line                     |
| `⌘Enter` / `⇧⌘Enter`  | Insert line below/above         |
| `⌘]` / `⌘[`           | Indent/outdent line             |
| ---                   | ---                            |
| `⌘/`                  | Toggle line comment             |
| `⇧⌥A`                 | Toggle block comment            |
| `⇧⌥F`                 | Format document                 |
| `⌘K ⌘F`               | Format selection                |
| `⌘K ⌘X`               | Trim trailing whitespace        |
| `⌥Z`                  | Toggle word wrap                |

See: [Code basics](https://code.visualstudio.com/docs/editing/codebasics)

### Multi-cursor

| Key                    | Description                      |
| ---                    | ---                              |
| `⌥ + click`            | Insert cursor                    |
| `⌥⌘Up` / `⌥⌘Down`      | Insert cursor above/below        |
| `⌘D`                   | Add next find match to selection |
| `⌘K ⌘D`                | Skip last match                  |
| `⇧⌘L`                  | Select all occurrences           |
| `⌘F2`                  | Select all occurrences of word   |
| `⌘U`                   | Undo last cursor operation       |
| ---                    | ---                              |
| `⇧⌥I`                  | Cursor at end of each line       |
| `⌃⇧⌘Right` / `⌃⇧⌘Left` | Expand/shrink selection          |

See: [Multiple selections](https://code.visualstudio.com/docs/editing/codebasics#_multiple-selections-multi-cursor)

## Search

### Find

| Key        | Description            |
| ---        | ---                    |
| `⌘F`       | Find                   |
| `⌥⌘F`      | Replace                |
| `⌘G`       | Find next match        |
| `⇧⌘G`      | Find previous match    |
| `⌥Enter`   | Select all matches     |

See: [Search and replace](https://code.visualstudio.com/docs/editing/codebasics#_search-and-replace)

### Search across files

| Key        | Description            |
| ---        | ---                    |
| `⇧⌘F`      | Find in files          |
| `⇧⌘H`      | Replace in files       |
| `⇧⌘J`      | Toggle search details  |

See: [Search across files](https://code.visualstudio.com/docs/editing/codebasics#_search-across-files)

## Views
<!-- {: .-three-column} -->

### Sidebar

| Key    | Description    |
| ---    | ---            |
| `⌘B`   | Toggle sidebar |
| ---    | ---            |
| `⇧⌘E`  | Explorer       |
| `⇧⌘F`  | Search         |
| `⌃⇧G`  | Source control |
| `⇧⌘D`  | Debug          |
| `⇧⌘X`  | Extensions     |

See: [User interface](https://code.visualstudio.com/docs/editing/getting-started/userinterface)

### Panel

| Key                       | Description   |
| ---                       | ---           |
| `⌘J`                      | Toggle panel  |
| ---                       | ---           |
| `⇧⌘M`                     | Problems      |
| `⇧⌘U`                     | Output        |
| `⇧⌘Y`                     | Debug console |
| <code>⌃`</code>           | Terminal      |
| <code>⌃⇧`</code>          | New terminal  |

See: [Terminal basics](https://code.visualstudio.com/docs/terminal/basics)

### Zen mode

| Key             | Description       |
| ---             | ---               |
| `⌘K Z`          | Toggle zen mode   |
| `Esc Esc`       | Exit zen mode     |
| ---             | ---               |
| `⌃⌘F`           | Toggle full screen|
| `⌥⌘0`           | Toggle editor layout |
| `⌘=` / `⇧⌘-`    | Zoom in/out       |

See: [Custom layout](https://code.visualstudio.com/docs/configure/custom-layout)

## Navigation

### Code navigation

| Key          | Description                |
| ---          | ---                        |
| `F12`        | Go to definition           |
| `⌥F12`       | Peek definition            |
| `⌘K F12`     | Open definition to the side|
| `⇧F12`       | Show references            |
| ---          | ---                        |
| `F2`         | Rename symbol              |
| `⌘.`         | Quick fix                  |
| `⌃Space`     | Trigger suggestions        |
| `⇧⌘Space`    | Parameter hints            |
| `⌘K ⌘I`      | Show hover                 |
| ---          | ---                        |
| `F8` / `⇧F8` | Next/previous problem      |
| `⌃-` / `⌃⇧-` | Go back/forward            |

See: [Code navigation](https://code.visualstudio.com/docs/editing/editingevolved)

### Editor groups

| Key                      | Description                |
| ---                      | ---                        |
| `⌘\`                     | Split editor               |
| `⌘1` / `⌘2` / `⌘3`       | Focus editor group         |
| `⌘K ⌘Left` / `⌘K ⌘Right` | Focus previous/next group  |
| `⌃Tab` / `⌃⇧Tab`         | Next/previous editor       |
| `⌘K Enter`               | Keep preview editor open   |

See: [Custom layout](https://code.visualstudio.com/docs/configure/custom-layout)

## Debug

### Starting and stopping

| Key            | Description                |
| ---            | ---                        |
| `F5`           | Start/continue             |
| `⇧⌘F5`         | Restart                    |
| `⇧F5`          | Stop                       |
| `⌃F5`          | Start without debugging    |

See: [Debugging](https://code.visualstudio.com/docs/debugtest/debugging)

### Breakpoints and stepping

| Key            | Description                |
| ---            | ---                        |
| `F9`           | Toggle breakpoint          |
| `F10`          | Step over                  |
| `F11` / `⇧F11` | Step into/out              |
| ---            | ---                        |
| `⇧⌘D`          | Debug view                 |
| `⇧⌘Y`          | Debug console              |

See: [Debug actions](https://code.visualstudio.com/docs/debugtest/debugging#_debug-actions)

## Command line

### Opening files

```bash
code .                    # open current folder
code -g src/app.ts:42     # open at line 42
code --diff old.ts new.ts # diff two files
code --wait package.json  # wait until closed
```

See: [Command line interface](https://code.visualstudio.com/docs/configure/command-line)

### Extensions

```bash
code --install-extension dbaeumer.vscode-eslint
code --list-extensions --show-versions
code --uninstall-extension dbaeumer.vscode-eslint
code --profile "Web" .    # open with a profile
```

See: [Extension marketplace](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace)

### Remote tunnels

```bash
code tunnel            # serve this machine
code tunnel --no-sleep # keep the host awake
```

Reachable from a browser or another VS Code client.

See: [Remote tunnels](https://code.visualstudio.com/docs/remote/tunnels)

## Settings

### settings.json

```json
{
  "editor.formatOnSave": true,
  "editor.rulers": [80],
  "files.autoSave": "onFocusChange",
  "editor.wordWrap": "on"
}
```

User settings live in `~/Library/Application Support/Code/User/settings.json`
on macOS, `.vscode/settings.json` for a workspace. `⌘,` opens the settings UI.

See: [Settings](https://code.visualstudio.com/docs/configure/settings)

### keybindings.json

```json
{
  "key": "ctrl+alt+t",
  "command": "workbench.action.terminal.new",
  "when": "editorTextFocus"
}
```

The Keyboard Shortcuts editor's title bar opens `keybindings.json`; entries
there override the defaults.

See: [Keybindings](https://code.visualstudio.com/docs/configure/keybindings#_advanced-customization)

## References

- [Keyboard shortcuts (macOS)](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf) _(code.visualstudio.com)_
- [Keyboard shortcuts (Windows)](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf) _(code.visualstudio.com)_
- [Keyboard shortcuts (Linux)](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf) _(code.visualstudio.com)_
- [Release notes](https://code.visualstudio.com/updates) _(code.visualstudio.com)_
