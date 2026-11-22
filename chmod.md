---
title: chmod
subtitle: Change file permissions
category: Linux
tier: t2
updated: 2026-11-23
last_verified_with: "GNU coreutils 9.8 (chmod 9.8)."
fragments:
  - "chmod u+x"
  - "chmod 644"
  - "chmod -R"
  - "u+x"
  - "go-w"
  - "a+r"
  - "u=rw"
  - "--reference"
  - "-R"
  - "4755"
  - "g+s"
  - "+t"
  - "rwxr-xr-x"
  - "stat -c '%A %a'"
intro: |
  chmod changes read, write, and execute permissions on files and directories. Modes use symbolic letters or octal digits.
links:
  - title: GNU chmod manual
    url: https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html
  - title: POSIX chmod
    url: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/chmod.html
---

## Getting started
<!-- {: .-three-column} -->

### Symbolic mode
<!-- {: .-prime} -->

```bash
$ chmod u+x script.sh
$ stat -c '%A %a' script.sh
-rwxr--r-- 744
```

`u`, `g`, `o`, and `a` select who to change; `+`, `-`, and `=` add, remove, or set exact bits. The example starts from mode `644`.

See: [Symbolic modes](https://www.gnu.org/software/coreutils/manual/html_node/Symbolic-Modes.html)

### Octal mode

```bash
$ chmod 640 secrets.txt
$ stat -c '%A %a' secrets.txt
-rw-r----- 640
```

Each digit adds read (4), write (2), and execute (1) for owner, group, and others.

See: [Numeric modes](https://www.gnu.org/software/coreutils/manual/html_node/Numeric-Modes.html)

### Directory access

```bash
$ chmod 755 public/
$ stat -c '%A %a' public/
drwxr-xr-x 755
```

On a directory, `r` lists names, `w` creates and removes entries, and `x` allows traversing it.

See: [File permissions](https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html)

## Common changes
<!-- {: .-three-column} -->

### Add execute

```bash
$ chmod +x script.sh
$ stat -c '%A %a' script.sh
-rwxr-xr-- 754
```

With no class, `+` respects the umask (`0027` here). Use `a+x` to give execute to everyone.

See: [Setting permissions](https://www.gnu.org/software/coreutils/manual/html_node/Setting-Permissions.html)

### Remove write

```bash
$ chmod go-w report.txt
```

`-` clears only the named bits and leaves the rest of the mode untouched.

See: [Setting permissions](https://www.gnu.org/software/coreutils/manual/html_node/Setting-Permissions.html)

### Set exact bits

```bash
$ chmod u=rw file.txt
```

`=` replaces that class's bits; `chmod 644 file.txt` does the same for all three classes.

See: [Setting permissions](https://www.gnu.org/software/coreutils/manual/html_node/Setting-Permissions.html)

### Recursive

```bash
$ chmod -R go-w \
    public/
```

`-R` applies the change to a whole tree. GNU chmod leaves symlinks alone.

See: [chmod invocation](https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html)

### Reference file

```bash
$ chmod --reference=template.txt \
    target.txt
```

Copies the exact mode of another file; this option is GNU-specific.

See: [Copying permissions](https://www.gnu.org/software/coreutils/manual/html_node/Copying-Permissions.html)

## Inspect modes

### List a file

```bash
$ ls -l --time-style=+%F script.sh
-rwxr-xr-x 1 rsc users 0 2026-11-23 script.sh
```

The first ten characters show the file type and the owner, group, and other permission bits.

See: [File permissions](https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html)

### Read the numeric mode

```bash
$ stat -c '%A %a' script.sh
-rwxr-xr-x 755
```

`stat` prints both forms, which is handy after a recursive change.

See: [chmod invocation](https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html)

## Special bits
<!-- {: .-three-column} -->

### Setuid

```bash
$ chmod u+s program
$ stat -c '%A %a' program
-rwsr-xr-x 4755
```

The owner's `x` becomes `s` and the numeric mode gains a leading `4`.

See: [File permissions](https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html)

### Setgid

```bash
$ chmod g+s shared/
$ stat -c '%A %a' shared/
drwxr-sr-x 2755
```

On a directory, new entries inherit its group; the leading digit becomes `2`.

See: [Directory setuid and setgid](https://www.gnu.org/software/coreutils/manual/html_node/Directory-Setuid-and-Setgid.html)

### Sticky bit

```bash
$ chmod 00777 shared/
$ chmod +t shared/
$ stat -c '%A %a' shared/
drwxrwxrwt 1777
```

A leading `0` clears inherited special bits. On a shared directory, unprivileged users can remove only their own entries; the directory owner and root are exempt.

See: [File permissions](https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html)

### Numeric special bits

```bash
$ chmod 4755 program
```

#### Leading digit

| Digit | Bit     |
| ----- | ------- |
| `4`   | setuid  |
| `2`   | setgid  |
| `1`   | sticky  |
<!-- {: .-headers} -->

Combine it with the three access digits, eg `chmod 2755 shared/`.

See: [Numeric modes](https://www.gnu.org/software/coreutils/manual/html_node/Numeric-Modes.html)
