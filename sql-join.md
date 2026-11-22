---
title: SQL joins
subtitle: Combine rows across tables
category: Databases
weight: -1
updated: 2026-11-22
last_verified_with: "SQLite 3.54.0."
tier: t2
fragments:
  - "INNER JOIN"
  - "JOIN orders"
  - "ON o.customer_id"
  - "LEFT JOIN"
  - "RIGHT JOIN"
  - "FULL OUTER JOIN"
  - "CROSS JOIN"
  - "USING (order_id)"
  - "JOIN employees"
  - "AS manager"
  - "IS NULL"
  - "UNION ALL"
  - "COUNT(*)"
  - "c.name"
  - "s.status"
  - "o.total"
keywords:
  - SQL joins
  - inner join
  - left join
  - full outer join
  - cross join
intro: |
  SQL joins combine rows from two or more table references. Match columns with `ON` or `USING`, or pair every row with `CROSS JOIN`.
links:
  - title: PostgreSQL join tutorial
    url: https://www.postgresql.org/docs/current/tutorial-join.html
  - title: SQLite SELECT and joins
    url: https://www.sqlite.org/lang_select.html
  - title: MySQL JOIN syntax
    url: https://dev.mysql.com/doc/refman/8.4/en/join.html
---

## Inner joins

### Match rows in both tables

```sql
SELECT c.name, o.order_id, o.total
FROM customers AS c
JOIN orders AS o ON o.customer_id = c.id;
```

#### Result

```
name  order_id  total
----  --------  -----
Ada   101       25
Ada   102       40
Bob   103       15
```

`JOIN` alone means `INNER JOIN`: unmatched rows are dropped.

