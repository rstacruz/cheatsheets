---
title: Ledger periods
category: Ledger
---

### About
{: .-intro}

- <https://ledger-cli.org/3.0/doc/ledger3.html#Period-Expressions>

### Usage

    [INTERVAL] [BEGIN] [END]

#### Intervals

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

#### Begin

    from <SPEC>
    since <SPEC>

#### End

    to <SPEC>
    until <SPEC>

### Spec

    2004
    2004/10
    2004/10/1
    10/1
    october
    oct
    this week  # or day, month, quarter, year
    next week
    last week

### Examples

    $ ledger r -p "since last month"
