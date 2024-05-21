---
title: Ledger format
category: Ledger
---

### Example
```
2015/01/01 Pay rent
  Assets:Savings     -$300
  Expenses:Rent
```

### First line

```
2015/01/01 *       Pay rent       ; tagname:
^          ^       ^
Date       Flag    Description    ^ comment/tag
```

### Balance assertion

```
2015/01/01 Pay rent
  Assets:Savings     -$300 = $1200  ; assert there's $1200 left after
  Expenses:Rent
```
Flags:

```
* cleared
! pending
```

## Accounts

### Accounts

Only relevant with `--strict` or `--pedantic`

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

## Others

### Others

```
D $1,000.00     ; set default commodity

alias Cash = Assets:Cash

Y2015           ; set default year (you can use 01/25 as date after)
```

### Prefix all transactions with an account

```
account Home
include home.journal
end
```
