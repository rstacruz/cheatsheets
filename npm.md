---
title: npm
category: JavaScript
weight: -1
updated: 2019-12-24
---

### Package management

| Command                           | Description                                               |
| ---                               | ---                                                       |
| `npm i`                           | Alias for `npm install`                                   |
| `npm install`                     | Install everything in package.json                        |
| `npm install --production`        | Install everything in package.json, except devDependecies |

### Adding packages

| Command                           | Description                                               |
| ---                               | ---                                                       |  
| `npm install lodash`              | Install a package                                         |
| `npm install --save-dev lodash`   | Install as devDependency                                  |
| `npm install --save-exact lodash` | Install with exact                                        |

### Listing

| Command                 | Description                                                         |
| ---                     | ---                                                                 |
| `npm list`              | Lists the installed versions of all dependencies in this software   | 
| `npm list -g --depth 0` | Lists the installed versions of all globally installed packages     | 
| `npm view`              | Lists the latest versions of all dependencies in this software      | 
| `npm outdated`          | Lists only the dependencies in this software which are outdated     |

### Updating

| Command             | Description                |
| ---                 | ---                        |
| `npm update`        | Update production packages |
| `npm update --dev`  | Update dev packages        |
| `npm update -g`     | Update global packages     |
| ---                 | ---                        |
| `npm update lodash` | Update a package           |


### Removing

| Command             | Description                        |
| ---                 | ---                                |
| `npm rm lodash`     | Remove package production packages |

## More features

### Install names

| Command                              | Description             |
| ---                                  | ---                     |
| `npm i sax`                          | NPM package             |
| `npm i sax@latest`                   | Specify tag `latest`    |
| `npm i sax@3.0.0`                    | Specify version `3.0.0` |
| `npm i sax@">=1 <2.0"`               | Specify version range   |
| ---                                  | ---                     |
| `npm i @org/sax`                     | Scoped NPM package      |
| ---                                  | ---                     |
| `npm i user/repo`                    | GitHub                  |
| `npm i user/repo#master`             | GitHub                  |
| `npm i github:user/repo`             | GitHub                  |
| `npm i gitlab:user/repo`             | GitLab                  |
| ---                                  | ---                     |
| `npm i /path/to/repo`                | Absolute path           |
| `npm i ./archive.tgz`                | Tarball                 |
| `npm i https://site.com/archive.tgz` | Tarball via HTTP        |

### Bumping versions

| Command                           | Description                                               |
| ---                               | ---                                                       |
| `npm version 1.2.3`               | Bump the package version to 1.2.3                         |
| `npm version major`               | Bump the major package version by 1 (1.2.3 → 2.0.0)       |
| `npm version minor`               | Bump the minor package version by 1 (1.2.3 → 1.3.0)       |
| `npm version patch`               | Bump the patch package version by 1 (1.2.3 → 1.2.4)       |

### Misc features

```bash
# Add someone as an owner
npm owner add USERNAME PACKAGENAME
```

```bash
# list packages
npm ls
```

```bash
# Adds warning to those that install a package of old versions
npm deprecate PACKAGE@"< 0.2.0" "critical bug fixed in v0.2.0"
```

```bash
# update all packages, or selected packages
npm update [-g] PACKAGE
```

```bash
# Check for outdated packages
npm outdated [PACKAGE]
```
