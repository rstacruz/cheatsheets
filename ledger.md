---
title: Ledger CLI
subtitle: Plain-text accounting tool
category: Plain-text accounting
last_verified_with: "Ledger 3.4.1."
updated: 2026-11-25
tier: t3
weight: -5
---

### Basic usage

```bash
$ ledger bal
$ ledger reg
```
<!-- {: data-highlight="ledger bal; ledger reg"} -->

```bash
$ ledger reg grocery  # show entries for 'grocery'
$ ledger bal assets   # check if i'm broke
```
<!-- {: data-highlight="ledger reg grocery; ledger bal assets"} -->

```bash
  -b 01/01   # --begin
  -e 01/31   # --end
  -S date    # --sort
  -S amount
```
<!-- {: data-highlight="-b; -e; -S"} -->

See: [Basic reporting commands](https://ledger-cli.org/doc/ledger3.html#Basic-Reporting-Commands)

### Examples

```bash
# any/all matches
  ledger bal Rent Transportation  # any
  ledger bal Income and Job       # all
  ledger bal Expenses and not (Drinks or Food)
```
<!-- {: data-highlight="Rent Transportation; Income and Job"} -->

```bash
# what did I spend on most? (--sorted)
  ledger reg Expenses -S amount
```
<!-- {: data-highlight="--sorted; -S amount"} -->

```bash
# how much did I have at this date? (--end)
  ledger bal -e 01/15 ^Assets ^Liabilities
```
<!-- {: data-highlight="-e 01/15; ^Assets"} -->

```bash
# how much did I spend and earn this month?
  ledger bal ^Expenses ^Income --invert
```
<!-- {: data-highlight="--invert; ^Expenses"} -->

```bash
# how much was spent over the course of 3 days? (totalled)
  ledger reg -b 01/25 -e 01/27 --subtotal
  ledger reg -b 01/25 -e 01/27 --subtotal grocery
```
<!-- {: data-highlight="--subtotal"} -->

See: [Report filtering](https://ledger-cli.org/doc/ledger3.html#Report-filtering)

## Format

### Basic format

```
2013/01/03 * Rent for January
  Expenses:Rent   $600.00
  Assets:Savings
```
<!-- {: data-highlight="Expenses:Rent; Assets:Savings"} -->

`*` = cleared, `!` = pending

See: [Basic format](https://ledger-cli.org/doc/ledger3.html#Basic-format)

### Secondary dates

```
2008/01/01=2008/01/14 Client invoice
```
<!-- {: data-highlight="2008/01/01=2008/01/14"} -->

It can mean anything you want, eg, for the estimated date you'll be paid.

See: [Effective dates](https://ledger-cli.org/doc/ledger3.html#Effective-Dates)

### Balance assertions

```
2008/01/01 * KFC
  Expenses:Food    $20
  Assets:Cash     $-20  = $500
```

<!-- {: data-highlight="Assets"} -->

`Cash $X = $500` ensures Cash is at $500 after the transaction.

See: [Balance assertions](https://ledger-cli.org/doc/ledger3.html#Balance-assertions)

### Balance assignment

```bash
2008/01/01 * Cash balance
  Assets:Cash              = $500
  Equity:Adjustments

2008/01/01 * KFC
  Expenses:Food            $20
  Assets:Cash              = $500
```

<!-- {: data-highlight=":Cash"} -->

`ACCOUNT = $500` figures out what's needed to make it $500.

See: [Balance assignments](https://ledger-cli.org/doc/ledger3.html#Balance-assignments)

### Payables

```bash
2008/04/25 * Rent
  (Assets:Checking)  -$200
  Expenses:Rent
```

<!-- {: data-highlight=":Checking"} -->

See: [Virtual postings](https://ledger-cli.org/doc/ledger3.html#Virtual-postings)

### Commodities

```bash
; cost per item
2010/05/31 * Market
  Assets:Fridge                35 apples @ $0.42
  Assets:Cash
```

<!-- {: data-highlight=":Fridge"} -->

```bash
; total cost
2010/05/31 * Market
  Assets:Fridge                35 apples @@ $14.70
  Assets:Cash
```

<!-- {: data-highlight="Fridge"} -->

```bash
; fixed lot prices
2010/05/31 * Gas
  Expenses:Gasoline             11 GAL {=$2.299}
  Assets:Cash
```

<!-- {: data-highlight=":Gasoline"} -->

See: [Commoditized amounts](https://ledger-cli.org/doc/ledger3.html#Commoditized-Amounts)

### Commodity definitions

```
commodity $
  note American Dollars
  format $1,000.00
  nomarket
  default
```
<!-- {: data-highlight="commodity; nomarket; default"} -->

See: [Commodity reporting](https://ledger-cli.org/doc/ledger3.html#Commodity-Reporting)

### Budgeting

```
~ Monthly
  Expenses:Rent  $500
  Expenses:Food  $100
  Expenses        $40 ; everything else
  Assets

~ Yearly
```
<!-- {: data-highlight="~ Monthly; ~ Yearly"} -->

```bash
ledger bal --budget Expenses
ledger bal --unbudgeted Expenses
```
<!-- {: data-highlight="--budget; --unbudgeted"} -->


See: [Budgeting](https://ledger-cli.org/doc/ledger3.html#Budgeting)

### Comments

```
; line comment
# also line comment
% also line comment
| also line comment
* also line comment
```
<!-- {: data-highlight="# also line comment; % also line comment; | also line comment; * also line comment"} -->

See: [Comments and metadata](https://ledger-cli.org/doc/ledger3.html#Commenting-on-your-Journal)

## Querying

### Periods

```
[interval] [begin] [end]
```
<!-- {: data-highlight="[interval] [begin] [end]"} -->

```
interval:
  every day|week|month|quarter|year
  every N days|weeks|...
  daily|weekly|...
```
<!-- {: data-highlight="every day|week|month|quarter|year; daily|weekly|..."} -->

```
begin:
  from <spec>
end:
  to <spec>
```
<!-- {: data-highlight="from <spec>; to <spec>"} -->

```
spec:
  2004
  2004/10/1
```
<!-- {: data-highlight="2004/10/1"} -->

```bash
$ ledger bal|reg --period "until aug"
$ ledger bal|reg --period "last oct"
$ ledger bal|reg --period "every week"
```
<!-- {: data-highlight="--period"} -->


See: [Period expressions](https://ledger-cli.org/doc/ledger3.html#Period-Expressions)

### Register

```bash
$ ledger reg
```
<!-- {: data-highlight="$ ledger reg"} -->


```bash
  -D, --daily
  -W, --weekly
  -M, --monthly
      --quarterly
  -Y, --yearly
  -s, --subtotal
  --start-of-week monday
```
<!-- {: data-highlight="-D, --daily; -W, --weekly; -M, --monthly; --start-of-week"} -->

```bash
  -S, --sort date / -date # asc / desc
  -S, --sort amount
```
<!-- {: data-highlight="-S, --sort; -date"} -->

See: [The register command](https://ledger-cli.org/doc/ledger3.html#The-register-command)

### Filters

```bash
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
```
<!-- {: data-highlight="-b, --begin; -C, --cleared; -R, --real; -r, --related"} -->

See: [Report filtering](https://ledger-cli.org/doc/ledger3.html#Report-filtering)

### Queries

```
^regex$
@payee
%tag
%tag=value
=note
#code
term and term
term or term
not term
\( term \)
```
<!-- {: data-highlight="^regex$; @payee; =note; #code"} -->

#### Example

```
ledger r ^expenses and @Denny's
ledger r food and @Starbucks and not dining
```
<!-- {: data-highlight="ledger r"} -->

See: [Complex expressions](https://ledger-cli.org/doc/ledger3.html#Complex-expressions)

### Display

```bash
-n, --collapse       # [register] collapse entries
                     # [balance] no grand total
-s, --subtotal       # [balance] show sub-accounts
                     # [other] show subtotals
--flat
```
<!-- {: data-highlight="-n, --collapse; -s, --subtotal; --flat"} -->

See: [Basic options](https://ledger-cli.org/doc/ledger3.html#Basic-options)

### Effective dates

```bash
2008/01/01=2008/01/14 Client invoice  ;  estimated date you'll be paid
  Assets:Accounts Receivable            $100.00
  Income: Client name
```

<!-- {: data-highlight="date"} -->

Say you're in business. If you bill a customer, you can enter something like above.
Then, when you receive the payment, you change it to:

```bash
2008/01/01=2008/01/15 Client invoice ;  actual date money received
  Assets:Accounts Receivable            $100.00
  Income: Client name
```

<!-- {: data-highlight="received"} -->

See: [Effective dates](https://ledger-cli.org/doc/ledger3.html#Effective-Dates)

## References

<!-- {: .-one-column} -->

* [Ledger 3 manual](https://ledger-cli.org/doc/ledger3.html)
* [Ledger examples gist](https://gist.github.com/agaviria/3317397)

<!-- {: .-also-see} -->
