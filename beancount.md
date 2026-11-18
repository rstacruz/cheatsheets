---
title: Beancount
subtitle: Plain-text double-entry accounting
category: Plain-text accounting
tier: t1
fragments:
  - "Assets:Cash"
  - "Liabilities:Card"
  - "Expenses:Food"
  - "Expenses:Travel"
  - "txn"
  - "open"
  - "balance"
  - "price"
  - "pad"
  - "commodity"
  - "close"
  - "bean-check"
  - "bean-format"
  - "fava"
updated: 2026-11-16
keywords:
  - beancount
  - bean-check
  - bean-query
  - fava
intro: |
  [Beancount](https://beancount.github.io/docs/) is double-entry bookkeeping
  for plain-text files. This reference covers the syntax, everyday directives,
  the CLI, and Fava.
links:
  - title: Beancount documentation
    url: https://beancount.github.io/docs/
  - title: Language syntax
    url: https://beancount.github.io/docs/beancount_language_syntax/
  - title: Syntax cheat sheet
    url: https://beancount.github.io/docs/beancount_cheat_sheet/
  - title: Fava documentation
    url: https://beancount.github.io/fava/
---

## Getting started

### Install

```bash
pipx install beancount    # bean-check, bean-format
pipx install beanquery    # bean-query
pipx install fava         # web UI
```

Version 3 splits the tools across three packages; Fava replaces the old
`bean-web`.

See: [Installing Beancount](https://beancount.github.io/docs/installing_beancount/)

### Your first ledger

#### ledger.beancount

```
option "title" "Personal"
option "operating_currency" "USD"

2024-01-01 open Assets:Bank:Checking  USD
2024-01-01 open Expenses:Food         USD
2024-01-01 open Equity:Opening-Balances

2024-01-02 * "Opening balance"
  Assets:Bank:Checking   1000.00 USD
  Equity:Opening-Balances

2024-01-05 * "Cafe Mogador" "Lunch"
  Expenses:Food            42.10 USD
  Assets:Bank:Checking
```

#### Check it

```bash
bean-check ledger.beancount    # silent when valid
```

Entries are sorted by date, so the order in the file does not matter.

See: [Getting started](https://beancount.github.io/docs/getting_started_with_beancount/)

## Accounts

### Naming

| Root | Holds |
| --- | --- |
| `Assets` | What you own |
| `Liabilities` | What you owe |
| `Equity` | Net worth, opening balances |
| `Income` | Money earned |
| `Expenses` | Money spent |

Components are `:`-separated and start with a capital letter or digit;
letters, digits and dashes may follow. Commodities are all-caps, like `USD`.

See: [Accounts](https://beancount.github.io/docs/beancount_language_syntax/#accounts)

### Open and close

```
2024-01-01 open Assets:Bank:Checking     USD
2024-01-01 open Assets:Broker:HOOL       HOOL,USD
2024-01-01 open Assets:Cash                     ; any currency
2025-01-01 close Assets:Cash
```

The currency list constrains what an account may hold. A posting before `open`
or after `close` is an error; `close` takes no currency.

See: [Open](https://beancount.github.io/docs/beancount_language_syntax/#open)

### Commodities

```
2024-01-01 commodity USD
  name: "US Dollar"
  asset-class: "cash"
```

Declaring a commodity is optional; using it is enough. The directive attaches
metadata that plugins and reports read.

See: [Commodity](https://beancount.github.io/docs/beancount_language_syntax/#commodity)

## Transactions

### Payee and narration

```
2024-01-05 * "Cafe Mogador" "Lamb tagine"
  Expenses:Food            37.45 USD
  Assets:Bank:Checking

2024-01-06 * "Cafe Mogador" ""
  Expenses:Food            12.00 USD
  Assets:Bank:Checking

2024-01-07 * "Narration only"
  Expenses:Food             5.00 USD
  Assets:Bank:Checking
```

Two strings are payee then narration; one string is just the narration. An
empty narration keeps a payee without a description.

See: [Payee & narration](https://beancount.github.io/docs/beancount_language_syntax/#payee-narration)

### Flags, tags, links

```
2024-01-05 * "Flight to Berlin" #berlin ^invoice-42
  Liabilities:Card        -1230.27 USD
  Expenses:Travel

2024-01-06 ! "Needs review"
  Assets:Cash               -12.00 USD
  Expenses:Food

pushtag #berlin
2024-01-07 * "Hotel"
  Liabilities:Card         -200.00 USD
  Expenses:Travel
poptag #berlin
```

`*` is settled and `!` needs review; `txn` is the spelled-out form of `*`.
`pushtag`/`poptag` apply a tag to every transaction between them.

See: [Tags](https://beancount.github.io/docs/beancount_language_syntax/#tags)

### Postings

```
2024-01-05 * "Cafe Mogador" "Lunch"
  Liabilities:Card        -37.45 USD
  Expenses:Food                      ; 37.45 USD

2024-01-06 * "Groceries"
  Assets:Bank:Checking    -61.20 USD
  Expenses:Food            61.20 USD
```

At most one posting per currency may omit its amount; Beancount fills it in so
the weights sum to zero.

See: [Amount interpolation](https://beancount.github.io/docs/beancount_language_syntax/#amount-interpolation)

## Balances

### Assertions

```
2024-02-01 balance Assets:Bank:Checking   1000.00 USD
2024-02-01 balance Assets:Cash             210.00 CAD
```

The check runs at the start of the date, one commodity at a time, and includes
child accounts and every lot.

See: [Balance assertions](https://beancount.github.io/docs/beancount_language_syntax/#balance-assertions)

### Tolerance

```
2024-02-01 balance Assets:Bank:Checking   1000.00 ~ 0.01 USD
2024-02-01 balance Assets:Funds            319.020 ~ 0.002 RGAGX
```

An assertion tolerates one unit in its last digit, so `319.020` accepts
`319.019` to `319.021`. `~` overrides that for one line.

See: [Explicit tolerances](https://beancount.github.io/docs/precision_tolerances/)

### Pad

```
2024-01-02 pad Assets:Bank:Checking Equity:Opening-Balances
2024-01-03 balance Assets:Bank:Checking   1000.00 USD
```

If the next assertion needs more units, Beancount inserts a `P` transaction for
the difference against the second account.

See: [Pad](https://beancount.github.io/docs/beancount_language_syntax/#pad)

## Costs and prices

### Prices

```
2024-03-02 price HOOL   200.00 USD
2024-03-02 price USD    1.35 CAD

2024-03-03 * "Spend in Canada"
  Liabilities:Card        -40.00 USD @ 1.35 CAD
  Assets:CAD               54.00 CAD

2024-03-04 * "Transfer"
  Assets:Bank:Checking   -100.00 USD @@ 135.00 CAD
  Assets:CAD              135.00 CAD
```

`@` is a per-unit price and `@@` is the total. A price on a posting sets its
weight when it has no cost.

See: [Prices](https://beancount.github.io/docs/beancount_language_syntax/#prices)

### Cost basis and lots

#### Per-unit cost

```
2024-02-05 * "Buy shares"
  Assets:Broker:HOOL      10 HOOL {183.07 USD}
  Assets:Bank:Checking

2024-03-01 * "Sell at a gain"
  Assets:Broker:HOOL     -10 HOOL {183.07 USD} @ 197.90 USD
  Assets:Bank:Checking   1979.00 USD
  Income:CapitalGains
```

#### Total cost

```
2024-02-05 * "Buy shares"
  Assets:Broker:HOOL      10 HOOL {{1830.70 USD}}
  Assets:Bank:Checking
```

#### Labelled lot

```
2024-02-05 * "Buy shares"
  Assets:Broker:HOOL       5 HOOL {183.07 USD, "lot-a"}
  Assets:Bank:Checking

2024-03-01 * "Sell that lot"
  Assets:Broker:HOOL      -5 HOOL {183.07 USD, "lot-a"}
  Assets:Bank:Checking
```

Braces hold the cost basis. A reduction must match one lot: name its cost, its
date or its label, or write `{}` when only one lot fits. `open` selects the
booking method, `STRICT` by default.

See: [How inventories work](https://beancount.github.io/docs/how_inventories_work/)

## Other directives

### Notes and documents

```
2024-03-02 note Assets:Bank:Checking "Called about the wire"
2024-03-02 document Assets:Bank:Checking "stmts/2024-03.pdf"
```

Both appear in the account's journal. `document` points at a file that must
exist on disk.

See: [Notes](https://beancount.github.io/docs/beancount_language_syntax/#notes)

### Events, queries, custom

```
2024-03-02 event "location" "Paris, France"
2024-03-02 query "food" "SELECT account, sum(position)"
2024-03-02 custom "budget" "Expenses:Food" TRUE 500.00 USD
```

`event` records a value over time, `query` saves a BQL statement, and `custom`
carries directives that plugins define.

See: [Events](https://beancount.github.io/docs/beancount_language_syntax/#events)

### Metadata

```
2024-02-05 * "Buy shares"
  statement: "confirm-123.pdf"
  Assets:Broker:HOOL      10 HOOL {183.07 USD}
    decision: "scheduled"
  Assets:Bank:Checking
```

Indented `key: value` lines attach to the directive, or to a posting when
indented further. Keys start lowercase; values may be dates, accounts, tags,
numbers or strings.

See: [Metadata](https://beancount.github.io/docs/beancount_language_syntax/#metadata)

## Configuration

### Includes

```
include "accounts.beancount"
include "transactions/2024.beancount"
```

Paths are relative to the including file. Everything is merged before sorting
by date, so the include order does not matter.

See: [Includes](https://beancount.github.io/docs/beancount_language_syntax/#includes)

### Options

```
option "title" "Personal Ledger"
option "operating_currency" "USD"
option "documents" "/home/me/statements"
```

`documents` scans a directory of `<Account>/<YYYY-MM-DD>.*` files and adds a
`document` entry for each hit. `operating_currency` only affects reports, and
may be repeated.

See: [Options reference](https://beancount.github.io/docs/beancount_options_reference/)

## Command line

### bean-check

```bash
bean-check ledger.beancount    # silent when valid
```

Parses the file, runs plugins and verifies assertions. Errors print as
`file:line: message`.

See: [bean-check](https://beancount.github.io/docs/running_beancount_and_generating_reports/#bean-check)

### bean-format

```bash
bean-format -i ledger.beancount    # align amounts in place
```

Aligns posting amounts into one column. It works on lines, not on parsed
entries, so it never reports ledger errors.

See: [bean-format](https://beancount.github.io/docs/running_beancount_and_generating_reports/#bean-format)

### bean-report

```bash
bean-report ledger.beancount balances
bean-report ledger.beancount print
```

Beancount 2 shipped `bean-report`; version 3 dropped it. Use `bean-query` or
Fava for the same reports.

See: [Running Beancount](https://beancount.github.io/docs/running_beancount_and_generating_reports/)

### Fava

```bash
fava ledger.beancount    # http://localhost:5000
```

Fava is the web UI: journal, balance sheet, income statement, documents, and a
BQL editor.

See: [Fava](https://beancount.github.io/fava/)

## Query language

### bean-query

```bash
bean-query ledger.beancount
bean-query ledger.beancount 'BALANCES AT COST'
```

With no query it opens a shell. `-f csv` writes CSV and `-q` hides load errors.

See: [Beancount Query Language](https://beancount.github.io/docs/beancount_query_language/)

### SELECT and WHERE

#### Posting filter

```sql
SELECT date, payee, position
WHERE account ~ "Expenses:Food" AND year = 2024
```

#### Entry filter

```sql
SELECT DISTINCT date, narration
FROM has_account("Expenses")
```

`WHERE` filters postings; `FROM` filters whole transactions and keeps their
postings together. `~` is a regex match and `IN` tests tags and links.

See: [Transactions and postings](https://beancount.github.io/docs/beancount_query_language/#transactions-and-postings)

### Aggregates

#### Balances by account

```sql
SELECT account, sum(position)
GROUP BY account
ORDER BY account
```

#### Cost basis

```sql
SELECT account, cost(sum(position))
GROUP BY account
```

`SUM(position)` builds an inventory; `UNITS()` and `COST()` collapse it to a
single amount.

See: [Aggregate functions](https://beancount.github.io/docs/beancount_query_language/#aggregate-functions)

### Shortcuts

```sql
BALANCES AT COST
JOURNAL "Assets:Bank" AT COST
PRINT FROM year = 2024
```

`BALANCES`, `JOURNAL` and `PRINT` expand to SELECTs.
`FROM CLOSE ON 2024-12-31 CLEAR` turns one into a period report.

See: [High-level shortcuts](https://beancount.github.io/docs/beancount_query_language/#high-level-shortcuts)

## Also see

[Ledger CLI cheatsheet](./ledger)
<!-- {: .-crosslink} -->

[Hledger cheatsheet](./hledger)
<!-- {: .-crosslink} -->
