---
title: Siege
subtitle: HTTP load testing tool
category: Networking
tier: t3
last_verified_with: "Siege 4.2.2."
updated: 2026-11-26
intro: |
  Siege is an HTTP and HTTPS load testing tool.
links:
  - title: Siege
    url: https://www.joedog.org/siege/
---

## Usage

### Basic usage

```sh
siege -b -c=10 -t=5m "http://..."
```
<!-- {: data-highlight="siege"} -->

See: [Invocation](https://www.joedog.org/siege/manual#a02)

### Options

#### Repetitions

```
-c, --concurrent=N
-t, --time=MINSm
-r, --reps=N
```

#### Modes

```
-i, --internet       Hit URLs randomly
-b, --benchmark      No delay between requests
```

#### Configuration

```
-f, --file=FILE      load urls.txt
-R, --rc=FILE        load siegerc
```

#### Headers

```
-H, --header="Cookie: foo=bar"
-A, --user-agent="Mozilla"
-T, --content-type="text/html"
```

See: [Command-line options](https://www.joedog.org/siege/manual#a02)

### References

Also see: [Siege README](https://www.joedog.org/siege/readme)
