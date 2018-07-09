---
title: Pacman
category: Linux
updated: 2018-07-07
intro: |
  Pacman is the package manager for Arch linux and its derivatives.
---

## Commands
{: .-three-column}

### Common commands

| Command                 | Description                       |
| ----------------------- | --------------------------------- |
| `pacman -Syu <pkg>`     | Install (and update package list) |
| `pacman -S <pkg>`       | Install only                      |
| `pacman -Rsc <pkg>`     | Uninstall                         |
| `pacman -Ss <keywords>` | Search                            |
| `pacman -Syu`           | Upgrade everything                |
{: .-prime}

### Query

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `pacman -Qe`         | List explictly-installed packages      |
| ---                  | ---                                    |
| `pacman -Ql <pkg>`   | What files does this package have?     |
| `pacman -Qii <pkg>`  | List information on package            |
| ---                  | ---                                    |
| `pacman -Qo <file>`  | Who owns this file?                    |
| ---                  | ---                                    |
| `pacman -Qs <query>` | Search installed packages for keywords |

### Orphans

| Command                       | Description                 |
| ----------------------------- | --------------------------- |
| `pacman -Qdt`                 | List unneeded packages      |
| `pacman -Rns $(pacman -Qdtq)` | Uninstall unneeded packages |

Avoid orphans by using `pacman -Rsc` to remove packages, which will remove unneeded dependencies.

### Other

| Command            | Description                |
| ------------------ | -------------------------- |
| `pactree <pkg>`    | What does _pkg_ depend on? |
| `pactree -r <pkg>` | What depends on _pkg_?     |

### References

* [Pacman tips and tricks](https://wiki.archlinux.org/index.php/Pacman/Tips_and_tricks) _(wiki.archlinux.org)_
