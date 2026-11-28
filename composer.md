---
title: composer
subtitle: PHP package manager
logo: { src: /assets/logos/composer.svg, mono: true }
category: Package managers
weight: -1
authors:
  - github: benolot
created_at: 2017-10-31
updated: 2020-02-23
tier: t3
last_verified_with: "Composer 2.11.2."
description: |
  Basic guide on how to use Composer, the PHP Package manager.
---

All composer commands, depending on your install, may need to use `php composer.phar` in the install folder for composer, instead of global/plain `composer`.

### Installing dependencies
    
| Command                                | Description                                                  |
| ---                                    | ---                                                          |
| `composer install`                     | Downloads and installs all the libraries and dependencies outlined in the `composer.lock` file. If the file does not exist it will look for composer.json and do the same, creating a `composer.lock` file.                          |
| ---                                    | ---                                                          |
| `composer install --dry-run`           | Simulates the install without installing anything            |

A dry run changes nothing; otherwise `install` creates `composer.lock`, which belongs in the repository so a rerun after fetching changes restores exact dependencies.

See: [install](https://getcomposer.org/doc/03-cli.md#install-i)

### Updating packages

| Command                                       | Description                     |
| ---                                           | ---                             |
| `composer update`                             | Updates all packages             |
| `composer update --with-dependencies`         | Updates all packages and its dependencies             |
| ---                                           | ---                             |
| `composer update vendor/package`              | Updates a certain `package` from `vendor`        |
| `composer update vendor/*`                    | Updates all packages from `vendor` |
| `composer update --lock`                      | Updates `composer.lock` hash without updating any packages |

This command changes only the `composer.lock` file.

See: [update](https://getcomposer.org/doc/03-cli.md#update-u-upgrade)

### Updating autoloader

| Command                    | Description                        |
| ---                        | ---                                |
| `composer dumpautoload -o` | Generates optimized autoload files |

See: [dump-autoload](https://getcomposer.org/doc/03-cli.md#dump-autoload-dumpautoload)

### Adding packages

| Command                          | Description                                                 |
| ---                              | ---                                                         |
| `composer require vendor/package`      | Adds `package` from `vendor` to composer.json's `require` section and installs it             |
| ---                              | ---                                                         |
| `composer require vendor/package --dev` | Adds `package` from `vendor` to composer.json's `require-dev` section and installs it.            |

This command changes both the `composer.json` and `composer.lock` files.

See: [require](https://getcomposer.org/doc/03-cli.md#require-r)

### Passing versions

| Command                                         | Description                              |
| ----------------------------------------------- | ---------------------------------------- |
| `composer require vendor/pkg "1.3.2"`           | Installs `1.3.2`                         |
| `composer require vendor/pkg ">=1.3.2"`         | Above or equal `1.3.2`                   |
| `composer require vendor/pkg "<1.3.2"`          | Below `1.3.2`                            |
| ---                                             | ---                                      |
| `composer require vendor/pkg "1.3.*"`           | Latest of `>=1.3.0 <1.4.0`               |
| `composer require vendor/pkg "~1.3.2"`          | Latest of `>=1.3.2 <1.4.0`               |
| `composer require vendor/pkg "~1.3"`            | Latest of `>=1.3.0 <2.0.0`               |
| `composer require vendor/pkg "^1.3.2"`          | Latest of `>=1.3.2 <2.0.0`               |
| `composer require vendor/pkg "^1.3"`            | Latest of `>=1.3.0 <2.0.0`               |
| `composer require vendor/pkg "^0.3.2"`          | Latest of `>=0.3.0 <0.4.0` (for pre-1.0) |
| ---                                             | ---                                      |
| `composer require vendor/pkg "dev-BRANCH_NAME"` | From the branch `BRANCH_NAME`            |

See: [Writing version constraints](https://getcomposer.org/doc/articles/versions.md#writing-version-constraints)

### Removing packages

| Command                   | Description                                                 |
| ---                       | ---                                                         |
| `composer remove vendor/package` | Removes `vendor/package` from composer.json and uninstalls it      |

This command changes both the `composer.json` and `composer.lock` files.

See: [remove](https://getcomposer.org/doc/03-cli.md#remove-rm-uninstall)

### Verifying

| Command                      | Description                                                                |
| ---------------------------- | -------------------------------------------------------------------------- |
| `composer outdated --direct` | Show only packages that are outdated directly required by the root package |

See: [outdated](https://getcomposer.org/doc/03-cli.md#outdated)
