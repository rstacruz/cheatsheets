---
title: Erlang
category: Erlang
layout: 2017/sheet
tags: [New]
updated: 2023-01-15
weight: -10
---

## Getting started
{: .-three-column}

### Hello world
{: .-prime}

```erlang
% hello.erl
-module(hello).
-export([greet/1]).

greet(Name) ->
  io:format("Hello, ~s!", [Name]).
```

```erlang
c(hello).
hello:greet("world").
```

### Variables

```erlang
Age = 23.
```

### Maps

```erlang
User = #{
  name => "John",
  city => "Melbourne"
}
```

```erlang
io:format("Hello ~s", [maps:get(name, User)]).
```
{: .-setup}

### Lists

```erlang
Users = [ "Tom", "Dick", "Harry" ]
```
{: data-line="1"}

```erlang
lists:map(fun(Name) -> io:format("Hello ~s\n", [Name]) end, Users).
```

### List comprehension

```erlang
[Num * 2 || Num <- lists:seq(1, 10)]
```
{: data-line="2,3"}

```erlang
% Same as:
lists:map(fun(Num) -> Num * 2 end, lists:seq(1, 10))
```

These two are equivalent.

### Pattern matching

```erlang
User = #{name => "Tom", age => 23},
#{name := Username} = User.
```
{: data-line="2"}

This sets `Username` to `"Tom"`.

### Pattern matching in functions

```erlang
greet({username, Name}) ->
  io:format("Hello ~s\n", [Name]);
end

greet(world) ->
  io:format("Hello World\n");

greet(_Any) ->
  io:format("Hello extranger\n").
```
{: data-line="1"}

Pattern matching works in function parameters.

Control flow
------------
{: .-three-column}

### If

```erlang
Size = 7
if
  Size > 10 -> "Large"
  true -> "Small"
end
```

Contrary to other languajes if's on erlang are rare, is most common found case

### Case

```erlang
case {1, 2, 3} of
  {ok, Value} ->
    Value * 2
  {error, _Reason} ->
    -1
  _ ->
    0
end
```

### Errors

```erlang
try
    throw(hello)
catch
    throw:Message -> io:format("Got ~p.~n", [Message])
after
    io:format("I'm the after clause.~n")
end.
```

## Types

### Primitives

| Sample                  | Type            |
| ---                     | ---             |
| `undefined`             | Undefined       |
| `true` / `false`        | Boolean         |
| ---                     | ---             |
| `$a`                    | Integer (ASCII) |
| `23`                    | Integer         |
| `3.14`                  | Float           |
| ---                     | ---             |
| `"hello"`               | Charlist        |
| `<<2, 3>>`              | Binary          |
| `<<"hello">>`           | Binary string   |
| `hello`                 | Atom            |
| ---                     | ---             |
| `[a, b]`                | List            |
| `{a, b}`                | Tuple           |
| ---                     | ---             |
| `[{a, "hello"}]`        | Proplist        |
| `#{a => "hello"}`       | Map             |
| `fun() -> ... end`      | Function        |

### Type checks

```erlang
is_atom/1
is_bitstring/1
is_boolean/1
is_function/1
is_function/2
is_integer/1
is_float/1
```

```erlang
is_binary/1
is_list/1
is_map/1
is_tuple/1
```

```erlang
is_number/1
is_pid/1
is_port/1
is_reference/1
```

### Operators

```erlang
Left =/= Right  % not equal
Left =:= Right  % equal
Left ++ Right   % concat lists
Left ++ Right   % concat string/binary (only for lists of integers)
```

## Numbers

### Operations

```erlang
abs(N).
round(N).
A rem B.  % remainder (modulo)
A / B.    % division between integers will return a float
```

### Float

```erlang
math:ceil(10.3).  % → 11.0
math:pow(2, 10).  % → 1024.0
```

```erlang
string:to_float("10.3")     % → {10.3, []}
```

### Integer

```erlang
integer_to_list(12).      % → "12"
list_to_integer("12").    % → 12
N rem 2 =:= 0.            % is_even
N rem 2 =/= 0.            % is_odd
```

