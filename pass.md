---
title: Pass
subtitle: Command-line password store
logo: { set: icon-park-outline, name: lock }
category: CLI
updated: 2026-11-24
last_verified_with: "pass 1.7.4, pass-otp 1.2.0."
tier: t3
intro: |
  pass stores passwords as GPG-encrypted files, optionally tracked in Git. This reference covers creating, reading, and syncing entries.
links:
  - title: pass man page
    url: https://git.zx2c4.com/password-store/about/
  - title: passwordstore.org
    url: https://www.passwordstore.org/
  - title: pass-otp
    url: https://github.com/tadfisher/pass-otp
---

## Store passwords
<!-- {: .-three-column} -->

### Initialize

```sh
pass init me@example.com
pass init -p work team@example.com
```

`-p` encrypts one subfolder with its own key.

See: [pass init](https://git.zx2c4.com/password-store/about/)

### Insert

```sh
pass insert twitter.com/rsc
pass insert -m amazon/bookreader
```

`-m` reads multiple lines until `EOF`; `-e` echoes the input.

See: [pass insert](https://git.zx2c4.com/password-store/about/)

### Generate

```sh
pass generate twitter.com/rsc 20
pass generate -n -c twitter.com/rsc 20
```

`-n` drops symbols, `-c` copies to the clipboard, `-i` keeps the rest of the file.

See: [pass generate](https://git.zx2c4.com/password-store/about/)

## Read passwords
<!-- {: .-three-column} -->

### Show

```sh
pass ls twitter.com/
pass show twitter.com/rsc
pass show -c twitter.com/rsc
```

`-c` copies the first line and clears the clipboard after 45 seconds.

See: [pass show](https://git.zx2c4.com/password-store/about/)

### Search

```sh
pass find twitter.com
pass grep -i api_key
```

`find` matches entry names; `grep` decrypts every file and matches contents.

See: [pass find](https://git.zx2c4.com/password-store/about/)

## Manage entries
<!-- {: .-three-column} -->

### Move, copy, remove

```sh
pass mv twitter.com twitter.com/rsc
pass cp twitter.com/rsc twitter.com/ricos
pass rm -r twitter.com
```

Entries are re-encrypted for their new folder's key.

See: [pass mv](https://git.zx2c4.com/password-store/about/)

### Edit

```sh
pass edit twitter.com/rsc
```

See: [pass edit](https://git.zx2c4.com/password-store/about/)

## Git

### Track changes

```sh
pass git init
pass git remote add origin git@example.com:me/store.git
pass git push -u --all
```

Every command that modifies the store commits on its own.

See: [pass git](https://git.zx2c4.com/password-store/about/)

### Synchronize

```sh
pass git pull --rebase
pass git push
```

See: [pass git](https://git.zx2c4.com/password-store/about/)

## One-time passwords

### Insert a token

```sh
pass otp insert work/example
zbarimg -q --raw qr.png | pass otp insert work/example
```

Needs the `pass-otp` extension.

See: [pass-otp](https://github.com/tadfisher/pass-otp)

### Generate a code

```sh
pass otp work/example
pass otp -c work/example
```

`pass otp uri work/example` prints the stored `otpauth://` URI.

See: [pass-otp](https://github.com/tadfisher/pass-otp)

## Also see

- [pass homepage](https://www.passwordstore.org)
- [pass man page](https://git.zx2c4.com/password-store/about/)
- [pass-otp](https://github.com/tadfisher/pass-otp)
<!-- {: .-also-see} -->
