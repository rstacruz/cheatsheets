---
title: npm
category: JavaScript
weight: -1
updated: 2026-11-11
tier: t2
intro: |
  [npm](https://docs.npmjs.com/cli/v12/) is the package manager for Node.js. This reference covers everyday commands, package specifiers, and npm 12 defaults.
links:
  - title: npm CLI documentation
    url: https://docs.npmjs.com/cli/v12/
  - title: package.json reference
    url: https://docs.npmjs.com/cli/v12/configuring-npm/package-json/
---

## Getting started

### Install

| Command                         | Description                           |
| ---                             | ---                                   |
| `npm install`                   | Install dependencies from package.json |
| `npm install --omit=dev`        | Skip devDependencies                  |
| `npm install --min-release-age=7` | Only install releases older than 7 days |
| `npm install -g pkg`            | Install a package globally            |
| `npm ci`                        | Clean install from package-lock.json  |

`--production` is deprecated; use `--omit=dev`.

See: [npm install](https://docs.npmjs.com/cli/v12/commands/npm-install/)

### Add packages

| Command                    | Description                    |
| ---                        | ---                            |
| `npm i lodash`             | Add to dependencies            |
| `npm i -D vitest`          | Add to devDependencies         |
| `npm i -E lodash`          | Save an exact version          |
| `npm i -O fsevents`        | Add to optionalDependencies    |
| `npm i --no-save lodash`   | Install without saving         |

See: [npm install](https://docs.npmjs.com/cli/v12/commands/npm-install/)

### Clean install

```bash
npm ci
npm ci --omit=dev
```

`npm ci` requires a lockfile, removes `node_modules`, and never writes the lockfile.

See: [npm ci](https://docs.npmjs.com/cli/v12/commands/npm-ci/)

### Remove

| Command              | Description                 |
| ---                  | ---                         |
| `npm rm lodash`      | Remove from dependencies    |
| `npm rm -D vitest`   | Remove from devDependencies |
| `npm rm -g pkg`      | Remove a global package     |

See: [npm uninstall](https://docs.npmjs.com/cli/v12/commands/npm-uninstall/)

## Inspecting

### Listing

| Command                     | Description                 |
| ---                         | ---                         |
| `npm ls`                    | Dependency tree             |
| `npm ls -g --depth=0`       | Top-level global packages   |
| `npm view lodash`           | Registry metadata           |
| `npm view lodash versions`  | Published versions          |
| `npm query '.prod'`         | Query production dependencies |

See: [npm ls](https://docs.npmjs.com/cli/v12/commands/npm-ls/), [npm query](https://docs.npmjs.com/cli/v12/commands/npm-query/)

### Outdated and audit

| Command                     | Description                 |
| ---                         | ---                         |
| `npm outdated`              | List outdated packages      |
| `npm audit`                 | Report known vulnerabilities |
| `npm audit fix`             | Apply compatible fixes      |
| `npm audit fix --force`     | Apply breaking fixes        |
| `npm audit signatures`      | Verify registry signatures  |

See: [npm audit](https://docs.npmjs.com/cli/v12/commands/npm-audit/)

### Explain a dependency

```bash
npm explain lodash
npm why lodash
```

`npm why` is an alias for `npm explain`.

See: [npm explain](https://docs.npmjs.com/cli/v12/commands/npm-explain/)

### Doctor

```bash
npm doctor
npm cache verify
npm cache clean --force
```

`npm doctor` checks the registry, cache, permissions, and environment.

See: [npm doctor](https://docs.npmjs.com/cli/v12/commands/npm-doctor/)

### Edit package.json

```bash
npm pkg get version
npm pkg set version=1.2.3
npm pkg set scripts.lint="oxlint"
npm pkg set keywords[0]="cli"
npm pkg delete scripts.lint
npm pkg fix
```

`npm pkg` edits JSON without reformatting it; `fix` applies the corrections
`npm publish` would otherwise make.

See: [npm pkg](https://docs.npmjs.com/cli/v12/commands/npm-pkg/)

## Updating

### Update

| Command                  | Description                 |
| ---                      | ---                         |
| `npm update`             | Update within semver ranges |
| `npm update --save`      | Also update package.json    |
| `npm update -g`          | Update global packages      |
| `npm update lodash`      | Update one package          |

`npm update` updates production and dev packages; it leaves package.json alone unless `--save` is given.

See: [npm update](https://docs.npmjs.com/cli/v12/commands/npm-update/)

### Version

| Command                                | Description             |
| ---                                    | ---                     |
| `npm version 1.2.3`                    | Set an exact version    |
| `npm version major`                    | Bump to 2.0.0           |
| `npm version minor`                    | Bump to 1.3.0           |
| `npm version patch`                    | Bump to 1.2.4           |
| `npm version prerelease --preid rc`    | Bump to 1.2.4-rc.0      |

In a git repo, `npm version` also commits and tags; add `--no-git-tag-version` to skip.

See: [npm version](https://docs.npmjs.com/cli/v12/commands/npm-version/)

## Workspaces

### Define workspaces

```json
{
  "name": "app",
  "workspaces": ["packages/a", "packages/b"]
}
```

```bash
npm init -w ./packages/c
npm install
```

`npm install` symlinks every workspace into the root `node_modules`.

See: [Workspaces](https://docs.npmjs.com/cli/v12/using-npm/workspaces/)

### Target a workspace

```bash
npm i lodash -w a
npm run build --workspace=a
npm run test --workspaces
npm run test --workspaces --if-present
npm publish -w a
```

`-w` takes a package name or folder path and can repeat. `--workspaces` runs
across all of them in `package.json` order.

See: [Running commands in workspaces](https://docs.npmjs.com/cli/v12/using-npm/workspaces/#running-commands-in-the-context-of-workspaces)

## Scripts

### Run scripts

```bash
npm run build
npm run build -- --watch
npm test
```

Arguments after `--` pass through to the script.

See: [npm run](https://docs.npmjs.com/cli/v12/commands/npm-run/)

### Execute binaries

```bash
npx prettier --write .
npm exec -- prettier --write .
```

`npx` is shorthand for `npm exec`; both use local binaries first.

See: [npm exec](https://docs.npmjs.com/cli/v12/commands/npm-exec/)

## Publishing

### Publish

```bash
npm pack --dry-run
npm publish
npm publish --access public
npm publish --tag beta
```

See: [npm publish](https://docs.npmjs.com/cli/v12/commands/npm-publish/)

### Deprecate and own

```bash
npm deprecate pkg@"< 0.2.0" "critical bug fixed in 0.2.0"
npm owner add user pkg
npm owner ls pkg
```

See: [npm deprecate](https://docs.npmjs.com/cli/v12/commands/npm-deprecate/), [npm owner](https://docs.npmjs.com/cli/v12/commands/npm-owner/)

## Package sources

### Install names

| Command                       | Description        |
| ---                           | ---                |
| `npm i sax`                   | Registry package   |
| `npm i sax@latest`            | Latest tag         |
| `npm i sax@3.0.0`             | Exact version      |
| `npm i sax@">=1 <2.0"`        | Version range      |
| `npm i @org/sax`              | Scoped package     |
| `npm i /path/to/repo`         | Local directory    |
| `npm i ./archive.tgz`         | Local tarball      |

See: [Package spec](https://docs.npmjs.com/cli/v12/using-npm/package-spec/)

### Version ranges

| Range      | Matches             |
| ---        | ---                 |
| `1.2.3`    | Exactly 1.2.3       |
| `^1.2.3`   | >=1.2.3, <2.0.0     |
| `~1.2.3`   | >=1.2.3, <1.3.0     |
| `1.x`      | >=1.0.0, <2.0.0     |
| `>=1.2 <2` | Space means AND     |
| `*`        | Any version         |

`^` allows minor and patch upgrades, `~` patch only. A prerelease only matches
a range that itself includes a prerelease.

See: [Semantic Versioning](https://semver.org/)

### Git and URL installs

```bash
npm i user/repo --allow-git=all
npm i github:user/repo#main --allow-git=all
npm i https://site.com/archive.tgz --allow-remote=all
```

npm 12 blocks git and remote URL dependencies by default; opt in per command or in `.npmrc`.

See: [allow-git](https://docs.npmjs.com/cli/v12/using-npm/config/#allow-git), [allow-remote](https://docs.npmjs.com/cli/v12/using-npm/config/#allow-remote)
