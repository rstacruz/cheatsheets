---
title: Curl
subtitle: Command-line HTTP client
logo: { src: /assets/logos/curl.svg, mono: true }
category: Networking
updated: 2026-11-11
last_verified_at: 2026-11-12
last_verified_with: "cURL 8.23.0."
tier: t2
fragments:
  - "curl -s"
  - "-X POST"
  - "--compressed"
  - "-H 'X-Foo: bar'"
  - "-d @file"
  - "-F file=@path"
  - "-o file"
  - "-L"
  - "-I"
  - "--http2"
  - "-O"
  - "-u user:pass"
  - "--fail"
  - "-v"
intro: |
  [curl](https://curl.se/) transfers data with URLs from the command line. This reference covers common HTTP options and recipes, current through curl 8.23.
links:
  - title: curl documentation
    url: https://curl.se/docs/
  - title: curl man page
    url: https://curl.se/docs/manpage.html
---

## Getting started

### First requests

#### POST JSON

```bash
# POST JSON
curl --json '{"name": "Ada"}' https://api.example.com/users
```
<!-- {: data-highlight="--json"} -->

#### Follow redirects

```bash
# Follow redirects and save the body
curl -fL -o page.html https://example.com
```
<!-- {: data-highlight="-fL"} -->

See: [Using curl](https://ec.haxx.se/usingcurl/)

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
<!-- {: data-highlight="--http1.1; --http2; --http3"} -->

HTTP/3 needs a curl built with HTTP/3 support.

See: [--http3](https://curl.se/docs/manpage.html#--http3)

### Variables

```bash
--variable host=example.com    # set a variable
--variable %TOKEN             # import an environment variable
--expand-url 'https://{{host}}/v1'
--expand-data '{{TOKEN:trim}}'
```
<!-- {: data-highlight="--variable; --expand-url; --expand-data"} -->

Only `--expand-*` options expand `{{name}}`. Functions include `trim`, `json`, `url`, `b64`, and `64dec`.

See: [--variable](https://curl.se/docs/manpage.html#--variable)

### Config files

```bash
-K curlrc           # --config: read options from a file
-K -                # read options from stdin
-q                  # --disable: ignore .curlrc
```
<!-- {: data-highlight="-K curlrc; -K -; -q"} -->

curl reads `$CURL_HOME/.curlrc`, `$XDG_CONFIG_HOME/curlrc`, then `$HOME/.curlrc`. Write one option per line, without leading dashes.

See: [Config file](https://ec.haxx.se/cmdline/configfile.html)

## Examples

<!-- {: .-one-column} -->

### Upload a file

```bash
# Upload a file
curl -F name=Ada -F avatar=@photo.jpg https://example.com/upload
```
<!-- {: data-highlight="-F avatar=@photo.jpg"} -->

See: [Using curl](https://ec.haxx.se/usingcurl/)

### Check and download

#### Status code

```bash
# Check the status code
curl -s -o /dev/null -w '%{http_code}\n' https://example.com
```
<!-- {: data-highlight="%{http_code}"} -->

#### Download with retries

```bash
# Download with retries
curl -fL --retry 3 -O https://example.com/file.tar.gz
```
<!-- {: data-highlight="--retry 3"} -->

See: [Using curl](https://ec.haxx.se/usingcurl/)

## Also see

### JSON requests

[curl POST JSON cheatsheet](./curl-post-json)
<!-- {: .-crosslink} -->
