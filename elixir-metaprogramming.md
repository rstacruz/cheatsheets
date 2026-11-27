---
title: Elixir metaprogramming
subtitle: Macro-based code generation
logo: { src: /assets/logos/elixir.svg, mono: true }
category: Elixir
last_verified_with: "Elixir 1.20.5."
updated: 2026-11-24
tier: t3
intro: |
  Elixir metaprogramming: quote and unquote, macro definitions, and compile-time environment access.
links:
  - title: Metaprogramming guide
    url: https://hexdocs.pm/elixir/macros.html
  - title: Kernel.SpecialForms
    url: https://hexdocs.pm/elixir/Kernel.SpecialForms.html
  - title: Macro module
    url: https://hexdocs.pm/elixir/Macro.html
---

## Syntax

### Pseudo-variables

```elixir
__MODULE__   # current module
__DIR__      # current source directory
__ENV__      # compile-time environment
__CALLER__   # environment of the caller, inside a macro
```

These are special forms, documented in [Kernel.SpecialForms](https://hexdocs.pm/elixir/Kernel.SpecialForms.html).

See: [Pseudo-variables](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#__CALLER__/0)

### Quote and unquote

#### Quote

```elixir
quote do
  sum(1, 2, 3)
end
# => {:sum, [], [1, 2, 3]}
```

#### Unquote

```elixir
value = quote do: 13

quote do
  sum(1, unquote(value), 3)
end
# => {:sum, [], [1, 13, 3]}
```

A quoted expression is a three-element tuple: call, metadata, arguments. `unquote/1` splices an AST in; other values need `Macro.escape/1`.

See: [quote/2](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#quote/2)

### Define a macro

#### Macro

```elixir
defmodule Math do
  defmacro squared(x) do
    quote do
      unquote(x) * unquote(x)
    end
  end
end
```

#### Use

```elixir
require Math
Math.squared(5)   # => 25
```

`require` makes the macro available. Here `x` is unquoted twice, so `quote bind_quoted: [x: x]` is the safer form.

See: [defmacro/2](https://hexdocs.pm/elixir/Kernel.html#defmacro/2)

### Environment

#### At compile time

```elixir
__ENV__.module    # current module
__ENV__.file      # absolute path
__ENV__.line      # current line
__ENV__.function  # {name, arity}, or nil outside a function
```

#### Inside a macro

```elixir
defmacro definitions do
  __CALLER__.module
  |> Module.definitions_in()
  |> IO.inspect()
end
```

The public fields are `module`, `file`, `line`, `function`, `context` and `context_modules`; the rest are private to macro expansion.

See: [Macro.Env](https://hexdocs.pm/elixir/Macro.Env.html)
