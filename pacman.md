---
title: Pacman
subtitle: Arch Linux package manager
category: Linux
updated: 2026-11-25
last_verified_with: "pacman 7.1.0."
tier: t3
intro: |
  Pacman is the package manager for Arch Linux and its derivatives.
links:
  - title: https://wiki.archlinux.org/title/pacman
    url: https://wiki.archlinux.org/title/pacman
---

## Commands

<!-- {: .-three-column} -->

### Common commands

| Command                 | Description                       |
| ----------------------- | --------------------------------- |
| `pacman -Syu <pkg>`     | Install (and update package list) |
| `pacman -S <pkg>`       | Install only                      |
| `pacman -Rsc <pkg>`     | Uninstall                         |
| `pacman -Ss <keywords>` | Search                            |
| `pacman -Syu`           | Upgrade everything                |

<!-- {: .-prime} -->

See: [pacman manual](https://pacman.archlinux.page/pacman.8.html)

### Query

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `pacman -Qe`         | List explicitly-installed packages     |
| ---                  | ---                                    |
| `pacman -Ql <pkg>`   | What files does this package have?     |
| `pacman -Qii <pkg>`  | List information on package            |
| ---                  | ---                                    |
| `pacman -Qo <file>`  | Who owns this file?                    |
| ---                  | ---                                    |
| `pacman -Qs <query>` | Search installed packages for keywords |

See: [pacman(8)](https://man.archlinux.org/man/pacman.8)

### Orphans

| Command                       | Description                 |
| ----------------------------- | --------------------------- |
| `pacman -Qdt`                 | List unneeded packages      |
| `pacman -Rns $(pacman -Qdtq)` | Uninstall unneeded packages |

Avoid orphans by using `pacman -Rsc` to remove packages, which will remove unneeded dependencies.

See: [Removing unused packages](https://wiki.archlinux.org/title/Pacman/Tips_and_tricks#Removing_unused_packages_(orphans))

### Other

| Command            | Description                |
| ------------------ | -------------------------- |
| `pactree <pkg>`    | What does _pkg_ depend on? |
| `pactree -r <pkg>` | What depends on _pkg_?     |

See: [pactree(8)](https://man.archlinux.org/man/pactree.8)

### References

* [Pacman tips and tricks](https://wiki.archlinux.org/index.php/Pacman/Tips_and_tricks) _(wiki.archlinux.org)_
