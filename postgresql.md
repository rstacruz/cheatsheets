---
title: PostgreSQL
subtitle: Object-relational database system
logo: { src: /assets/logos/postgresql.svg }
category: Databases
updated: 2026-11-25
keywords: [psql, postgres, SQL]
intro: |
  PostgreSQL is an open source object-relational database system. Its
  `psql` client runs SQL and meta-commands from a terminal.
links:
  - title: PostgreSQL documentation
    url: https://www.postgresql.org/docs/
tier: t3
last_verified_with: "PostgreSQL 19.0, psql 19.0."
---

### Connecting

```shell
psql                  # default database, default user
sudo -u postgres psql # as the postgres role
```
<!-- {: data-highlight="psql"} -->

See: [psql](https://www.postgresql.org/docs/current/app-psql.html)

### psql commands

| Command | Description |
| --- | --- |
| `\du` | List roles |
| `\l` | List databases |
| `\dt` | List tables |
| `\d <table>` | Describe a table |
| `\d+ <table>` | Describe with sizes |
| `\c <database>` | Connect to a database |
| `\q` | Quit |

<!-- {: .-shortcuts} -->

See: [Meta-commands](https://www.postgresql.org/docs/current/app-psql.html)

### Creating a database

```shell
createdb <database>
```
<!-- {: data-highlight="createdb"} -->

See: [createdb](https://www.postgresql.org/docs/current/app-createdb.html)

### Dropping a database

```shell
dropdb <database>
```
<!-- {: data-highlight="dropdb"} -->

See: [dropdb](https://www.postgresql.org/docs/current/app-dropdb.html)

### Running a query

```shell
psql -Atc "SELECT * FROM <table>"   # scripting
psql --no-align --tuples-only \
  --command="SELECT * FROM <table>" # same
```
<!-- {: data-highlight="-Atc; --command"} -->

See: [psql](https://www.postgresql.org/docs/current/app-psql.html)
