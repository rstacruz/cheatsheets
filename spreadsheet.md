---
title: Spreadsheet functions
category: Others
subtitle: Spreadsheet formula reference
last_verified_with: "LibreOffice Calc 26.8.3, Google Sheets."
updated: 2026-11-24
---

## Logic

### If

```text
=IF(A1 > 5, 100, "too small")
```

Calc accepts `;` as the argument separator in most locales.

### Comparators

```text
=EQ(a, b)
=NE(a, b)
=GT(a, b)
=GTE(a, b)
=LT(a, b)
=LTE(a, b)
```

Google Sheets only; elsewhere write the comparison inline, as in `IF(A1 > 5, …)`.

## Math

### Powers and trig

```text
=POWER(2, 32)        # 4294967296
=SIN(RADIANS(30))    # 0.5
=ACOS(0)             # 1.5707963
```

### Rounding

```text
=CEILING(2.3, 1)     # 3
=FLOOR(2.7, 1)       # 2
=INT(-2.3)           # -3
```

Calc's `CEILING` and `FLOOR` take a third `Mode` argument that sets the direction for negative numbers.

### Summing

#### Total

```text
=SUM(A1:A9)
```

#### Conditional

```text
=SUMIF(A1:A5, ">300", B1:B5)
```

Adds `B1:B5` where the matching `A1:A5` cell passes the `>300` test.

## Lookup and conversion

### Vlookup

```text
=VLOOKUP(201, A1:C9, 3, FALSE)
```

The fourth argument asks for an exact match; without it the first column must be sorted.

### To date

```text
=TO_DATE(43831)      # 2020-01-01
```

Google Sheets only: day numbers count from 1899-12-30.
