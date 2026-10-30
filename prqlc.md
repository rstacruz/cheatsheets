---
title: prqlc
category: CLI
layout: 2017/sheet
updated: 2023-03-07
intro: PRQL is a modern language for transforming data — a simple, powerful, pipelined SQL replacement.
---
## Reference
{:.-two-column}

### Compile PRQL queries
```shell
# Run the compiler interactively
prqlc compile
```

```shell
# Compile a .prql file standard output
prqlc compile file.prql
```

```shell
# Compile a .prql file to a .sql file
prqlc compile in-file.prql out-file.sql
```

```shell
# Compile a query
echo "from employees | filter has_dog | select salary" | prqlc compile
```

```shell
# Watch a directory and compile on file modification
prqlc watch /path/to/directory
```

### Common options for `prql compile`

| Option           | Description                                                              |
|------------------|--------------------------------------------------------------------------|
| `--no-format`    | Do not format the output                                                 |
| `--no-signature` | Do not print the PRQL signature comment                                  |
