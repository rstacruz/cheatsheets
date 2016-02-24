---
title: Ledger CLI
category: Ledger
---

    $ ledger bal
    $ ledger reg

    $ ledger reg grocery # show entries for grocery
    $ ledger bal assets  # check if im broke

      -b 01/01   # --begin
      -e 01/31   # --end
      -S date    # --sort
      -S amount

### Examples

    # any/all matches
      ledger bal Rent Transportation  # any
      ledger bal Income and Job       # all
      ledger bal Expenses and not (Drinks or Food)

    # what did I spend on most? (--sorted)
      ledger reg Expenses -S amount

    # how much did I have at this date? (--end)
      ledger bal -e 01/15 ^Assets ^Liabilities

    # how much did I spend and earn this month?
      ledger bal ^Expenses ^Income --invert
    # how much was spent over the course of 3 days? (totalled)
      ledger reg -b 01/25 -e 01/27 --subtotal
      ledger reg -b 01/25 -e 01/27 --subtotal grocery

Format
------

    2013/01/03 * Rent for January
      Expenses:Rent   $600.00
      Assets:Savings

    * = cleared
    ! = pending

### Secondary dates

    2008/01/01=2008/01/14 Client invoice  ;  estimated date you'll be paid

### Balance assertions

    2008/01/01 * KFC
      Expenses:Food  $20
      Assets:Cash   $-20  = $500 ; ensures cash is at $500

### Balance assignment

    2008/01/01 * Cash balance
      Assets:Cash   = $500
      Equity:Adjustments

    2008/01/01 * KFC
      Expenses:Food  $20
      Assets:Cash   = $500 ; figures out what's needed to make it $500

### Payables

    2008/04/25 * Rent
      (Assets:Checking)  -$200
      Expenses:Rent

### Commodities

    ; cost per item
    2010/05/31 * Market
      Assets:Fridge                35 apples @ $0.42
      Assets:Cash

    ; total cost
    2010/05/31 * Market
      Assets:Fridge                35 apples @@ $14.70
      Assets:Cash

    ; fixed lot prices
    2010/05/31 * Gas
      Expenses:Gasoline             11 GAL {=$2.299}
      Assets:Cash

### Commodity definitions

    commodity $
             note American Dollars
             format $1,000.00
             nomarket
             default

### Budgeting

    ~ Monthly
      Expenses:Rent  $500
      Expenses:Food  $100
      Expenses        $40 ; everything else
      Assets

    ~ Yearly

    ; ledger bal --budget Expenses
    ; ledger bal --unbudgeted Expenses

### Comments

    ; line comment
    # also line comment
    % also line comment
    | also line comment
    * also line comment

### Periods

    [interval] [begin] [end]

    interval:
      every day|week|month|quarter|year
      every N days|weeks|...
      daily|weekly|...
    begin:
      from <spec>
    end:
      to <spec>
    spec:
      2004
      2004/10/1

    $ ledger bal|reg --period "until aug"
    $ ledger bal|reg --period "last oct"
    $ ledger bal|reg --period "every week"

### Register

    $ ledger reg
      -D, --daily
      -W, --weekly
      -M, --monthly
      --quarterly
      -Y, --yearly
      -s, --subtotal
      --start-of-week monday

      -S, --sort date
      -S, --sort amount

### Filters

    -b, --begin DATE
    -e, --end DATE

    -d payee =~ /pioneer/

    -C, --cleared    # (with *)
    -U, --uncleared  # (no *)
        --pending    # (with !)

    -R, --real       # ignore virtual postings (eg: "(Cash)  $-400")
    -L, --actual     # no automated postings (eg: "= /^Income/")

    -r, --related   # show the other side
                    # "reg -r savings" shows where it comes from)

### Queries

    ^regex$
    @payee
    %tag
    =note
    #code
    term and term
    term or term
    not term
    \( term \)

Example:

    ledger r ^expenses and @Denny's
    ledger r food and @Starbucks and not dining

### Display

    -n, --collapse       # [register] collapse entries
                         # [balance] no grand total
    -s, --subtotal       # [balance] show sub-accounts
                         # [other] show subtotals
    --flat

### Effective dates

Say you're in business. If you bill a customer, you can enter something like

     2008/01/01=2008/01/14 Client invoice  ;  estimated date you'll be paid
         Assets:Accounts Receivable            $100.00
         Income: Client name

Then, when you receive the payment, you change it to

     2008/01/01=2008/01/15 Client invoice ;  actual date money received
         Assets:Accounts Receivable            $100.00
         Income: Client name

### See

 * http://ledger-cli.org/3.0/doc/ledger3.html
 * https://gist.github.com/agaviria/3317397
