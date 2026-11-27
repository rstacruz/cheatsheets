---
title: How to publish and subscribe with Redis
link_title: Redis pub/sub
subtitle: Send messages to live channels
logo: { src: /assets/logos/redis.svg }
category: Databases
layout: snippet
last_verified_with: "Redis 8.10.3."
updated: 2026-11-27
tier: t3
links:
  - title: Redis cheatsheet
    url: /redis
  - title: Redis pub/sub
    url: https://redis.io/docs/latest/develop/pubsub/
---

## Pub/sub
<!-- {: .-snippets} -->

### Subscribe to a channel
<!-- {: .-snippet} -->

```bash
redis-cli SUBSCRIBE news
```
<!-- {: data-highlight="SUBSCRIBE"} -->

**Listens for messages until Ctrl-C.** Messages sent while no client listens are lost. See [Pub/sub](https://redis.io/docs/latest/develop/pubsub/).

### Publish a message
<!-- {: .-snippet} -->

```bash
redis-cli PUBLISH news hello
# (integer) 1
```
<!-- {: data-highlight="PUBLISH"} -->

**Delivers a message to current subscribers.** The reply counts the clients that received it. See [PUBLISH](https://redis.io/docs/latest/commands/publish/).

### Subscribe by pattern
<!-- {: .-snippet} -->

```bash
redis-cli PSUBSCRIBE 'news.*'
redis-cli PUBLISH news.dev hello
# (integer) 1
```
<!-- {: data-highlight="PSUBSCRIBE"} -->

**Matches several channels with a glob pattern.** `news` alone does not match `news.*`. See [PSUBSCRIBE](https://redis.io/docs/latest/commands/psubscribe/).

### Leave a subscription
<!-- {: .-snippet} -->

```bash
# In the subscribed redis-cli: Ctrl-C
```
<!-- {: data-highlight="Ctrl-C"} -->

**Ends subscribe mode in `redis-cli`.** Client libraries send `UNSUBSCRIBE` on the subscribed connection; see [Pub/sub](https://redis.io/docs/latest/develop/pubsub/).
