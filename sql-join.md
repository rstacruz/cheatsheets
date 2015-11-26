---
title: SQL Join
---

```
SELECT * FROM order_items LEFT OUTER JOIN orders ON order_items.order_id = orders.id
```

```
   __  __
 /   /\   \
| A |u |B  |
 \___\/__ /
```

* inner join = `u`
* left outer join = `A` + `u`
* right outer join = `u` + `B`
* full outer join = `A` + `u` + `B`
