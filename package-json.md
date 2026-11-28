---
title: package.json
subtitle: Manifest for npm packages
logo: { src: /assets/logos/npm.svg }
category: Node.js libraries
prism_languages: [json]
created_at: 2013-05-29
updated: 2026-11-25
last_verified_with: "npm 12.2.3."
tier: t3
weight: -3
intro: |
  A `package.json` file declares a Node.js package's metadata, dependencies, scripts, and entry points. This sheet covers common fields and version ranges.
links:
  - title: npm package.json
    url: https://docs.npmjs.com/cli/v12/configuring-npm/package-json
  - title: package.json dependencies
    url: https://docs.npmjs.com/cli/v12/configuring-npm/package-json#dependencies
  - title: npm scripts
    url: https://docs.npmjs.com/cli/v12/using-npm/scripts
---

### Basic

```json
{
  "name": "expo",
  "description": "My package",
  "version": "0.1.0",
  "license": "MIT",
  "keywords": ["http", "server"],
  "author": "Rico Sta. Cruz <rstacruz@users.noreply.github.com>",
  "engines": {
    "node": ">=0.8.0"
  },
  "main": "index",
  "bin": {
    "command": "./bin/command"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/rstacruz/___.git"
  }
}
```

<!-- {: data-highlight='"name"; "version"'} -->

Highlighted lines are required.

See: [package.json](https://docs.npmjs.com/cli/v12/configuring-npm/package-json)

### Dependencies

#### Version ranges

```json
"dependencies": {
  "colors":   "*",
  "flatiron": "0.1.x",
  "plates":   "~0.1.0",
  "stuff":    "https://github.com/user/project/tarball/branch",
  "thing":    "git://github.com/user/project.git#commit-ish"
},
```
<!-- {: data-highlight='"*"; "0.1.x"; "~0.1.0"'} -->

#### Other dependency fields

```json
"devDependencies": { ··· },
"peerDependencies": { ··· },
"optionalDependencies": { ··· },
```
<!-- {: data-highlight="devDependencies; peerDependencies; optionalDependencies"} -->

[Semver cheatsheet](./semver) explains version ranges.

See: [package.json dependencies](https://docs.npmjs.com/cli/v12/configuring-npm/package-json#dependencies)

### Scripts

```json
"scripts": {
  "start": "node ./bin/xxx",       /* npm start */
  "test": "vows --spec --isolate", /* npm test */
  "postinstall": "...",
  "prepublish": "grunt build", /* after install, before publish */
}
```
<!-- {: data-highlight='"scripts"'} -->

See: [npm scripts](https://docs.npmjs.com/cli/v12/using-npm/scripts)

### Misc

```json
"private": true,
"preferGlobal": true
```
<!-- {: data-highlight='"private"; "preferGlobal"'} -->

See: [private](https://docs.npmjs.com/cli/v12/configuring-npm/package-json#private)

### Config

```json
{
  "config": {
    "foobar": "hello"
  },
  "scripts": {
    "run": "echo $npm_package_config_foobar"
  }
}
```
<!-- {: data-highlight='"config"'} -->

Keys in `config` are exposed as env vars to scripts.

See: [Environment variables](https://docs.npmjs.com/cli/v12/using-npm/config#environment-variables)

## References

<!-- {: .-one-column} -->

 * <http://package.json.nodejitsu.com/>
 * `npm help package.json`

<!-- {: .-also-see} -->
