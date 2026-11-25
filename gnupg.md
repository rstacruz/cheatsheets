---
title: GnuPG
subtitle: OpenPGP encryption suite
category: CLI
tags: []
updated: 2026-11-25
tier: t3
last_verified_with: "GnuPG 2.5.24."
weight: 0
intro: |
  [GnuPG](https://gnupg.org/) is a complete and free implementation of the OpenPGP standard.
links:
  - title: GnuPG
    url: https://gnupg.org/
---

## Basics

### Exporting keys

```bash
gpg -o key.gpg --export <KEY ID>
```
<!-- {: data-highlight="--export"} -->

#### Export in ASCII

```bash
gpg -o key.asc --armor --export <KEY ID>
```
<!-- {: data-highlight="--armor"} -->

Omit `-o` to print the key to `stdout`.

See: [Export keys](https://gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#index-export)

### Importing keys

```bash
gpg --import key.gpg
gpg --import key.asc
```
<!-- {: data-highlight="--import"} -->

#### Merge only

```bash
gpg --import key.asc --import-options merge-only
```
<!-- {: data-highlight="--import-options merge-only"} -->

See: [Import keys](https://gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#index-import)

### Managing your keyring

#### Generate a key

```bash
gpg --gen-key
# or, generate a new key with dialogs for all options
gpg --full-gen-key
```
<!-- {: data-highlight="--gen-key; --full-gen-key"} -->

#### List public keys

```bash
gpg -k
gpg --list-keys
```
<!-- {: data-highlight="--list-keys"} -->

#### List secret keys

```bash
gpg -K
gpg --list-secret-keys
```
<!-- {: data-highlight="--list-secret-keys"} -->

See: [Key management](https://gnupg.org/documentation/manuals/gnupg/OpenPGP-Key-Management.html)


### Using a keyserver

#### Import

```bash
gpg --receive-keys <KEY IDS>
```
<!-- {: data-highlight="--receive-keys"} -->

#### Upload

```bash
gpg --send-keys <KEY IDS>
```
<!-- {: data-highlight="--send-keys"} -->

#### Refresh

```bash
gpg --refresh-keys
```
<!-- {: data-highlight="--refresh-keys"} -->

#### Search

```bash
gpg --search-keys "<SEARCH STRING>"
```
<!-- {: data-highlight="--search-keys"} -->

#### Override server

```bash
gpg --keyserver <URL> ...
```
<!-- {: data-highlight="--keyserver"} -->

See: [Keyserver commands](https://gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#index-receive_002dkeys)

### Trusting a key

```bash
gpg --edit-key <KEY ID>
# In the interactive prompt:
gpg> trust
gpg> save
```
<!-- {: data-highlight="--edit-key; trust"} -->

__NOTE:__ You can use the owner's email or name (or part thereof) instead of the key ID for `--edit-key`

See: [Trust in `--edit-key`](https://gnupg.org/documentation/manuals/gnupg/OpenPGP-Key-Management.html#index-keyedit_003atrust)


## Encrypting and decrypting

<!-- {: .-two-column} -->

### Public key encryption
This will produce an encrypted file, `secret.txt.gpg`, that can only be decrypted by the recipient:

```bash
gpg -e -o secret.txt.gpg -r <RECIPIENT> secret.txt
```
<!-- {: data-highlight="-e"} -->

#### Recipient forms

```bash
gpg -e -r <KEY ID> ...
gpg -e -r "Bez" ...
gpg -e -r "bezalelhermoso@gmail.com" ...
```
<!-- {: data-highlight="-r"} -->

#### Multiple recipients

```bash
gpg -e -r <RECIPIENT> -r <ANOTHER RECIPIENT> ... secret.txt
```

Omit `-o` to get `<ORIGINAL FILENAME>.gpg`.

See: [Encrypt files](https://gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#index-encrypt)

### Symmetric encryption

Encrypt file using a shared key. You will be prompted for a passphrase.

```bash
gpg --symmetric secret.txt
# or
gpg -c secret.txt
```
<!-- {: data-highlight="--symmetric; -c"} -->

See: [Symmetric encryption](https://gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#index-symmetric)


### Decrypting a file

```bash
gpg -d -o secret.txt secret.txt.gpg
```
<!-- {: data-highlight="-o secret.txt"} -->

Symmetric files prompt for a passphrase; omit `-o` to print to `stdout`.

See: [Decrypt files](https://gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#index-decrypt)

## Signing & verifying
<!-- {: .-two-column} -->

### Signing

```bash
gpg -o signed-file.txt.gpg -s file.txt
```
<!-- {: data-highlight="-s"} -->

#### Sign and encrypt

```bash
gpg -s -o secret.txt.gpg \
  -r <RECIPIENT> secret.txt
```

See: [Sign files](https://gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#index-sign)

### Verifying a signature

```bash
gpg --verify file.txt.gpg
```
<!-- {: data-highlight="--verify"} -->

See: [Verify signatures](https://gnupg.org/documentation/manuals/gnupg/Operational-GPG-Commands.html#index-verify)

### Viewing content of signed file

```bash
gpg -d signed-file.txt.gpg
```
<!-- {: data-highlight="-d"} -->

See: [GPG examples](https://gnupg.org/documentation/manuals/gnupg/GPG-Examples.html)

## Miscellaneous
<!-- {: .-two-column} -->

### Components

#### List components

```bash
gpgconf --list-components
```
<!-- {: data-highlight="--list-components"} -->

#### Kill a component

```bash
gpgconf --kill <COMPONENT> # i.e. gpgconf --kill dirmngr
```
<!-- {: data-highlight="--kill <COMPONENT>"} -->

#### Kill all

```bash
gpgconf --kill all
```
<!-- {: data-highlight="--kill all"} -->

See: [Listing components](https://gnupg.org/documentation/manuals/gnupg/Listing-components.html#Listing-components)

### Parsing keyring data

`--with-colons` emits colon-separated fields for tools like `awk` and `grep`.

```bash
gpg -k --with-colons
```
<!-- {: data-highlight="--with-colons"} -->

Field Quick Reference:

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

See: [GnuPG Details](https://git.gnupg.org/cgi-bin/gitweb.cgi?p=gnupg.git;a=blob_plain;f=doc/DETAILS)


