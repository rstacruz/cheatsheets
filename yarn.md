---
title: Yarn
category: JavaScript libraries
weight: -3
updated: 2026-11-14
intro: |
  [Yarn](https://yarnpkg.com/) is a package manager for JavaScript. This reference covers Yarn 4 (the Berry line): Corepack installs, the modern CLI, workspaces, constraints, and Plug'n'Play.
links:
  - title: Yarn documentation
    url: https://yarnpkg.com/getting-started/install
  - title: Migration guide
    url: https://yarnpkg.com/migration/guide
  - title: GitHub repository
    url: https://github.com/yarnpkg/berry
---

## Getting started

### Install

```bash
corepack enable           # enable the version shim
yarn --version            # reads packageManager
yarn init -2              # start a Yarn 4 project
yarn set version stable   # move to the latest 4.x
```

Yarn 4 needs Node 18.12+. Corepack reads the `packageManager` field, so every contributor runs the pinned release.

See: [Installation](https://yarnpkg.com/getting-started/install)

### Pinning the version

```json
{
  "packageManager": "yarn@4.18.1"
}
```

Commit `package.json`; Corepack installs that exact version per project. Change it with `corepack use yarn@4.18.1`.

See: [corepack](https://nodejs.org/api/corepack.html)

### Migrating from Yarn 1

```bash
corepack enable
yarn set version stable
yarn install
```

Rename settings from `.yarnrc` and `.npmrc` into `.yarnrc.yml`, then commit the lockfile and config.

See: [Migration guide](https://yarnpkg.com/migration/guide)

## Everyday commands

### npm equivalents

| npm | Yarn 4 |
| --- | --- |
| `npm install` | `yarn install` |
| `npm i lodash -D` | `yarn add -D lodash` |
| `npm uninstall lodash` | `yarn remove lodash` |
| `npm update` | `yarn up` |
| --- | --- |
| `npm audit` | `yarn npm audit` |
| `npm publish` | `yarn npm publish` |
| `npx create-vite` | `yarn dlx create-vite` |
| `./node_modules/.bin/vite` | `yarn run vite` |
| --- | --- |
| `npm install -g pkg` | `yarn dlx pkg` |
| `npm install --production` | `yarn workspaces focus -A --production` |

<!-- {: .-left-align.-headers} -->

`yarn global` was removed; use `yarn dlx` for one-off binaries.

See: [CLI reference](https://yarnpkg.com/cli)

### Install

```bash
yarn install
yarn install --immutable
yarn install --immutable --immutable-cache
yarn install --mode=update-lockfile
```

`--immutable` fails if the lockfile would change, and defaults on in CI. `--immutable-cache` also fails when the cache changes.

See: [yarn install](https://yarnpkg.com/cli/install)

### Add and remove

```bash
yarn add lodash
yarn add -D vitest
yarn add -E react
yarn add -P react
yarn remove lodash
```

`-D` is dev, `-P` is peer, `-E` is exact, `-T` is tilde. Yarn writes to the nearest workspace.

See: [yarn add](https://yarnpkg.com/cli/add), [yarn remove](https://yarnpkg.com/cli/remove)

### Upgrade

```bash
yarn up lodash
yarn up -i
yarn up -R
yarn upgrade-interactive
yarn dedupe
```

`yarn up` ignores manifest ranges and updates every workspace; `-i` prompts, `-R` resolves again without touching manifests.

See: [yarn up](https://yarnpkg.com/cli/up)

## Workspaces

### Defining workspaces

```json
{
  "workspaces": ["packages/*"]
}
```

Each match is a package with its own `package.json`; Yarn links them and installs once at the root.

See: [Workspaces](https://yarnpkg.com/features/workspaces)

### Cross-references

```json
{
  "dependencies": {
    "@my-org/utils": "workspace:^"
  }
}
```

`workspace:` resolves to the local package. `workspace:^` becomes `^<version>` after publishing.

See: [Workspaces](https://yarnpkg.com/features/workspaces)

### Running scripts

```bash
yarn workspaces foreach -A run build
yarn workspaces foreach -A -pt run build
yarn workspaces focus @my-org/app
yarn workspaces focus -A --production
```

`-A` is all workspaces, `-t` is topological order, `-p` is parallel. `focus` installs one workspace's deps.

See: [workspaces foreach](https://yarnpkg.com/cli/workspaces/foreach)

### Constraints

```js
// yarn.config.cjs
module.exports = {
  async constraints ({ Yarn }) {
    for (const dep of Yarn.dependencies({ ident: 'react' })) {
      dep.update('19.0.0')
    }
  }
}
```

```bash
yarn constraints
yarn constraints --fix
```

Constraints declare rules across workspaces; `--fix` rewrites manifests to satisfy them. Yarn 4 uses JavaScript rather than Prolog.

See: [Constraints](https://yarnpkg.com/features/constraints)

## Advanced

### Plug'n'Play

```yaml
# .yarnrc.yml
nodeLinker: pnp
```

Yarn 4 resolves packages from zip archives through a `.pnp.cjs` loader, so no `node_modules` is created. Set `nodeLinker: node-modules` to opt out.

See: [Plug'n'Play](https://yarnpkg.com/features/pnp)

### Zero-install

```yaml
# .yarnrc.yml
enableGlobalCache: false
```

Committing `.yarn/cache` and `.pnp.cjs` makes a checkout behave like an install. Yarn 4 leaves zero-install off for new projects.

See: [Cache strategies](https://yarnpkg.com/features/caching)

### dlx

```bash
yarn dlx create-vite
yarn dlx -p typescript -p ts-node ts-node -e "1 + 1"
```

`dlx` installs into a temporary environment and runs the binary in the current directory.

See: [yarn dlx](https://yarnpkg.com/cli/dlx)

### Registry and config

```bash
yarn config get npmRegistryServer
yarn config set npmRegistryServer https://registry.example.com
yarn npm login
yarn npm audit
```

Settings live in `.yarnrc.yml`; `.npmrc` is ignored. Registries use `npmRegistryServer`, tokens use `npmAuthToken`.

See: [Configuration](https://yarnpkg.com/configuration/yarnrc)

## References
<!-- {: .-one-column} -->

* [Yarn documentation](https://yarnpkg.com/) _(yarnpkg.com)_
* [Yarn 4 release notes](https://yarnpkg.com/blog/release/4.0) _(yarnpkg.com)_
* [Changelog](https://yarnpkg.com/advanced/changelog) _(yarnpkg.com)_
* [Yarn source](https://github.com/yarnpkg/berry) _(github.com)_

<!-- {: .-also-see} -->
