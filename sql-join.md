---
title: SQL Join
---

```
SELECT * FROM order_items LEFT OUTER JOIN orders ON order_items.order_id = orders.id
```

```
.--------.
| A  .---+----.
|    | ∩ |    |
'----+---'  B |
     '--------'
```

* inner join = `∩`
* left outer join = `A` + `∩`
* right outer join = `∩` + `B`
* full outer join = `A` + `∩` + `B`
