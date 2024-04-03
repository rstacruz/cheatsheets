---
title: Hledger
category: Ledger
---

### About
{: .-intro}

- <https://hledger.org>
- <https://hledger.org/quickstart.html>

### Reporting

```
hledger bal {query}
hledger reg {query}
```

## Query

### Queries

Queries are used on all commands (`bal`, `reg`, etc). [(docs)](http://hledger.org/manual.html#queries)

```
Assets           # An account (regex)
acct:Assets      # same
^Assets          # Starting with Assets (eg, not 'Expenses:Assets')

acctonly:A       # no subaccounts

amt:2000         # amount (in absolute value)
amt:<200         # amount comparison (in absolute value)
amt:<+200        # amount comparison
                 # also: <=, >, >=

desc:REGEX      # description
code:REGEX      # transaction code (check number?)
tag:REGEX
cur:'\$'

real:            # real posts
real:0           # virtual posts

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

### Periods
For dates and intervals (see above).

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
  -p "weekly"                      # -W, --weekly
  -p "weekly 2009/01/01 to 2009/12/31"
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

### Smart dates
Used for `--period`, `--begin` and `--end` (`-p` `-b` `-e`).

```
-p 2015/01/01
-p 2015/01
-p 2015
-p january
-p jan
-p 05/25
```

```
-b today
-b yesterday
-e tomorrow
```

```
-p this week
-p last month
-p this year
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

## Other commands

```
hledger balancesheet       # bs
hledger incomestatement    # is
hledger cashflow           # cf
hledger print
hledger activity
hledger stats
```

## Examples

```
# Current balance
  hledger bal Assets
  hledger balancesheet

  hledger balancesheet Assets [--cleared --cost --empty -e tomorrow]
  # ...discard future stuff; convert foreign currencies

# Monthly changes in assets
  hledger bal Assets Liabilities --monthly --tree --historical [--cleared --cost --empty -e tomorrow]

# Weekly expenses
  hledger bal Expenses --weekly --average --tree -b 'last month' [--cleared --cost --empty -e tomorrow]
```

## See also

* <http://hledger.org/manual.html>
* <http://ledger-cli.org/3.0/doc/ledger3.html>
