---
title: Curl
category: CLI
tags: [Featured]
updated: 2026-11-11
tier: t2
intro: |
  [curl](https://curl.se/) transfers data with URLs from the command line. This reference covers common HTTP options and recipes, current through curl 8.23.
links:
  - title: curl documentation
    url: https://curl.se/docs/
  - title: curl man page
    url: https://curl.se/docs/manpage.html
---

## Getting started

### Options

```bash
-o file       # --output: write body to file
-O            # --remote-name: use remote filename
-u user:pass  # --user: basic authentication
-v            # --verbose: show request and response
-s            # --silent: hide progress and errors
-S            # --show-error: errors even with -s
-i            # --include: include response headers
-I            # --head: fetch headers only
```

Use `-sS` to hide the progress meter but still print errors.

See: [curl man page](https://curl.se/docs/manpage.html)

### Request

```bash
-X POST           # --request: set method
-L                # --location: follow redirects
-F name=value     # --form: multipart/form-data
-F file=@path     # upload a file
-f                # --fail: exit 22 on HTTP 4xx/5xx
--fail-with-body  # --fail, but keep the response body
--retry 3         # retry transient errors
```

See: [-X, --request](https://curl.se/docs/manpage.html#-X)

### Data

```bash
-d 'a=1&b=2'          # --data: form-urlencoded body
-d @file              # read body from file
-d @-                 # read body from stdin
--data-binary @file   # raw bytes from file
--data-urlencode a=1  # URL-encode a field
-G                    # --get: append data to query string
--json '{"a": 1}'     # JSON POST with headers
--url-query a=1       # append an encoded query parameter
```

`--data` does not URL-encode; `@file` strips newlines. Use `--data-urlencode` for `&`/`=`, or `--data-binary @file` for exact bytes.

See: [-d, --data](https://curl.se/docs/manpage.html#-d)

### Headers

```bash
-H 'X-Foo: bar'   # --header: add a request header
-A 'agent'        # --user-agent
-b name=value     # --cookie: send a cookie
-b cookies.txt    # --cookie: read a cookie file
-c cookies.txt    # --cookie-jar: save cookies
--compressed      # request a compressed response
```

See: [-H, --header](https://curl.se/docs/manpage.html#-H)

### TLS

```bash
--cacert ca.pem   # CA bundle
--capath /etc/ssl # CA directory
--ca-native       # add the OS certificate store
-E cert.pem       # --cert: client certificate
--cert-type PEM   # certificate type
-k                # --insecure: skip verification
```

`--ca-native` adds the OS trust store; support depends on the TLS backend.

See: [SSL certificate verification](https://curl.se/docs/sslcerts.html)

## Advanced

### Transfers

```bash
--no-progress-meter  # hide progress, keep errors
--retry 3            # retry transient errors
--retry-all-errors   # retry any error
-C -                 # --continue-at: resume a partial file
--parallel           # run transfers in parallel
--rate 10/s          # cap request rate
--resolve example.com:443:127.0.0.1  # pin host to an address
```

`--rate` has no effect when `--parallel` is used.

See: [--parallel](https://curl.se/docs/manpage.html#--parallel), [retries](https://ec.haxx.se/usingcurl/downloads/retry.html)

### HTTP versions

```bash
--http1.1   # force HTTP/1.1
--http2     # use HTTP/2
--http3     # try HTTP/3, fall back
```

HTTP/3 needs a curl built with HTTP/3 support.

See: [--http3](https://curl.se/docs/manpage.html#--http3)

### Variables

```bash
--variable host=example.com    # set a variable
--variable %TOKEN             # import an environment variable
--expand-url 'https://{{host}}/v1'
--expand-data '{{TOKEN:trim}}'
```

Only `--expand-*` options expand `{{name}}`. Functions include `trim`,
`json`, `url`, `b64`, and `64dec`.

See: [--variable](https://curl.se/docs/manpage.html#--variable)

### Config files

```bash
-K curlrc           # --config: read options from a file
-K -                # read options from stdin
-q                  # --disable: ignore .curlrc
```

curl reads `$CURL_HOME/.curlrc`, `$XDG_CONFIG_HOME/curlrc`, then
`$HOME/.curlrc`. Write one option per line, without leading dashes.

See: [Config file](https://ec.haxx.se/cmdline/configfile.html)

## Examples

<!-- {: .-one-column} -->

### Common recipes

```bash
# POST JSON
curl --json '{"name": "Ada"}' https://api.example.com/users
```

```bash
# Upload a file
curl -F name=Ada -F avatar=@photo.jpg https://example.com/upload
```

```bash
# Follow redirects and save the body
curl -fL -o page.html https://example.com
```

```bash
# Check the status code
curl -s -o /dev/null -w '%{http_code}\n' https://example.com
```

```bash
# Download with retries
curl -fL --retry 3 -O https://example.com/file.tar.gz
```

See: [Using curl](https://ec.haxx.se/usingcurl/)
