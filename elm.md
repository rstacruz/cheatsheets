---
title: Elm
category: Elm
layout: 2017/sheet
tags: [New]
updated: 2018-07-08
prism_language: [elm]
weight: -10
authors:
  - github: tuxagon
---

## Basics
{: .-three-column}

### Comments

```elm
-- Single line comment

{- Multiline comment 
{- Nestable -}
-}
```

### Arithmetic

| Code | Type |
| --- | --- |
| `1 + 1` | `2 : number` |
| `8 - 1` | `7 : number` |
| `10 * 2` | `20 : number` |
| `33 / 2` | `16.5 : Float` |
| `33 // 2` | `16 : Int` |
| `33 % 2` | `1 : Int` |
| `5 ^ 2` | `25 : number` |

### Booleans

| Code | Type |
| --- | --- |
| `not True` | `False : Bool` |
| `not False` | `True : Bool` |

### Equality

| Code | Type |
| --- | --- |
| `1 == 1` | `True : Bool` |
| `1 /= 1` | `False : Bool` |

### Comparison

Comparison functions leverage `comparable` types, which include numbers,
characters, strings, lists of comparable things, and tuples of
comparable things.

| Code | Type |
| --- | --- |
| `1 < 10` | `True : Bool` |
| `1 > 10` | `False : Bool` |
| `9 <= 10` | `True : Bool` |
| `9 >= 10` | `False : Bool` |

### Strings

```elm
"Frodo Baggins"
```
#### `"Frodo Baggins" : String`

```elm
'X'
```
#### `'X' : Char`

```elm
"Hello " ++ "world!"
```
#### `"Hello world!" : String`

### Lists

Every element in a list must be the same type

```elm
["the", "quick", "brown", "fox"]
```
#### `["the","quick","brown","fox"] : List String`

```elm
[1, 2, 3, 4, 5]
```
#### `[1,2,3,4,5] : List number`

```elm
[]
```
#### `[] : List a`

```elm
[1, 2] ++ [3, 4, 5]
```
#### `[1,2,3,4,5] : List number`

### Tuples

Every element in a tuple can be of a different type; however,
the tuple must have a fixed length (max of 9)

```elm
("elm", 42)
```
#### `("elm",42) : ( String, number )`

```elm
()
```
#### `() : ()`

### Records

Every element in a record is named and each element can be of
a different type

```elm
{ x = 3, y = 7 }
```
#### `{ x = 3, y = 7 } : { x : number, y : number1 }`

```elm
{ x = 3, y = 7 }.x
```
#### `3 : number`

```elm
.y { x = 3, y = 7 }
```
#### `7 : number`

```elm
{ person | name = "Batman" }
```

```elm
{ particle |
  position = particle.position + particle.velocity,
  velocity = particle.velocity + particle.acceleration }
```
{: .-wrap}

### Functions

#### Create a function
```elm
multiply a b =
  a * b
```

#### Call a function
```elm
multiply 7 6
```

#### Partial Application
```elm
double =
  multiply 2
```

#### Constant
```elm
answer =
  42
```

#### Anonymous Function
```elm
List.map (\x -> x * 2) (List.range 1 4)
```
#### `[2,4,6,8] : List Int`

#### Function as Argument
```elm
List.map double (List.range 1 4)
```
#### `[2,4,6,8] : List Int`

#### Recursion
```elm
listLength list =
  case list of
    [] -> 0
    x::xs -> 1 + listLength xs
```

#### Infix Functions

```elm
List.range 1 4 ++ List.range 5 8
```
#### `[1,2,3,4,5,6,7,8] : List Int`

### Type Annotations

```elm
not : Bool -> Bool
```

```elm
round : Float -> Int
```

```elm
map : (a -> b) -> List a -> List b
```

```elm
origin : { x : Float, y : Float, z : Float }
```

### Type Aliases

```elm
type alias Point3D =
  { x : Float, y : Float, z : Float }

otherOrigin : Point3D
otherOrigin =
  Point3D 0 0 0
```

### Union Types

```elm
type Direction =
  North | South | East | West
```

```elm
type Tree a =
  Leaf | Node a (Tree a) (Tree a)

leftmostElement : Tree a -> Maybe a
leftmostElement tree =
  case tree of
    Leaf -> Nothing
    Node x Leaf _ -> Just x
    Node _ subtree _ -> leftmostElement subtree
```

### Modules

#### Top module declaration
```elm
module Name where
```

#### Import module
```elm
import Dict
import Dict exposing (Dict)
import Graphics.Collage as C
```

