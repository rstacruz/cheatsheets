---
title: Screen
subtitle: GNU terminal multiplexer
logo: { set: icon-park-outline, name: split }
category: Terminal
keywords:
  - Screen
  - Linux
  - Unix
  - CLI
  - Command
  - Line
intro: |
  [GNU Screen](https://www.gnu.org/software/screen/manual/screen.html) is a terminal multiplexer for running several shells in one session.
links:
  - title: GNU's manual
    url: https://www.gnu.org/software/screen/manual/screen.html#Commands
tier: t3
last_verified_with: "GNU Screen 5.0.3."
created_at: 2021-01-07
updated: 2026-11-26
---

## Basics

<!-- {: .-three-column} -->

### Basics

| Options/Keybind           | Description                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| `screen -S [name]`        | Start a named session                                                                    |
| `ctrl+a ctrl+d`           | Detach the current screen and go back to the terminal (screen session will stay running) |
| `screen -ls` _or_ <br /> `screen -list`   | List all sessions                                                                        |
| `screen -r [name]`        | Reattach to a screen (optionally by name)                                                |

See: [Invoking Screen](https://www.gnu.org/software/screen/manual/screen.html#Invoking-Screen)

### Screens

| Keybind         | Description                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| `ctrl+a c`      | Create a new screen tab inside a screen                                                  |
| `ctrl+a [0-9]`  | Switch to a screen tab by number 0 through 9                                             |
| `ctrl+a n`      | Go to the next screen tab                                                                |
| `ctrl+a p`      | Go to the previous screen tab                                                            |
| `ctrl+a k`      | Kill current screen tab                                                                  |
| `ctrl+a Esc`    | Enter scrollback mode (PgUp/PgDn or arrows to scroll)                                   |

<!-- {: .-shortcuts} -->

See: [Default key bindings](https://www.gnu.org/software/screen/manual/screen.html#Default-Key-Bindings)

### Visual pleasure

| Keybind                         | Description                  |
| ------------------------------- | ---------------------------- |
| `ctrl+a S`                      | Split a screen horizontally  |
| `ctrl+a |`                      | Split a screen vertically    |
| `ctrl+a ctrl+I` _or_ <br /> `ctrl+a tab` | Change screen split          |
| `ctrl+a Q`                      | Remove all screen splits     |
| `ctrl+a C`                      | Clear the current screen tab |

<!-- {: .-shortcuts} -->

See: [split command](https://www.gnu.org/software/screen/manual/screen.html#Split)

### Accessibility

| Keybind         | Description                                         |
| --------------- | --------------------------------------------------- |
| `ctrl+a A`      | Rename current screen tab                           |
| `ctrl+a k`      | Kill current screen tab                             |
| `ctrl+a ctrl+a` | Switch to last used screen tab                      |
| `ctrl+a a`      | Send `ctrl+a` to current screen tab                 |
| `ctrl+a ctrl+w` | See a list of all screen tabs in the current screen |

<!-- {: .-shortcuts} -->

See: [Command index](https://www.gnu.org/software/screen/manual/screen.html#Command-Index)
