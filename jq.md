---
title: jq
subtitle: JSON processor
category: CLI
tier: t2
updated: 2026-11-18
last_verified_with: "jq 1.8.2."
fragments:
  - "jq '.'"
  - ".users[]"
  - ".users[].name"
  - "select(.active)"
  - "map(.name)"
  - "-r"
  - "sort_by(.name)"
  - "-c"
  - "to_entries"
  - "-s"
  - "group_by(.role)"
  - "-n"
  - "with_entries"
  - "--arg name"
  - "@csv"
  - "--argjson"
  - "@tsv"
  - "reduce"
intro: |
  [jq](https://jqlang.org/) filters JSON on the command line: pick fields,
  reshape objects, and reformat output. This sheet covers the filters and
  flags used most often.
links:
  - title: jq manual
    url: https://jqlang.org/manual/
  - title: GitHub repository
    url: https://github.com/jqlang/jq
---

## Getting started

### The input

```json
{
  "account": { "plan": "pro", "seats": 3 },
  "users": [
    { "name": "Ada", "role": "admin", "active": true },
    { "name": "Linus", "role": "dev", "active": false },
    { "name": "Grace", "role": "dev", "active": true }
  ]
}
```

Examples read this file as `api.json`.

See: [Invoking jq](https://jqlang.org/manual/#invoking-jq)

### Field access

```bash
jq '.users[0].name' api.json
# → "Ada"
```
<!-- {: data-highlight=".users[0].name"} -->

`.` is the input document; `.foo` reads a key. Strings keep their quotes
unless `-r` is passed.

See: [Object identifier-index](https://jqlang.org/manual/#object-identifier-index)

### Raw and compact output

```bash
jq -c '.users[1]' api.json
# → {"name":"Linus","role":"dev","active":false}
```
<!-- {: data-highlight="-c"} -->

#### Flags

| Flag | Effect |
| --- | --- |
| `-r` | raw strings, no quotes |
| `-c` | one line per value |
| `-S` | sort keys |
| `--tab` | indent with tabs |
| `--indent 4` | indent with 4 spaces |
| `-e` | exit 1 on false/null, 4 if empty |
<!-- {: .-headers} -->

See: [Invoking jq](https://jqlang.org/manual/#invoking-jq)

## Selecting

### Nested fields

```bash
jq -r '.account.plan' api.json
# → pro
```
<!-- {: data-highlight=".account.plan"} -->

Chain keys to walk deeper. A missing key yields `null`, not an error.

See: [Object identifier-index](https://jqlang.org/manual/#object-identifier-index)

### Arrays and slices

```bash
jq -c '.users[0:2] | map(.name)' api.json
# → ["Ada","Linus"]
```
<!-- {: data-highlight=".users[0:2]"} -->

`.[0]` is the first element and `.[-1]` the last; `.[2:]` runs to the end.

See: [Array/string slice](https://jqlang.org/manual/#array-string-slice)

### Iteration

```bash
jq -r '.users[].name' api.json
# → Ada
# → Linus
# → Grace
```
<!-- {: data-highlight=".users[].name"} -->

`.[]` streams each element. Wrap the filter in brackets to collect the
stream back into an array: `[.users[].name]`.

See: [Array/object value iterator](https://jqlang.org/manual/#array-object-value-iterator)

### Optional access

```bash
jq '.users[] | .tags[]?' api.json
# → no output
```
<!-- {: data-highlight=".tags[]?"} -->

`?` suppresses the error, so a missing `tags` key yields nothing instead of
aborting the run.

See: [Optional operator](https://jqlang.org/manual/#error-suppression-optional-operator)

## Filtering

### select

```bash
jq -r '.users[] | select(.active).name' api.json
# → Ada
# → Grace
```
<!-- {: data-highlight="select(.active)"} -->

`select(f)` passes the input through only when `f` is true. Swap in any test,
such as `select(.role == "dev")`.

See: [select](https://jqlang.org/manual/#select)

### map

```bash
jq -c '.users | map(.name)' api.json
# → ["Ada","Linus","Grace"]
```
<!-- {: data-highlight="map(.name)"} -->

`map(f)` applies `f` to every element and returns an array.

See: [map](https://jqlang.org/manual/#map-map_values)

### map_values

```bash
echo '{"ada":2,"linus":5}' | jq -c 'map_values(. + 1)'
# → {"ada":3,"linus":6}
```
<!-- {: data-highlight="map_values(. + 1)"} -->

On objects `map_values` keeps the keys; on arrays it behaves like `map`.

See: [map_values](https://jqlang.org/manual/#map-map_values)

### Keys and counts

```bash
jq -c '.users | length, (.[0] | keys)' api.json
# → 3
# → ["active","name","role"]
```
<!-- {: data-highlight="length; keys"} -->

`has("users")` tests for one key. `length` also counts characters in a
string and keys in an object.

See: [keys](https://jqlang.org/manual/#keys-keys_unsorted)

### Totals

```bash
echo '[12,48,7]' | jq -c '[add, min, max]'
# → [67,7,48]
```
<!-- {: data-highlight="add; min; max"} -->

`add` sums an array; `min` and `max` read the same array.

See: [add](https://jqlang.org/manual/#add)

## Sorting and grouping

### sort_by

```bash
jq -c '.users | sort_by(.name) | map(.name)' api.json
# → ["Ada","Grace","Linus"]
```
<!-- {: data-highlight="sort_by(.name)"} -->

Plain `sort` compares whole values; `sort_by(.key)` sorts objects by one
field.

See: [sort_by](https://jqlang.org/manual/#sort-sort_by)

### group_by

```bash
jq -c '.users|group_by(.role)|map([.[0].role,length])' api.json
# → [["admin",1],["dev",2]]
```
<!-- {: data-highlight="group_by(.role)"} -->

Groups are sorted by key. Each group is an array, so `length` counts its
members.

See: [group_by](https://jqlang.org/manual/#group_by)

### unique

```bash
jq -c '[.users[].role] | unique' api.json
# → ["admin","dev"]
```
<!-- {: data-highlight="unique"} -->

`unique_by(.key)` dedupes objects by one field instead of the whole value.

See: [unique](https://jqlang.org/manual/#unique-unique_by)

## Building values

### Objects and arrays

```bash
jq -c '.users[0] | {name, active}' api.json
# → {"name":"Ada","active":true}
```
<!-- {: data-highlight="{name, active}"} -->

`{name}` is shorthand for `{name: .name}`. `[...]` collects a stream into an
array.

See: [Object construction](https://jqlang.org/manual/#object-construction)

### String interpolation

```bash
jq -r '.users[] | "\(.name) is \(.role)"' api.json
# → Ada is admin
# → Linus is dev
# → Grace is dev
```
<!-- {: data-highlight="\(.name); \(.role)"} -->

`\(...)` interpolates any filter into a string; pair it with `-r` to drop the
quotes.

See: [String interpolation](https://jqlang.org/manual/#string-interpolation)

### Conditionals

```bash
jq -r '.users[] | if .active then "in" else "out" end' api.json
# → in
# → out
# → in
```
<!-- {: data-highlight="if; then; else; end"} -->

Add `elif .role == "admin"` between `if` and `else` for more branches. `end`
is required.

See: [if-then-else](https://jqlang.org/manual/#if-then-else-end)

### Alternatives

```bash
echo '{"nick":null,"name":"Ada"}' | jq -r '.nick // .name'
# → Ada
```
<!-- {: data-highlight="//"} -->

`//` yields the right side when the left is `false` or `null`.

See: [Alternative operator](https://jqlang.org/manual/#alternative-operator)

### Errors

```bash
jq -r '.users[0] | try (.name - 1) catch .' api.json
# → string ("Ada") and number (1) cannot be subtracted
```
<!-- {: data-highlight="try; catch"} -->

`catch .` receives the message. `?` is shorthand for `try`.

See: [try-catch](https://jqlang.org/manual/#try-catch)

## Transforming

### Entries

```bash
echo '{"ada":2,"linus":5}' | jq -c 'to_entries'
# → [{"key":"ada","value":2},{"key":"linus","value":5}]
```
<!-- {: data-highlight="to_entries"} -->

#### with_entries

```bash
echo '{"ada":2,"linus":5}' | jq -c 'with_entries(.value += 1)'
# → {"ada":3,"linus":6}
```
<!-- {: data-highlight="with_entries(.value += 1)"} -->

`with_entries(f)` is `to_entries | map(f) | from_entries`.

See: [to_entries](https://jqlang.org/manual/#to_entries-from_entries-with_entries)

### reduce

```bash
echo '[12,48,7]' | jq 'reduce .[] as $n (0; . + $n)'
# → 67
```
<!-- {: data-highlight="reduce"} -->

`(0; . + $n)` seeds the accumulator at `0` and adds each element.

See: [reduce](https://jqlang.org/manual/#reduce)

### Arguments

```bash
jq -n -c --arg name Ada --argjson n 2 '{name: $name, n: $n}'
# → {"name":"Ada","n":2}
```
<!-- {: data-highlight="--arg name; --argjson n"} -->

`--arg` always makes a string, `--argjson` parses JSON. `--slurpfile v f.json` reads a file into `$v`; `--rawfile v f.txt` reads plain text.

See: [Invoking jq](https://jqlang.org/manual/#invoking-jq)

## Output formats

### CSV and TSV

#### CSV

```bash
jq -r '.users[] | [.name,.role] | @csv' api.json
# → "Ada","admin"
# → "Linus","dev"
# → "Grace","dev"
```
<!-- {: data-highlight="@csv"} -->

#### TSV

```bash
jq -r '.users[] | [.name,.role] | @tsv' api.json
# → Ada	admin
# → Linus	dev
# → Grace	dev
```
<!-- {: data-highlight="@tsv"} -->

`@csv` quotes strings and separates fields with commas; `@tsv` uses tabs.

See: [Format strings](https://jqlang.org/manual/#format-strings-and-escaping)

### JSON and Base64

#### JSON text

```bash
jq -r '.users[0] | @json' api.json
# → {"name":"Ada","role":"admin","active":true}
```
<!-- {: data-highlight="@json"} -->

#### Base64

```bash
jq -r '.users[0].name | @base64' api.json
# → QWRh
```
<!-- {: data-highlight="@base64"} -->

`@base64d` decodes, and `@text` stringifies any value.

See: [Format strings](https://jqlang.org/manual/#format-strings-and-escaping)

### Generating JSON

```bash
jq -n -c --arg user Ada '{user: $user, admin: false}'
# → {"user":"Ada","admin":false}
```
<!-- {: data-highlight="-n"} -->

`-n` runs the filter once with no input, so args and constants build the
document. Use `inputs` to read stdin from inside the program.

See: [Invoking jq](https://jqlang.org/manual/#invoking-jq)

## Files and streams

### Multiple files

```bash
# a.json = {"a":1}
# b.json = {"b":2}
jq -cs 'add' a.json b.json
# → {"a":1,"b":2}
```
<!-- {: data-highlight="-cs"} -->

Without `-s`, each value in each file is processed on its own.

See: [Invoking jq](https://jqlang.org/manual/#invoking-jq)

### JSON Lines

```bash
# events.jsonl = {"user":"ada","ms":12}
#               {"user":"linus","ms":48}
jq -c '.ms' events.jsonl
# → 12
# → 48
```
<!-- {: data-highlight=".ms"} -->

#### Slurping

```bash
jq -cs 'map(.ms) | add' events.jsonl
# → 60
```
<!-- {: data-highlight="map(.ms)"} -->

JSON Lines files parse as one value per line; `-s` collects them into one
array.

See: [Invoking jq](https://jqlang.org/manual/#invoking-jq)

### Streaming

```bash
echo '{"a":[{"b":1}]}' | jq -c --stream 'select(length == 2)'
# → [["a",0,"b"],1]
```
<!-- {: data-highlight="--stream"} -->

`--stream` emits `[path, leaf]` pairs as the input parses, keeping memory flat
on large files.

See: [Streaming](https://jqlang.org/manual/#streaming)
