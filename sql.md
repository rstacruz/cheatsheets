---
title: SQL
subtitle: Relational query language
category: Databases
weight: -10
updated: 2026-11-23
intro: |
  Quick reference for SQL queries, with links to joins, PostgreSQL, PostgreSQL JSON, and MySQL cheatsheets.
links:
  - title: SQL joins cheatsheet
    url: ./sql-join
  - title: PostgreSQL cheatsheet
    url: ./postgresql
  - title: MySQL cheatsheet
    url: ./mysql
  - title: PostgreSQL JSON cheatsheet
    url: ./postgresql-json
---

## Querying
<!-- {: .-three-column} -->

### Reading rows

```sql
SELECT name FROM customers;
SELECT DISTINCT customer_id FROM orders;
SELECT COUNT(*) FROM orders;
SELECT customer_id, SUM(total) AS spent
FROM orders GROUP BY customer_id;
SELECT name FROM customers
ORDER BY name DESC LIMIT 2;
```

### Joins

```sql
SELECT c.name, o.order_id
FROM customers AS c
JOIN orders AS o ON o.customer_id = c.id;
SELECT c.name, o.order_id
FROM customers AS c
LEFT JOIN orders AS o
  ON o.customer_id = c.id;
SELECT c.name, o.order_id
FROM customers AS c
FULL OUTER JOIN orders AS o
  ON o.customer_id = c.id;
SELECT COUNT(*)
FROM customers CROSS JOIN orders;
SELECT o.order_id, s.status
FROM orders AS o
JOIN shipments AS s USING (order_id);
```

[SQL joins cheatsheet](./sql-join)
<!-- {: .-crosslink} -->

### Aggregates

```sql
SELECT COUNT(*) FROM orders;
SELECT SUM(total) FROM orders;
SELECT AVG(total) FROM orders;
SELECT customer_id, COUNT(*) AS n
FROM orders GROUP BY customer_id;
SELECT customer_id, SUM(total) AS spent
FROM orders GROUP BY customer_id
HAVING SUM(total) > 30;
```

## Dialects

### PostgreSQL

```sql
SELECT name FROM customers ORDER BY name;
SELECT DISTINCT customer_id FROM orders;
SELECT name FROM customers WHERE id BETWEEN 1 AND 2;
SELECT o.order_id, s.status FROM orders AS o
LEFT JOIN shipments AS s ON s.order_id = o.order_id;
SELECT COUNT(*) FROM customers CROSS JOIN orders;
```

[PostgreSQL cheatsheet](./postgresql)
<!-- {: .-crosslink} -->

### MySQL

```sql
SELECT name FROM customers LIMIT 2;
SELECT name FROM customers WHERE name IN ('Ada', 'Cy');
SELECT c.name, o.order_id FROM customers AS c
RIGHT JOIN orders AS o ON o.customer_id = c.id;
SELECT o.order_id, s.status FROM orders AS o
JOIN shipments AS s USING (order_id);
SELECT COUNT(*) FROM customers CROSS JOIN orders;
```

[MySQL cheatsheet](./mysql)
<!-- {: .-crosslink} -->
