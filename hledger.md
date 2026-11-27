---
title: Hledger
subtitle: Ledger-compatible accounting tool
logo: { set: icon-park-outline, name: book }
category: Plain-text accounting
updated: 2026-11-25
tier: t3
last_verified_with: "hledger 1.52.4."
intro: |
  [hledger](https://hledger.org) is a plain-text double-entry accounting tool. This sheet covers reports, queries, periods, display formats, and commands.
links:
  - title: hledger
    url: https://hledger.org
  - title: hledger quickstart
    url: https://hledger.org/quickstart.html
---

## Reporting

### Standard reports

```
hledger bal {query}
hledger reg {query}
```
<!-- {: data-highlight="hledger bal; hledger reg"} -->

See: [hledger commands](https://hledger.org/hledger.html#commands)

### Examples

#### Current balance

```
# Current balance
hledger bal Assets
hledger balancesheet

hledger balancesheet Assets \
  [--cleared --cost --empty -e tomorrow]  # drop future/empty
```
<!-- {: data-highlight="hledger bal Assets"} -->

#### Monthly changes

```text
# Monthly changes in assets
hledger bal Assets Liabilities --monthly --tree --historical \
  [--cleared --cost --empty -e tomorrow]
```
<!-- {: data-highlight="--monthly --tree"} -->

#### Weekly expenses

```text
# Weekly expenses
hledger bal Expenses --weekly --average --tree -b 'last month' \
  [--cleared --cost --empty -e tomorrow]
```
<!-- {: data-highlight="--weekly --average"} -->

The bracketed options drop future-dated and empty accounts and convert foreign currencies.

See: [Examples](https://hledger.org/hledger.html#examples)

## Query

### Queries

```
Assets           # An account (regex)
acct:Assets      # same
^Assets          # Starting with Assets (eg, not 'Expenses:Assets')

acctonly:A       # no subaccounts

amt:2000         # amount (in absolute value)
amt:<200         # amount comparison (in absolute value)
amt:<+200        # amount comparison
                 # also: <=, >, >=

desc:REGEX       # description
code:REGEX       # transaction code (check number?)
tag:REGEX
cur:'\$'

real:            # real posts
real:0           # virtual posts

depth:N          # --depth 2
not:...          # eg, not:status:!
```
<!-- {: data-highlight="acct:; amt:; desc:"} -->

Queries work on all commands (`bal`, `reg`, etc).

See: [Queries](https://hledger.org/hledger.html#queries)

### Filter by status/type

```
real:1           # -R, --real, no virtuals
status:!         #     --pending
status:*         # -C, --cleared
status:          #     --uncleared
```
<!-- {: data-highlight="status:; real:1"} -->

See: [status: query](https://hledger.org/hledger.html#status-query)

### Periods

```
date:2015/01/01
date:2015/01/01-    # -b, --begin
date:-2015/01/01    # -e, --end
date2:PERIODEXPR
```
<!-- {: data-highlight="date:2015/01/01"} -->

#### Period expressions
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
<!-- {: data-highlight="--period"} -->

See: [Period expressions](https://hledger.org/hledger.html#period-expressions)

### Intervals

```
-D, --daily
-W, --weekly
-M, --monthly
-Q, --quarterly
-Y, --yearly
```
<!-- {: data-highlight="--daily; --weekly; --monthly; --quarterly"} -->

Works on all commands (`bal`, `reg`, etc) and shows multi-column output by default. `ledger-cli` supports intervals only on `reg`. `-p` accepts the same periods.

See: [Report intervals](https://hledger.org/hledger.html#report-intervals)

### Smart dates

#### Dates
```
-p 2015/01/01
-p 2015/01
-p 2015
-p january
-p jan
-p 05/25
```
<!-- {: data-highlight="2015/01/01"} -->

#### Relative days
```
-b today
-b yesterday
-e tomorrow
```
<!-- {: data-highlight="today; yesterday; tomorrow"} -->

#### Relative periods
```
-p this week
-p last month
-p this year
```
<!-- {: data-highlight="this week; last month; this year"} -->

These work with `--period`, `--begin` and `--end` (`-p`, `-b`, `-e`).

See: [Smart dates](https://hledger.org/hledger.html#smart-dates)

## Options

### Display formats

```
    --tree          # only in bal
    --flat

    --depth 2       # collapse those under this depth
    --drop 1        # drop top-level accounts
-B, --cost          # convert to default currency
-E, --empty         # don't strip out $0 accounts
    --date2         # use date2 when available
```
<!-- {: data-highlight="--tree; --flat; --depth 2; --drop 1"} -->

See: [balance report](https://hledger.org/hledger.html#balance)

### Multi-column mode

#### Row totals
```
-T, --row-total
-N, --no-total
```
<!-- {: data-highlight="--row-total; --no-total"} -->

#### Balance-only options

```
    --cumulative    # show ending balance per period
-I, --historical    # like --cumulative but only for --begin
-A, --average
```
<!-- {: data-highlight="--cumulative; --historical; --average"} -->

Use these with intervals such as `--weekly`.

See: [Multi-period balance report](https://hledger.org/hledger.html#multi-period-balance-report)

## Commands

### Accounts

```
hledger accounts [--tree]
```
<!-- {: data-highlight="hledger accounts"} -->

See: [accounts](https://hledger.org/hledger.html#accounts)

### Other commands

```
hledger balancesheet       # bs
hledger incomestatement    # is
hledger cashflow           # cf
hledger print
hledger activity
hledger stats
```
<!-- {: data-highlight="balancesheet; incomestatement; cashflow"} -->

See: [Standard report commands](https://hledger.org/hledger.html#standard-report-commands)

## See also

* <https://hledger.org/hledger.html>
* <http://ledger-cli.org/3.0/doc/ledger3.html>
