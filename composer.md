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

### Package management

| Command                                | Description                                                  |
| ---                                    | ---                                                          |
| `composer install`                     | Install everything in composer.json                          |
| ---                                    | ---                                                          |
| `composer install laravel`             | Install a package                                            |
| `composer install laravel --dry-run`   | Simulates the install without installing anything            |
| `composer install laravel --no-scripts`| Skips post-download scripts                                  |

### Updating

| Command                   | Description                     |
| ---                       | ---                             |
| `composer update`         | Update all packages             |
| ---                       | ---                             |
| `composer update laravel` | Update a certain package        |
| `composer update vendor/*`| Update all packages in a folder |



### Requiring

| Command                          | Description                                                 |
| ---                              | ---                                                         |
| `composer require laravel`.      | Add new package to composer.json and install it             |
| ---                              | ---                                                         |
| `composer require laravel --dev` | Add new package to `require-dev` and install it.            |

### Removing

| Command                   | Description                                                 |
| ---                       | ---                                                         |
| `composer remove laravel` | Remove new package to composer.json and uninstall it        |
