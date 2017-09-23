---
title: Knex
category: Hidden
layout: 2017/sheet
---

## Getting started
{: .-three-column}

### Create table

```js
knex.schema.createTable('accounts', (table) => {
  table.increments('id')
  table.string('account_name')
  table.integer('user_id').unsigned().references('users.id')
})
.then(() => {
})
```

### Select

```js
knex('users')
  .where({ email: 'hello@example.com' })
  .then(rows => {
  })
```

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

## Schema

### Create table

```js
knex.schema.createTable('accounts', (table) => {
  table.increments('id')
  table.string('account_name')
  table.integer('user_id').unsigned().references('users.id')
})
.then(() => {
})
```

## Migrations

### Setting up

#### Creates knexfile.js

```
./node_modules/.bin/knex init
```

#### Create a migration

```
knex migrate:make migration_name
```

#### Run migrations

```
knex migrate:latest
knex migrate:latest --env production
```

#### Rollback

```
knex migrate:rollback
```
