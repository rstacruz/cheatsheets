---
title: How to create a Nix development shell
link_title: Create a Nix dev shell
subtitle: Reproducible project tools
logo: { set: icon-park-outline, name: terminal }
category: Package managers
layout: snippet
tier: t3
last_verified_with: "Nix 2.35.6."
created_at: 2026-11-28
updated: 2026-11-28
links:
  - title: nix develop
    url: https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-develop.html
  - title: Declarative shell environments
    url: https://nix.dev/tutorials/first-steps/declarative-shell.html
  - title: Nix cheatsheet
    url: /nix
---

## Create a dev shell
<!-- {: .-snippets} -->

### Define the shell
<!-- {: .-snippet} -->

#### flake.nix

```nix
devShells.${system}.default =
  pkgs.mkShell {
    packages = [ pkgs.hello ];
  };
```
<!-- {: data-highlight="devShells"} -->

**Declares shell packages** built from the flake's inputs. See [nix develop](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-develop.html).

### Enter the shell
<!-- {: .-snippet} -->

```bash
nix develop
```
<!-- {: data-highlight="nix develop"} -->

**Enters the shell** with those packages available. See [nix develop](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-develop.html).

### Run one command
<!-- {: .-snippet} -->

```bash
nix develop --command make test
```
<!-- {: data-highlight="--command"} -->

**Runs one command** without opening a shell. See [nix develop](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-develop.html).

### Add a setup hook
<!-- {: .-snippet} -->

#### flake.nix

```nix
shellHook = ''echo "ready"'';
```
<!-- {: data-highlight="shellHook"} -->

**Adds a startup hook** run each time the shell opens. See [declarative shell environments](https://nix.dev/tutorials/first-steps/declarative-shell.html).
