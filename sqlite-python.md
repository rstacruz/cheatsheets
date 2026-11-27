---
title: How to use SQLite from Python
link_title: SQLite in Python
subtitle: Query a database with sqlite3
logo: { src: /assets/logos/sqlite.svg, mono: true }
category: Databases
layout: snippet
tier: t3
last_verified_with: "Python 3.14.10, SQLite 3.54.0."
updated: 2026-11-27
links:
  - title: Python sqlite3
    url: https://docs.python.org/3/library/sqlite3.html
---

## Using sqlite3
<!-- {: .-snippets} -->

### Connect and query
<!-- {: .-snippet} -->

```python
import sqlite3

conn = sqlite3.connect('app.db')
rows = conn.execute(
    'SELECT id, name FROM users'
).fetchall()
print(rows)
# [(1, 'Ada'), (2, 'Grace')]
```
<!-- {: data-highlight="sqlite3.connect"} -->

**Opens or creates the file.** `execute()` returns a cursor, and `fetchall()` reads every row; see [sqlite3.connect](https://docs.python.org/3/library/sqlite3.html#sqlite3.connect).

### Bind parameters
<!-- {: .-snippet} -->

```python
conn.execute(
    'SELECT name FROM users WHERE id = ?',
    (1,),
).fetchone()
# ('Ada',)
```
<!-- {: data-highlight="?"} -->

**Passes values separately from SQL.** Placeholders handle quoting and types; see [placeholders](https://docs.python.org/3/library/sqlite3.html#sqlite3-placeholders).

### Insert many rows
<!-- {: .-snippet} -->

```python
with conn:
    conn.executemany(
        'INSERT INTO users (name) VALUES (?)',
        [('Linus',), ('Ken',)],
    )
```
<!-- {: data-highlight="executemany"} -->

**Commits the batch in one transaction.** The `with` block rolls back on error; see [transactions](https://docs.python.org/3/library/sqlite3.html#sqlite3-controlling-transactions).

### Read rows by column
<!-- {: .-snippet} -->

```python
conn.row_factory = sqlite3.Row
row = conn.execute(
    'SELECT id, name FROM users'
).fetchone()
print(row['name'])
# Ada
```
<!-- {: data-highlight="sqlite3.Row"} -->

**Returns rows that support column names.** `dict(row)` converts one to a plain dictionary; see [Row objects](https://docs.python.org/3/library/sqlite3.html#sqlite3.Row).

### Back up the database
<!-- {: .-snippet} -->

```python
with sqlite3.connect('backup.db') as target:
    conn.backup(target)
```
<!-- {: data-highlight=".backup("} -->

**Makes a consistent copy.** The copy is safe while other connections keep using the source; see [Connection.backup](https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.backup).
