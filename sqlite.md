---
title: SQLite
subtitle: Embedded SQL database
category: Databases
tier: t2
updated: 2026-11-27
last_verified_with: "SQLite 3.54.0, Python 3.14.10."
fragments:
  - "sqlite3 app.db"
  - ".tables"
  - ".schema"
  - ".mode box"
  - ".headers on"
  - ".import --csv"
  - ".backup app.db"
  - "PRAGMA"
  - "journal_mode=WAL"
  - "foreign_keys=ON"
  - "VACUUM INTO"
  - "STRICT"
  - "ON CONFLICT"
  - "RETURNING"
  - "json_extract()"
  - "sqlite3.connect"
  - "row_factory"
  - ".dump"
keywords:
  - sqlite
  - sqlite3
  - sqlite commands
  - sqlite show tables
  - sqlite pragma
intro: |
  SQLite is an embedded SQL database kept in one file. The `sqlite3` CLI runs
  SQL and dot-commands; Python ships a `sqlite3` module.
links:
  - title: SQLite documentation
    url: https://sqlite.org/docs.html
  - title: Command-line shell
    url: https://sqlite.org/cli.html
  - title: Python sqlite3
    url: https://docs.python.org/3/library/sqlite3.html
---

## Getting started

### Open a database

```sh
sqlite3 app.db      # create or open a file
sqlite3 :memory:    # temporary in-memory database
```
<!-- {: data-highlight="sqlite3 app.db"} -->

A file database is created on the first write. `:memory:` disappears on exit.

