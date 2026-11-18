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

| Syntax        | Effect                                |
| ------------- | ------------------------------------- |
| `wget URL`    | Save to the current directory         |
| `-i urls.txt` | Read URLs from a file (`--input-file`) |

Wget runs without a UI and keeps downloading after you log out.

See: [Invoking](https://www.gnu.org/software/wget/manual/wget.html#Invoking)

### Output filename

| Flag                          | Effect                              |
| ----------------------------- | ----------------------------------- |
| `-O file`                     | Write the body to `file`            |
| `-O -`                        | Write the body to stdout            |
| `--content-disposition`       | Use the server's suggested filename |
| `--restrict-file-names=windows` | Escape unsafe path characters     |

`-O -` streams; `--content-disposition` needs server support.

See: [Download options](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Quiet and verbose

| Flag     | Effect                                  |
| -------- | --------------------------------------- |
| `-q`     | Suppress all output (`--quiet`)         |
| `-v`     | Show headers and debug (`--verbose`)    |
| `-nv`    | Between quiet and verbose               |
| `-o log` | Write messages to `log`                 |
| `-a log` | Append to `log`                         |

`-o` overwrites; `-a` appends. Use `-q` in scripts.

See: [Logging and input file options](https://www.gnu.org/software/wget/manual/wget.html#Logging-and-Input-File-Options)

### Resume and timestamping

| Flag          | Effect                            |
| ------------- | --------------------------------- |
| `-c`          | Resume a partial file             |
| `-N`          | Fetch only newer files            |
| `--no-clobber` | Skip files that exist            |

`-c`, `-N` and `-nc` answer different "file exists" cases;
pick one rather than stacking them.

See: [Download options](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

## HTTP

### Headers

| Flag                        | Effect                    |
| --------------------------- | ------------------------- |
| `--header='X-Api-Key: abc'` | Add a request header      |
| `--user-agent='Agent/1.0'`  | Set the User-Agent header |

Repeat `--header` for more headers; quote values with spaces.

See: [HTTP options](https://www.gnu.org/software/wget/manual/wget.html#HTTP-Options)

### POST data

| Flag                    | Effect                          |
| ----------------------- | ------------------------------- |
| `--post-data='a=1&b=2'` | Send a form-urlencoded body     |
| `--post-file=body.txt`  | Send a file's contents as body  |

`--post-data` sets the content type automatically.

See: [HTTP options](https://www.gnu.org/software/wget/manual/wget.html#HTTP-Options)

### Authentication

| Flag                 | Effect                            |
| -------------------- | --------------------------------- |
| `--user=alice`       | Username                          |
| `--password=secret`  | Password                          |
| `.netrc`             | Keep credentials out of the process list |

Command-line credentials appear in process listings; prefer
a `.netrc` entry with `machine`, `login` and `password`.

See: [HTTP options](https://www.gnu.org/software/wget/manual/wget.html#HTTP-Options)

### Cookies

| Flag                       | Effect                          |
| -------------------------- | ------------------------------- |
| `--load-cookies=cookies.txt` | Send cookies from a jar       |
| `--save-cookies=jar.txt`   | Save cookies at the end         |
| `--keep-session-cookies`   | Persist session cookies on save |

Netscape-format cookie jars work with both flags.

See: [HTTP options](https://www.gnu.org/software/wget/manual/wget.html#HTTP-Options)

### TLS

| Flag                    | Effect                          |
| ----------------------- | ------------------------------- |
| `--no-check-certificate` | Skip certificate verification  |
| `--certificate=cert.pem` | Send a client certificate (PEM) |

Verification is on by default; disable it only for controlled endpoints.

See: [HTTPS (SSL/TLS) options](https://www.gnu.org/software/wget/manual/wget.html#HTTPS-_0028SSL_002fTLS_0029-Options)

## Recursive download

### Recursive

| Flag       | Effect                                  |
| ---------- | --------------------------------------- |
| `-r -l 2`  | Follow links two levels deep            |
| `-l inf`   | Remove the depth cap                    |

`-l` counts hops from the start URL.

See: [Recursive retrieval options](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Retrieval-Options)

### Mirror

| Flag | Effect                                      |
| ---- | ------------------------------------------- |
| `-m` | Recurse, timestamp, no depth cap (`--mirror`) |

`-m` also keeps FTP directory listings.

See: [Recursive retrieval options](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Retrieval-Options)

### Page requisites

| Flag | Effect                                  |
| ---- | --------------------------------------- |
| `-p` | Fetch images and CSS (`--page-requisites`) |
| `-k` | Point links at local files              |
| `-E` | Add `.html` to responses                |

Use `-p -k` to view one page offline with its assets.

See: [Recursive retrieval options](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Retrieval-Options)

### Directory layout

| Flag               | Effect                              |
| ------------------ | ----------------------------------- |
| `-np`              | Do not ascend from the start URL    |
| `--no-directories` | Save all files into one directory   |
| `-x`               | Keep the host path                  |

`-np` is the usual guard against crawling into a parent site.

See: [Directory options](https://www.gnu.org/software/wget/manual/wget.html#Directory-Options)

## Filtering

### Accept and reject

| Flag       | Effect                       |
| ---------- | ---------------------------- |
| `-A pdf`   | Keep only PDF files          |
| `-R png,jpg` | Skip images                |

Patterns match filenames; separate several with commas.

See: [Recursive accept/reject options](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Accept_002fReject-Options)

### Domains and hosts

| Flag                             | Effect                    |
| -------------------------------- | ------------------------- |
| `--domains=example.com`          | Follow only this domain   |
| `--exclude-domains=ads.example.com` | Skip a specific host   |

`--domains` includes subdomains and accepts comma-separated names.

See: [Recursive accept/reject options](https://www.gnu.org/software/wget/manual/wget.html#Recursive-Accept_002fReject-Options)

### Directory filters

| Flag           | Effect                         |
| -------------- | ------------------------------ |
| `-I css,img`   | Allow these paths              |
| `-X private`   | Skip these paths               |

Patterns match directory names in the URL path.

See: [Directory-based limits](https://www.gnu.org/software/wget/manual/wget.html#Directory-Based-Limits)

### Link following

| Flag            | Effect                            |
| --------------- | --------------------------------- |
| `--follow-ftp`  | Follow FTP links found in HTML    |
| `--span-hosts`  | Allow downloads from other hosts  |

Pair `--span-hosts` with `--domains` to bound a cross-host crawl.

See: [Following links](https://www.gnu.org/software/wget/manual/wget.html#Following-Links)

## Rate limiting and retries

### Retries

| Flag                 | Effect                             |
| -------------------- | ---------------------------------- |
| `-t 3`               | Retry each URL up to three times   |
| `--retry-connrefused` | Retry refused connections too     |

Connection refusals are not retried unless enabled.

See: [Download options](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Wait and rate

| Flag               | Effect                            |
| ------------------ | --------------------------------- |
| `--wait=2`         | Pause two seconds between requests |
| `--random-wait`    | Vary the pause around `--wait`    |
| `--limit-rate=200k` | Cap download speed at 200 KB/s   |

`--random-wait` scales the pause; `k` and `m` set rate units.

See: [Download options](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Timeouts

| Flag                | Effect                          |
| ------------------- | ------------------------------- |
| `--timeout=30`      | Set every timeout at once       |
| `--dns-timeout=5`   | DNS lookup limit                |
| `--connect-timeout=10` | TCP connection limit         |
| `--read-timeout=30` | Inactivity limit on reads       |

`--read-timeout` measures inactivity, not total transfer time.

See: [Download options](https://www.gnu.org/software/wget/manual/wget.html#Download-Options)

### Quota and background

| Flag          | Effect                              |
| ------------- | ----------------------------------- |
| `--quota=100m` | Stop after 100 MB downloaded      |
| `-b`          | Detach and keep downloading         |

Background output goes to `wget-log` unless `-o` is set.

See: [Basic startup options](https://www.gnu.org/software/wget/manual/wget.html#Basic-Startup-Options)

## Examples

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
# Fetch with a custom header and save the body
wget --header='Authorization: Bearer TOKEN' \
  -O out.json https://api.example.com/data
```

```bash
# Check a URL without downloading
wget --spider -q https://example.com && echo OK
```

See: [Examples](https://www.gnu.org/software/wget/manual/wget.html#Examples)

### More recipes

```bash
# Post JSON with an explicit content type
wget --header='Content-Type: application/json' \
  --post-data='{"name":"Ada"}' https://api.example.com/users
```

```bash
# Quiet download with a progress bar only
wget -q --show-progress https://example.com/file
```

```bash
# Limit download speed
wget --limit-rate=100k https://example.com/file
```

See: [Examples](https://www.gnu.org/software/wget/manual/wget.html#Examples)

## Also see

[Curl cheatsheet](./curl)
<!-- {: .-crosslink} -->
