---
title: Semver
category: Others
subtitle: Version numbering convention
logo: { set: icon-park-outline, name: tag }
intro: |
  Semantic versioning rules and node-semver range syntax, from exact versions to tilde, caret, hyphen, and prerelease ranges.
links:
  - title: Semantic Versioning 2.0.0
    url: https://semver.org/spec/v2.0.0.html
  - title: node-semver README
    url: https://github.com/npm/node-semver
created_at: 2014-07-15
updated: 2026-11-26
last_verified_with: "Semantic Versioning 2.0.0, node-semver 7.8.6."
weight: -3
tier: t3
---

### Semver

| Part | Description |
| --- | --- |
| `MAJOR` | incompatible API changes                 |
| `MINOR` | add functionality (backwards-compatible) |
| `PATCH` | bug fixes (backwards-compatible)         |

Given `MAJOR.MINOR.PATCH`, `1.0.0` defines the public API; `0.x.x` is initial development.

See: [Summary](https://semver.org/spec/v2.0.0.html#summary)

### Simple ranges

```
  1.2.3
 =1.2.3
 >1.2.3
 <1.2.3
>=1.2.3
```
<!-- {: data-highlight="=1.2.3; >1.2.3; <1.2.3; >=1.2.3"} -->

Note that suffixed versions (`1.2.3-rc1`) are not matched.

See: [Ranges](https://github.com/npm/node-semver#ranges)

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

See: [Tilde ranges](https://github.com/npm/node-semver#tilde-ranges-123-12-1), [Caret ranges](https://github.com/npm/node-semver#caret-ranges-123-025-004)

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

See: [Hyphen ranges](https://github.com/npm/node-semver#hyphen-ranges-xyz---abc)

### Combining ranges

| Range              | Description           |
| ---                | ---                   |
| `>=0.14 <16`       | And (space-separated) |
| `0.14.x || 15.x.x` | Or (pipe-separated)   |

See: [Advanced range syntax](https://github.com/npm/node-semver#advanced-range-syntax)

### Pre-releases

```
1.2.3-prerelease+build
```
<!-- {: data-highlight="1.2.3-prerelease+build"} -->

See: [Prerelease tags](https://github.com/npm/node-semver#prerelease-tags)

### Explanation

| Range | Meaning |
| --- | --- |
| `^` | means "compatible with" |
| `~` | means "reasonably close to" |
| `0.x.x` | is for "initial development" |
| `1.x.x` | means public API is defined |

See: [Semantic Versioning specification](https://semver.org/spec/v2.0.0.html#semantic-versioning-specification-semver)

## References


 * <https://semver.org/>
 * <https://github.com/npm/node-semver#ranges>
