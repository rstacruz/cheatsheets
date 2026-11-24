---
title: Pass
subtitle: Command-line password store
category: CLI
updated: 2026-11-24
last_verified_with: "pass 1.7.4, pass-otp 1.2.0."
---

## Store passwords
<!-- {: .-three-column} -->

### Initialize

```sh
pass init me@example.com
pass init -p work team@example.com
```

`-p` encrypts one subfolder with its own key.

### Insert

```sh
pass insert twitter.com/rsc
pass insert -m amazon/bookreader
```

`-m` reads multiple lines until `EOF`; `-e` echoes the input.

### Generate

```sh
pass generate twitter.com/rsc 20
pass generate -n -c twitter.com/rsc 20
```

`-n` drops symbols, `-c` copies to the clipboard, `-i` keeps the rest of the file.

## Read passwords
<!-- {: .-three-column} -->

### Show

```sh
pass ls twitter.com/
pass show twitter.com/rsc
pass show -c twitter.com/rsc
```

`-c` copies the first line and clears the clipboard after 45 seconds.

### Search

```sh
pass find twitter.com
pass grep -i api_key
```

`find` matches entry names; `grep` decrypts every file and matches contents.

## Manage entries
<!-- {: .-three-column} -->

### Move, copy, remove

```sh
pass mv twitter.com twitter.com/rsc
pass cp twitter.com/rsc twitter.com/ricos
pass rm -r twitter.com
```

Entries are re-encrypted for their new folder's key.

### Edit

```sh
pass edit twitter.com/rsc
```

## Git

### Track changes

```sh
pass git init
pass git remote add origin git@example.com:me/store.git
pass git push -u --all
```

Every command that modifies the store commits on its own.

### Synchronize

```sh
pass git pull --rebase
pass git push
```

## One-time passwords

### Insert a token

```sh
pass otp insert work/example
zbarimg -q --raw qr.png | pass otp insert work/example
```

Needs the `pass-otp` extension.

### Generate a code

```sh
pass otp work/example
pass otp -c work/example
```

`pass otp uri work/example` prints the stored `otpauth://` URI.

## Also see

- [pass homepage](https://www.passwordstore.org)
- [pass man page](https://git.zx2c4.com/password-store/about/)
- [pass-otp](https://github.com/tadfisher/pass-otp)
<!-- {: .-also-see} -->
