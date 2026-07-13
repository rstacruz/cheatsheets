---
title: PostgreSQL
category: Databases
---

### Console

    $ psql #logs in to default database & default user
    $ sudo -u <rolename:postgres> psql #logs in with a particular user
    $ sudo psql -h <HOST> -p <PORT> -U <DB_USER> <DB_NAME> # log into postgres specifying host, port, user and db

Replace anything within `<placeholder>` accordingly

### Commands

 * Show roles: `\du`
 * Show tables: `\dt`
 * Show databases: `\l`
 * Show schemas: `\dn`
 * Show views: `\dv`
 * Show tables: `\dt` or `\dt+`
 * Show stored procedure: `\df+ <function_name>`
 * Show tables with more information: `\dt+`
 * Connect to a database: `\c <database>`
 * Show columns of a table: `\d <table>` or `\d+ <table>`
 * Quit: `\q`

### Creating database

     $ createdb databasename
