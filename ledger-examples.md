---
title: Ledger examples
subtitle: Double-entry accounting example set
category: Plain-text accounting
last_verified_with: "Ledger 3.4.1."
updated: 2026-11-25
tier: t3
intro: |
  [Ledger](https://ledger-cli.org/) is a command-line, plain-text double-entry accounting tool. This sheet collects practical reporting examples, from balances and graphs to currency conversions.
links:
  - title: Ledger manual
    url: https://ledger-cli.org/doc/ledger3.html
  - title: Basic reporting commands
    url: https://ledger-cli.org/doc/ledger3.html#Basic-Reporting-Commands
  - title: Ledger repository
    url: https://github.com/ledger/ledger
---

### Inspecting transactions

```
# show me expenses for october (--period)
  ledger r Expenses -p oct
```
<!-- {: data-highlight="-p oct"} -->

```
# what's the most expensive? (--sorted)
  ledger r Expenses -S amount --tail 10
```
<!-- {: data-highlight="-S amount; --tail 10"} -->

```
# how much was spent on grocery? (--weekly, --monthly)
  ledger r Grocery
  ledger r Grocery -W
  ledger r Grocery -M
```
<!-- {: data-highlight="-W; -M"} -->

```
# what did I spend my Mastercard on? (--period, --begin, --end)
  ledger r mastercard
  ledger r mastercard -p "january"
  ledger r mastercard -b 01/25 -e 01/31
```
<!-- {: data-highlight="-p; -b; -e"} -->

See: [Report filtering](https://ledger-cli.org/doc/ledger3.html#Report-filtering)

### Graphing

```
# Graph my bank account balance, monthly
  ledger r Savings -M
```
<!-- {: data-highlight="ledger r Savings"} -->

```
# Graph my expenses, monthly (-n = --collapse)
  ledger r Expenses -M -n
```
<!-- {: data-highlight="-n"} -->

```
# ...what's the average per month?
  ledger r Expenses -M -n --average
```
<!-- {: data-highlight="--average"} -->

See: [Generating a monthly register](https://ledger-cli.org/doc/ledger3.html#Generating-a-monthly-register)

### Simple

```
# what did I do yesterday?
# ..list transactions on this day
  ledger r -p 01/26
  ledger r -p yesterday
```
<!-- {: data-highlight="-p 01/26; -p yesterday"} -->

See: [The register command](https://ledger-cli.org/doc/ledger3.html#The-register-command)

### Switches

```
# what's everything I got in USD? (--exchange)
  ledger b Assets -X USD
```
<!-- {: data-highlight="-X USD"} -->

See: [Commodity reporting](https://ledger-cli.org/doc/ledger3.html#Commodity-Reporting)
