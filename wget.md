---
title: Wget
subtitle: Non-interactive network downloader
category: Networking
updated: 2026-11-18
tier: t2
fragments:
  - "wget URL"
  - "-O file"
  - "-c"
  - "-q"
  - "-r -l 2"
  - "-m"
  - "-np"
  - "-A pdf"
  - "--limit-rate"
  - "--post-data"
  - "--header"
  - "-i urls.txt"
  - "--spider"
  - "-t 3"
  - "--no-clobber"
  - "-N"
intro: |
  [GNU Wget](https://www.gnu.org/software/wget/) downloads files from the
  web non-interactively over HTTP, HTTPS, and FTP. This reference covers
  common options and recipes, current through Wget 1.25.
links:
  - title: GNU Wget manual
    url: https://www.gnu.org/software/wget/manual/wget.html
  - title: Wget man page
    url: https://man7.org/linux/man-pages/man1/wget.1.html
---

## Getting started

### Basic download

```bash
wget URL                 # save to the current directory
```

Wget runs without a UI and keeps working after you log out.
Progress and errors go to stderr.

See: [Invoking](https://www.gnu.org/software/wget/manual/wget.html#Invoking)

### Output filename

```bash
-O file                  # --output-document: choose the filename
-O -                     # write the body to stdout
--content-disposition    # use the server-suggested filename
--restrict-file-names=windows  # escape unsafe path characters
```

`-O -` streams the body; `--content-disposition` needs server support.

See: [Download options](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Quiet and verbose

```bash
-q                       # --quiet: suppress all output
-v                       # --verbose: show headers and debug details
-nv                      # --no-verbose: between quiet and verbose
-o log                   # --output-file: write messages to a log
-a log                   # --append-output: append to the log
```
<!-- {: data-line="1"} -->

`-o` overwrites the log; `-a` appends. Use `-q` in scripts.

See: [Logging and input file options](https://www.gnu.org/software/wget/manual/wget.html#Logging-and-Input-File-Options)

### Resume and timestamping

```bash
-c                       # --continue: resume a partial file
-N                       # --timestamping: fetch only newer files
-nc                      # --no-clobber: skip existing files
```

`-c` needs range support; `-N` compares remote and local timestamps.

See: [Download options](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Input file

```bash
-i urls.txt              # --input-file: read URLs from a file
```

One URL per line; `-i -` reads stdin, and `#` starts a comment.

See: [Logging and input file options](https://www.gnu.org/software/wget/manual/wget.html#Logging-and-Input-File-Options)

## HTTP

### Headers

```bash
--header='X-Api-Key: abc'  # add a request header
--user-agent='Agent/1.0'   # --user-agent: set the User-Agent
```

Repeat `--header` for more headers; quote values with spaces.

See: [HTTP options](https://www.gnu.org/software/wget/manual/wget.html#HTTP-Options)

### POST data

```bash
--post-data='a=1&b=2'    # send a form-urlencoded body
--post-file=body.txt     # send the contents of a file
```

`--post-data` sets the form content type automatically.

See: [HTTP options](https://www.gnu.org/software/wget/manual/wget.html#HTTP-Options)

### Authentication

```bash
--user=alice             # --user: username
--password=secret        # --password: password
```

Command-line credentials are visible in process listings; prefer `.netrc`.

See: [HTTP options](https://www.gnu.org/software/wget/manual/wget.html#HTTP-Options)

### Cookies

```bash
--load-cookies=cookies.txt  # send cookies from a jar file
--save-cookies=jar.txt      # save cookies at the end
--keep-session-cookies      # keep session cookies when saving
```

Session cookies need `--keep-session-cookies` to persist.

See: [HTTP options](https://www.gnu.org/software/wget/manual/wget.html#HTTP-Options)

### TLS

```bash
--no-check-certificate   # skip certificate verification
--certificate=cert.pem   # send a client certificate (PEM)
```

Verification is on by default; disable it only for controlled endpoints.

See: [HTTPS (SSL/TLS) options](https://www.gnu.org/software/wget/manual/wget.html#HTTPS-_0028SSL_002fTLS_0029-Options)

## Recursive download

### Recursive

```bash
wget -r -l 2 URL         # follow links two levels deep
```

`-l` counts hops from the start URL; `-l inf` removes the cap.

See: [Recursive retrieval options](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Retrieval-Options)

### Mirror

```bash
-m                       # --mirror: recurse, timestamp, no depth cap
```

`-m` also keeps FTP directory listings.

See: [Recursive retrieval options](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Retrieval-Options)

### Page requisites

```bash
-p                       # --page-requisites: fetch images and CSS
-k                       # --convert-links: point links at local files
-E                       # --html-extension: add .html to responses
```

Use `-p -k` together to view one page offline with its assets.

See: [Recursive retrieval options](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Retrieval-Options)

### Directories

```bash
-np                      # --no-parent: do not ascend from the start
--no-directories         # save all files into one directory
-x                       # --force-directories: keep the host path
```

`-np` is the usual guard against crawling into a parent site.

See: [Directory options](https://www.gnu.org/software/wget/manual/wget.html#Directory-Options)

## Filtering

### Accept and reject

```bash
-A pdf                   # --accept: only keep PDF files
-R png,jpg               # --reject: skip images
```

Patterns match filenames; separate several with commas.

See: [Recursive accept/reject options](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Accept_002fReject-Options)

### Domains and hosts

```bash
--domains=example.com    # follow links only within this domain
--exclude-domains=ads.example.com  # skip a specific domain
```

`--domains` includes subdomains and accepts comma-separated names.

See: [Recursive accept/reject options](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Accept_002fReject-Options)

### Directories

```bash
-I css,img               # --include-directories: allow these paths
-X private               # --exclude-directories: skip these paths
```

These patterns match directory names in the URL path.

See: [Directory-based limits](https://www.gnu.org/software/wget/manual/wget.html#Directory-Based-Limits)

### Link following

```bash
--follow-ftp             # follow FTP links found in HTML
--span-hosts             # allow downloads from other hosts
```

Pair `--span-hosts` with `--domains` to bound a cross-host crawl.

See: [Following links](https://www.gnu.org/software/wget/manual/wget.html#Following-Links)

## Rate limiting and retries

### Retries

```bash
-t 3                     # --tries: retry each URL up to three times
--retry-connrefused      # retry refused connections too
```

Connection refusals are not retried unless enabled.

See: [Download options](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Wait and rate

```bash
--wait=2                 # pause two seconds between requests
--random-wait            # vary the pause around --wait
--limit-rate=200k        # cap download speed at 200 KB/s
```

`--random-wait` scales the pause; `k` and `m` set rate units.

See: [Download options](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Timeouts

```bash
--timeout=30             # set every timeout at once
--dns-timeout=5          # DNS lookup limit
--connect-timeout=10     # TCP connection limit
--read-timeout=30        # inactivity limit on reads
```

`--read-timeout` measures inactivity, not total transfer time.

See: [Download options](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Quota and background

```bash
--quota=100m             # stop after 100 MB of downloaded data
-b                       # --background: detach and keep downloading
```

Background output goes to `wget-log` unless `-o` is set.

See: [Basic startup options](https://www.gnu.org/software/wget/manual/wget.html#Basic-Startup-Options)

## Examples
<!-- {: .-one-column} -->

### Download a file

```bash
# Resume a large file with retries
wget -c -t 3 -O archive.zip https://example.com/archive.zip
```

See: [Examples](https://www.gnu.org/software/wget/manual/wget.html#Examples)

### Mirror a site

```bash
# Mirror only PDFs from a docs subdirectory
wget -m -np -A pdf https://example.com/docs/guide/
```

See: [Examples](https://www.gnu.org/software/wget/manual/wget.html#Examples)

### POST JSON

```bash
# POST JSON with an explicit content type
wget --header='Content-Type: application/json' \
  --post-data='{"name":"Ada"}' https://api.example.com/users
```

See: [Examples](https://www.gnu.org/software/wget/manual/wget.html#Examples)

### Check a URL

```bash
# Exit status reports reachability; no file is saved
wget --spider -q https://example.com/health
```

See: [Examples](https://www.gnu.org/software/wget/manual/wget.html#Examples)

## Also see

[Curl cheatsheet](./curl)
<!-- {: .-crosslink} -->
