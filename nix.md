---
title: Nix
subtitle: Declarative package manager
logo: { src: /assets/logos/nixos.svg }
category: Package managers
updated: 2026-11-28
last_verified_at: 2026-11-28
last_verified_with: "Nix 2.35.6."
tier: t2
fragments:
  - "nix run"
  - "nix shell"
  - "nix build"
  - "nix profile"
  - "nix flake init"
  - "nix flake update"
  - "profile add"
  - "nix search"
  - "nixpkgs#hello"
  - "legacyPackages"
  - "mkShell"
  - "shellHook"
  - "nixos-rebuild"
  - "--rollback"
  - "collect-garbage"
  - "--flake"
keywords:
  - nix package manager
  - nix flakes
  - nix develop
  - nixos rebuild
intro: |
  Nix installs packages, builds reproducible environments, and configures
  NixOS from declarative expressions.
links:
  - title: Nix manual
    url: https://nix.dev/manual/nix/stable/
  - title: Nix language basics
    url: https://nix.dev/tutorials/nix-language.html
---

## Get started
<!-- {: .-three-column} -->

### Run a program
<!-- {: .-prime} -->

```bash
nix run nixpkgs#hello -- --greeting Hi
```
<!-- {: data-highlight="nix run"} -->

Runs a package without installing it; arguments after `--` go to the program.

See: [nix run](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-run.html)

### Temporary shell

```bash
nix shell nixpkgs#hello nixpkgs#cowsay
```
<!-- {: data-highlight="nix shell"} -->

Adds packages to a shell and removes them on exit.

