---
title: composer
category: CLI
layout: 2017/sheet
weight: -1
authors:
  - github: benolot
updated: 2018-03-06
description: |
  Basic guide on how to use Composer, the PHP Package manager.
---

All composer commands, depending on your install, may need to use `php composer.phar` in the install folder for composer, instead of plain `composer`.

### Installing dependencies
    
| Command                                | Description                                                  |
| ---                                    | ---                                                          |
| `composer install`                     | Downloads and installs all the libraries and dependencies outlined in the `composer.lock` file. If the file does not exist it will look for composer.json and do the same, creating a `composer.lock` file.                          |
| ---                                    | ---                                                          |
| `composer install --dry-run`           | Simulates the install without installing anything            |

This command doesn't change any file. If `composer.lock` is not present, it will create it.

`composer.lock` **should always** be committed to the repository. It has all the information needed to bring the 
local dependencies to the last committed state. If that file is modified on the repository, you will need to run 
`composer install` again after fetching the changes to update your local dependencies to those on that file.

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

### Updating autoloader

| Command                    | Description                        |
| ---                        | ---                                |
| `composer dumpautoload -o` | Generates optimized autoload files |

### Adding packages

| Command                          | Description                                                 |
| ---                              | ---                                                         |
| `composer require vendor/package`.      | Adds `package` from `vendor` to composer.json's `require` section and installs it             |
| ---                              | ---                                                         |
| `composer require vendor/package --dev` | Adds `package` from `vendor` to composer.json's `require-dev` section and installs it.            |

This command changes both the `composer.json` and `composer.lock` files.

### Removing packages

| Command                   | Description                                                 |
| ---                       | ---                                                         |
| `composer remove vendor/package` | Removes `vendor/package` from composer.json and uninstalls it      |

This command changes both the `composer.json` and `composer.lock` files.
