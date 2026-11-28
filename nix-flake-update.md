---
title: How to update Nix flake inputs
link_title: Update Nix flake inputs
subtitle: Move pinned dependencies
logo: { set: icon-park-outline, name: refresh }
category: Package managers
layout: snippet
tier: t3
last_verified_with: "Nix 2.35.6."
updated: 2026-11-28
links:
  - title: nix flake update
    url: https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-flake-update.html
  - title: Flakes
    url: https://nix.dev/concepts/flakes.html
  - title: Nix cheatsheet
    url: /nix
---

## Update a flake
<!-- {: .-snippets} -->

### Update all inputs
<!-- {: .-snippet} -->

```bash
nix flake update
```
<!-- {: data-highlight="nix flake update"} -->

**Updates every input,** moving all pins to newer revisions. See [nix flake update](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-flake-update.html).

### Update one input
<!-- {: .-snippet} -->

```bash
nix flake update nixpkgs
```
<!-- {: data-highlight="nixpkgs"} -->

**Moves one input,** leaving other pins untouched. See [nix flake update](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-flake-update.html).

### Lock without updating
<!-- {: .-snippet} -->

```bash
nix flake lock
```
<!-- {: data-highlight="nix flake lock"} -->

**Locks without updating,** keeping existing pins. See [nix flake update](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-flake-update.html).

### Commit the result
<!-- {: .-snippet} -->

```bash
git add flake.lock
git commit -m "Update flake inputs"
```
<!-- {: data-highlight="flake.lock"} -->

**Commits the lock file,** sharing the new pins. See [Flakes: dependency management](https://nix.dev/concepts/flakes.html).
