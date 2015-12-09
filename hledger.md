---
title: Hledger
category: Ledger
---

## Reporting

```
hledger {bal|reg} {interval} {period} {query}
```

## Query
Used on all commands (`bal`, `reg`, etc).

```
Assets           # An account (regex)
acct:Assets      # same
^Assets          # Starting with Assets (eg, not 'Expenses:Assets')
inacct:'A:B'     # transactions related to account

acctonly:A       # no subaccounts
inacctonly:A     # same, but no subaccounts
```

### Amounts

```
amt:2000         # amount (in absolute value)
amt:<200         # amount comparison (in absolute value)
amt:<+200        # amount comparison
                 # also: <=, >, >=
```

### Other queries

```
desc:REGEX
code:REGEX
tag:REGEX
cur:'\$'
```

```
depth:N          # --depth 2
not:...          # eg, not:status:!
```

### Filter by status/type

```
real:1           # -R, --real, no virtuals
status:!         #     --pending
status:*         # -C, --cleared
status:          #     --uncleared
```

### Intervals
Used on all commands (`bal`, `reg`, etc). Displays in multi-column mode. In `ledger-cli`, only `reg` is supported. Can also specified via `-p` (period).

```
-D, --daily
-W, --weekly
-M, --monthly
-Q, --quarterly
-Y, --yearly
```

### Periods

```
date:2015/01/01
date:2015/01/01-    # -b, --begin
date:-2015/01/01    # -e, --end
date2:PERIODEXPR
```

```
-p, --period=...
  -p "2009/01/01"
  -p "2009/01/01 to 2009/12/31"
  -p "2009/01/01to2009/12/31"      # spaces optional
  -p "1/1 to 12/31"
  -p "to 2009"
  -p "weekly"
  -p "weekly 2009/01/01 to 2009/12/31"
```

## Display formats

```
    --tree          # only in bal
    --flat

    --depth 2       # collapse those under this depth
    --drop 1        # drop top-level accounts
-B, --cost          # convert to default currency
-E, --empty         # don't strip out $0 accounts
    --date2         # use date2 when available
```

## Multi-column mode
When used with intervals (like `--weekly`):

```
-T, --row-total
-N, --no-total
```

Also: (only in `bal`)

```
    --cumulative    # show ending balance per period
-I, --historical    # like --cumulative but only for --begin
-A, --average
```


## Accounts

```
hledger accounts [--tree]
```

## See also

* <http://hledger.org/manual.html>
* <http://ledger-cli.org/3.0/doc/ledger3.html>
