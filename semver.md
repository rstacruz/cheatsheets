---
title: Semver
---

Given a version number `MAJOR.MINOR.PATCH`:

 * `MAJOR` = incompatible API changes.
 * `MINOR` = add functionality. (backwards-compatible)
 * `PATCH` = bug fixes. (backwards-compatible)

### Simple ranges

      1.2.3
     =1.2.3
     >1.2.3
     <1.2.3
    >=1.2.3

Note that suffixed versions (`1.2.3-rc1`) are not matched.

### Ranges

    ~1.2.3    : is >=1.2.3 <1.3.0

    ^1.2.3    : is >=1.2.3 <2.0.0
    ^0.2.3    : is >=0.2.3 <0.3.0   (0.x.x is special)
    ^0.0.1    : is  =0.0.1          (0.0.x is special)

    ^1.2      : is >=1.2.0 <2.0.0   (like ^1.2.0)
    ~1.2      : is >=1.2.0 <1.3.0   (like ~1.2.0)

    ^1        : is >=1.0.0 <2.0.0
    ~1        : same
     1.x      : same
     1.*      : same
     1        : same

    *         : any version
    x         : same

### Pre-releases

    1.2.3-prerelease+build

### Explanation

 * `^` means "compatible with"
 * `~` means "reasonably close to"
 * `0.x.x` is for "initial development"
 * `1.x.x` means public API is defined

### References

 * http://semver.org/
 * https://www.npmjs.org/doc/misc/semver.html
