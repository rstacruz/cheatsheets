---
title: SQL
subtitle: Relational query language
logo: { set: icon-park-outline, name: data }
category: Databases
weight: -10
updated: 2026-11-23
tier: t2
last_verified_with: "SQLite 3.54.0, PostgreSQL 19."
fragments:
  - "SELECT"
  - "WHERE"
  - "JOIN orders"
  - "GROUP BY"
  - "ORDER BY"
  - "INSERT INTO"
  - "UPDATE"
  - "DELETE FROM"
  - "ALTER TABLE"
  - "CREATE INDEX"
  - "PRIMARY KEY"
  - "COMMIT"
  - "ROLLBACK"
  - "HAVING"
keywords:
  - SQL
  - SELECT
  - INSERT
  - UPDATE
  - DELETE
  - ALTER TABLE
intro: |
  SQL reads and changes relational data. This reference covers queries, joins, inserts, updates, schema changes, and transactions. Examples use portable syntax unless noted.
links:
  - title: PostgreSQL SQL commands
    url: https://www.postgresql.org/docs/current/sql-commands.html
  - title: SQLite SQL syntax
    url: https://www.sqlite.org/lang.html
  - title: MySQL reference manual
    url: https://dev.mysql.com/doc/refman/9.7/en/
---

## Querying
<!-- {: .-three-column} -->

### Select columns

```sql
SELECT * FROM customers;
SELECT id, name FROM customers;
SELECT name AS customer, email
FROM customers;
SELECT DISTINCT customer_id FROM orders;
```
<!-- {: data-highlight="SELECT *"} -->

`*` reads every column and `AS` renames an output column. `DISTINCT` drops duplicate rows.