See: [Command-line shell](https://sqlite.org/cli.html)

### Dot-commands

| Command | Description |
| --- | --- |
| `.tables` | List tables |
| `.schema <table>` | Show CREATE statements |
| `.databases` | List attached files |
| `.indexes <table>` | List indexes |
| --- | --- |
| `.mode <mode>` | Set output format |
| `.headers on` | Show column names |
| `.import <file> <table>` | Import CSV or text |
| `.output <file>` | Send output to a file |
| --- | --- |
| `.once <file>` | Send one query to a file |
| `.read <file>` | Run SQL from a file |
| `.dump` | Export the database as SQL |
| `.backup <file>` | Copy the database |
| `.restore <file>` | Load a database copy |
| `.quit` | Exit |

Dot-commands start at the beginning of a line and take no semicolon.

See: [Dot-commands](https://sqlite.org/cli.html#dot_commands)

### Output formats

```sh
sqlite3 app.db ".mode box" ".headers on" \
  "select id, name from users;"
```
<!-- {: data-highlight=".mode box"} -->

#### Output

```text
╭────┬───────╮
│ id │ name  │
╞════╪═══════╡
│  1 │ Ada   │
│  2 │ Grace │
│  3 │ Linus │
╰────┴───────╯
```

#### Modes

| Mode | Output |
| --- | --- |
| `box` | Unicode table |
| `csv` | Comma-separated values |
| `json` | JSON array |
| `markdown` | Markdown table |
| `insert` | INSERT statements |
| `line` | One column per line |

Modes and headers reset when a new session starts.

See: [Output formats](https://sqlite.org/cli.html#output_formats)

### Run a SQL file

```sh
sqlite3 app.db < schema.sql
```
<!-- {: data-highlight="schema.sql"} -->

Inside a session, `.read schema.sql` runs the same file.

See: [Reading SQL from a file](https://sqlite.org/cli.html#reading_sql_from_a_file)

### Import CSV

```sh
sqlite3 app.db ".import --csv --skip 1 users.csv users"
```
<!-- {: data-highlight=".import --csv"} -->

`--skip 1` drops the header row. When the table is missing, `.import` creates it from the header names.

See: [Import](https://sqlite.org/cli.html#import)

### Export to CSV

```sh
sqlite3 app.db ".mode csv" ".headers on" \
  ".once users.csv" "select * from users;"
```
<!-- {: data-highlight=".once users.csv"} -->

`.once` writes the next query only. `.output` redirects every result until it is changed.

See: [CSV export](https://sqlite.org/cli.html#csv_export)

## Schema

### Types

| Type | Stores |
| --- | --- |
| `INTEGER` | Whole numbers |
| `REAL` | Floating point |
| `TEXT` | Strings |
| `BLOB` | Raw bytes |
| `NULL` | Missing value |

Declared types such as `VARCHAR(80)` map to one of five affinities, and lengths are not enforced.

See: [Datatypes](https://sqlite.org/datatype3.html)

### Create a table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TEXT DEFAULT (datetime('now'))
);
```
<!-- {: data-highlight="CREATE TABLE"} -->

`INTEGER PRIMARY KEY` aliases the hidden rowid. Timestamps have no dedicated type; store them as text, real, or integer.

See: [CREATE TABLE](https://sqlite.org/lang_createtable.html)

### STRICT tables

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
) STRICT;
```
<!-- {: data-highlight="STRICT"} -->

`STRICT` rejects values that cannot be converted losslessly, such as a blob in a text column.

See: [STRICT tables](https://sqlite.org/stricttables.html)

### Primary keys

```sql
CREATE TABLE tags (
  name TEXT PRIMARY KEY,
  slug TEXT
) WITHOUT ROWID;
```
<!-- {: data-highlight="WITHOUT ROWID"} -->

Every table has a hidden `rowid` unless `WITHOUT ROWID` is set. `AUTOINCREMENT` prevents rowid reuse, at some cost.

See: [ROWID and the INTEGER PRIMARY KEY](https://sqlite.org/lang_createtable.html#rowid)

### Alter a table

#### Add a column

```sql
ALTER TABLE users ADD COLUMN active INTEGER DEFAULT 1;
```
<!-- {: data-highlight="ADD COLUMN"} -->

#### Rename a column

```sql
ALTER TABLE users RENAME COLUMN name TO full_name;
```
<!-- {: data-highlight="RENAME COLUMN"} -->

#### Drop a column

```sql
ALTER TABLE users DROP COLUMN active;
```
<!-- {: data-highlight="DROP COLUMN"} -->

Other schema changes need a new table, a copy, and a rename.

See: [ALTER TABLE](https://sqlite.org/lang_altertable.html)

### Indexes

```sql
CREATE INDEX posts_user_id ON posts(user_id);
CREATE UNIQUE INDEX users_email ON users(email);
```
<!-- {: data-highlight="CREATE INDEX; CREATE UNIQUE INDEX"} -->

Index columns used in joins and filters. A unique index also enforces the constraint.

See: [CREATE INDEX](https://sqlite.org/lang_createindex.html)

## Queries

### Upsert

```sql
INSERT INTO users (id, name, email)
VALUES (1, 'Ada Lovelace', 'ada@example.com')
ON CONFLICT(id) DO UPDATE SET name = excluded.name;
```
<!-- {: data-highlight="ON CONFLICT"} -->

`excluded` holds the row the insert proposed. Use `DO NOTHING` to skip duplicates.

See: [UPSERT](https://sqlite.org/lang_upsert.html)

### Return inserted rows

```sql
INSERT INTO posts (user_id, title)
VALUES (1, 'Hello')
RETURNING id, title;
```
<!-- {: data-highlight="RETURNING"} -->

`RETURNING` also works with `UPDATE` and `DELETE`.

See: [RETURNING](https://sqlite.org/lang_returning.html)

### Query JSON

#### Extract a field

```sql
SELECT json_extract(payload, '$.type') AS type
FROM events;
```
<!-- {: data-highlight="json_extract("} -->

#### Expand an array

```sql
SELECT events.id, tags.value AS tag
FROM events,
     json_each(events.payload, '$.tags') AS tags;
```
<!-- {: data-highlight="json_each("} -->

`->` keeps JSON quoting and `->>` returns plain text. `json_each` turns an array into rows.

See: [JSON functions](https://sqlite.org/json1.html)

### Dates and times

| Call | Result |
| --- | --- |
| `date('now')` | Current UTC date |
| `strftime('%Y-%m', '2026-01-15')` | `2026-01` |
| `julianday('2026-01-02') - julianday('2026-01-01')` | `1.0` |
| `unixepoch('2026-01-01')` | `1767225600` |
| `datetime('2026-01-31 23:00:00', '+1 hour')` | `2026-02-01 00:00:00` |

SQLite has no date type: store ISO-8601 text or Unix seconds and use these functions.

See: [Date and time functions](https://sqlite.org/lang_datefunc.html)

## PRAGMA

### Common pragmas

| Pragma | Effect |
| --- | --- |
| `PRAGMA journal_mode` | Read or set `delete`, `wal`, `memory` |
| `PRAGMA foreign_keys` | Enforce foreign keys (off by default) |
| `PRAGMA busy_timeout` | Wait for locks, in milliseconds |
| `PRAGMA synchronous` | Durability: `FULL`, `NORMAL`, `OFF` |
| --- | --- |
| `PRAGMA user_version` | Store a schema version |
| `PRAGMA table_info(t)` | Columns, types, and defaults |
| `PRAGMA index_list(t)` | Indexes on a table |
| `PRAGMA integrity_check` | Verify the database file |
| `PRAGMA optimize` | Refresh query-planner statistics |

`foreign_keys` and `busy_timeout` apply to one connection. `journal_mode` and `user_version` persist in the file.

See: [PRAGMA](https://sqlite.org/pragma.html)

### WAL mode

```sh
sqlite3 app.db "PRAGMA journal_mode=WAL;"
```
<!-- {: data-highlight="journal_mode=WAL"} -->

Prints `wal`, and the setting persists in the file. WAL lets readers run while a writer holds the lock.

See: [Write-ahead logging](https://sqlite.org/wal.html)

### Foreign keys

```sh
sqlite3 app.db "PRAGMA foreign_keys=ON;"
```
<!-- {: data-highlight="foreign_keys=ON"} -->

Foreign keys are off by default, so enable them on every connection, including in Python.

See: [Foreign keys](https://sqlite.org/foreignkeys.html)

### Inspect a schema

#### Columns

```sql
SELECT name, type FROM pragma_table_info('users');
```
<!-- {: data-highlight="pragma_table_info("} -->

#### Indexes

```sql
PRAGMA index_list('posts');
```
<!-- {: data-highlight="index_list("} -->

The `pragma_*` functions are table-valued, so they work in joins and filters.

See: [table_info](https://sqlite.org/pragma.html#pragma_table_info)

### Check and maintain

```sh
sqlite3 app.db "PRAGMA integrity_check;"
```
<!-- {: data-highlight="integrity_check"} -->

Prints `ok` for a healthy file. `VACUUM` rebuilds and shrinks the database; `PRAGMA optimize` refreshes statistics.

See: [integrity_check](https://sqlite.org/pragma.html#pragma_integrity_check)

## Backup and restore

### Copy a database

#### Back up

```sh
sqlite3 app.db ".backup backup.db"
```
<!-- {: data-highlight=".backup backup.db"} -->

#### Restore

```sh
sqlite3 app.db ".restore backup.db"
```
<!-- {: data-highlight=".restore backup.db"} -->

`.backup` takes a consistent copy while other connections are open; copying the file with `cp` can capture a partial write.

See: [Backup and restore](https://sqlite.org/cli.html#backup)

### Create a compact copy

```sh
sqlite3 app.db "VACUUM INTO 'snapshot.db';"
```
<!-- {: data-highlight="VACUUM INTO"} -->

Writes a vacuumed copy and fails if the target file already exists.

See: [VACUUM](https://sqlite.org/lang_vacuum.html)

### Dump to SQL

#### Export

```sh
sqlite3 app.db ".dump" > dump.sql
```
<!-- {: data-highlight=".dump"} -->

#### Load

```sh
sqlite3 new.db < dump.sql
```
<!-- {: data-highlight="new.db"} -->

The dump holds schema and data as SQL statements, which also restores into another database.

See: [Converting a database to a text file](https://sqlite.org/cli.html#converting_an_entire_database_to_a_text_file)

## Python

### Connect and query

```python
import sqlite3

conn = sqlite3.connect('app.db')
conn.execute('SELECT count(*) FROM users').fetchone()
# (3,)
```
<!-- {: data-highlight="sqlite3.connect"} -->

`connect()` creates the file when it is missing, and `execute()` returns a cursor.

See: [Python sqlite3](https://docs.python.org/3/library/sqlite3.html#sqlite3.connect)

### Use parameters

#### Positional

```python
conn.execute(
    'SELECT name FROM users WHERE id = ?',
    (1,),
).fetchone()
# ('Ada',)
```
<!-- {: data-highlight="?"} -->

#### Named

```python
conn.execute(
    'SELECT name FROM users WHERE id = :id',
    {'id': 1},
).fetchone()
```
<!-- {: data-highlight=":id"} -->

Never format values into SQL; placeholders handle quoting and types.

See: [Placeholders](https://docs.python.org/3/library/sqlite3.html#sqlite3-placeholders)

### Insert many rows

```python
with conn:
    conn.executemany(
        'INSERT INTO users (name) VALUES (?)',
        [('Linus',), ('Ken',)],
    )
```
<!-- {: data-highlight="executemany"} -->

The `with` block commits on success and rolls back on error. It does not close the connection.

See: [Transactions](https://docs.python.org/3/library/sqlite3.html#sqlite3-controlling-transactions)

### Rows as dictionaries

```python
conn.row_factory = sqlite3.Row
row = conn.execute('SELECT id, name FROM users').fetchone()
row['name']
# 'Ada'
```
<!-- {: data-highlight="row_factory"} -->

`sqlite3.Row` supports index and column-name access; `dict(row)` converts it.

See: [Row objects](https://docs.python.org/3/library/sqlite3.html#sqlite3.Row)

### Back up from Python

```python
with sqlite3.connect('backup.db') as target:
    conn.backup(target)
```
<!-- {: data-highlight=".backup("} -->

The backup API makes a consistent copy, safe while other connections use the database.

See: [Connection.backup](https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.backup)

## Also see

- [SQL cheatsheet](./sql)
- [SQL joins cheatsheet](./sql-join)
- [PostgreSQL cheatsheet](./postgresql)
- [MySQL cheatsheet](./mysql)
<!-- {: .-also-see} -->
