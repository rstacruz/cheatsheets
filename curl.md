---
title: Curl
category: CLI
layout: 2017/sheet
updated: 2020-03-09
---

## Options

### Options

```bash
-o <file>    # --output: write to file
-u user:pass # --user: Authentication
```

```bash
-v           # --verbose
-vv          # Even more verbose
-s           # --silent
```

```bash
-i           # --include: Include the HTTP-header in the output
-I           # --head: headers only
```

### Request

```bash
-X POST          # --request
-L               # follow link if page redirects 
```

### Data

```bash
-d 'data'    # --data: HTTP post data, URL encoded (eg, status="Hello")
-d @file     # --data via file
-G           # --get: send -d data via get
```

### Headers

```bash
-A <str>         # --user-agent
-b name=val      # --cookie
-b FILE          # --cookie
-H "X-Foo: y"    # --header
--compressed     # use deflate/gzip
```

### SSL

```bash
    --cacert <file>
    --capath <dir>
```

```bash
-E, --cert <cert>     # --cert: Client cert file
    --cert-type       # der/pem/eng
-k, --insecure        # for self-signed certs
```

## Examples
{: .-one-column}

```bash
# Post data:
curl -d password=x http://x.com/y
```

```bash
# Auth/data:
curl -u user:pass -d status="Hello" http://twitter.com/statuses/update.xml
```

```bash
# multipart file upload
curl -v -include --form key1=value1 --form upload=@localfilename URL
```

```bash
# Use Curl to Check if a remote resource is available
# details: https://matthewsetter.com/check-if-file-is-available-with-curl/
curl -o /dev/null --silent -Iw "%{http_code}" https://example.com/my.remote.tarball.gz
```
