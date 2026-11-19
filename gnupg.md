---
title: GnuPG
subtitle: OpenPGP encryption suite
category: CLI
tags: []
updated: 2017-10-22
weight: 0
intro: |
  [GnuPG](https://gnupg.org/) is a complete and free implementation of the OpenPGP standard.
links:
  - title: GnuPG
    url: https://gnupg.org/
---

Basics
---------------

### Exporting keys

```bash
gpg -o key.gpg --export <KEY ID>
```

```bash
gpg -o key.asc --armor --export <KEY ID>
```

__Export key in ASCII:__

__Note:__ Omitting the `-o|--output` option will print the key to `stdout`.

### Importing keys

```bash
gpg --import key.gpg
gpg --import key.asc
```

```bash
gpg --import key.asc --import-options merge-only
```

Only merge updates for keys already in key-ring:

### Managing your keyring

```bash
# Generate a new key
gpg --gen-key
# or, generate a new key with dialogs for all options
gpg --full-gen-key
```

```bash
gpg -k
gpg --list-keys
```

```bash
gpg -K
gpg --list-secret-keys
```

List public keys:

List secret keys:


### Using a keyserver

```bash
# Import keys from keyserver
gpg --receive-keys <KEY IDS>
```

```bash
gpg --send-keys <KEY IDS>
```

```bash
gpg --refresh-keys
```

```bash
gpg --search-keys "<SEARCH STRING>"
```

```bash
gpg --keyserver <URL> ...
```

Upload keys to keyserver:

Request updates from keyserver for keys already in your keyring:

Search keys from keyserver:

Override keyserver from `~/.gnupg/gpg.conf`

### Trusting a key

```bash
gpg --edit-key <KEY ID>
# In the interactive prompt:
gpg> trust
gpg> save
```

__NOTE:__ You can use the owner's email or name (or part thereof) instead of the key ID for `--edit-key`


Encrypting
---------

<!-- {: .-two-column} -->

### Public key encryption
```bash
# Produces secret.txt.gpg, decryptable only by the recipient
gpg -e -o secret.txt.gpg -r <RECIPIENT> secret.txt
```

```bash
gpg -e -r <KEY ID> ...
gpg -e -r "Bez" ...
gpg -e -r "bezalelhermoso@gmail.com" ...
```

```bash
gpg -e -r <RECIPIENT> -r <ANOTHER RECIPIENT> ... secret.txt
```

For `<RECIPIENT>` you can use their key ID, their email, or their name (or part thereof).

Specifying multiple recipients

__NOTE__: Omitting `-o|--output` will produce an encrypted file named `<ORIGINAL FILENAME>.gpg` by default.

### Symmetric encryption

```bash
gpg --symmetric secret.txt
# or
gpg -c secret.txt
```

Encrypt file using a shared key. You will be prompted for a passphrase.

Decrypting
---------

<!-- {: .-one-column} -->

### Decrypting a file

```bash
gpg -d -o secret.txt secret.txt.gpg
```

If the file is encrypted via symmetric encryption, you will be prompted for the passphrase.

__NOTE__: Omitting `-o|--output` will print the unencrypted contents to `stdout`

Signing & Verifying
---------

<!-- {: .-two-column} -->

### Signing

```bash
gpg -o signed-file.txt.gpg -s file.txt
```

```bash
gpg -s -o secret.txt.gpg \
  -r <RECIPIENT> secret.txt
```

This can be used during encryption to also sign encrypted files:

### Verifying a signature

```bash
gpg --verify file.txt.gpg
```

### Viewing content of signed file

```bash
gpg -d signed-file.txt.gpg
```

Miscellaneous
----------

<!-- {: .-two-column} -->

### Components

```bash
# List all components
gpgconf --list-components
```

```bash
gpgconf --kill <COMPONENT> # i.e. gpgconf --kill dirmngr
```

```bash
gpgconf --kill all
```

Kill a component:

Kill all components:

### Parsing keyring data

```bash
gpg -k --with-colons
```

#### Field quick reference

| Field # | Description |
| --- | --- |
| 1       | Record type |
| 2       | Validity |
| 3       | Key length in bits |
| --- | --- |
| 4       | Public key algorithm |
| 5       | Key ID |
| 6       | Creation date |
| 7       | Expiry date |
| 8       | Certificate S/N, UID hash, trust signature info |
| 9       | Ownertrust |
| --- | --- |
| 10      | User ID |
| 11      | Signature class |
| 12      | Key capabilities |
| 13      | Issuer fingerprint |
| 14      | Flag field |
| --- | --- |
| 15      | S/N of token |
| 16      | Hash algorithm |
| 17      | Curve name |
| 18      | Compliance flags |
| 19      | Last update timestamp |
| 20      | Origin |

Use `--with-colons` to produce an output that can easily be parsed i.e. with `awk`, `grep`. Fields are colon-separated.

See [GnuPG Details](https://git.gnupg.org/cgi-bin/gitweb.cgi?p=gnupg.git;a=blob_plain;f=doc/DETAILS) for more details.


