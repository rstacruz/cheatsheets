---
title: Siege
category: Others
intro: |
  [Siege](https://www.joedog.org/siege-home/) is an HTTP and HTTPS load testing tool.
---

### Basic usage

```sh
siege -b -c=10 -t=5m "http://..."
```

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

### References

Also see: [siegerc](https://gist.github.com/stansmet/3067988)
