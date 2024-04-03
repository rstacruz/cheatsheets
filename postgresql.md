---
title: PostgreSQL
category: Databases
---

### Console

    $ psql #logs in to default database & default user
    $ sudo -u <rolename:postgres> psql #logs in with a particular user

Replace anything within `<placeholder>` accordingly

### Commands

 * Show roles: `\du`
 * Show tables: `\dt`
 * Show databases: `\l`
 * Connect to a database: `\c <database>`
 * Show columns of a table: `\d <table>` or `\d+ <table>`
 * Quit: `\q`

### Creating database

     $ createdb databasename
