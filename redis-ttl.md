---
title: How to set and check a Redis key TTL
link_title: Redis key TTL
subtitle: Expire keys after a delay
logo: { src: /assets/logos/redis.svg }
category: Databases
layout: snippet
last_verified_with: "Redis 8.10.3."
created_at: 2026-11-27
updated: 2026-11-28
tier: t3
links:
  - title: Redis cheatsheet
    url: /redis
  - title: Redis expire commands
    url: https://redis.io/docs/latest/commands/expire/
---

## Expiration
<!-- {: .-snippets} -->

### Set a TTL on write
<!-- {: .-snippet} -->

```bash
SET session:1 token EX 60
# OK
```
<!-- {: data-highlight="EX 60"} -->

**Sets expiry on write.** It uses seconds while creating the key; use `PX 5000` for milliseconds. See [SET](https://redis.io/docs/latest/commands/set/).

### Add a TTL later
<!-- {: .-snippet} -->

```bash
EXPIRE session:1 300
# (integer) 1
```
<!-- {: data-highlight="EXPIRE"} -->

**Sets a timeout later.** It applies to an existing key and returns 0 when the key is missing. See [EXPIRE](https://redis.io/docs/latest/commands/expire/).

### Use milliseconds
<!-- {: .-snippet} -->

```bash
PEXPIRE session:1 5000
PTTL session:1
```
<!-- {: data-highlight="PEXPIRE; PTTL"} -->

**Works at millisecond resolution.** `PTTL` reports the time left in milliseconds. See [PEXPIRE](https://redis.io/docs/latest/commands/pexpire/).

### Check time remaining
<!-- {: .-snippet} -->

```bash
TTL session:1
# (integer) 60
```
<!-- {: data-highlight="TTL"} -->

**Checks time remaining.** It returns seconds left, -1 with no expiry, or -2 for a missing key. See [TTL](https://redis.io/docs/latest/commands/ttl/).

### Remove a TTL
<!-- {: .-snippet} -->

```bash
PERSIST session:1
# (integer) 1

TTL session:1
# (integer) -1
```
<!-- {: data-highlight="PERSIST"} -->

**Makes a key permanent.** A plain `SET` also clears TTL; use `KEEPTTL` to preserve it. See [PERSIST](https://redis.io/docs/latest/commands/persist/).
