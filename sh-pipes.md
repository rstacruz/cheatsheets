---
title: "Shell: named pipes"
subtitle: Process substitution and named pipes
logo: { set: icon-park-outline, name: transfer }
category: Shell
intro: |
  Use Bash process substitution and named pipes to pass command output as file paths without temporary files.
links:
  - title: GNU Bash manual
    url: https://www.gnu.org/software/bash/manual/bash.html
  - title: POSIX mkfifo
    url: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/mkfifo.html
tier: t3
last_verified_with: "GNU Bash 5.3."
updated: 2026-11-26
---

## Process substitution

### Named pipes

```sh
diff <(ls ./old) <(ls ./new)
```

This creates a virtual file with the contents of the output of `ls ./old`.

See: [Process substitution](https://www.gnu.org/software/bash/manual/bash.html)

### References

* [GNU Bash manual](https://www.gnu.org/software/bash/manual/bash.html)
* [POSIX mkfifo](https://pubs.opengroup.org/onlinepubs/9799919799/utilities/mkfifo.html)