See: [PostgreSQL SELECT](https://www.postgresql.org/docs/current/sql-select.html)

### Filter rows

```sql
SELECT * FROM orders
WHERE total >= 50 AND status = 'paid';

SELECT * FROM customers
WHERE name LIKE 'A%' OR email IS NULL;

SELECT * FROM orders
WHERE customer_id IN (1, 2, 3);

SELECT * FROM orders
WHERE placed_at BETWEEN '2026-01-01'
  AND '2026-03-31';
```
<!-- {: data-highlight="WHERE"} -->

`AND` and `OR` combine conditions; `IN`, `BETWEEN`, `LIKE`, and `IS NULL` cover common tests. Use `IS NULL`, never `= NULL`.

See: [PostgreSQL WHERE](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-WHERE)

### Sort and limit

```sql
SELECT id, total FROM orders
ORDER BY total DESC, id ASC;

SELECT name FROM customers
ORDER BY name
LIMIT 10;

SELECT name FROM customers
ORDER BY name
LIMIT 10 OFFSET 20;
```
<!-- {: data-highlight="ORDER BY; LIMIT"} -->

`ORDER BY` sorts, `DESC` reverses it, and `LIMIT` caps rows. `OFFSET` skips ahead for paging; SQL Server uses `OFFSET ... FETCH`.

See: [PostgreSQL LIMIT](https://www.postgresql.org/docs/current/queries-limit.html)

### Group and aggregate

```sql
SELECT customer_id,
       COUNT(*) AS orders,
       SUM(total) AS spent,
       AVG(total) AS average
FROM orders
GROUP BY customer_id
HAVING SUM(total) > 100
ORDER BY spent DESC;
```
<!-- {: data-highlight="GROUP BY"} -->

`GROUP BY` makes one row per key; aggregates collapse each group. `WHERE` filters rows before grouping, `HAVING` filters groups after.

See: [PostgreSQL GROUP BY](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUP)

## Joins and subqueries

### Join tables

```sql
SELECT c.name, o.order_id, o.total
FROM customers AS c
JOIN orders AS o
  ON o.customer_id = c.id;

SELECT c.name, o.order_id, o.total
FROM customers AS c
LEFT JOIN orders AS o
  ON o.customer_id = c.id;
```
<!-- {: data-highlight="JOIN; LEFT"} -->

`JOIN` keeps matching rows; `LEFT JOIN` keeps every left row and fills missing right columns with `NULL`.

See: [PostgreSQL joins](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN)

### Subqueries

```sql
SELECT name FROM customers
WHERE id IN (
  SELECT customer_id FROM orders
  WHERE total > 100
);

SELECT name FROM customers AS c
WHERE EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id = c.id
);
```
<!-- {: data-highlight="IN; EXISTS"} -->

`IN` compares against a list; `EXISTS` stops at the first match. Both can replace a join when you only need one side.

See: [PostgreSQL subqueries](https://www.postgresql.org/docs/current/functions-subquery.html)

## Changing rows
<!-- {: .-three-column} -->

### Insert rows

```sql
INSERT INTO customers (name, email)
VALUES ('Ada', 'ada@example.com');

INSERT INTO customers (name, email)
VALUES ('Bob', 'bob@example.com'),
       ('Cy', 'cy@example.com');

INSERT INTO archived_customers (name)
SELECT name FROM customers
WHERE active = FALSE;
```
<!-- {: data-highlight="INSERT INTO"} -->

List columns explicitly so defaults and generated IDs still work. `INSERT ... SELECT` copies rows from another query.

See: [PostgreSQL INSERT](https://www.postgresql.org/docs/current/sql-insert.html)

### Update rows

```sql
UPDATE accounts
SET balance = balance + 10
WHERE id = 1;

UPDATE accounts
SET balance = 0
WHERE customer_id = 42;
```
<!-- {: data-highlight="UPDATE"} -->

`SET` assigns new values. Always add `WHERE` unless you mean every row.

See: [PostgreSQL UPDATE](https://www.postgresql.org/docs/current/sql-update.html)

### Delete rows

```sql
DELETE FROM orders
WHERE placed_at < '2025-01-01';

DELETE FROM orders;
```
<!-- {: data-highlight="DELETE FROM"} -->

`DELETE` removes matching rows; without `WHERE` it empties the table. `TRUNCATE` is faster but cannot filter.

See: [PostgreSQL DELETE](https://www.postgresql.org/docs/current/sql-delete.html)

### Transactions

```sql
BEGIN;
UPDATE accounts
SET balance = balance + 10
WHERE id = 1;
COMMIT;
```
<!-- {: data-highlight="BEGIN"} -->

`BEGIN` starts a transaction; `COMMIT` saves it and `ROLLBACK` discards it. Keep transactions short.

See: [PostgreSQL transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)

## Defining tables

### Create table

```sql
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  balance NUMERIC(12, 2) NOT NULL
    DEFAULT 0 CHECK (balance >= 0),
  customer_id INTEGER
    REFERENCES customers (id)
    ON DELETE CASCADE,
  created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
);
```
<!-- {: data-highlight="CREATE TABLE"} -->

`PRIMARY KEY`, `UNIQUE`, `NOT NULL`, `CHECK`, and `REFERENCES` reject invalid rows. `ON DELETE CASCADE` removes child rows with their parent. Auto-increment differs: SQLite `INTEGER PRIMARY KEY`, PostgreSQL `GENERATED ALWAYS AS IDENTITY`, MySQL `AUTO_INCREMENT`.

See: [PostgreSQL CREATE TABLE](https://www.postgresql.org/docs/current/sql-createtable.html)

### Alter table

```sql
ALTER TABLE accounts
  ADD COLUMN last_login TIMESTAMP;

ALTER TABLE accounts
  RENAME COLUMN email TO login;

ALTER TABLE accounts
  ALTER COLUMN balance TYPE NUMERIC(14, 2);

ALTER TABLE accounts
  DROP COLUMN last_login;
```
<!-- {: data-highlight="ADD COLUMN; RENAME COLUMN; ALTER COLUMN; DROP COLUMN"} -->

`ADD`, `RENAME`, `ALTER COLUMN`, and `DROP COLUMN` change a table in place. SQLite lacks `ALTER COLUMN TYPE`; MySQL uses `MODIFY COLUMN`.

See: [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)

### Indexes

```sql
CREATE INDEX orders_customer_id_idx
  ON orders (customer_id);

CREATE UNIQUE INDEX customers_email_idx
  ON customers (email);

DROP INDEX orders_customer_id_idx;
```
<!-- {: data-highlight="CREATE INDEX; CREATE UNIQUE INDEX"} -->

Indexes speed up lookups and sorts; `CREATE UNIQUE INDEX` also enforces uniqueness. MySQL drops with `DROP INDEX name ON table`.

See: [PostgreSQL CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html)

### Drop and truncate

```sql
DROP TABLE accounts;
TRUNCATE TABLE orders;
```
<!-- {: data-highlight="DROP TABLE; TRUNCATE"} -->

`DROP TABLE` deletes the table and its data; `TRUNCATE` clears rows faster but keeps the table. SQLite has no `TRUNCATE`: use `DELETE FROM`.

See: [PostgreSQL TRUNCATE](https://www.postgresql.org/docs/current/sql-truncate.html)

## Also see

### Join patterns

[SQL joins cheatsheet](./sql-join)
<!-- {: .-crosslink} -->

### PostgreSQL

[PostgreSQL cheatsheet](./postgresql)
<!-- {: .-crosslink} -->

### MySQL

[MySQL cheatsheet](./mysql)
<!-- {: .-crosslink} -->
