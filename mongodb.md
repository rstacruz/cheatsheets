---
title: mongodb
updated:  2024-02-15
layout: 2017/sheet
category: Databases
---

## Connect to MongoDB
mongosh connects to mongodb://127.0.0.1:27017 by default
```js
mongosh "mongodb://user:password@host:port/dbname"
```

## Databases and Collections
### Show Databases
```js
show dbs
```

### Use Database
```js
use <database_name>
```

### Show Collections
```js
show collections
```

## CRUD Operations
### Create
```js
db.collection.insertOne({ key: "value" }) // Insert a single document
db.collection.insertMany([{ key: "value" }, ...]) // Insert multiple documents
```

### Read
```js
db.collection.find({}) // Find all documents
db.collection.findOne({ key: "value" }) // Find one document by key
```

### Complex Queries
```js
db.collection.find({ age: { $gt: 18, $lt: 65 }}) // Find documents with age between 18 and 65 (gt = greater than, lt = less than)
db.collection.find({ status: { $in: ["A", "B"] }}) // Find documents with status A or B
```

### Update
```js
// Upsert example
db.collection.updateOne(
  { key: "unique_value" },
  { $set: { key: "new value" } },
  { upsert: true }
)
```

### Delete
```js
db.collection.deleteOne({ key: "value" }) // Delete a single document
db.collection.deleteMany({ key: "value" }) // Delete multiple documents
```

## Indexes
### Create Index
```js
db.collection.createIndex({ key: 1 }) // Create an ascending index (1 = ascending, -1 = descending)
db.collection.createIndex({ email: 1 }, { unique: true }) // Create a unique index useful for email, username, etc. You can't have two documents with the same email
```

### List Indexes
```js
db.collection.getIndexes()
```

### Aggregation
```js
db.collection.aggregate([
{ $match: { key: "value" } },
{ $group: { _id: "$key", count: { $sum: 1 } } }
])
```

### Expanded Aggregation
```js
db.collection.aggregate([
  { $match: { status: "A" } },
  { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 5 }
])
```

## Replication and Sharding
### Replica Sets
```js
rs.initiate()
rs.status()
```

### Sharding
```js
sh.addShard("shard0000/mongodb0.example.net:27017")
sh.status()
```

## Administration
### Create User
```js
db.createUser({ user: "username", pwd: "password", roles: ["readWrite", "dbAdmin"]})
```

### Backup and Restore
MongoDB uses `mongodump` and `mongorestore` for backup and restoration.
```bash
mongodump --db <database_name> # Backup a database
mongorestore --db <database_name> <path_to_backup> # Restore a database
```

### Performance Monitoring
```js
db.currentOp() # Show current operations
db.stats() # Database statistics
```

## Security
### Enable Authentication
```js
mongod --auth
```

## Miscellaneous
### Run JavaScript File
```js
load("/path/to/script.js")
```

### Set Profiling Level
```js
db.setProfilingLevel(level, slowms) // level = 0 (off), 1 (slow operations), 2 (all operations)
```

### Change Streams
```js
db.collection.watch() // Watch for changes in a collection
```
