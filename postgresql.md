---
title: PostgreSQL
layout: 2017/sheet

category: Databases
updated: 2024-01-15
intro: |
  PostgreSQL is a powerful, open source object-relational database system.
  It provides the `psql` command line tool for interacting with its database.
---

### Console

```shell
psql # logs in to default database & default user
sudo -u <rolename:postgres> psql # logs in with a particular user
```

Replace anything within `<placeholder>` accordingly

### Commands

* Show roles: `\du`
* Show tables: `\dt`
* Show databases: `\l`
* Connect to a database: `\c <database>`
* Show columns of a table: `\d <table>` or `\d+ <table>`
* Quit: `\q`

### Creating database

```shell
createdb <databasename>
```
