---
title: Spreadsheet functions
category: Others
subtitle: Spreadsheet formula reference
last_verified_with: "LibreOffice Calc 26.8.3, Google Sheets."
updated: 2026-11-24
tier: t3
intro: |
  Formula reference for Calc and Google Sheets: logic, math, rounding,
  summing, lookup, and date conversion.
links:
  - title: LibreOffice Calc functions
    url: https://wiki.documentfoundation.org/Documentation/Calc_Functions
  - title: Google Sheets function list
    url: https://support.google.com/docs/table/25273
---

## Logic

### If

```text
=IF(A1 > 5, 100, "too small")
```

Calc accepts `;` as the argument separator in most locales.

See: [IF](https://support.google.com/docs/answer/3093364)

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

See: [EQ](https://support.google.com/docs/answer/3093593)

## Math
<!-- {: .-three-column} -->

### Powers and trig

```text
=POWER(2, 32)        # 4294967296
=SIN(RADIANS(30))    # 0.5
=ACOS(0)             # 1.5707963
```

See: [POWER](https://support.google.com/docs/answer/3093433)

### Rounding

```text
=CEILING(2.3, 1)     # 3
=FLOOR(2.7, 1)       # 2
=INT(-2.3)           # -3
```

Calc's `CEILING` and `FLOOR` take a third `Mode` argument that sets the direction for negative numbers.

See: [CEILING](https://support.google.com/docs/answer/3093471)

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

See: [SUM](https://support.google.com/docs/answer/3093669)

## Lookup and conversion

### Vlookup

```text
=VLOOKUP(201, A1:C9, 3, FALSE)
```

The fourth argument asks for an exact match; without it the first column must be sorted.

See: [VLOOKUP](https://support.google.com/docs/answer/3093318)

### To date

```text
=TO_DATE(43831)      # 2020-01-01
```

Google Sheets only: day numbers count from 1899-12-30.

See: [TO_DATE](https://support.google.com/docs/answer/3094239)
