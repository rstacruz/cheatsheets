---
title: Ledger CSV format
subtitle: Ledger CSV export format
category: Plain-text accounting
updated: 2026-11-24
last_verified_with: "Ledger 3.4.1."
---

## Exporting

### Export postings

```sh
ledger csv
```

### Filter with a report query

```sh
ledger csv --period "this month" Expenses
```

The usual report query narrows the export: account names, `--period`, `--limit`, `--begin` and `--end` all apply.

### Choose columns

```sh
ledger csv --csv-format '%(date),%(payee),%(amount)'
```

`--csv-format` takes a format string built from the usual format expressions; wrap a field in `%(quoted(...))` to escape commas and quotes.

## Output

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
