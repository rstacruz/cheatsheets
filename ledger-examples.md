---
title: Ledger examples
layout: default
---

    # show me expenses for october (--period)
      ledger b Expenses -p oct (--period)

    # what's the mont expensive? (--sorted)
      ledger r Expenses -S amount

    # how much was spent on grocery?
      ledger r grocery
      ledger r grocery -W (--weekly)
      ledger r grocery -M (--monthly)

    # what did I spend my Mastercard on? (--period, --begin, --end)
      ledger r mastercard
      ledger r mastercard -p "january"
      ledger r mastercard -b 01/25 -e 01/31

    # what did I do yesterday?
    # ..list transactions on this day
      ledger reg -p 01/26

