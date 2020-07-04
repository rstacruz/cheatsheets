---
title: Knex
layout: 2017/sheet
updated: 2020-06-03
category: Databases
intro: |
  [Knex](http://knexjs.org/) is an SQL query builder for Node.js.
  This guide targets v0.13.0.
---

## Getting started
{: .-three-column}

### Connect

```js
require('knex')({
  client: 'pg',
  connection: 'postgres://user:pass@localhost:5432/dbname'
})
```

See: [Connect](#connect-1)

### Create table

```js
knex.schema.createTable('user', (table) => {
  table.increments('id')
  table.string('name')
  table.integer('age')
})
.then(() => ···)
```

See: [Schema](#schema)

### Select

```js
knex('users')
  .where({ email: 'hi@example.com' })
  .then(rows => ···)
```
{: data-line="2"}

See: [Select](#select-1)

### Insert

```js
knex('users')
  .insert({ email: 'hi@example.com' })
```
{: data-line="2"}

See: [Insert](#insert-1)

### Update

```js
knex('users')
  .where({ id: 135 })
  .update({ email: 'hi@example.com' })
```
{: data-line="2,3"}

See: [Update](#update-1)

### Migrations

```bash
knex init
knex migrate:make migration_name
knex migrate:make migration_name -x ts # Generates a TypeScript migration file
knex migrate:latest
knex migrate:rollback
```

See: [Migrations](#migrations-1)

### Seeds

```bash
knex seed:make seed_name
knex seed:make seed_name -x ts # Generates a TypeScript seed file
knex seed:run # Runs all seed files
knex seed:run --specific=seed-filename.js # Runs a specific seed file
```

See: [Seeds](http://knexjs.org/#Seeds)

## Connect
{: .-three-column}

### Libraries

| `pg` | PostgreSQL |
| `mysql` | MySQL or MariaDB |
| `sqlite3` | Sqlite3 |
| `mssql` | MSSQL |

Install any of these packages along with `knex`.

See: [Node.js installation](http://knexjs.org/#Installation-node)

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
{: data-line="2,3"}

See: [Initializing the library](http://knexjs.org/#Installation-client)

### Connect via URL

```js
var pg = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex,public',
  pool: { min: 0, max: 7 }
})
```
{: data-line="2,3"}

### Connect via Sqlite

```js
var knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: './mydb.sqlite' }
})
```
{: data-line="2,3"}

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

#### Where conditions

```js
  .whereNull('updated_at')
  .whereNotNull(···)
```

```js
  .whereExists('updated_at')
  .whereNotExists(···)
```

```js
  .whereBetween('votes', [1, 100])
  .whereNotBetween(···)
```

```js
  .whereRaw('id = ?', [1])
```

#### Where grouping

```js
  .where(function () {
    this
      .where('id', 1)
      .orWhere('id', '>', 10)
  })
```

See: [Where clauses](http://knexjs.org/#Builder-wheres)

### Join

```js
knex('users')
```

#### Basic join

```js
  .join('contacts', 'users.id', '=', 'contacts.id')
  .join('contacts', {'users.id': 'contacts.id'})
```

#### Strings

```js
  .join('accounts', 'accounts.type', '=', knex.raw('?', ['admin']))
```

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

#### Raw

```js
  .joinRaw('natural full join table1')
```

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

See: [Join methods](http://knexjs.org/#Builder-join)

### Others

```js
knex('users')
  .distinct()
```

#### Group

```js
  .groupBy('count')
  .groupByRaw('year WITH ROLLUP')
```

#### Order
```js
  .orderBy('name', 'desc')
  .orderByRaw('name DESC')
```

#### Offset/limit

```js
  .offset(10)
  .limit(20)
```

#### Having

```js
  .having('count', '>', 100)
  .havingIn('count', [1, 100])
```

#### Union

```js
  .union(function() {
    this.select(···)
  })
  .unionAll(···)
```

See: [Query builder](http://knexjs.org/#Builder)

### Etc

```js
knex('users')
  .pluck('id')
  .then(ids => { ··· })
```
```js
knex('users')
  .first()
  .then(user => { ··· })
```

#### Booleans

```js
  .count('active')
  .count('active as is_active')
```

#### Numbers

```js
  .min('age')
  .max('age')
  .sum('age')
  .sumDistinct('age')
  .avg('age')
```

See: [Query builder](http://knexjs.org/#Builder)

## Schema

### Create table

```js
knex.schema.createTable('accounts', table => {
```

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

#### Indices

```js
  table.foreign('company_id')
    .references('companies.id')
  table.dropForeign(···)
```

#### Variations

```js
  table.integer('user_id')
    .unsigned()
    .references('users.id')
```

```js
})
.then(() => ···)
```
{: .-setup}

See: [Schema builder](http://knexjs.org/#Schema)

### Alter table

```js
knex.schema.table('accounts', table => {
```

#### Create

```js
  table.string('first_name')
```

#### Alter

```js
  table.string('first_name').alter()
  table.renameColumn('admin', 'is_admin')
```

#### Drop

```js
  table.dropColumn('admin')
  table.dropTimestamps('created_at')
```

```js
})
```
{: .-setup}

See: [Schema builder](http://knexjs.org/#Schema)

### Other methods

```js
knex.schema
  .renameTable('persons', 'people')
  .dropTable('persons')
```

```js
  .hasTable('users').then(exists => ···)
  .hasColumn('users', 'id').then(exists => ···)
```

See: [Schema builder](http://knexjs.org/#Schema)

## Modifying
{: .-three-column}

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

See: [Insert](http://knexjs.org/#Builder-insert)

### Update

```js
knex('users')
  .where({ id: 2 })
  .update({ name: 'Homer' })
```

See: [Update](http://knexjs.org/#Builder-update)

### Delete

```js
knex('users')
  .where({ id: 2 })
  .del()
```

See: [Delete](http://knexjs.org/#Builder-del)

## Migrations

### Setting up

#### Create knexfile.js

```
./node_modules/.bin/knex init
```

#### Create a migration

```
knex migrate:make migration_name
knex migrate:make migration_name --env production
```

#### Run migrations

```
knex migrate:latest
knex migrate:latest --env production
```

#### Rollback

```
knex migrate:rollback
knex migrate:rollback --env production
```

See: [Migrations](http://knexjs.org/#Migrations)
