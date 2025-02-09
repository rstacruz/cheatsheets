---
title: tar
category: CLI
updated: 2022-08-11
intro: Concatenate, Deflate, Inflate files
---
## Reference
{:.-two-column}

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
# Append a file to an existing archive
tar -zu archive.tar.gz -C /target/file
```

```shell
# List files in archive
# Add -v for additional details
tar -tzf archive.tar.gz
```

### Common options

| Option | Description                                                             |
|--------|-------------------------------------------------------------------------|
| `z`    | compress with gzip                                                      |
| `c`    | create an archive                                                       |
| `u`    | append files which are newer than the corresponding copy in the archive |
| `f`    | filename of the archive                                                 |
| `v`    | verbose, display what is inflated or deflated                           |
| `a`    | unlike of `z`, determine compression based on file extension            |
