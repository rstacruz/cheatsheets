---
title: Erlang ETS
subtitle: In-memory key-value store
category: Elixir
weight: -1
last_verified_with: "Erlang/OTP 29.1.2 (stdlib 8.1.1)."
updated: 2026-11-24
---

## ETS

### Create a table

```elixir
table = :ets.new(:my_table, [])
```
<!-- {: data-highlight=":ets.new"} -->

Defaults to a `:set` with `:protected` access and the key at position 1. The table is owned by the calling process, which deletes it on exit.

### Insert and look up

```elixir
:ets.insert(table, {:fruit, "Apple"})
:ets.insert(table, {:veg, "Leek"})
:ets.lookup(table, :fruit)   # => [fruit: "Apple"]
```
<!-- {: data-highlight=":ets.insert; :ets.lookup"} -->

Insert takes a tuple or a list of tuples; the key is element 1 unless `:keypos` says otherwise.

### Query with patterns

#### Match objects

```elixir
:ets.match_object(table, {:_, "Apple"})
# => [fruit: "Apple"]
```
<!-- {: data-highlight="match_object"} -->

#### All objects

```elixir
:ets.tab2list(table)
# => [veg: "Leek", fruit: "Apple"]
```
<!-- {: data-highlight="tab2list"} -->

`:_` matches any value, so the first pattern scans the whole table. Order is unspecified for `:set` and `:bag` tables.

### Delete

```elixir
:ets.delete(table, :fruit)   # one key
:ets.delete(table)           # the whole table
```
<!-- {: data-highlight=":ets.delete"} -->

`:ets.delete_all_objects(table)` empties a table but keeps it alive.

### Table types

```elixir
table = :ets.new(:cache, [:named_table, :ordered_set])
# => :cache
```
<!-- {: data-highlight=":ordered_set"} -->

#### Options

| Option | Description |
| --- | --- |
| `:set` | One object per key (default) |
| `:ordered_set` | One object per key, sorted by term order |
| `:bag` | Many objects per key, no duplicates |
| `:duplicate_bag` | Many objects per key, duplicates allowed |
| --- | --- |
| `:protected` | Owner writes, others read (default) |
| `:public` | Any process reads and writes |
| `:private` | Only the owner reads and writes |
| --- | --- |
| `:named_table` | Register the table under its name |
| `{keypos, 1}` | Element of the tuple to use as key |
| `{read_concurrency, true}` | Tune for concurrent reads |
| `{write_concurrency, :auto}` | Tune for concurrent writes |

A named table is addressed by its atom, and `new/2` returns that name instead of a tid.

### Traverse an ordered set

```elixir
:ets.new(:sorted, [:named_table, :ordered_set])
:ets.insert(:sorted, [{2, :b}, {1, :a}])
:ets.first(:sorted)        # => 1
:ets.last(:sorted)         # => 2
:ets.next(:sorted, 1)      # => 2
:ets.prev(:sorted, 2)      # => 1
```
<!-- {: data-highlight=":ets.first; :ets.last; :ets.next; :ets.prev"} -->

Past the last key these return `:"$end_of_table"`.

## References
<!-- {: .-one-column} -->

- <https://www.erlang.org/doc/apps/stdlib/ets.html>
- <https://learnyousomeerlang.com/ets>
