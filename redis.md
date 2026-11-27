---
title: Redis
subtitle: In-memory data store and cache
logo: { src: /assets/logos/redis.svg }
category: Databases
updated: 2026-11-27
last_verified_with: "Redis 8.10.3, redis-cli 8.10.3, Docker 29.9.3."
tier: t2
fragments:
  - "redis-cli PING"
  - "redis-cli -h"
  - "SET key value"
  - "GET key"
  - "EXISTS key"
  - "INCR views"
  - "SCAN 0 MATCH"
  - "RPUSH queue"
  - "HSET user:2"
  - "SADD tags"
  - "ZADD scores"
  - "XADD events *"
  - "EXPIRE key 60"
  - "TTL key"
  - "PUBLISH news"
  - "BGSAVE"
  - "FLUSHDB ASYNC"
  - "appendonly yes"
  - "docker run -d"
  - "redis-data:/data"
keywords:
  - redis cli
  - redis commands
  - redis ttl
  - redis docker
  - redis pub sub
intro: |
  [Redis](https://redis.io/docs/latest/) keeps key-value data in memory and adds collections, expiry, pub/sub, and disk persistence.
links:
  - title: Redis CLI
    url: https://redis.io/docs/latest/develop/tools/cli/
  - title: Redis commands
    url: https://redis.io/docs/latest/commands/
---

## Connect
<!-- {: .-three-column} -->

### One-shot command

```bash
redis-cli PING
# PONG

redis-cli SET user:1 Ada
# OK

redis-cli GET user:1
# "Ada"
```
<!-- {: data-highlight="redis-cli"} -->

Runs a single command and exits; output assumes an interactive terminal.

See: [redis-cli](https://redis.io/docs/latest/develop/tools/cli/)

### Interactive shell

```bash
redis-cli
127.0.0.1:6379> SET user:1 Ada
OK
127.0.0.1:6379> GET user:1
"Ada"
```

The prompt stays open until `exit` or Ctrl-D.

See: [redis-cli](https://redis.io/docs/latest/develop/tools/cli/)

### Remote host

```bash
redis-cli -h 10.0.0.5 -p 6379 PING
redis-cli -u redis://localhost:6379/2 PING
```
<!-- {: data-highlight="-h; -p; -u"} -->

A URI can include the host, port, and database number.

See: [redis-cli](https://redis.io/docs/latest/develop/tools/cli/)

### Password

```bash
REDISCLI_AUTH=secret redis-cli PING
redis-cli -a secret PING
```
<!-- {: data-highlight="REDISCLI_AUTH"} -->

Prefer the environment variable: `-a` exposes the password in the process list.

See: [redis-cli](https://redis.io/docs/latest/develop/tools/cli/)

### Raw replies

```bash
redis-cli --raw GET user:1
# Ada

redis-cli GET user:1
# "Ada"
```
<!-- {: data-highlight="--raw"} -->

`--raw` prints bulk strings without quotes or numbering.

See: [redis-cli](https://redis.io/docs/latest/develop/tools/cli/)

### Read stdin

```bash
echo hello | redis-cli -x SET greeting
redis-cli GET greeting
# "hello\n"
```
<!-- {: data-highlight="-x"} -->

`-x` reads the final argument from stdin, including its trailing newline.

See: [redis-cli](https://redis.io/docs/latest/develop/tools/cli/)

## Keys and strings
<!-- {: .-three-column} -->

### Set and get

```bash
SET user:1 Ada
# OK

GET user:1
# "Ada"
```
<!-- {: data-highlight="SET; GET"} -->

Strings hold text, numbers, or binary data.

See: [SET](https://redis.io/docs/latest/commands/set/)

### Check and delete

```bash
EXISTS user:1
# (integer) 1

DEL user:1
# (integer) 1

EXISTS user:1
# (integer) 0
```
<!-- {: data-highlight="EXISTS; DEL"} -->

Both commands return the number of keys found or removed.

See: [DEL](https://redis.io/docs/latest/commands/del/)

### Counters

```bash
SET views 0
INCR views
# (integer) 1

INCR views
# (integer) 2
```
<!-- {: data-highlight="INCR"} -->

`INCR` parses the value as an integer and increments it atomically.

See: [INCR](https://redis.io/docs/latest/commands/incr/)

### Find keys

```bash
KEYS 'user:*'
SCAN 0 MATCH 'user:*' COUNT 100
```
<!-- {: data-highlight="SCAN"} -->

`KEYS` walks the whole keyspace and blocks the server; use `SCAN` in production.

See: [SCAN](https://redis.io/docs/latest/commands/scan/)

### Many keys

```bash
MSET app:a 1 app:b 2
# OK

MGET app:a app:b
# 1) "1"
# 2) "2"
```
<!-- {: data-highlight="MSET; MGET"} -->

Multi-key commands cut round trips without using transactions.

See: [MGET](https://redis.io/docs/latest/commands/mget/)

### Inspect a key

```bash
TYPE app:a
# string

DBSIZE
```
<!-- {: data-highlight="TYPE"} -->

`TYPE` reports the value type; `DBSIZE` counts keys in the current database.

See: [TYPE](https://redis.io/docs/latest/commands/type/)

## Collections
<!-- {: .-three-column} -->

### Lists

```bash
RPUSH queue first
# (integer) 1

RPUSH queue second
# (integer) 2

LRANGE queue 0 -1
# 1) "first"
# 2) "second"

LPOP queue
# "first"
```
<!-- {: data-highlight="RPUSH; LRANGE; LPOP"} -->

Push to either end; `-1` in `LRANGE` means through the last item.

See: [Lists](https://redis.io/docs/latest/data-types/lists/)

### Hashes

```bash
HSET user:2 name Ada role admin
# (integer) 2

HGET user:2 name
# "Ada"

HGETALL user:2
# 1) "name"
# 2) "Ada"
# 3) "role"
# 4) "admin"
```
<!-- {: data-highlight="HSET; HGET; HGETALL"} -->

Hashes map fields to values without a separate JSON string.

See: [Hashes](https://redis.io/docs/latest/data-types/hashes/)

### Sets

```bash
SADD tags red blue
# (integer) 2

SISMEMBER tags red
# (integer) 1

SMEMBERS tags
```
<!-- {: data-highlight="SADD; SISMEMBER; SMEMBERS"} -->

Sets hold unique members; `SMEMBERS` does not promise an order.

See: [Sets](https://redis.io/docs/latest/data-types/sets/)

### Sorted sets

```bash
ZADD scores 10 Ada 20 Bob
# (integer) 2

ZRANGE scores 0 -1 WITHSCORES
# 1) "Ada"
# 2) "10"
# 3) "Bob"
# 4) "20"

ZINCRBY scores 5 Ada
# "15"
```
<!-- {: data-highlight="ZADD; ZRANGE; ZINCRBY"} -->

Scores sort members; `WITHSCORES` interleaves them in the reply.

See: [Sorted sets](https://redis.io/docs/latest/data-types/sorted-sets/)

### Streams

```bash
XADD events '*' type login user Ada
XRANGE events - + COUNT 1
XLEN events
```
<!-- {: data-highlight="XADD; XRANGE; XLEN"} -->

Streams keep append-only entries with generated IDs and field-value pairs.

See: [Streams](https://redis.io/docs/latest/data-types/streams/)

## Expiration
<!-- {: .-three-column} -->

### Set a TTL

```bash
SET session:1 token EX 60
# OK

TTL session:1
# (integer) 60
```
<!-- {: data-highlight="EX 60"} -->

`EX` sets seconds at write time; `PX` uses milliseconds.

See: [SET](https://redis.io/docs/latest/commands/set/)

### Expire later

```bash
EXPIRE session:1 30
# (integer) 1

PEXPIRE session:1 5000
# (integer) 1
```
<!-- {: data-highlight="EXPIRE; PEXPIRE"} -->

Returns 1 when the timeout was set, 0 when the key is missing or unchanged.

See: [EXPIRE](https://redis.io/docs/latest/commands/expire/)

### Check remaining time

| Command    | Unit         |
| ---------- | ------------ |
| `TTL key`  | Seconds      |
| `PTTL key` | Milliseconds |

<!-- {: .-headers } -->

`TTL` returns -1 when a key has no expiry and -2 when it does not exist.

See: [TTL](https://redis.io/docs/latest/commands/ttl/)

### Remove expiry

```bash
PERSIST session:1
# (integer) 1

TTL session:1
# (integer) -1
```
<!-- {: data-highlight="PERSIST"} -->

A plain `SET` overwrites a key and clears its TTL; `KEEPTTL` preserves it.

See: [PERSIST](https://redis.io/docs/latest/commands/persist/)

## Pub/sub
<!-- {: .-three-column} -->

### Subscribe

```bash
redis-cli SUBSCRIBE news
# 1) "subscribe"
# 2) "news"
# 3) (integer) 1
```
<!-- {: data-highlight="SUBSCRIBE"} -->

The connection blocks and prints messages until Ctrl-C. Messages with no listener are lost.

See: [Pub/sub](https://redis.io/docs/latest/develop/pubsub/)

### Publish

```bash
redis-cli PUBLISH news hello
# (integer) 1
```
<!-- {: data-highlight="PUBLISH"} -->

The integer counts the clients that received the message.

See: [PUBLISH](https://redis.io/docs/latest/commands/publish/)

### Pattern subscription

```bash
redis-cli PSUBSCRIBE 'news.*'
redis-cli PUBLISH news.dev hello
# (integer) 1
```
<!-- {: data-highlight="PSUBSCRIBE"} -->

Glob patterns match several channels; `news` alone does not match `news.*`.

See: [PSUBSCRIBE](https://redis.io/docs/latest/commands/psubscribe/)

### Unsubscribe

```bash
redis-cli UNSUBSCRIBE news
redis-cli PUNSUBSCRIBE 'news.*'
```
<!-- {: data-highlight="UNSUBSCRIBE; PUNSUBSCRIBE"} -->

See: [UNSUBSCRIBE](https://redis.io/docs/latest/commands/unsubscribe/)

## Persistence
<!-- {: .-three-column} -->

### Snapshots

```bash
BGSAVE
# Background saving started

SAVE
LASTSAVE
```
<!-- {: data-highlight="BGSAVE; SAVE; LASTSAVE"} -->

`SAVE` blocks clients; `BGSAVE` forks. `LASTSAVE` prints the last successful snapshot time.

See: [Persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)

### Append-only file

```bash
CONFIG GET appendonly
```
<!-- {: data-highlight="appendonly"} -->

AOF logs every write; enable it in `redis.conf` or with `CONFIG SET appendonly yes`.

See: [Persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)

### Rewrite the AOF

```bash
BGREWRITEAOF
```
<!-- {: data-highlight="BGREWRITEAOF"} -->

Rewriting compacts the log without stopping the server.

See: [BGREWRITEAOF](https://redis.io/docs/latest/commands/bgrewriteaof/)

### Inspect persistence

```bash
INFO persistence
```
<!-- {: data-highlight="persistence"} -->

Shows RDB save status, `aof_enabled`, and whether the server is still loading data.

See: [INFO](https://redis.io/docs/latest/commands/info/)

## Administration
<!-- {: .-three-column} -->

### Server info

```bash
INFO server
INFO clients
INFO memory
```
<!-- {: data-highlight="INFO"} -->

Each section returns plain-text fields such as `redis_version` and `connected_clients`.

See: [INFO](https://redis.io/docs/latest/commands/info/)

### Databases

```bash
SELECT 2
# OK

DBSIZE
```
<!-- {: data-highlight="SELECT"} -->

Database indices start at 0; each one has its own keyspace on the server.

See: [SELECT](https://redis.io/docs/latest/commands/select/)

### Delete all keys

```bash
FLUSHDB
FLUSHDB ASYNC
FLUSHALL
```
<!-- {: data-highlight="FLUSHDB; FLUSHALL"} -->

`FLUSHDB` empties the current database; `FLUSHALL` empties every database.

See: [FLUSHDB](https://redis.io/docs/latest/commands/flushdb/)

### Connections

```bash
CLIENT LIST
MONITOR
```
<!-- {: data-highlight="CLIENT LIST; MONITOR"} -->

`MONITOR` streams every command and is expensive on a busy server.

See: [CLIENT LIST](https://redis.io/docs/latest/commands/client-list/)

### Configure

```bash
CONFIG GET maxmemory
CONFIG SET maxmemory 2gb
```
<!-- {: data-highlight="CONFIG GET; CONFIG SET"} -->

Settings changed with `CONFIG SET` last until the next restart unless saved.

See: [CONFIG SET](https://redis.io/docs/latest/commands/config-set/)

## Docker
<!-- {: .-three-column} -->

### Run a container

```bash
docker run -d --name redis \
  -p 6379:6379 \
  redis:8.10.3
```
<!-- {: data-highlight="docker run"} -->

Publishes Redis on the host's default port.

See: [Redis Docker image](https://hub.docker.com/_/redis)

### Persist data

```bash
docker run -d --name redis \
  -p 6379:6379 \
  -v redis-data:/data \
  redis:8.10.3 \
  redis-server --appendonly yes
```
<!-- {: data-highlight="redis-data:/data; --appendonly yes"} -->

The named volume keeps AOF files when the container is replaced.

See: [Redis persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)

### Open a client

#### Interactive shell

```bash
docker exec -it redis redis-cli
```

#### One-shot command

```bash
docker exec redis redis-cli PING
# PONG
```
<!-- {: data-highlight="docker exec"} -->

See: [docker exec](https://docs.docker.com/reference/cli/docker/container/exec/)

### Compose

```yaml
services:
  redis:
    image: redis:8.10.3
    ports: ["6379:6379"]
    volumes: [redis-data:/data]
    command: redis-server --appendonly yes

volumes:
  redis-data:
```

Compose declares the port mapping and a named volume for `/data`.

See: [Compose services](https://docs.docker.com/reference/compose-file/services/)

### Stop and start

```bash
docker stop redis
docker start redis
```
<!-- {: data-highlight="docker stop; docker start"} -->

Restarting keeps the volume; `docker rm` removes the container but not the volume.

See: [docker stop](https://docs.docker.com/reference/cli/docker/container/stop/)

## Also see

- [Redis CLI connect cheatsheet](./redis-cli)
- [Redis key TTL cheatsheet](./redis-ttl)
- [Redis flush database cheatsheet](./redis-flushdb)
- [Redis in Docker cheatsheet](./redis-docker)
- [Redis pub/sub cheatsheet](./redis-pubsub)
- [Docker CLI cheatsheet](./docker)
- [SQL cheatsheet](./sql)
