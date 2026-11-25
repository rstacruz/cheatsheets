---
title: Ledger queries
subtitle: Query syntax for Ledger
category: Plain-text accounting
last_verified_with: "Ledger 3.4.1."
updated: 2026-11-25
tier: t3
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
<!-- {: data-highlight="ledger r; =~"} -->

See: [Complex expressions](https://ledger-cli.org/doc/ledger3.html#Complex-expressions)