See: [PostgreSQL inner joins](https://www.postgresql.org/docs/current/tutorial-join.html)

### Same-name columns

```sql
SELECT o.order_id, s.status
FROM orders AS o
JOIN shipments AS s USING (order_id);
```

#### Result

```
order_id  status
--------  -------
101       shipped
103       pending
```

`USING` merges the shared column into one output column.

See: [PostgreSQL JOIN clauses](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN)

## Outer joins

### Left join

```sql
SELECT c.name, o.order_id, o.total
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id;
```

#### Result

```
name  order_id  total
----  --------  -----
Ada   101       25
Ada   102       40
Bob   103       15
Cy    NULL      NULL
```

Every left row survives; missing right columns are `NULL`.

See: [SQLite joins](https://www.sqlite.org/lang_select.html)

### Right join

```sql
SELECT c.name, o.order_id
FROM customers AS c
RIGHT JOIN orders AS o ON o.customer_id = c.id;
```

#### Result

```
name  order_id
----  --------
Ada   101
Ada   102
Bob   103
NULL  104
```

Every right row survives, including order 104 with no customer.

See: [MySQL JOIN syntax](https://dev.mysql.com/doc/refman/8.4/en/join.html)

### Full outer join

```sql
SELECT c.name, o.order_id
FROM customers AS c
FULL OUTER JOIN orders AS o ON o.customer_id = c.id;
```

#### Result

```
name  order_id
----  --------
Ada   101
Ada   102
Bob   103
Cy    NULL
NULL  104
```

Both sides survive; unmatched columns are `NULL`.

See: [PostgreSQL outer joins](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN)

### Filter in the ON clause

```sql
SELECT c.name, o.order_id
FROM customers AS c
LEFT JOIN orders AS o
  ON o.customer_id = c.id AND o.total > 30;
```

#### Result

```
name  order_id
----  --------
Ada   102
Bob   NULL
Cy    NULL
```

Conditions in `ON` keep unmatched left rows; `WHERE` would drop them.

See: [PostgreSQL JOIN clauses](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN)

## Other joins

### Cross join

```sql
SELECT COUNT(*) FROM customers CROSS JOIN orders;
```

#### Result

```
COUNT(*)
--------
12
```

Every left row pairs with every right row: `3 × 4 = 12`.

See: [SQLite joins](https://www.sqlite.org/lang_select.html)

### Self join

```sql
SELECT e.name AS employee, m.name AS manager
FROM employees AS e
JOIN employees AS m ON m.id = e.manager_id;
```

#### Result

```
employee  manager
--------  -------
Bob       Ada
Cy        Ada
Dee       Bob
```

Alias the same table twice to match rows within it.

See: [PostgreSQL self-joins](https://www.postgresql.org/docs/current/tutorial-join.html)

### Multiple tables

```sql
SELECT c.name, o.order_id, s.status
FROM customers AS c
JOIN orders AS o ON o.customer_id = c.id
JOIN shipments AS s ON s.order_id = o.order_id;
```

#### Result

```
name  order_id  status
----  --------  -------
Ada   101       shipped
Bob   103       pending
```

Each `JOIN` adds a table; conditions can reference earlier ones.

See: [PostgreSQL joining multiple tables](https://www.postgresql.org/docs/current/tutorial-join.html)

## Patterns

### Find unmatched rows

```sql
SELECT c.name
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
WHERE o.order_id IS NULL;
```

#### Result

```
name
----
Cy
```

A left join plus `IS NULL` finds customers without orders.

See: [PostgreSQL join reference](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN)

### Full join without FULL

```sql
SELECT c.name, o.order_id FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
UNION ALL
SELECT c.name, o.order_id FROM customers AS c
RIGHT JOIN orders AS o ON o.customer_id = c.id
WHERE c.id IS NULL;
```

#### Result

```
name  order_id
----  --------
Ada   101
Ada   102
Bob   103
Cy    NULL
NULL  104
```

MySQL has no `FULL OUTER JOIN`; union a left and a right join.

See: [MySQL UNION syntax](https://dev.mysql.com/doc/refman/8.4/en/union.html)

## Dialect notes

### SQLite

```sql
SELECT sqlite_version();
```

#### Result

```
3.54.0
```

`RIGHT` and `FULL OUTER JOIN` require SQLite 3.39 or newer.

See: [SQLite 3.39.0 release](https://www.sqlite.org/releaselog/3_39_0.html)

### PostgreSQL

```sql
SELECT order_id, s.status
FROM orders AS o
FULL OUTER JOIN shipments AS s USING (order_id);
```

#### Result

```
order_id  status
--------  -------
101       shipped
102       NULL
103       pending
104       NULL
105       lost
```

Full joins are native; `USING` keeps one merged join column.

See: [PostgreSQL JOIN clauses](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN)

### MySQL

```sql
SELECT o.order_id, s.status
FROM orders AS o
JOIN shipments AS s USING (order_id);
```

#### Result

```
order_id  status
--------  -------
101       shipped
103       pending
```

`JOIN`, `LEFT`, and `RIGHT` work; emulate `FULL` with `UNION ALL`.

See: [MySQL JOIN syntax](https://dev.mysql.com/doc/refman/8.4/en/join.html)

## Reference

### Join types

| Join | Keeps |
| --- | --- |
| `INNER JOIN` | Matching rows from both |
| `LEFT JOIN` | All left rows |
| `RIGHT JOIN` | All right rows |
| `FULL OUTER JOIN` | All rows from both |
| `CROSS JOIN` | Every pair of rows |
| `USING (col)` | Join on shared column names |
<!-- {: .-headers} -->

See: [PostgreSQL join types](https://www.postgresql.org/docs/current/tutorial-join.html)

### Diagram

#### Query

```
SELECT * FROM a INNER JOIN b
```

#### Overlap

```
┌────────┐
│ a  ┌───┼────┐
│    │ ∩ │    │
└────┼───┘  b │
     └────────┘
```
<!-- {: .-box-chars.-setup} -->

The intersection is the inner join; each circle adds its outer rows.

See: [SQLite joins](https://www.sqlite.org/lang_select.html)

### Sample data

#### Tables

```sql
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (order_id INTEGER PRIMARY KEY,
  customer_id INTEGER, total INTEGER);
CREATE TABLE shipments (order_id INTEGER, status TEXT);
CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT,
  manager_id INTEGER);
```

#### Rows

```sql
INSERT INTO customers VALUES (1, 'Ada'), (2, 'Bob'), (3, 'Cy');
INSERT INTO orders VALUES (101, 1, 25), (102, 1, 40),
  (103, 2, 15), (104, 4, 10);
INSERT INTO shipments VALUES (101, 'shipped'),
  (103, 'pending'), (105, 'lost');
INSERT INTO employees VALUES (1, 'Ada', NULL), (2, 'Bob', 1),
  (3, 'Cy', 1), (4, 'Dee', 2);
```

All examples above use these four tables.

See: [SQLite CREATE TABLE](https://www.sqlite.org/lang_createtable.html)
