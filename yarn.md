---
title: Yarn
category: JavaScript libraries
weight: -3
updated: 2019-09-30
prism_languages: [json, bash]
tags: [Featurable]
---

### npm equivalents

| npm | yarn |
| --- | ---- |
| `npm init` | `yarn init` |
| `npm install` | `yarn` |
| `npm install gulp --save` | `yarn add gulp` |
| `npm install gulp --save-dev --save-exact` | `yarn add gulp --dev --exact` |
| `npm install -g gulp` | `yarn global add gulp` |
| `npm update` | `yarn upgrade` |
| `./node_modules/.bin/gulp` | `yarn run gulp` |
{: .-left-align.-headers}

### yarn install

```
--no-lockfile
--pure-lockfile
--frozen-lockfile
--silent
--offline
--update-checksums
--check-files
--flat
--force
--ignore-scripts
--modules-folder <path>
--production[=true|false]
```

These options are available for `yarn install`.

### yarn add

```
--dev
--peer
--optional
--exact
--tilde
```

These options are available for `yarn add`.

### Workspaces

In `package.json`:
{: .-setup}

```json
"workspaces": [
  "packages/*"
]
```

```
jest/
├─ package.json
└─ packages/
   ├─ jest-matcher-utils/
   │  └─ package.json
   └─ jest-diff/
      └─ package.json
```
{: .-box-chars}

(New in 1.0) Allows monorepos to share packages with each other. See: [Introducing workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)

### Selective version resolution

In `package.json`:
{: .-setup}

```json
"resolutions": {
  "**/sass-brunch/node-sass": "4.5.2"
}
```

(New in 1.0) Allows you to specify versions for sub-dependencies. See: [Selective version resolutions](https://github.com/yarnpkg/yarn/pull/4105)

### Create

```bash
yarn create react-app hello
```

Install `create-react-app` and runs it. See: [yarn create](https://github.com/yarnpkg/rfcs/blob/master/implemented/0000-yarn-create.md)
