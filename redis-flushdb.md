---
title: How to delete all keys in a Redis database
link_title: Redis flush database
subtitle: Delete all database keys
logo: { src: /assets/logos/redis.svg }
category: Databases
layout: snippet
last_verified_with: "Redis 8.10.3."
updated: 2026-11-27
tier: t3
links:
  - title: Redis cheatsheet
    url: /redis
  - title: FLUSHDB reference
    url: https://redis.io/docs/latest/commands/flushdb/
---

## Delete keys
<!-- {: .-snippets} -->

### Empty the current database
<!-- {: .-snippet} -->

```bash
redis-cli FLUSHDB
# OK
```
<!-- {: data-highlight="FLUSHDB"} -->

**Deletes every key in the selected database, irreversibly.** Add `-n <db>` before `FLUSHDB` to pick a database. See [FLUSHDB](https://redis.io/docs/latest/commands/flushdb/).

### Check the key count
<!-- {: .-snippet} -->

```bash
redis-cli DBSIZE
```
<!-- {: data-highlight="DBSIZE"} -->

**Counts keys in the current database before deleting.** See [DBSIZE](https://redis.io/docs/latest/commands/dbsize/).

### Avoid blocking the server
<!-- {: .-snippet} -->

```bash
redis-cli FLUSHDB ASYNC
```
<!-- {: data-highlight="ASYNC"} -->

**Frees memory in the background.** `ASYNC` lets the server keep serving other clients. See [FLUSHDB](https://redis.io/docs/latest/commands/flushdb/).

