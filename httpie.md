---
title: httpie
subtitle: Human-friendly HTTP client
category: Networking
weight: -3
updated: 2026-11-23
last_verified_with: "HTTPie CLI 3.2.4."
tier: t3
description: |
  $ http POST http://example.com name="John" Host:example.com — JSON, cookies, files, auth, and other httpie examples.
intro: |
  [HTTPie](https://httpie.io/) is a command-line HTTP client.
links:
  - title: HTTPie website
    url: https://httpie.io/
  - title: HTTPie documentation
    url: https://httpie.io/docs/cli
  - title: Try it online
    url: https://httpie.io/cli/run
---

## Requests

### Parameters

```bash
$ http POST http://example.com/posts/3 \
    Origin:example.com \  # :   HTTP headers
    name="John Doe" \     # =   string
    q=="search" \         # ==  URL parameters (?q=search)
    age:=29 \             # :=  non-string JSON value
    list:='[1,3,4]' \     # :=  JSON value
    token=@token.txt \    # =@  read from file (text)
    user:=@user.json      # :=@ read from file (json)
```
<!-- {: data-highlight="name=; q==; age:=; token=@"} -->

See: [Request items](https://httpie.io/docs/cli/command-line-options#request-items)

### Forms

```bash
$ http --form POST example.com \
    name="John Smith" \
    cv@document.txt
```
<!-- {: data-highlight="--form"} -->

See: [Forms](https://httpie.io/docs/cli/command-line-options#forms)

### Raw JSON

```bash
$ echo '{"hello": "world"}' | http POST example.com/post
```
<!-- {: data-highlight="http POST"} -->

See: [Raw request body](https://httpie.io/docs/cli/command-line-options#raw-request-body)

## Options

### Printing options

```bash
-v, --verbose            # print full HTTP exchange; implies --all
-h, --headers            # same as --print=h
-b, --body               # same as --print=b
    --all                # print intermediate requests
    --print=HhBb         # H: request headers
                         # B: request body
                         # h: response headers
                         # b: response body
    --pretty=none        # all | colors | format
    --json | -j          # JSON request data (default); set Accept
```
<!-- {: data-highlight="--print=HhBb"} -->

See: [Output options](https://httpie.io/docs/cli/command-line-options#output-options)

### Authentication

```bash
    --session NAME
-a, --auth USER:PASS
    --auth-type basic
    --auth-type digest
    --auth-type bearer
```
<!-- {: data-highlight="--auth USER:PASS"} -->

See: [Authentication](https://httpie.io/docs/cli/command-line-options#authentication)

### Session

```bash
    --session NAME       # store auth and cookies
    --session-read-only NAME
```
<!-- {: data-highlight="--session; --session-read-only"} -->

See: [Named sessions](https://httpie.io/docs/cli/command-line-options#named-sessions)

### Downloading

```bash
-d, --download           # like wget
-c, --continue
-o, --output FILE
```
<!-- {: data-highlight="-d"} -->

See: [Download mode](https://httpie.io/docs/cli/command-line-options#download-mode)

### Others

```bash
-F, --follow             # follow redirects
    --max-redirects N    # maximum for --follow
    --timeout SECONDS
    --verify=no          # skip SSL verification
    --proxy http:http://foo.bar:3128
```

See: [HTTPie CLI docs](https://httpie.io/docs/cli/command-line-options)

## References

* <https://github.com/httpie/cli>

See: [HTTPie CLI on GitHub](https://github.com/httpie/cli)
