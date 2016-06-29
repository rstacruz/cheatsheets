---
title: Erlang ETS
category: Elixir
---

```elixir
iex> table = :ets.new(:my_table)
     8211

iex> :ets.insert(table, {:fruit, "Apple"})
iex> :ets.lookup(table, :fruit)
     [{:fruit, "Apple"}]

iex> :ets.delete(table)
```

### Flags

```
iex> table = :ets.new(:my_table, [:set, :protected])
```

- `:set` - no duplicate keys (or: `:ordered_set`, `:bag`, `:duplicate_bag`)
- `:protected` - only this process can use it (or: `:public`, `:private`)

### Other functions

```elixir
# Ordered sets
:ets.first(table)
:ets.last(table)
:ets.next(table, key)
:ets.prev(table, key)
```

## References

* <http://erlang.org/doc/man/ets.html>
* <http://learnyousomeerlang.com/ets>
