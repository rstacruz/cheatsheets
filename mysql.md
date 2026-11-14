---
title: MySQL
updated: 2026-11-11
tier: t2
category: Databases
intro: |
  [MySQL](https://dev.mysql.com/doc/refman/9.7/en/) is an open-source relational database. This reference covers MySQL 9.7 LTS SQL, clients, and server administration.
links:
  - title: MySQL 9.7 Reference Manual
    url: https://dev.mysql.com/doc/refman/9.7/en/
  - title: MySQL documentation
    url: https://dev.mysql.com/doc/
---

## Querying

### Select

```sql
SELECT * FROM t;
SELECT col1, col2 FROM t;
SELECT DISTINCT col1 FROM t;
SELECT * FROM t WHERE cond;
SELECT * FROM t ORDER BY col1, col2 DESC;
SELECT * FROM t LIMIT 10 OFFSET 20;
SELECT col, COUNT(*) FROM t GROUP BY col HAVING COUNT(*) > 1;
```

See: [SELECT statement](https://dev.mysql.com/doc/refman/9.7/en/select.html)

### Joins

```sql
SELECT * FROM t1 JOIN t2 ON t1.id = t2.id;
SELECT * FROM t1 LEFT JOIN t2 ON t1.id = t2.id;
SELECT * FROM t1 RIGHT JOIN t2 ON t1.id = t2.id;
SELECT * FROM t1 CROSS JOIN t2;
SELECT * FROM t1 JOIN t2 USING (id);
```

See: [JOIN clause](https://dev.mysql.com/doc/refman/9.7/en/join.html)

### Conditions

```sql
col = value
col <> value
col LIKE 'val%'       -- % any chars, _ one char
col IS NULL
col IN (1, 2, 3)
col BETWEEN 1 AND 10
cond1 AND cond2
cond1 OR cond2
NOT cond
```

See: [Expressions](https://dev.mysql.com/doc/refman/9.7/en/expressions.html)

### CTEs and window functions

```sql
WITH cte AS (SELECT * FROM t WHERE cond)
SELECT * FROM cte;

SELECT id,
  ROW_NUMBER() OVER (PARTITION BY grp ORDER BY id) AS rn
FROM t;
```

See: [WITH](https://dev.mysql.com/doc/refman/9.7/en/with.html), [Window functions](https://dev.mysql.com/doc/refman/9.7/en/window-functions.html)

## Modifying data

### Insert

```sql
INSERT INTO t (col1, col2) VALUES (1, 'a');
INSERT INTO t (col1, col2) VALUES (1, 'a'), (2, 'b');
INSERT INTO t SET col1 = 1, col2 = 'a';
INSERT INTO t (id, col1) VALUES (1, 'a') AS new
  ON DUPLICATE KEY UPDATE col1 = new.col1;
INSERT INTO t1 (col1) SELECT col1 FROM t2;
```

See: [INSERT](https://dev.mysql.com/doc/refman/9.7/en/insert.html), [ON DUPLICATE KEY UPDATE](https://dev.mysql.com/doc/refman/9.7/en/insert-on-duplicate.html)

### Update

```sql
UPDATE t SET col1 = 'a' WHERE id = 1;
UPDATE t1 JOIN t2 ON t1.id = t2.id
  SET t1.col1 = t2.col1;
UPDATE t SET col1 = col1 + 1 ORDER BY id LIMIT 10;
```

See: [UPDATE statement](https://dev.mysql.com/doc/refman/9.7/en/update.html)

### Delete

```sql
DELETE FROM t WHERE id = 1;
DELETE FROM t ORDER BY id LIMIT 10;
DELETE t1 FROM t1 JOIN t2 ON t1.id = t2.id;
TRUNCATE TABLE t;
```

See: [DELETE statement](https://dev.mysql.com/doc/refman/9.7/en/delete.html)

## Schema

### Create database

```sql
CREATE DATABASE app CHARACTER SET utf8mb4;
USE app;
ALTER DATABASE app CHARACTER SET utf8mb4;
DROP DATABASE app;
```

See: [CREATE DATABASE](https://dev.mysql.com/doc/refman/9.7/en/create-database.html)

### Create table

```sql
CREATE TABLE t (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t2 (id INT PRIMARY KEY);
CREATE TEMPORARY TABLE tmp (id INT);
CREATE TABLE t3 LIKE t;
```

See: [CREATE TABLE statement](https://dev.mysql.com/doc/refman/9.7/en/create-table.html)

### Alter table

```sql
ALTER TABLE t ADD COLUMN col VARCHAR(20) AFTER id;
ALTER TABLE t MODIFY COLUMN col VARCHAR(50) NOT NULL;
ALTER TABLE t CHANGE COLUMN old new VARCHAR(50);
ALTER TABLE t RENAME COLUMN old TO new;
ALTER TABLE t DROP COLUMN col;
ALTER TABLE t ALTER COLUMN col SET DEFAULT 'x';
ALTER TABLE t ALTER COLUMN col DROP DEFAULT;
ALTER TABLE t RENAME TO t2;
```

See: [ALTER TABLE statement](https://dev.mysql.com/doc/refman/9.7/en/alter-table.html)

### Keys and constraints

```sql
CREATE TABLE t (
  id INT PRIMARY KEY,
  org_id INT NOT NULL,
  CONSTRAINT fk_org FOREIGN KEY (org_id)
    REFERENCES org (id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE t ADD CONSTRAINT fk_org
  FOREIGN KEY (org_id) REFERENCES org (id);
ALTER TABLE t ADD CONSTRAINT chk CHECK (qty > 0);
```

See: [FOREIGN KEY constraints](https://dev.mysql.com/doc/refman/9.7/en/create-table-foreign-keys.html), [CHECK constraints](https://dev.mysql.com/doc/refman/9.7/en/create-table-check-constraints.html)

### Indexes

```sql
CREATE INDEX idx_name ON t (name);
CREATE UNIQUE INDEX idx_email ON t (email);
CREATE INDEX idx_multi ON t (col1, col2);
ALTER TABLE t ADD INDEX idx_col (col);
DROP INDEX idx_name ON t;
```

See: [CREATE INDEX](https://dev.mysql.com/doc/refman/9.7/en/create-index.html)

## Inspecting

### Show and describe

```sql
SHOW DATABASES;
SHOW TABLES;
SHOW COLUMNS FROM t;
DESCRIBE t;
SHOW CREATE TABLE t;
SHOW INDEX FROM t;
SHOW GRANTS FOR CURRENT_USER;
```

See: [SHOW statements](https://dev.mysql.com/doc/refman/9.7/en/show.html)

### Process list

```sql
SHOW PROCESSLIST;
SHOW FULL PROCESSLIST;
KILL 123;
KILL QUERY 123;
KILL CONNECTION 123;
```

See: [KILL statement](https://dev.mysql.com/doc/refman/9.7/en/kill.html), [SHOW PROCESSLIST](https://dev.mysql.com/doc/refman/9.7/en/show-processlist.html)

## Users and privileges

### Create user and grant

```sql
CREATE USER 'app'@'localhost' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON app.* TO 'app'@'localhost';
GRANT SELECT, INSERT ON app.* TO 'app'@'localhost';
REVOKE INSERT ON app.* FROM 'app'@'localhost';
DROP USER 'app'@'localhost';
```

Host `%` matches any host; prefer `localhost` for local clients. Accounts default
to `caching_sha2_password`; `mysql_native_password` was removed in 9.0.

See: [CREATE USER](https://dev.mysql.com/doc/refman/9.7/en/create-user.html), [GRANT](https://dev.mysql.com/doc/refman/9.7/en/grant.html)

### Change password

```sql
ALTER USER 'app'@'localhost' IDENTIFIED BY 'new_secret';
SET PASSWORD FOR 'app'@'localhost' = 'new_secret';
SET PASSWORD = 'new_secret';
```

`ALTER USER` is preferred over `SET PASSWORD`.

See: [ALTER USER](https://dev.mysql.com/doc/refman/9.7/en/alter-user.html), [SET PASSWORD](https://dev.mysql.com/doc/refman/9.7/en/set-password.html)

### Roles

```sql
CREATE ROLE 'read_only';
GRANT SELECT ON app.* TO 'read_only';
GRANT 'read_only' TO 'app'@'localhost';
SET DEFAULT ROLE 'read_only' TO 'app'@'localhost';
DROP ROLE 'read_only';
```

See: [Using roles](https://dev.mysql.com/doc/refman/9.7/en/roles.html)

### Reset root password

Stop the running server first, then start recovery mode.

```bash
sudo systemctl stop mysql   # or: /etc/init.d/mysql stop
sudo mysqld_safe --user=mysql --skip-grant-tables --skip-networking &
mysql -u root
```

```sql
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_secret';
```

```bash
mysqladmin -u root -p shutdown
```

Restart MySQL normally afterwards. On systemd systems, start `mysqld` with the same flags and `--user=mysql` instead of `mysqld_safe`.

See: [How to reset the root password](https://dev.mysql.com/doc/refman/9.7/en/resetting-permissions.html)

## Backup and restore

### Backup

```bash
mysqldump -u root -p --single-transaction \
  --routines --triggers app > app.sql
mysqldump -u root -p --no-data app > schema.sql
```

`--single-transaction` gives a consistent InnoDB snapshot without locking tables.

See: [mysqldump](https://dev.mysql.com/doc/refman/9.7/en/mysqldump.html)

### Restore

```bash
mysql -u root -p -e 'CREATE DATABASE IF NOT EXISTS app'
mysql -u root -p app < app.sql
```

See: [Executing SQL from a file](https://dev.mysql.com/doc/refman/9.7/en/mysql-batch-commands.html)

### Check and repair

```bash
mysqlcheck -u root -p --all-databases
mysqlcheck -u root -p --all-databases --fast
mysqlcheck -u root -p --auto-repair app
```

`--fast` checks only tables that were not closed properly. `--auto-repair` cannot repair InnoDB tables; `REPAIR TABLE` supports MyISAM, ARCHIVE, and CSV only.

See: [mysqlcheck](https://dev.mysql.com/doc/refman/9.7/en/mysqlcheck.html), [REPAIR TABLE](https://dev.mysql.com/doc/refman/9.7/en/repair-table.html)

## Data types

### Integers

| Type        | Signed range                    |
| ---         | ---                             |
| `TINYINT`   | -128 to 127                     |
| `SMALLINT`  | -32,768 to 32,767               |
| `MEDIUMINT` | -8,388,608 to 8,388,607         |
| `INT`       | -2,147,483,648 to 2,147,483,647 |
| `BIGINT`    | -9.22e18 to 9.22e18             |

`UNSIGNED` disallows negatives and raises the upper bound.

See: [Integer types](https://dev.mysql.com/doc/refman/9.7/en/integer-types.html)

### Numeric

| Type           | Meaning            |
| ---            | ---                |
| `DECIMAL(M,D)` | Exact fixed-point  |
| `FLOAT`        | 4-byte approximate |
| `DOUBLE`       | 8-byte approximate |

`FLOAT(M,D)` and `DOUBLE(M,D)` are deprecated.

See: [Numeric types](https://dev.mysql.com/doc/refman/9.7/en/numeric-types.html)

### Strings

| Type                        | Maximum              |
| ---                         | ---                  |
| `CHAR(n)`                   | Fixed length, padded |
| `VARCHAR(n)`                | Variable length      |
| `TINYTEXT` / `TINYBLOB`     | 255 bytes            |
| `TEXT` / `BLOB`             | 65,535 bytes         |
| `MEDIUMTEXT` / `MEDIUMBLOB` | 16 MB                |
| `LONGTEXT` / `LONGBLOB`     | 4 GB                 |
| `ENUM('a','b')`             | One value from a list |

`utf8` is a deprecated alias for `utf8mb3`; use `utf8mb4`.

See: [String types](https://dev.mysql.com/doc/refman/9.7/en/string-types.html)

### Date and time

| Type        | Range                                              |
| ---         | ---                                                |
| `DATE`      | 1000-01-01 to 9999-12-31                           |
| `DATETIME`  | 1000-01-01 00:00:00 to 9999-12-31 23:59:59         |
| `TIMESTAMP` | 1970-01-01 00:00:01 UTC to 2038-01-19 03:14:07 UTC |
| `TIME`      | -838:59:59 to 838:59:59                            |
| `YEAR`      | 1901 to 2155                                       |

`TIMESTAMP` converts to the session time zone; `DATETIME` does not.

See: [Date and time types](https://dev.mysql.com/doc/refman/9.7/en/date-and-time-types.html)

### JSON

```sql
CREATE TABLE t (id INT PRIMARY KEY, doc JSON);
INSERT INTO t VALUES (1, '{"name": "Ada"}');
SELECT doc->>'$.name' FROM t;
UPDATE t SET doc = JSON_SET(doc, '$.age', 36);
ALTER TABLE t ADD COLUMN name VARCHAR(50)
  GENERATED ALWAYS AS (doc->>'$.name') STORED,
  ADD INDEX (name);
```

Index a generated column to index a JSON field.

See: [The JSON data type](https://dev.mysql.com/doc/refman/9.7/en/json.html)
