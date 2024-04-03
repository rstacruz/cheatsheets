---
title: Ledger examples
category: Ledger
---

### Inspecting transactions

    # show me expenses for october (--period)
      ledger r Expenses -p oct

    # what's the most expensive? (--sorted)
      ledger r Expenses -S amount --tail 10

    # how much was spent on grocery? (--weekly, --monthly)
      ledger r Grocery
      ledger r Grocery -W
      ledger r Grocery -M

    # what did I spend my Mastercard on? (--period, --begin, --end)
      ledger r mastercard
      ledger r mastercard -p "january"
      ledger r mastercard -b 01/25 -e 01/31

### Graphing

    # Graph my bank account balance, monthly
      ledger r Savings -M

    # Graph my expenses, monthly (-n = --collapse)
      ledger r Expenses -M -n

    # ...what's the average per month?
      ledger r Expenses -M -n --average

### Simple

    # what did I do yesterday?
    # ..list transactions on this day
      ledger r -p 01/26
      ledger r -p yesterday

### Switches

    # what's everything I got in USD? (--exchange)
      ledger b Assets -X USD
