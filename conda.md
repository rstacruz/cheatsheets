---
title: conda
layout: 2017/sheet
updated: 2021-07-17
intro: |
  [conda](https://conda.io/) is a package and environment manager for Python, R, Ruby, Lua, Scala, Java, JavaScript, C/C++, FORTRAN, and more.
---

## Basics
{: .-two-column}

### Getting started

| Command                               | Description                    |
| ------------------------------------- | ------------------------------ |
| `conda info`                          | Show version and configuration |
| ---                                   | ---                            |
| `conda update -n base conda`          | Update Conda                   |
| `conda update --all [--name envname]` | Update all packages            |

### Environments

| Command                                        | Description            |
| ---------------------------------------------- | ---------------------- |
| `conda create --name envname python=3.6 numpy` | Create new environment |
| `conda activate envname`                       | Load environment       |
| `conda deactivate envname`                     | Unload environment     |
| `conda info --envs`                            | Show all environments  |
| `conda remove --name envname --all`            | Delete environment     |

#### Environment revisions

| Command                           | Description      |
| --------------------------------- | ---------------- |
| `conda list --revisions`          | Show changes     |
| `conda install --revision revnum` | Restore revision |

Use `--name envname` for making changes in currently deactivated environments.

### Packages

| Command                            | Description                   |
| ---------------------------------- | ----------------------------- |
| `conda install numpy pandas`       | Install packages              |
| `conda install numpy==1.16.1`      | Install exact package version |
| `conda install conda-forge::numpy` | Install package from channel  |
| ---                                | ---                           |
| `conda update numpy`               | Update package                |
| `conda uninstall numpy`            | Remove package                |
| `conda list`                       | Show installed packages       |
| `conda search [--info] numpy=1.15` | Search for packages           |

#### Configuring channels

| Command                                      | Description              |
| -------------------------------------------- | ------------------------ |
| `conda config --add channels conda-forge`    | Add channel              |
| `conda config --remove channels conda-forge` | Remove channel           |
| `conda config --show channels`               | Show configured channels |

### Sharing

| Command                                      | Description       |
| -------------------------------------------- | ----------------- |
| `conda create --clone envname --name newenv` | Clone environment |

#### Environment specification

| Command                               | Description               |
| ------------------------------------- | ------------------------- |
| `conda env export > envname.yml`      | Export specification      |
| `conda env create --file envname.yml` | Create from specification |

Use `--name envname` for exporting currently deactivated environments.

#### Exact package versions

| Command                                      | Description                   |
| -------------------------------------------- | ----------------------------- |
| `conda list --explicit > pkgs.txt`           | Export exact package versions |
| `conda create --name newenv --file pkgs.txt` | Create from exact versions    |

Exact package versions are specific to your operating system.

### General hints

| Command                       | Description                       |
| ----------------------------- | --------------------------------- |
| `conda install [--yes] numpy` | Avoid user prompts                |
| `conda list [--name envname]` | Perform command for environment   |
| `conda config --show`         | Show configuration details        |
| `conda clean --all`           | Delete unused packages and caches |

### Specifying version numbers

| Type       | Specification         | Result                                        |
| ---------- | --------------------- | --------------------------------------------- |
| Fuzzy      | `numpy=1.11`          | `1.11.0`, `1.11.1`, `1.11.2`, `1.11.18`, etc. |
| Exact      | `numpy==1.11`         | `1.11`, `1.11.0`, `1.11.0.0`, etc.            |
| Comparison | `numpy>=1.11`         | `1.11.0` or higher                            |
| Wildcard   | `numpy==1.11*`        | `1.11`, `1.11.1`, `1.11-dev`, etc.            |
| OR         | `numpy=1.11.1|1.11.3` | `1.11.1`, `1.11.3`                            |
| AND        | `numpy>=1.8,<2`       | `1.8`, `1.9`, but _not_ `2.0`                 |

Use quotation marks when your specification contains a space or any of `>` `<` `|` `*`

## Also see
{: .-one-column}

- [Conda Cheat Sheet](https://docs.conda.io/projects/conda/en/latest/user-guide/cheatsheet.html) _(docs.conda.io)_
- [Conda Package Specification](https://docs.conda.io/projects/conda-build/en/latest/resources/package-spec.html) _(docs.conda.io)_
{: .-also-see}
