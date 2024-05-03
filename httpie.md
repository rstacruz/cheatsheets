---
title: httpie
category: CLI
weight: -3
updated: 2020-07-05
description: |
  $ http POST http://example.com name="John" Host:example.com — JSON, cookies, files, auth, and other httpie examples.
---

### Introduction
{: .-intro}

[HTTPie](https://httpie.org/) is a command-line HTTP client.

- [HTTPie website](https://httpie.org/) _(httpie.org)_
- [HTTPie documentation](https://httpie.org/docs) _(httpie.org)_
- [Try it online](https://httpie.org/run) _(httpie.org)_

### Parameters

```bash
$ http POST http://example.com/posts/3 \
    Origin:example.com \  # :   HTTP headers
    name="John Doe" \     # =   string
    q=="search" \         # ==  URL parameters (?q=search)
    age:=29 \             # :=  for non-strings
    list:='[1,3,4]' \     # :=  json
    file@file.bin \       # @   attach file
    token=@token.txt \    # =@  read from file (text)
    user:=@user.json      # :=@ read from file (json)
```

### Forms

```bash
$ http --form POST example.com \
    name="John Smith" \
    cv=@document.txt
```

### Raw JSON

```bash
$ echo '{"hello": "world"}' | http POST example.com/post
```

### Options

#### Printing options

```bash
-v, --verbose            # same as --print=HhBb --all
-h, --headers            # same as --print=h
-b, --body               # same as --print=b
    --all                # print intermediate requests
    --print=HhBb         # H: request headers
                         # B: request body
                         # h: response headers
                         # b: response body
    --pretty=none        # all | colors | format
    --json | -j          # Response is serialized as a JSON object.
```

#### Authentication

```bash
    --session NAME
-a, --auth USER:PASS
    --auth-type basic
    --auth-type digest
```

#### Session

```bash
    --session NAME       # store auth and cookies
    --session-read-only NAME
```

#### Downloading

```bash
-d, --download           # like wget
-c, --continue
-o, --output FILE
```

#### Others

```bash
-F, --follow             # follow redirects
    --max-redirects N    # maximum for --follow
    --timeout SECONDS
    --verify no          # skip SSL verification
    --proxy http:http://foo.bar:3128
```

### References

* <https://github.com/jakubroztocil/httpie>
