---
title: Ledger CSV format
subtitle: Ledger CSV export format
category: Plain-text accounting
updated: 2026-11-24
last_verified_with: "Ledger 3.4.1."
tier: t3
intro: |
  How Ledger's csv command exports postings: default columns, report
  query filters, and custom --csv-format output.
links:
  - title: Ledger manual
    url: https://ledger-cli.org/doc/ledger3.html
  - title: The csv command
    url: https://ledger-cli.org/doc/ledger3.html#The-csv-command
  - title: Format strings
    url: https://ledger-cli.org/doc/ledger3.html#Format-Strings
---

## Exporting

### Export postings

```sh
ledger csv
```

See: [The csv command](https://ledger-cli.org/doc/ledger3.html#The-csv-command)

### Filter with a report query

```sh
ledger csv --period "this month" Expenses
```

The usual report query narrows the export: account names, `--period`, `--limit`, `--begin` and `--end` all apply.

See: [Report filtering](https://ledger-cli.org/doc/ledger3.html#Report-Filtering)

### Choose columns

```sh
ledger csv --csv-format '%(date),%(payee),%(amount)'
```

`--csv-format` takes a format string built from the usual format expressions; wrap a field in `%(quoted(...))` to escape commas and quotes.

See: [Format strings](https://ledger-cli.org/doc/ledger3.html#Format-Strings)

## Output
<!-- {: .-one-column} -->

### Default columns

| Column      | Holds                                  |
| ----------- | -------------------------------------- |
| `date`      | Transaction date, `YYYY/MM/DD`         |
| `code`      | Transaction code, usually empty        |
| `payee`     | Payee or description                   |
| `account`   | Full account name                      |
| `commodity` | Commodity symbol                       |
| `amount`    | Quantity only, no symbol               |
| ---         | ---                                    |
| `cleared`   | `*` cleared, `!` pending, else empty   |
| `note`      | Posting note, newlines escaped as `\n` |

No header row is printed; this is the default column order.

See: [The csv command](https://ledger-cli.org/doc/ledger3.html#The-csv-command)

### Sample rows

```csv
"2013/09/02","","things","Assets:Cash","P","-2000","*",""
"2013/09/02","","things","Liabilities:Card","P","-200","*",""
"2013/09/02","","things","Expenses:Things","P","2200","*",""
"2013/09/04","","stuff","Assets:Cash","P","-20","*",""
"2013/09/04","","stuff","Expenses:Others","P","20","*",""
```
<!-- {: .-wrap} -->

One row per posting, so a transaction with three postings expands to three rows.

See: [CSV format](https://ledger-cli.org/doc/ledger3.html#Comma-Separated-Values-files)
