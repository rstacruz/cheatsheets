---
title: Ledger queries
subtitle: Query syntax for Ledger
logo: { set: icon-park-outline, name: filter }
category: Plain-text accounting
last_verified_with: "Ledger 3.4.1."
updated: 2026-11-25
tier: t3
intro: |
  [Ledger](https://ledger-cli.org/) filters transactions with [complex expressions](https://ledger-cli.org/doc/ledger3.html#Complex-expressions). This sheet covers payee, tag, note, and code prefixes plus boolean operators and query examples.
links:
  - title: Complex expressions
    url: https://ledger-cli.org/doc/ledger3.html#Complex-expressions
  - title: Report filtering
    url: https://ledger-cli.org/doc/ledger3.html#Report-filtering
  - title: Ledger manual
    url: https://ledger-cli.org/doc/ledger3.html
---

### About

Queries use Ledger's complex-expression syntax.

See: [Complex expressions](https://ledger-cli.org/doc/ledger3.html#Complex-expressions)

### Query characters

| Query           | Description |
| ---             | ---         |
| `@payee`        | Payee       |
| `%tag`          | Tag         |
| `=note`         | Note        |
| `#code`         | Code        |
| ---             | ---         |
| `TERM and TERM` | Boolean and |
| `TERM or TERM`  | Boolean or  |
| `not TERM`      | Boolean not |

See: [Report filtering](https://ledger-cli.org/doc/ledger3.html#Report-filtering)

### Examples

```sh
ledger r @taco
ledger r comment =~ /landline/
```
<!-- {: data-highlight="@taco; =~"} -->

See: [Complex expressions](https://ledger-cli.org/doc/ledger3.html#Complex-expressions)
