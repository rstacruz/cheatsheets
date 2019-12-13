---
title: Siege
category: Others
---

```
siege -b -c=10 -t=5m http://...
```

```
-c, --concurrent=N
-t, --time=MINSm
-r, --reps=N
```

```
-i, --internet       Hit URLs randomly
-b, --benchmark      No delay between requests
```

### Configuration

```
-f, --file=FILE      load urls.txt
-R, --rc=FILE        load siegerc
```

> Also see: [siegerc](https://gist.github.com/stansmet/3067988)

### Headers

```
-H, --header="Cookie: foo=bar"
-A, --user-agent="Mozilla"
-T, --content-type="text/html"
```
