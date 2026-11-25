---
title: Ledger format
subtitle: Plain-text accounting format
category: Plain-text accounting
last_verified_with: "Ledger 3.4.1."
updated: 2026-11-25
tier: t3
---

### Example

```
2015/01/01 Pay rent
  Assets:Savings     -$300
  Expenses:Rent
```
<!-- {: data-highlight="Assets:Savings; Expenses:Rent"} -->

See: [Journal format](https://ledger-cli.org/doc/ledger3.html#Journal-Format)

### First line

```
2015/01/01 *       Pay rent       ; tagname:
^          ^       ^
Date       Flag    Description    ^ comment/tag
```
<!-- {: data-highlight="Date; Flag; Description"} -->

See: [Journal format](https://ledger-cli.org/doc/ledger3.html#Journal-Format)

### Balance assertion

```
2015/01/01 Pay rent
  Assets:Savings     -$300 = $1200  ; assert there's $1200 left after
  Expenses:Rent
```
<!-- {: data-highlight="= $1200"} -->

#### Flags

```
* cleared
! pending
```
<!-- {: data-highlight="* cleared; ! pending"} -->

See: [Balance assertions](https://ledger-cli.org/doc/ledger3.html#Balance-assertions)

### Accounts

```
account Expenses:Food
    note This account is all about the chicken!
    alias food
    payee ^(KFC|Popeyes)$
    check commodity == "$"
    assert commodity == "$"
    eval print("Hello!")
    default
```
<!-- {: data-highlight="note; alias; payee; assert"} -->

These directives matter only with `--strict` or `--pedantic`.

See: [Accounts](https://ledger-cli.org/doc/ledger3.html#accounts)

## Others

### Others

```
D $1,000.00     ; set default commodity

alias Cash = Assets:Cash

Y2015           ; set default year (you can use 01/25 as date after)
```
<!-- {: data-highlight="D $1,000.00; alias Cash; Y2015"} -->

See: [Commodities and currencies](https://ledger-cli.org/doc/ledger3.html#Commodities-and-Currencies)

### Prefix all transactions with an account

```
account Home
include home.journal
end
```
<!-- {: data-highlight="account Home; include home.journal; end"} -->

See: [Journal format](https://ledger-cli.org/doc/ledger3.html#Journal-Format)
