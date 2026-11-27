---
title: tar
subtitle: Archive utility
logo: { set: icon-park-outline, name: file-zip }
category: CLI
tier: t3
last_verified_with: "GNU tar 1.35."
updated: 2026-11-26
intro: Concatenate, Deflate, Inflate files
links:
  - title: GNU tar manual
    url: https://www.gnu.org/software/tar/manual/
---

## Reference

### Deflate / Inflate / Concatenate

```shell
# Deflate / Compress
tar -czf archive.tar.gz /path/files
```

```shell
# Inflate / Uncompress
tar -xzf archive.tar.gz
```

```shell
# Concatenate files into a single tar
tar -cf archive.tar /path/files
```

```shell
# Extract file to a defined directory
tar -xzf archive.tar.gz -C /target/directory
```

```shell
# append a file to an uncompressed archive
tar -rf archive.tar -C /target file.txt
```

```shell
# List files in archive
# Add -v for additional details
tar -tzf archive.tar.gz
```

See: [Create, list and extract](https://www.gnu.org/software/tar/manual/html_node/create.html)

### Common options

| Option | Description                                                             |
|--------|-------------------------------------------------------------------------|
| `z`    | compress with gzip                                                      |
| `c`    | create an archive                                                       |
| `u`    | append files which are newer than the corresponding copy in the archive |
| `f`    | filename of the archive                                                 |
| `v`    | verbose, display what is inflated or deflated                           |
| `a`    | infer compression from the archive suffix                              |
<!-- {: .-headers} -->

See: [Option summary](https://www.gnu.org/software/tar/manual/html_node/Option-Summary.html)

## Also see

### Extract one file

[tar extract one file cheatsheet](./tar-extract-one-file)
<!-- {: .-crosslink} -->
