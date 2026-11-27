---
title: How to run Redis commands with redis-cli
link_title: Redis CLI commands
subtitle: Connect, query, and pipe data
logo: { src: /assets/logos/redis.svg }
category: Databases
layout: snippet
last_verified_with: "redis-cli 8.10.3."
updated: 2026-11-27
tier: t3
links:
  - title: Redis cheatsheet
    url: /redis
  - title: Redis CLI reference
    url: https://redis.io/docs/latest/develop/tools/cli/
---

## Command line
<!-- {: .-snippets} -->

### Run one command
<!-- {: .-snippet} -->

```bash
redis-cli PING
# PONG

redis-cli SET user:1 Ada
# OK

redis-cli GET user:1
# "Ada"
```
<!-- {: data-highlight="redis-cli"} -->

**Runs a command and returns to the shell.** Output examples assume an interactive terminal. See [redis-cli](https://redis.io/docs/latest/develop/tools/cli/).

### Connect to a host
<!-- {: .-snippet} -->

```bash
redis-cli -h 10.0.0.5 -p 6379 PING
redis-cli -u redis://localhost:6379/2 PING
```
<!-- {: data-highlight="-h; -p; -u"} -->

**Connects to a remote server or a full URI.** The URI can select a database. See [redis-cli options](https://redis.io/docs/latest/develop/tools/cli/).

### Authenticate
<!-- {: .-snippet} -->

```bash
REDISCLI_AUTH=secret redis-cli PING
```
<!-- {: data-highlight="REDISCLI_AUTH"} -->

**Passes a password without exposing it as an argument.** The `-a` flag is visible in the process list. See [redis-cli authentication](https://redis.io/docs/latest/develop/tools/cli/).

### Select a database
<!-- {: .-snippet} -->

```bash
redis-cli -n 2 DBSIZE
```
<!-- {: data-highlight="-n 2"} -->

**Runs the command against database index 2.** Indices start at 0. See [SELECT](https://redis.io/docs/latest/commands/select/).

### Read stdin
<!-- {: .-snippet} -->

```bash
echo hello | redis-cli -x SET greeting
redis-cli GET greeting
# "hello\n"
```
<!-- {: data-highlight="-x"} -->

**Uses stdin as the last argument.** `echo` appends a newline; use `printf` to avoid it. See [redis-cli](https://redis.io/docs/latest/develop/tools/cli/).

### Print raw replies
<!-- {: .-snippet} -->

```bash
redis-cli --raw GET greeting
# hello
```
<!-- {: data-highlight="--raw"} -->

**Prints bulk strings without quotes.** Piping into other tools is easier with raw output. See [redis-cli](https://redis.io/docs/latest/develop/tools/cli/).
