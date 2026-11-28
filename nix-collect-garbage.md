---
title: How to clean the Nix store
link_title: Clean the Nix store
subtitle: Reclaim disk space safely
logo: { set: icon-park-outline, name: data }
category: Package managers
layout: snippet
tier: t3
last_verified_with: "Nix 2.35.6."
created_at: 2026-11-28
updated: 2026-11-28
links:
  - title: Garbage collection
    url: https://nix.dev/manual/nix/stable/package-management/garbage-collection.html
  - title: nix-store
    url: https://nix.dev/manual/nix/stable/command-ref/nix-store.html
  - title: Nix cheatsheet
    url: /nix
---

## Clean the store
<!-- {: .-snippets} -->

### Delete old generations
<!-- {: .-snippet} -->

```bash
nix-collect-garbage -d
```
<!-- {: data-highlight="-d"} -->

**Deletes old generations** then collects unreachable paths. See [garbage collection](https://nix.dev/manual/nix/stable/package-management/garbage-collection.html).

### Preview what would be deleted
<!-- {: .-snippet} -->

```bash
nix-store --gc --print-dead
```
<!-- {: data-highlight="--print-dead"} -->

**Previews dead paths** without deleting anything. See [garbage collection](https://nix.dev/manual/nix/stable/package-management/garbage-collection.html).

### Keep two weeks of generations
<!-- {: .-snippet} -->

```bash
nix-collect-garbage --delete-older-than 14d
```
<!-- {: data-highlight="14d"} -->

**Prunes old generations** older than 14 days across profiles. See [garbage collection](https://nix.dev/manual/nix/stable/package-management/garbage-collection.html).

### Optimise the store
<!-- {: .-snippet} -->

```bash
sudo nix-store --optimise
```
<!-- {: data-highlight="--optimise"} -->

**Deduplicates store files** and reclaims disk space. See [nix-store](https://nix.dev/manual/nix/stable/command-ref/nix-store.html).
