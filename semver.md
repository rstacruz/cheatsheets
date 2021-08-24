---
title: Semver
layout: 2017/sheet
updated: 2019-12-31
weight: -3
---

### Semver

Given a version number `MAJOR.MINOR.PATCH`:
{: .-setup}

| `MAJOR` | incompatible API changes                 |
| `MINOR` | add functionality (backwards-compatible) |
| `PATCH` | bug fixes (backwards-compatible)         |

### Simple ranges

      1.2.3
     =1.2.3
     >1.2.3
     <1.2.3
    >=1.2.3

Note that suffixed versions (`1.2.3-rc1`) are not matched.

### Ranges

| Range    | Description         | Notes              |
| ---      | ---                 | ---                |
| `~1.2.3` | is `>=1.2.3 <1.3.0` |                    |
| ---      | ---                 | ---                |
| `^1.2.3` | is `>=1.2.3 <2.0.0` |                    |
| `^0.2.3` | is `>=0.2.3 <0.3.0` | (0.x.x is special) |
| `^0.0.1` | is  `=0.0.1`        | (0.0.x is special) |
| ---      | ---                 | ---                |
| `^1.2`   | is `>=1.2.0 <2.0.0` | (like ^1.2.0)      |
| `~1.2`   | is `>=1.2.0 <1.3.0` | (like ~1.2.0)      |
| ---      | ---                 | ---                |
| `^1`     | is `>=1.0.0 <2.0.0` |                    |
| `~1`     | same                |                    |
| `1.x`    | same                |                    |
| `1.*`    | same                |                    |
| `1`      | same                |                    |
| ---      | ---                 | ---                |
| `*`      | any version         |                    |
| `x`      | same                |                    |
{: .-shortcuts}

### Hyphenated ranges

| Range              | Description           |
| ---                | ---                   |
| `1.2.3 - 2.3.4`    | is `>=1.2.3 <=2.3.4`  |

#### Partial right

| Range              | Description           |
| ---                | ---                   |
| `1.2.3 - 2.3`      | is `>=1.2.3 <2.4.0`   |
| `1.2.3 - 2`        | is `>=1.2.3 <3.0.0`   |

#### Partial left

| Range              | Description           |
| ---                | ---                   |
| `1.2 - 2.3.0`      | is `1.2.0 - 2.3.0`    |

When the right is partial (eg, `2.3`), missing pieces are assumed to be `x` (eg, `2.3.x`).

When the left is partial (eg, `1.2`), missing pieces are assumed to be `0` (eg, `1.2.0`).

### Combining ranges

| Range              | Description           |
| ---                | ---                   |
| `>=0.14 <16`       | And (space-separated) |
| `0.14.x || 15.x.x` | Or (pipe-separated)   |

### Pre-releases

    1.2.3-prerelease+build

### Explanation

| `^` | means "compatible with" |
| `~` | means "reasonably close to" |
| `0.x.x` | is for "initial development" |
| `1.x.x` | means public API is defined |
{: .-shortcuts}

## References
{: .-one-column}

 * <http://semver.org/>
 * <https://docs.npmjs.com/misc/semver>
