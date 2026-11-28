---
title: ExUnit
subtitle: Elixir test framework
logo: { set: icon-park-outline, name: flask }
category: Elixir
created_at: 2016-06-19
updated: 2026-11-23
tier: t3
last_verified_with: "ExUnit 1.20.5."
intro: |
  Write and run Elixir tests with ExUnit, including assertions, async cases, and IO capture.
links:
  - title: ExUnit.Case
    url: https://hexdocs.pm/ex_unit/ExUnit.Case.html#test/2
  - title: ExUnit documentation
    url: https://hexdocs.pm/ex_unit/
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

See: [ExUnit.Case](https://hexdocs.pm/ex_unit/ExUnit.Case.html#test/2)

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

See: [capture_io/1](https://hexdocs.pm/ex_unit/ExUnit.CaptureIO.html#capture_io/1)

### Capture logs

```elixir
ExUnit.start(capture_log: true)
```

See: [Log capture](https://hexdocs.pm/ex_unit/ExUnit.Case.html#module-log-capture)

### Async

```elixir
defmodule AssertionTest do
  # run concurrently with other test cases
  use ExUnit.Case, async: true
end
```

See: [Async tests](https://hexdocs.pm/ex_unit/ExUnit.Case.html#module-process-architecture)

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

See: [Test context](https://hexdocs.pm/ex_unit/ExUnit.Callbacks.html#module-context)

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

See: [setup/1](https://hexdocs.pm/ex_unit/ExUnit.Callbacks.html#setup/1)

## Also see

<!-- {: .-one-column} -->

* [ExUnit docs](https://hexdocs.pm/ex_unit/)
