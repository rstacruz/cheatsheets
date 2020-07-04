---
title: SQL joins
layout: 2017/sheet
category: Databases
updated: 2018-12-06
weight: -1
---

### Example

```
SELECT * FROM order_items \
  LEFT OUTER JOIN orders \
  ON order_items.order_id = orders.id
```
{: .-wrap}

Joins are typically added to `SELECT` statements to add more columns and records.

### Diagram

```
SELECT * FROM `A` INNER JOIN `B`
```
{: .-setup}

```
┌────────┐
│ A  ┌───┼────┐
│    │ ∩ │    │
└────┼───┘  B │
     └────────┘
```
{: .-box-chars.-setup}

| Join             | What            |
| ----             | ----            |
| Inner join       | `∩`             |
| Left outer join  | `A` + `∩`       |
| Right outer join | `∩` + `B`       |
| Full outer join  | `A` + `∩` + `B` |
