---
title: PostgreSQL
category: Databases
layout: 2017/sheet
updated: 2026-07-30
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
