---
title: Knex
subtitle: SQL query builder
logo: { src: /assets/logos/knex.svg }
last_verified_with: "Knex 3.3.0."
created_at: 2017-09-23
updated: 2026-11-25
tier: t3
category: Databases
intro: |
  [Knex](https://knexjs.org/) is an SQL query builder for Node.js.
  This guide targets Knex 3.3.0.
links:
  - title: Knex documentation
    url: https://knexjs.org/guide/
---

## Getting started

<!-- {: .-three-column} -->

### Connect

```js
require('knex')({
  client: 'pg',
  connection: 'postgres://user:pass@' +
    'localhost:5432/dbname'
})
```
<!-- {: data-highlight="require('knex')"} -->

See: [Installation](https://knexjs.org/guide/#installation)

### Create table

```js
knex.schema
  .createTable('user', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('age')
  })
  .then(() => ···)
```
<!-- {: data-highlight="createTable"} -->

See: [Create table](https://knexjs.org/guide/schema-builder.html#createtable)

### Select

```js
knex('users')
  .where({ email: 'hi@example.com' })
  .then(rows => ···)
```
<!-- {: data-highlight="where"} -->

See: [Selects](https://knexjs.org/guide/query-builder.html#select)

### Insert

```js
knex('users')
  .insert({ email: 'hi@example.com' })
```
<!-- {: data-highlight="insert"} -->

See: [Insert](https://knexjs.org/guide/query-builder.html#insert)

### Update

```js
knex('users')
  .where({ id: 135 })
  .update({ email: 'hi@example.com' })
```
<!-- {: data-highlight="update"} -->

See: [Update](https://knexjs.org/guide/query-builder.html#update)

### Migrations

```bash
knex init
knex migrate:make migration_name
knex migrate:make migration_name -x ts
knex migrate:latest
knex migrate:rollback
```
<!-- {: data-highlight="knex migrate:"} -->

See: [Migration CLI](https://knexjs.org/guide/migrations.html#migration-cli)

### Seeds

```bash
knex seed:make seed_name
knex seed:make seed_name -x ts  # TS seed
knex seed:run # Runs all seed files
knex seed:run --specific=seed-filename.js
```
<!-- {: data-highlight="seed:make; seed:run"} -->

See: [Seed CLI](https://knexjs.org/guide/migrations.html#seed-cli)

## Connect

<!-- {: .-three-column} -->

### Libraries

| Driver | Database |
| --- | --- |
| `pg` | PostgreSQL |
| `mysql` | MySQL or MariaDB |
| `sqlite3` | SQLite 3 |
| `mssql` | MSSQL |

Install any of these packages along with `knex`.

See: [Installation](https://knexjs.org/guide/#installation)

### Connect via host

```js
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'myapp_test'
  },
  pool: { min: 0, max: 7 }
})
```
<!-- {: data-highlight="connection"} -->

See: [Node.js installation](https://knexjs.org/guide/#node-js)

### Connect via URL

```js
var pg = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,public',
  pool: { min: 0, max: 7 }
})
```
<!-- {: data-highlight="process.env.DATABASE_URL"} -->

See: [Configuration options](https://knexjs.org/guide/#configuration-options)

### Connect via SQLite

```js
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './mydb.sqlite'
  }
})
```
<!-- {: data-highlight="client: 'sqlite3'"} -->

See: [Node.js installation](https://knexjs.org/guide/#node-js)

## Select

### Where

```js
knex
  .from('books')
  .select('title', 'author', 'year')
```

#### Where

```js
  .where('title', 'Hello')
  .where({ title: 'Hello' })
  .whereIn('id', [1, 2, 3])
  .whereNot(···)
  .whereNotIn('id', [1, 2, 3])
```
<!-- {: data-highlight="whereIn; whereNotIn"} -->

#### Where conditions

```js
  .whereNull('updated_at')
  .whereNotNull(···)
```
<!-- {: data-highlight="whereNull; whereNotNull"} -->

```js
  .whereExists('updated_at')
  .whereNotExists(···)
```
<!-- {: data-highlight="whereExists; whereNotExists"} -->

```js
  .whereBetween('votes', [1, 100])
  .whereNotBetween(···)
```
<!-- {: data-highlight="whereBetween; whereNotBetween"} -->

```js
  .whereRaw('id = ?', [1])
```
<!-- {: data-highlight="whereRaw"} -->

#### Where grouping

```js
  .where(function () {
    this
      .where('id', 1)
      .orWhere('id', '>', 10)
  })
```
<!-- {: data-highlight="orWhere"} -->

See: [Where clauses](https://knexjs.org/guide/query-builder.html#where-clauses)

### Join

```js
knex('users')
```

#### Basic join

```js
  .join('contacts', 'users.id', '=', 'contacts.id')
  .join('contacts', {'users.id': 'contacts.id'})
```
<!-- {: data-highlight="join"} -->

#### Strings

```js
  .join('accounts', 'accounts.type', '=', knex.raw('?', ['admin']))
```
<!-- {: data-highlight="knex.raw"} -->

#### Directions

```js
  .leftJoin(···)
  .leftOuterJoin(···)
  .rightJoin(···)
  .rightOuterJoin(···)
  .outerJoin(···)
  .fullOuterJoin(···)
  .crossJoin(···)
```
<!-- {: data-highlight="leftJoin; rightJoin; fullOuterJoin; crossJoin"} -->

#### Raw

```js
  .joinRaw('natural full join table1')
```
<!-- {: data-highlight="joinRaw"} -->

#### Grouping

```js
  .join('accounts', function () {
    this
      .on('accounts.id', '=', 'users.account_id')
      .orOn('accounts.owner_id', '=', 'users.id')

      .onIn('accounts.id', [1, 2, 3, 5, 8])
      .onNotIn(···)

      .onNull('accounts.email')
      .onNotNull(···)

      .onExists(function () {
        this.select(···)
      })
      .onNotExists(···)
  })
```
<!-- {: data-highlight="on; orOn"} -->

See: [Join methods](https://knexjs.org/guide/query-builder.html#join-methods)

### Others

```js
knex('users')
  .distinct()
```
<!-- {: data-highlight="distinct"} -->

#### Group

```js
  .groupBy('count')
  .groupByRaw('year WITH ROLLUP')
```
<!-- {: data-highlight="groupBy; groupByRaw"} -->

#### Order

```js
  .orderBy('name', 'desc')
  .orderByRaw('name DESC')
```
<!-- {: data-highlight="orderBy; orderByRaw"} -->

#### Offset/limit

```js
  .offset(10)
  .limit(20)
```
<!-- {: data-highlight="offset; limit"} -->

#### Having

```js
  .having('count', '>', 100)
  .havingIn('count', [1, 100])
```
<!-- {: data-highlight="having; havingIn"} -->

#### Union

```js
  .union(function () {
    this.select(···)
  })
  .unionAll(···)
```
<!-- {: data-highlight="union; unionAll"} -->

See: [Query builder](https://knexjs.org/guide/query-builder.html#select)

### Etc

#### Pluck

```js
knex('users')
  .pluck('id')
  .then(ids => { ··· })
```
<!-- {: data-highlight="pluck"} -->

#### First

```js
knex('users')
  .first()
  .then(user => { ··· })
```
<!-- {: data-highlight="first"} -->

#### Booleans

```js
  .count('active')
  .count('active as is_active')
```
<!-- {: data-highlight="count"} -->

#### Numbers

```js
  .min('age')
  .max('age')
  .sum('age')
  .sumDistinct('age')
  .avg('age')
```
<!-- {: data-highlight="min; max; sum; avg"} -->

See: [Query builder](https://knexjs.org/guide/query-builder.html#pluck)

## Schema

### Create table

```js
knex.schema.createTable('accounts', table => {
```
<!-- {: data-highlight="knex.schema.createTable"} -->

#### Columns

```js
  table.increments('id')
  table.string('account_name')
  table.integer('age')
  table.float('age')
  table.decimal('balance', 8, 2)
  table.boolean('is_admin')
  table.date('birthday')
  table.time('created_at')
  table.timestamp('created_at').defaultTo(knex.fn.now())
  table.json('profile')
  table.jsonb('profile')
  table.uuid('id').primary()
```

#### Constraints

```js
  table.unique('email')
  table.unique(['email', 'company_id'])
  table.dropUnique(···)
```
<!-- {: data-highlight="unique; dropUnique"} -->

#### Indices

```js
  table.foreign('company_id')
    .references('companies.id')
  table.dropForeign(···)
```
<!-- {: data-highlight="foreign; references; dropForeign"} -->

#### Variations

```js
  table.integer('user_id')
    .unsigned()
    .references('users.id')
```
<!-- {: data-highlight="unsigned"} -->

```js
})
.then(() => ···)
```

See: [Schema builder](https://knexjs.org/guide/schema-builder.html#createtable)

### Alter table

```js
knex.schema.table('accounts', table => {
```
<!-- {: data-highlight="knex.schema.table"} -->

#### Create

```js
  table.string('first_name')
```
<!-- {: data-highlight="table.string"} -->

#### Alter

```js
  table.string('first_name').alter()
  table.renameColumn('admin', 'is_admin')
```
<!-- {: data-highlight="alter; renameColumn"} -->

#### Drop

```js
  table.dropColumn('admin')
  table.dropTimestamps('created_at')
```
<!-- {: data-highlight="dropColumn; dropTimestamps"} -->

```js
})
```

See: [Schema builder](https://knexjs.org/guide/schema-builder.html#altertable)

### Other methods

#### Rename and drop

```js
knex.schema
  .renameTable('persons', 'people')
  .dropTable('persons')
```
<!-- {: data-highlight="renameTable; dropTable"} -->

#### Check

```js
  .hasTable('users').then(exists => ···)
  .hasColumn('users', 'id').then(exists => ···)
```
<!-- {: data-highlight="hasTable; hasColumn"} -->

See: [Schema builder](https://knexjs.org/guide/schema-builder.html#renametable)

## Modifying

<!-- {: .-three-column} -->

### Insert

```js
knex('users')
```

#### Insert one

```js
  .insert({ name: 'John' })
```

#### Insert many

```js
  .insert([
    { name: 'Starsky' },
    { name: 'Hutch' }
  ])
```
<!-- {: data-highlight=".insert(["} -->

See: [Insert](https://knexjs.org/guide/query-builder.html#insert)

### Update

```js
knex('users')
  .where({ id: 2 })
  .update({ name: 'Homer' })
```
<!-- {: data-highlight="name: 'Homer'"} -->

See: [Update](https://knexjs.org/guide/query-builder.html#update)

### Delete

```js
knex('users')
  .where({ id: 2 })
  .del()
```
<!-- {: data-highlight=".del()"} -->

See: [Delete](https://knexjs.org/guide/query-builder.html#del-delete)

## Migrations

### Setting up

#### Create knexfile.js

```
./node_modules/.bin/knex init
```
<!-- {: data-highlight="knex init"} -->

#### Create a migration

```
knex migrate:make migration_name
knex migrate:make migration_name --env production
```
<!-- {: data-highlight="knex migrate:make"} -->

See: [Knexfile](https://knexjs.org/guide/migrations.html#knexfile-js)

### Running migrations

#### Run migrations

```
knex migrate:latest
knex migrate:latest --env production
```
<!-- {: data-highlight="migrate:latest"} -->

#### Rollback

```
knex migrate:rollback
knex migrate:rollback --env production
```
<!-- {: data-highlight="migrate:rollback"} -->

See: [Migration CLI](https://knexjs.org/guide/migrations.html#migration-cli)
