---
title: How to roll back NixOS
link_title: Roll back NixOS
subtitle: Return to a previous generation
logo: { set: icon-park-outline, name: layers }
category: Linux
layout: snippet
tier: t3
last_verified_with: "NixOS 26.05."
updated: 2026-11-28
links:
  - title: nixos-rebuild(8)
    url: https://nixos.org/manual/nixos/stable/
  - title: Garbage collection
    url: https://nix.dev/manual/nix/stable/package-management/garbage-collection.html
  - title: Nix cheatsheet
    url: /nix
---

## Roll back a system
<!-- {: .-snippets} -->

### Switch to the previous one
<!-- {: .-snippet} -->

```bash
sudo nixos-rebuild switch --rollback
```
<!-- {: data-highlight="--rollback"} -->

**Rolls back one generation** activating the previous one. See [nixos-rebuild(8)](https://nixos.org/manual/nixos/stable/).

### Find the generation
<!-- {: .-snippet} -->

```bash
sudo nixos-rebuild list-generations
```
<!-- {: data-highlight="list-generations"} -->

**Lists generations** with dates and versions. See [nixos-rebuild(8)](https://nixos.org/manual/nixos/stable/).

### Keep the rollback at next boot
<!-- {: .-snippet} -->

```bash
sudo nixos-rebuild boot --rollback
```
<!-- {: data-highlight="boot --rollback"} -->

**Rolls back at boot** keeping the current session unchanged. See [nixos-rebuild(8)](https://nixos.org/manual/nixos/stable/).

### Roll back a user profile
<!-- {: .-snippet} -->

```bash
nix profile rollback
```
<!-- {: data-highlight="nix profile rollback"} -->

**Rolls back a profile** undoing its last change. See [nix profile](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-profile.html).

### Clear old generations
<!-- {: .-snippet} -->

```bash
nix profile wipe-history
```
<!-- {: data-highlight="wipe-history"} -->

**Clears old versions** once rollback is no longer needed. See [garbage collection](https://nix.dev/manual/nix/stable/package-management/garbage-collection.html).