```erlang
% Different base:
integer_to_list(N, 2).    x  % → "1100"
list_to_integer("1100", 2). % → 12
```

### Type casting

```erlang
string:to_float("34.1")     % → {34.1, ""}
string:to_float("10.3abc")  % → {10.3, "abc"}
string:to_integer("34")     % → {34, ""}
```

## Map

### Defining

```erlang
M = #{name => "Joe"}.       % atom keys (:name)
N = #{<<"name">> => "Joe"}. % binary keys ("name")
```

### Updating

```erlang
maps:put(id, 2, M).      # → %{id: 2, name: "Joe"}
```

```erlang
M1 = maps:put(b, "Banana", M).
M2 = maps:merge(M, #{b => "Banana"}).
M3 = maps:update(a, fun(X) -> X + 1 end, M).
M4 = maps:update(a, fun(X) -> X + 1 end, M).
```

### Deleting

```erlang
M1 = maps:remove(name, M).  % → #{}
{Value, M2} = maps:take(name, M).  % → {"John", #{}}
```

### Reading

```erlang
maps:get(id, M).        % → 1
maps:keys(M).           % → [id, name]
maps:values(M).         % → [1, "hi"]
```

```erlang
maps:to_list(M).        % → [{id, 1}, {name, "hi"}]
```
### Constructing from lists

```erlang
M1 = maps:from_list([{b, 1}, {a, 2}]).
M2 = maps:from_list([{a, 1}, {b, 2}]).
M3 = maps:from_list([{X, X} || X <- [a, b]]).  % → #{a => a, b => b}
```

## List

```erlang
L = [ 1, 2, 3, 4 ].      % [1,2,3,4]
```
{: .-setup}

```erlang
L ++ [5].     % push (append)     → [1,2,3,4,5]
[0 | L].      % unshift (prepend) → [0,1,2,3,4]
```

```erlang
hd(L).         % → 1
tl(L).         % → [2,3,4]
lists:last(L). % → 4
```

```erlang
lists:flatten([[1],[2,3]]). % → [1,2,3]
```

### Map/reduce

```erlang
lists:foldl(Fun, InitialAcc, List).
lists:foldl(Fun, Acc, List).
lists:map(Fun, List).
lists:filter(fun(X) -> not Fun(X) end, List).
lists:any(Fun, List).
lists:all(fun(X) -> not Fun(X) end, List).
```

```erlang
lists:foldl(fun(X, Acc) -> X + Acc end, 0, [1, 2, 3, 4]). % → 10
```

## Tuple

### Tuples

```erlang
T = { a, b }.
```
{: .-setup}

```erlang
tuple_size(T).    % → 2
element(2, T).    % like tuple[1] in 0-indexed languages → b
setelement(1, T, c). % → {c, b}
```

###  Proplists

```erlang
List = [{name, "John"}, {age, 15}],
```
{: .-setup}

```erlang
proplists:get_value(name, List).  % → "John"
```

### Records

Records are syntactic sugar for tuples, with named fields.

```erlang
-record(person, {name, age}).
```
{: .-setup}

```erlang
Person = #person{name = "John", age = 15}.
```

```erlang
Person#person.name. % → "John"
Person#person.age.  % → 15
```

```erlang
#person{name = Name} = Person.  % pattern matching
Name.                           % → "John"
```

## Functions

### Lambdas

```erlang
Square = fun(N) -> N*N end,
Square(20). % → 400
```

### Running

```erlang
Fun(Args).
apply(Fun, [Args]).
```

### Function heads

```erlang
join(A) -> join(A, undefined).
join(A, B) when B =:= undefined -> A;
join(A, B) -> A ++ B.
```

## Misc

### Regexp

```erlang
Exp = "hello".
re:run("hello world", Exp).    % → {match, [{0,5}]}
re:run("goodbye world", Exp).  % → nomatch
```

### Type specs

```erlang
-spec round(number()) -> integer().

-type number_with_remark() :: {number(), string()}.
-spec add(number(), number()) -> number_with_remark().
```

Useful for [dialyzer](http://www.erlang.org/doc/man/dialyzer.html).

## References
{: .-one-column}

- [Learn you some Erlang](https://learnyousomeerlang.com/content)
