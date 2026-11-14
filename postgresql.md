---
title: PostgreSQL
category: Databases
updated: 2026-11-04
keywords: [psql, postgres, SQL]
intro: |
  PostgreSQL is an open source object-relational database system. Its
  `psql` client runs SQL and meta-commands from a terminal.
links:
  - title: PostgreSQL documentation
    url: https://www.postgresql.org/docs/
---

### Connecting

```shell
psql                  # default database, default user
sudo -u postgres psql # as the postgres role
```

### psql commands

| Command          | Description             |
| ---              | ---                     |
| `\du`            | List roles              |
| `\l`             | List databases          |
| `\dt`            | List tables             |
| `\d <table>`     | Describe a table        |
| `\d+ <table>`    | Describe with sizes     |
| `\c <database>`  | Connect to a database   |
| `\q`             | Quit                    |

<!-- {: .-shortcuts} -->

### Creating a database

```shell
createdb <database>
```

### Dropping a database

```shell
dropdb <database>
```

### Running a query

```shell
psql -Atc "SELECT * FROM <table>"   # scripting
psql --no-align --tuples-only \
  --command="SELECT * FROM <table>" # same
```
