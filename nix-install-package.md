---
title: How to install a package with Nix
link_title: Install a Nix package
subtitle: Add or try a package
logo: { set: icon-park-outline, name: box }
category: Package managers
layout: snippet
tier: t3
last_verified_with: "Nix 2.35.6."
updated: 2026-11-28
links:
  - title: nix profile
    url: https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-profile.html
  - title: Ad hoc shell environments
    url: https://nix.dev/tutorials/first-steps/ad-hoc-shell-environments.html
  - title: Nix cheatsheet
    url: /nix
---

## Install a package
<!-- {: .-snippets} -->

### Add to your profile
<!-- {: .-snippet} -->

```bash
nix profile add nixpkgs#hello
```
<!-- {: data-highlight="nix profile add"} -->

**Adds a package globally** available in new shells. See [nix profile](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-profile.html).

### Run a program once
<!-- {: .-snippet} -->

```bash
nix run nixpkgs#hello -- --greeting Hi
```
<!-- {: data-highlight="nix run"} -->

**Runs a package once** with arguments after `--` passed to the program. See [nix run](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-run.html).

### Try packages in a shell
<!-- {: .-snippet} -->

```bash
nix shell nixpkgs#hello nixpkgs#cowsay
```
<!-- {: data-highlight="nix shell"} -->

**Opens a temporary shell** removed when you exit. See [ad hoc shell environments](https://nix.dev/tutorials/first-steps/ad-hoc-shell-environments.html).

### Remove a package
<!-- {: .-snippet} -->

```bash
nix profile remove hello
```
<!-- {: data-highlight="nix profile remove hello"} -->

**Removes a package** selected by its profile name. See [nix profile](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-profile.html).
