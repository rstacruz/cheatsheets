---
title: SQL joins
layout: 2017/sheet
updated: 2017-10-30
weight: -1
---

### Example

```
SELECT * FROM order_items LEFT OUTER JOIN orders ON order_items.order_id = orders.id
```
{: .-wrap}

### Diagram

```
┌────────┐
│ A  ┌───┼────┐
│    │ ∩ │    │
└────┼───┘  B │
     └────────┘
```
{: .-box-chars}

| Join             | What            |
| ----             | ----            |
| Inner join       | `∩`             |
| Left outer join  | `A` + `∩`       |
| Right outer join | `∩` + `B`       |
| Full outer join  | `A` + `∩` + `B` |
