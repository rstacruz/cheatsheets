---
title: Wget
subtitle: Non-interactive network retriever
category: Networking
tags: [Featured]
updated: 2026-11-18
tier: t2
fragments:
  - "wget URL"
  - "-O file"
  - "-c"
  - "-r"
  - "-m"
  - "-np"
  - "-k"
  - "-p"
  - "-t 3"
  - "--limit-rate"
  - "-w 1"
  - "-N"
  - "--spider"
  - "-q"
  - "-O -"
  - "-P dir"
  - "-nd"
  - "-A pdf"
  - "-l 2"
  - "--post-data"
intro: |
  [GNU Wget](https://www.gnu.org/software/wget/) retrieves files from the web
  non-interactively. This reference covers common options and recipes,
  current through Wget 1.25.
links:
  - title: GNU Wget manual
    url: https://www.gnu.org/software/wget/manual/wget.html
  - title: GNU Wget
    url: https://www.gnu.org/software/wget/
---

## Getting started

### Basic download

```bash
wget https://example.com/file.zip
```

Downloads `file.zip` to the current directory.

See: [Invoking Wget](https://www.gnu.org/software/wget/manual/wget.html#Invoking)

### Output file

```bash
wget -O out.zip https://example.com/file
wget -O - https://example.com/file   # write to stdout
```

`-O -` sends the body to stdout, useful in pipelines.

See: [-O, --output-document](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Quiet mode

```bash
wget -q https://example.com/file
wget -nv https://example.com/file
```

`-q` silences everything; `-nv` keeps errors but drops the progress meter.

See: [-q, --quiet](https://www.gnu.org/software/wget/manual/wget.html#Logging-and-Input-File-Options)

## Download options

### Resume

```bash
wget -c https://example.com/file
```

Continues a partially downloaded file. Combine with `-O` to name it.

See: [-c, --continue](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Retries

```bash
wget -t 3 --retry-connrefused https://example.com/file
wget -t 0 https://example.com/file   # unlimited
```

`--retry-on-http-error=500,503` retries specific status codes.

See: [-t, --tries](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Rate and wait

```bash
wget --limit-rate=200k https://example.com/file
wget -w 1 --random-wait https://example.com/file
```

`-w` waits between retrievals; `--random-wait` varies it.

See: [--limit-rate](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Timeouts

```bash
wget -T 30 https://example.com/file
wget --dns-timeout=10 --connect-timeout=10 --read-timeout=30 URL
```

`-T` sets all three timeouts at once.

See: [-T, --timeout](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Timestamping

```bash
wget -N https://example.com/file
```

Skips the download when the local file is already as new as the remote one.

See: [-N, --timestamping](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Spider

```bash
wget --spider https://example.com
```

Checks that the URL resolves without downloading the body.

See: [--spider](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Authentication

```bash
wget --user=alice --password=secret https://example.com/file
wget --http-user=alice --http-password=secret https://example.com/file
wget --ask-password https://example.com/file
```

`--ask-password` prompts instead of exposing the secret on the command line.

See: [--user](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

## HTTP options

### Headers

```bash
wget --header='X-Foo: bar' https://example.com/file
wget -U 'Mozilla/5.0' https://example.com/file
```

`-U` sets the `User-Agent` header.

See: [--header](https://www.gnu.org/software/wget/manual/wget.html#HTTP-Options)

### Cookies

```bash
wget --load-cookies cookies.txt https://example.com/
wget --save-cookies cookies.txt \
  --keep-session-cookies https://example.com/
```

Loads or saves cookies in Netscape format.

See: [--load-cookies](https://www.gnu.org/software/wget/manual/wget.html#HTTP-Options)

### POST data

```bash
wget --post-data='a=1&b=2' https://example.com/api
wget --post-file=body.txt https://example.com/api
wget --method=PUT --body-file=body.txt https://example.com/api
```

`--method` overrides the verb; pair it with `--body-data` or `--body-file`.

See: [--post-data](https://www.gnu.org/software/wget/manual/wget.html#HTTP-Options)

### Redirects and proxies

```bash
wget --max-redirect=5 https://example.com/file
wget -e use_proxy=yes \
  -e http_proxy=http://proxy:8080 https://example.com/file
```

`--no-proxy` disables the proxy for a single run.

See: [--max-redirect](https://www.gnu.org/software/wget/manual/wget.html#HTTP-Options)

## Recursive download

### Mirror a site

```bash
wget -m https://example.com/
```

Shortcut for `-N -r -l inf --no-remove-listing`.

See: [-m, --mirror](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Download)

### Recursion

```bash
wget -r -l 2 https://example.com/
wget -r -l inf https://example.com/
```

`-l 0` or `inf` means infinite depth.

See: [-r, --recursive](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Download)

### Convert links

```bash
wget -k -p https://example.com/page.html
```

`-k` rewrites links for offline viewing; `-p` fetches page requisites.

See: [-k, --convert-links](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Download)

### Accept and reject

```bash
wget -r -A pdf,zip https://example.com/
wget -r -R html,htm https://example.com/
wget -r --accept-regex='.*\.pdf$' https://example.com/
```

Filters by extension or regular expression.

See: [-A, --accept](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Accept-Reject-Options)

### Domains and directories

```bash
wget -r -D example.com,cdn.example.com https://example.com/
wget -r -np https://example.com/docs/
wget -r -I /docs,/assets https://example.com/
wget -r -X /private https://example.com/
```

`-np` never ascends to the parent directory.

See: [-D, --domains](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Accept-Reject-Options)

## Directories

### Output directory

```bash
wget -P out/ https://example.com/file
wget -nd https://example.com/a/b/file
```

`-P` sets the prefix; `-nd` flattens the directory structure.

See: [-P, --directory-prefix](https://www.gnu.org/software/wget/manual/wget.html#Directory-Options)

### Cut directories

```bash
wget --cut-dirs=2 https://example.com/a/b/file
wget -nH --cut-dirs=1 https://example.com/a/b/file
```

`-nH` skips the host directory in recursive downloads.

See: [--cut-dirs](https://www.gnu.org/software/wget/manual/wget.html#Directory-Options)

## Logging and input

### Log file

```bash
wget -o log.txt https://example.com/file
wget -a log.txt https://example.com/file
```

`-a` appends instead of overwriting.

See: [-o, --output-file](https://www.gnu.org/software/wget/manual/wget.html#Logging-and-Input-File-Options)

### Input file

```bash
wget -i urls.txt
wget -i - -F -B https://example.com/ < page.html
```

`-i -` reads URLs from stdin; `-F` treats the file as HTML.

See: [-i, --input-file](https://www.gnu.org/software/wget/manual/wget.html#Logging-and-Input-File-Options)

### Background

```bash
wget -b https://example.com/file
```

Goes to the background and writes output to `wget-log`.

See: [-b, --background](https://www.gnu.org/software/wget/manual/wget.html#Startup-Options)

## FTP

### FTP download

```bash
wget ftp://example.com/file.zip
wget --ftp-user=alice --ftp-password=secret ftp://example.com/file
```

Passive mode is the default; use `--no-passive-ftp` to disable it.

See: [FTP Options](https://www.gnu.org/software/wget/manual/wget.html#FTP-Options)

### Passive mode

```bash
wget --no-passive-ftp ftp://example.com/file
```

Passive mode is the default; use active mode when the server requires it.

See: [--no-passive-ftp](https://www.gnu.org/software/wget/manual/wget.html#FTP-Options)

## Examples

<!-- {: .-one-column} -->

### Common recipes

```bash
# Mirror a site for offline browsing
wget -m -k -p -np https://example.com/
```

```bash
# Resume an interrupted download
wget -c https://example.com/large.iso
```

```bash
# Download all PDFs from a page
wget -r -l 1 -A pdf -np https://example.com/docs/
```

```bash
# Fetch with custom headers and save body
wget --header='Authorization: Bearer TOKEN' \
  -O out.json https://api.example.com/data
```

```bash
# Check a URL without downloading
wget --spider -q https://example.com && echo OK
```

See: [Examples](https://www.gnu.org/software/wget/manual/wget.html)

### More recipes

```bash
# Quiet download with progress bar only
wget -q --show-progress https://example.com/file
```

```bash
# Limit download speed
wget --limit-rate=100k https://example.com/file
```

See: [GNU Wget manual](https://www.gnu.org/software/wget/manual/wget.html)
