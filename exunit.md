---
title: ExUnit
subtitle: Elixir test framework
category: Elixir
updated: 2026-11-23
last_verified_with: "ExUnit 1.20.5."
---

### Test cases

```elixir
defmodule MyTest do
  use ExUnit.Case

  test "the truth" do
    assert 1 + 1 == 2
  end
end
```

### Capture IO

```elixir
import ExUnit.CaptureIO

test "capture io" do
  result = capture_io(fn ->
    IO.puts "sup"
  end)

  assert result == "sup\n"
end
```

### Capture logs

```elixir
ExUnit.start(capture_log: true)
```

### Async

```elixir
defmodule AssertionTest do
  # run concurrently with other test cases
  use ExUnit.Case, async: true
end
```

### Assertions

```elixir
assert x == y
refute x == y

assert_raise ArithmeticError, fn ->
  1 + "test"
end

assert_raise ArithmeticError, ~r/bad argument/, fn ->
  1 / 0
end

flunk "This should've been an error"
```

See: [Assertions](https://hexdocs.pm/ex_unit/ExUnit.Assertions.html)

## Setup

### Pattern matching

#### Setup

```elixir
setup do
  {:ok, name: "John"}
end
```

#### Use

```elixir
test "it works", %{name: name} do
  assert name == "John"
end
```

### Setup

```elixir
defp my_hook(_context) do
  # Invoked in every block in "a block"
  {:ok, name: "John", age: 54}
end

describe "a block" do
  setup [:my_hook]
  
  test "John's age", context do
    assert context[:name] == "John"
    assert context[:age] == 54
  end
end
```

## Also see

<!-- {: .-one-column} -->

* [ExUnit docs](https://hexdocs.pm/ex_unit/)