See: [Ad hoc shell environments](https://nix.dev/tutorials/first-steps/ad-hoc-shell-environments.html)

### Install to a profile

```bash
nix profile add nixpkgs#hello
```
<!-- {: data-highlight="nix profile add"} -->

Adds a package to `~/.local/state/nix/profiles/profile`.

See: [nix profile](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-profile.html)

### Search packages

```bash
nix search nixpkgs '^hello$'
```
<!-- {: data-highlight="nix search"} -->

Searches package names and descriptions by regular expression.

See: [nix search](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-search.html)

### Build a package

```bash
nix build nixpkgs#hello
```
<!-- {: data-highlight="nix build"} -->

Links the build output to `./result`.

See: [nix build](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-build.html)

### Inspect a store path

```bash
nix path-info -Sh ./result
```
<!-- {: data-highlight="nix path-info"} -->

Shows the store path behind `./result` and its closure size; `-r` applies the operation to the whole closure.

See: [nix path-info](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-path-info.html)

## Nix language
<!-- {: .-three-column} -->

### Values

- `42`
- `"hello"`
- `./default.nix`
- `true`
- `null`
- `[ 1 2 3 ]`
- `{ a = 1; }`
<!-- {: .-enum} -->

Everything is an expression, including lists, attribute sets, and functions.

See: [Nix language basics](https://nix.dev/tutorials/nix-language.html)

### Names and scope

```nix
let
  name = "Nix";
  version = "2.35";
in
  "${name} ${version}"
```
<!-- {: data-highlight="let"} -->

`let` binds names; `with pkgs;` opens an attribute set for one small scope.

See: [Names and values](https://nix.dev/tutorials/nix-language.html)

### Functions

```nix
let
  double = x: x * 2;
in
  double 21
```
<!-- {: data-highlight="x:"} -->

Functions take one argument; `{ pkgs, lib, ... }:` takes named attributes.

See: [Functions and imports](https://nix.dev/tutorials/nix-language.html)

### Lists and attributes

#### Lists

```nix
[ 1 2 ] ++ [ 3 ]
```
<!-- {: data-highlight="++"} -->

#### Attribute sets

```nix
{ a = 1; b = 2; } // { b = 3; }
```
<!-- {: data-highlight="//"} -->

`++` concatenates lists; `//` merges attribute sets, right side winning.

See: [Built-in operators](https://nix.dev/manual/nix/stable/language/operators.html)

## Nix expressions
<!-- {: .-three-column} -->

### Select and test attributes

```nix
pkgs.hello.meta.description
pkgs ? hello
```
<!-- {: data-highlight="?"} -->

`?` tests whether an attribute exists; `or` supplies a fallback: `x.y or 1`.

See: [Attribute selection](https://nix.dev/manual/nix/stable/language/operators.html)

### Strings and paths

#### Interpolation

```nix
"Hello, ${name}!"
```
<!-- {: data-highlight="${name}"} -->

#### Indented strings

```nix
''
  line one
  line two
''
```

`''${` writes a literal `${`; interpolating `./file.nix` copies it into the store.

See: [String literals](https://nix.dev/manual/nix/stable/language/string-literals.html)

### Conditionals and assertions

#### Conditional

```nix
if n > 0 then "yes" else "no"
```
<!-- {: data-highlight="if"} -->

#### Assertion

```nix
assert n >= 0; n * 2
```
<!-- {: data-highlight="assert"} -->

Both are expressions; a failed assertion stops evaluation with an error.

See: [Language constructs](https://nix.dev/manual/nix/stable/language/)

### Imports

```nix
import ./config.nix { inherit pkgs; }
```
<!-- {: data-highlight="import"} -->

`import` evaluates a file; `inherit pkgs` passes the local binding.

See: [Functions and imports](https://nix.dev/tutorials/nix-language.html)

## Flakes

### Initialize

```bash
nix flake init
```
<!-- {: data-highlight="nix flake init"} -->

Writes a starter `flake.nix`; flakes need `nix-command` and `flakes` enabled.

See: [nix flake init](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-flake-init.html)

### Structure

#### flake.nix

```nix
{
  description = "Example";
  inputs.nixpkgs.url =
    "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      packages.${system}.default = pkgs.hello;
    };
}
```
<!-- {: data-highlight="inputs.nixpkgs.url"} -->

`inputs` pin sources; `outputs` expose packages, apps, and shells per system.

See: [Flake format](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-flake.html)

### Pin dependencies

#### Lock

```bash
nix flake lock
```
<!-- {: data-highlight="nix flake lock"} -->

#### Update one input

```bash
nix flake update nixpkgs
```
<!-- {: data-highlight="nixpkgs"} -->

`flake.lock` pins exact revisions; `lock` keeps existing entries, `update` moves them.

See: [nix flake update](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-flake-update.html)

### Inspect

```bash
nix flake show
nix flake metadata
```
<!-- {: data-highlight="nix flake show; nix flake metadata"} -->

`show` lists outputs; `metadata` prints inputs and the resolved source path.

See: [nix flake show](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-flake-show.html)

### Check

```bash
nix flake check
```
<!-- {: data-highlight="nix flake check"} -->

Builds checks and validates the flake's output structure.

See: [nix flake check](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-flake-check.html)

### Flake references

#### Local

```bash
nix build .#packages.x86_64-linux.default
```
<!-- {: data-highlight=".#"} -->

#### Remote

```bash
nix run github:owner/repo#hello
```
<!-- {: data-highlight="github:"} -->

References are `flake-url#attribute`; a bare `nixpkgs#hello` uses the registry.

See: [Flake references](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-flake.html)

## Flake dependencies
<!-- {: .-three-column} -->

### Share one nixpkgs

```nix
inputs.home-manager = {
  url =
    "github:nix-community/home-manager";
  inputs.nixpkgs.follows = "nixpkgs";
};
```
<!-- {: data-highlight="follows"} -->

`follows` reuses your input instead of pulling a second copy of nixpkgs.

See: [Flakes: dependency management](https://nix.dev/concepts/flakes.html)

### Track files with Git

```bash
git add flake.nix default.nix
```
<!-- {: data-highlight="git add"} -->

In a Git repo, flakes only see tracked files, so stage new files before building.

See: [Flakes: running commands](https://nix.dev/concepts/flakes.html)

### Override an input

```bash
nix build .#hello \
  --override-input nixpkgs \
  path:/path/to/nixpkgs
```
<!-- {: data-highlight="--override-input"} -->

Tries a local checkout without editing `flake.nix` or `flake.lock`.

See: [nix flake options](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-flake.html)

## Development shells
<!-- {: .-three-column} -->

### Flake devShell

#### flake.nix

```nix
devShells.${system}.default =
  pkgs.mkShell {
    packages = [ pkgs.hello pkgs.git ];
  };
```
<!-- {: data-highlight="devShells"} -->

`nix develop` enters the shell's build environment.

See: [nix develop](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-develop.html)

### Run and select shells

#### Run a command

```bash
nix develop --command make test
```
<!-- {: data-highlight="--command"} -->

#### Select an output

```bash
nix develop .#ci
```
<!-- {: data-highlight=".#ci"} -->

`--command` runs one command inside the shell; `.#ci` selects another devShell.

See: [nix develop](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-develop.html)

### shell.nix

#### shell.nix

```nix
{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  packages = [ pkgs.hello ];
  shellHook = ''echo "ready"'';
}
```
<!-- {: data-highlight="mkShell"} -->

`nix-shell` reads `shell.nix`; flakes prefer `devShells`.

See: [Declarative shell environments](https://nix.dev/tutorials/first-steps/declarative-shell.html)

### direnv

#### .envrc

```bash
use flake
```
<!-- {: data-highlight="use flake"} -->

Then run `direnv allow`; the shell activates when you enter the directory.

See: [nix develop](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-develop.html)

## Building packages
<!-- {: .-three-column} -->

### Derivation

#### hello.nix

```nix
{ stdenv }:
stdenv.mkDerivation {
  pname = "hello";
  version = "1.0";
  src = ./.;
  doCheck = true;
}
```
<!-- {: data-highlight="mkDerivation"} -->

A derivation describes how to build a store path from inputs.

See: [stdenv](https://nixos.org/manual/nixpkgs/stable/#part-stdenv)

### Call a package function

```nix
pkgs.callPackage ./hello.nix {}
```
<!-- {: data-highlight="callPackage"} -->

`callPackage` fills function arguments from `pkgs` automatically.

See: [callPackage](https://nixos.org/manual/nixpkgs/stable/#including-a-derivation-using-callpackage)

### Override attributes

```nix
pkgs.hello.overrideAttrs (old: {
  postInstall = ''
    echo done
  '';
})
```
<!-- {: data-highlight="overrideAttrs"} -->

`overrideAttrs` changes build steps; `override` changes function inputs.

See: [Overrides](https://nixos.org/manual/nixpkgs/stable/#sec-pkg-overrideAttrs)

### Overlays

#### overlay.nix

```nix
self: super: {
  hello = super.hello.overrideAttrs
    (_: {
      doCheck = false;
    });
}
```
<!-- {: data-highlight="self: super:"} -->

Add the file to `nixpkgs.overlays` to change packages across a system.

See: [Overlays](https://nixos.org/manual/nixpkgs/stable/#chap-overlays)

## NixOS

### Configuration

#### /etc/nixos/configuration.nix

```nix
{ config, pkgs, ... }: {
  environment.systemPackages =
    [ pkgs.git pkgs.vim ];
  services.nginx.enable = true;
  system.stateVersion = "26.05";
}
```
<!-- {: data-highlight="services.nginx.enable"} -->

Modules set options; `system.stateVersion` records the first install version.

See: [NixOS manual](https://nixos.org/manual/nixos/stable/)

### Apply changes

#### Switch now

```bash
sudo nixos-rebuild switch
```
<!-- {: data-highlight="nixos-rebuild switch"} -->

#### Test without a boot entry

```bash
sudo nixos-rebuild test
```

`switch` activates and sets the boot default; `boot` waits for the next boot.

See: [NixOS manual: configuration changes](https://nixos.org/manual/nixos/stable/#sec-changing-config)

### Use a flake

```bash
sudo nixos-rebuild switch \
  --flake .#myhost
```
<!-- {: data-highlight="--flake"} -->

Selects `nixosConfigurations.myhost` from the flake in the current directory.

See: [NixOS manual: flake-based configuration](https://nixos.org/manual/nixos/stable/#sec-installation-manual-installing)

### Generations

#### List

```bash
sudo nixos-rebuild list-generations
```
<!-- {: data-highlight="list-generations"} -->

#### Roll back

```bash
sudo nixos-rebuild switch --rollback
```
<!-- {: data-highlight="--rollback"} -->

Generations stay in the boot menu; `--rollback` activates the previous one.

See: [nixos-rebuild(8)](https://nixos.org/manual/nixos/stable/)

### Find options

```bash
nixos-option services.nginx.enable
```
<!-- {: data-highlight="nixos-option"} -->

Shows the value and where it was set; browse all options at search.nixos.org.

See: [NixOS option search](https://search.nixos.org/options)

### Channels

```bash
sudo nix-channel --update
```
<!-- {: data-highlight="nix-channel"} -->

Non-flake systems get package and module updates from channels.

See: [NixOS manual: channels](https://nixos.org/manual/nixos/stable/)

## Home Manager

### User configuration

#### ~/.config/home-manager/home.nix

```nix
{ pkgs, ... }: {
  home.username = "alice";
  home.homeDirectory = "/home/alice";
  home.stateVersion = "26.05";
  programs.git.enable = true;
}
```
<!-- {: data-highlight="programs.git.enable"} -->

Sets user-level packages and dotfiles; `stateVersion` is your initial release.

See: [Home Manager manual](https://nix-community.github.io/home-manager/)

### Apply user config

```bash
home-manager switch
```
<!-- {: data-highlight="home-manager switch"} -->

In NixOS, add `home-manager.users.alice = import ./home.nix;` to your modules.

See: [Home Manager: NixOS module](https://nix-community.github.io/home-manager/installation/nixos.html#nixos-module)

## Maintenance
<!-- {: .-three-column} -->

### Clean the store

#### Preview

```bash
nix-store --gc --print-dead
```
<!-- {: data-highlight="--print-dead"} -->

#### Delete old generations, then collect

```bash
nix-collect-garbage -d
```
<!-- {: data-highlight="nix-collect-garbage"} -->

Old generations keep packages alive; delete them before garbage collection.

See: [Garbage collection](https://nix.dev/manual/nix/stable/package-management/garbage-collection.html)

### Profile history

```bash
nix profile list
nix profile remove hello
nix profile rollback
```
<!-- {: data-highlight="nix profile list; nix profile remove hello; nix profile rollback"} -->

`list` prints package names; `remove` takes a name, `rollback` undoes a change.

See: [nix profile](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-profile.html)

### Query dependencies

```bash
nix why-depends nixpkgs#git nixpkgs#zlib
nix log nixpkgs#hello
```
<!-- {: data-highlight="why-depends"} -->

`why-depends` traces a dependency edge; `nix log` shows a build log.

See: [nix why-depends](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-why-depends.html)

### Optimise the store

```bash
sudo nix-store --optimise
```
<!-- {: data-highlight="--optimise"} -->

Hard-links identical store files to reclaim disk space.

See: [nix-store](https://nix.dev/manual/nix/stable/command-ref/nix-store.html)