### Ports

#### Incoming port
```elm
port clientID : Int
```

#### Outgoing port
```elm
port clientOrders : List String
port clientOrders = ["Books", "Groceries", "Furniture"]
```

See: [Ports Example](https://gist.github.com/groteck/e4cc180ac182436f31f1d709466df768)

Pattern Matching
----------------

### Underscore

```elm
let
  (x, _, z) = ("A", "B", "C")
in
  x ++ z
```
#### `"AC" : String`

### Tuple

```elm
let
  (x, y) = (2, 4)
in
  x ^ y
```
#### `16 : number`

```elm
let
  (x, y, (a, b, c)) = ("A", "B", ("X", "Y", "Z"))
in
  x ++ y ++ a ++ b ++ c
```
#### `"ABXYZ" : String`

```elm
case tuple of
  ("A", "B", "C") as ordered ->
    ordered

  (_, _, _) as unordered ->
    unordered
```

### List

```elm
case list of
  [] ->
    "Empty"

  [_] ->
    "Singleton"

  [x, y] ->
    "Two element list"

  x::xs ->
    "One or more element list"

  x::y::_ ->
    "At least two element list"
```

### Record

```elm
let
  { x, y } = { x = 10, y = 20, z = 30 }
in
  x + y
```
#### `30 : number`

```elm
add { x, y } =
  x + y
```

```elm
moveLeft ({ acceleration } as player) =
  { player |
    x        = player.x - player.velocity,
    velocity = player.velocity + acceleration }
```

### Union Types

```elm
case maybe of
  Nothing ->
    "Not Found"

  Just x ->
    toString x
```

Control Flow
-----------

### If

```elm
if powerLevel > 9000 then
  "It's over 9000!!!!!"
else
  "It's a Raditz"
```

### Chained If

```elm
if n < 0 then
  "n is negative"
else if n > 0 then
  "n is positive"
else
  "n is zero"
```

### Case

```elm
case someMaybe of
  Nothing ->
    "Not Found"

  Just x ->
    "Found It"
```

HTML
----

### The Elm Architecture

The logic of every Elm program will break up into three cleanly separated parts:

| Part | Description |
| --- | --- |
| Model | the state of your application |
| Update | a way to update your state |
| View | a way to view your state as HTML |

See: [#Counter](#Counter)


### Counter

```elm
import Html exposing (beginnerProgram, div, button, text)
import Html.Events exposing (onClick)


main =
  beginnerProgram { model = model, view = view, update = update }


-- MODEL

model = 0


-- UPDATE

type Msg = Increment | Decrement


update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1


-- VIEW

view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (toString model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
```

JSON
----

### JSON Encoding

```elm
list [int 42, null]
```
#### `{ 0 = 42, 1 = null } : Json.Encode.Value`

```elm
person =
    object
      [ ("name", string "Tom")
      , ("age", int 42)
      ]

compact = encode 0 person
```
#### `"{\"name\":\"Tom\",\"age\":42}" : String`

### JSON Decoding

#### Import
```elm
import Json.Decode exposing (..)
```

```elm
decodeString float "3.14159"
```
#### `Ok 3.14159 : Result String Float`

```elm
decodeString (list int) "[1,2,3]"
```
#### `Ok [1,2,3] : Result String (List Int)`

```elm
decodeString (field "y" int) """{ "x": 3, "y": 4 }"""
```
#### `Ok 4 : Result String Int`

```elm
pointDecoder = map2 Point (field "x" int) (field "y" int)
decodeString pointDecoder """{ "x": 3, "y": 4 }"""
```
#### `Ok { x = 3, y = 4 } : Result String Point`

Command Line
------------

### `elm-make`

```bash
$ elm make MyFile.elm
```

```bash
elm-make MyFile.elm --output=main.js
```

```bash
$ elm make MyFile.elm --debug
```

### `elm-reactor`

```bash
$ elm reactor
```

### `elm-repl`

```bash
$ elm repl
```

### `elm-package`

#### Install
```bash
$ elm package install elm-lang/html
```

#### Diff versions
```bash
$ elm package diff elm-lang/html 1.1.0 2.0.0
```

#### Publish to package.elm-lang.org
```bash
$ elm package publish
```

#### Bump version using enforced semantic versioning
```bash
$ elm package bump
```

## References
{: .-one-column}

- [Learn Elm in Y minutes](https://learnxinyminutes.com/docs/elm/)
- [Elm Guide](https://guide.elm-lang.org/)
