---
title: Ledger periods
subtitle: Period expression syntax
logo: { set: icon-park-outline, name: timeline }
category: Plain-text accounting
last_verified_with: "Ledger 3.4.1."
updated: 2026-11-25
tier: t3
links:
  - title: Period expressions
    url: https://ledger-cli.org/doc/ledger3.html#Period-Expressions
intro: |
  Ledger's [period expressions](https://ledger-cli.org/doc/ledger3.html#Period-Expressions) select date ranges for reports. This sheet covers intervals, begin and end dates, and worked examples.
---

### Usage

```
[INTERVAL] [BEGIN] [END]
```
<!-- {: data-highlight="INTERVAL; BEGIN; END"} -->

#### Intervals

```
every day
every week
every month
every quarter
every year
every N days     # N is any integer
every N weeks
every N months
every N quarters
every N years
daily
weekly
biweekly
monthly
bimonthly
quarterly
yearly
```

#### Begin

```
from <SPEC>
since <SPEC>
```
<!-- {: data-highlight="from; since"} -->

#### End

```
to <SPEC>
until <SPEC>
```
<!-- {: data-highlight="to; until"} -->

See: [Period expressions](https://ledger-cli.org/doc/ledger3.html#Period-Expressions)

### Spec

```
2004
2004/10
2004/10/1
10/1
october
oct
this week  # or day, month, quarter, year
next week
last week
```
<!-- {: data-highlight="this week; next week; last week"} -->

See: [Period expressions](https://ledger-cli.org/doc/ledger3.html#Period-Expressions)

### Examples

```sh
$ ledger r -p "since last month"
```
<!-- {: data-highlight="since last month"} -->

See: [Period expressions](https://ledger-cli.org/doc/ledger3.html#Period-Expressions)
