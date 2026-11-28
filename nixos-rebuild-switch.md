---
title: How to apply NixOS configuration changes
link_title: Apply NixOS changes
subtitle: Rebuild and activate a system
logo: { set: icon-park-outline, name: toolkit }
category: Linux
layout: snippet
tier: t3
last_verified_with: "NixOS 26.05."
updated: 2026-11-28
links:
  - title: NixOS manual
    url: https://nixos.org/manual/nixos/stable/#sec-changing-config
  - title: nixos-rebuild(8)
    url: https://nixos.org/manual/nixos/stable/
  - title: Nix cheatsheet
    url: /nix
---

## Apply a NixOS configuration
<!-- {: .-snippets} -->

### Switch right now
<!-- {: .-snippet} -->

```bash
sudo nixos-rebuild switch
```
<!-- {: data-highlight="nixos-rebuild switch"} -->

**Activates the config** making it the boot default. See [configuration changes](https://nixos.org/manual/nixos/stable/#sec-changing-config).

### Use a flake
<!-- {: .-snippet} -->

```bash
sudo nixos-rebuild switch \
  --flake .#myhost
```
<!-- {: data-highlight="--flake"} -->

**Selects a flake host** from `nixosConfigurations.myhost`. See [NixOS manual](https://nixos.org/manual/nixos/stable/#sec-installation-manual-installing).

### Test without a boot entry
<!-- {: .-snippet} -->

```bash
sudo nixos-rebuild test
```
<!-- {: data-highlight="nixos-rebuild test"} -->

**Tests the config** until the next reboot. See [configuration changes](https://nixos.org/manual/nixos/stable/#sec-changing-config).

### Apply on next boot
<!-- {: .-snippet} -->

```bash
sudo nixos-rebuild boot
```
<!-- {: data-highlight="nixos-rebuild boot"} -->

**Sets the boot default** without switching now. See [configuration changes](https://nixos.org/manual/nixos/stable/#sec-changing-config).

### List generations
<!-- {: .-snippet} -->

```bash
sudo nixos-rebuild list-generations
```
<!-- {: data-highlight="list-generations"} -->

**Lists generations** with dates and versions. See [nixos-rebuild(8)](https://nixos.org/manual/nixos/stable/).
