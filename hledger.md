---
title: Hledger
category: Ledger
---

### Accounts

```
hledger accounts
hledger accounts --tree
```

## Reporting

```
hledger {bal|reg} {interval} {range} {query}
```

### Query

```
Assets           ; An account
^Assets          ; Starting with Assets
acct:Assets      ; account by regex
inacct:'A:B'     ; transactions related to account

acctonly:A       ; no subaccounts
inacctonly:A     ; same, but no subaccounts

amt:2000         ; amount (in absolute value)
amt:<200         ; amount comparison (in absolute value)
amt:<+200        ; amount comparison
                 ; also: <=, >, >=

desc:REGEX

code:REGEX
cur:'\$'
depth:N          ; --depth 2
tag:REGEX
not:...
```

```
real:1           ; -R, --real, no virtuals
status:!         ;     --pending
status:*         ; -C, --cleared
status:          ;     --uncleared
```

### Intervals

```
-D, --daily
-W, --weekly
-M, --monthly
-Q, --quarterly
-Y, --yearly
```

### Range

```
-p, --period=...
date:2015/01/01
date:2015/01/01-    ; -b, --begin
date:-2015/01/01    ; -e, --end
date2:PERIODEXPR
```

### Periods

```
  -p, --period=...

  -p "2009/01/01"
  -p "2009/01/01 to 2009/12/31"
  -p "2009/01/01to2009/12/31"      ; spaces optional
  -p "1/1 to 12/31"
  -p "to 2009"
  -p "weekly"
  -p "weekly 2009/01/01 to 2009/12/31"
```

## Balance

When used with intervals (like `--weekly`):
```
--cumulative    # show ending balance per period
--historical    # like --cumulative but only for --begin
```

```
--tree
```

### Format

```
--format "%20(account) %12(total)
```

## Register


## Querying

```
acct:REGEX
amt:N
amt:<N   (and <=, >, >=)
code:REGEX
cur:'\$'
desc:REGEX
date:PERIODEXPR
date2:PERIODEXPR
depth:N
tag:REGEX
not:
```
