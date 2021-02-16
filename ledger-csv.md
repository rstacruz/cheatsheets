---
title: Ledger CSV format
category: Ledger
layout: 2017/sheet
---

## Ledger CSV format
{: .-one-column}

```
$ ledger csv
```
{: .-setup}

```csv
date         , ?  , desc     , account            , currency , amt     , pending/cleared , ?
"2013/09/02" , "" , "things" , "Assets:Cash"      , "P"      , "-2000" , "*"             , ""
"2013/09/02" , "" , "things" , "Liabilities:Card" , "P"      , "-200"  , "*"             , ""
"2013/09/02" , "" , "things" , "Expenses:Things"  , "P"      , "2200"  , "*"             , ""
"2013/09/04" , "" , "stuff"  , "Assets:Cash"      , "P"      , "-20"   , "*"             , ""
"2013/09/04" , "" , "stuff"  , "Expneses:Others"  , "P"      , "20"    , "*"             , ""
```
