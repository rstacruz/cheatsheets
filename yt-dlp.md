---
title: yt-dlp
subtitle: Command-line video downloader
category: CLI
updated: 2026-11-16
tier: t2
keywords:
  - video download
  - YouTube
  - ffmpeg
  - subtitles
  - audio extraction
intro: |
  [yt-dlp](https://github.com/yt-dlp/yt-dlp#readme) is a command-line downloader for YouTube and thousands of other sites. This reference covers format selection, output templates, audio, subtitles, cookies, and the options worth remembering.
links:
  - title: yt-dlp README
    url: https://github.com/yt-dlp/yt-dlp#readme
  - title: Installation guide
    url: https://github.com/yt-dlp/yt-dlp/wiki/Installation
  - title: Supported sites
    url: https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md
  - title: FAQ
    url: https://github.com/yt-dlp/yt-dlp/wiki/FAQ
---

## Getting started

### Install

```bash
brew install yt-dlp                 # macOS, Linuxbrew
pip install -U "yt-dlp[default]"    # Python 3.11+
nix profile install nixpkgs#yt-dlp  # Nix
yt-dlp --version                    # check it runs
```

ffmpeg is required for merging, audio extraction, and embedding. Full
YouTube support also needs a JS runtime such as deno.

See: [Installation](https://github.com/yt-dlp/yt-dlp#installation)

### Update

```bash
yt-dlp -U                    # release binary only
yt-dlp --update-to nightly   # recommended channel
brew upgrade yt-dlp          # package installs
pip install -U "yt-dlp[default]"
```

`-U` only updates the release binary; use the package manager that
installed yt-dlp for every other install.

See: [Update](https://github.com/yt-dlp/yt-dlp#update)

### First download

```bash
yt-dlp URL                          # best video + audio
yt-dlp -P ~/Videos URL              # choose a directory
yt-dlp -f "bv*+ba/b" URL            # the same default pick
```

The default is the best video and audio streams, merged with ffmpeg.
Pass `-F` to see every format first.

See: [Usage and options](https://github.com/yt-dlp/yt-dlp#usage-and-options)

## Format selection

### List formats

```bash
yt-dlp -F URL          # format IDs, codecs, sizes
yt-dlp -v -F URL       # also show the sort order
```

Format IDs are specific to each extractor, so list them before
hard-coding one.

See: [Video format options](https://github.com/yt-dlp/yt-dlp#video-format-options)

### Pick a format

```bash
yt-dlp -f 137+140 URL                # IDs from -F
yt-dlp -f "bv*[height<=720]+ba/b" URL
yt-dlp -f "best[height<=480]" URL
yt-dlp -f 22/17/18 URL               # first available
```

Slash separates fallbacks, `+` merges streams, and brackets filter
fields. A filter without a selector implies `best`.

See: [Format selection](https://github.com/yt-dlp/yt-dlp#format-selection)

### Sort formats

```bash
yt-dlp -S "res:1080" URL              # cap at 1080p
yt-dlp -S "res:720,fps" URL           # 720p, then fps
yt-dlp -S "+size" URL                 # smallest first
yt-dlp -S "vcodec:h264,acodec:aac" URL
```

`-S` changes what `best` means. Fields sort descending unless
prefixed with `+`.

See: [Sorting formats](https://github.com/yt-dlp/yt-dlp#sorting-formats)

### Merge into a container

```bash
yt-dlp --merge-output-format mp4 URL
yt-dlp --merge-output-format mkv URL
yt-dlp -f "bv*+ba/b" -S "vcodec:h264,acodec:aac" \
  --merge-output-format mp4 URL
```

The option is ignored when no merge is needed. Add the `-S` line when
a player needs H.264 and AAC rather than VP9 and Opus.

See: [Format selection examples](https://github.com/yt-dlp/yt-dlp#format-selection-examples)

## Output files

### Output templates

```bash
yt-dlp -o "%(title)s.%(ext)s" URL
yt-dlp -o "%(uploader)s/%(upload_date)s - %(title)s.%(ext)s" URL
yt-dlp -o "%(playlist_title)s/%(title)s.%(ext)s" URL
```

#### Fields

| Field | Value |
| --- | --- |
| `%(id)s` | Video ID |
| `%(title)s` | Video title |
| `%(uploader)s` | Channel name |
| `%(upload_date)s` | Upload date as `YYYYMMDD` |
| `%(playlist_index)s` | Position in the playlist |
| `%(ext)s` | Final file extension |

The default is `%(title)s [%(id)s].%(ext)s`. Use `-o` for one run, or
put it in the config file.

See: [Output template](https://github.com/yt-dlp/yt-dlp#output-template)

### Restrict filenames

```bash
yt-dlp --restrict-filenames URL    # ASCII, no spaces or &
yt-dlp --windows-filenames URL     # safe on Windows
yt-dlp --trim-filenames 120 URL    # cap the base name
```

`--restrict-filenames` rewrites the title to a short ASCII name, which
is handy for scripts and other filesystems.

See: [Filesystem options](https://github.com/yt-dlp/yt-dlp#filesystem-options)

### Save location

```bash
yt-dlp -P ~/Videos URL
yt-dlp -P "temp:/tmp" URL
```

`-P` sets a path per file type; temporary files go to `temp:` and
then move into `home:`. The output template still controls the name.

See: [Output template examples](https://github.com/yt-dlp/yt-dlp#output-template-examples)

### Download archive

```bash
yt-dlp --download-archive archive.txt PLAYLIST
yt-dlp --download-archive archive.txt --playlist-items 1-10 PLAYLIST
```

Each downloaded video ID is recorded, so reruns skip it. Delete the
file to start over.

See: [Video selection](https://github.com/yt-dlp/yt-dlp#video-selection)

## Audio

### Extract audio

```bash
yt-dlp -x URL                       # keep the source format
yt-dlp -x --audio-format mp3 URL    # convert to mp3
yt-dlp -x --audio-format m4a URL
yt-dlp -x --audio-quality 0 URL     # best VBR quality
```

`-x` needs ffmpeg. Without `--audio-format`, the best audio stream is
kept as-is instead of being re-encoded.

See: [Post-processing options](https://github.com/yt-dlp/yt-dlp#post-processing-options)

### Presets

```bash
yt-dlp -t mp3 URL    # audio, mp3
yt-dlp -t aac URL    # audio, aac
yt-dlp -t mp4 URL    # mp4 with h264/aac
yt-dlp -t mkv URL    # mkv, any codecs
```

Presets bundle the common format and conversion flags for you. The
names are stable across releases.

See: [Preset aliases](https://github.com/yt-dlp/yt-dlp#preset-aliases)

## Playlists

### Playlist items

```bash
yt-dlp --playlist-items 1-5 PLAYLIST
yt-dlp --playlist-items "1:3,7,-5::2" PLAYLIST
yt-dlp --playlist-items 1-3,8 PLAYLIST
```

Ranges use `START:STOP:STEP`; negative indexes count from the end.

See: [Video selection](https://github.com/yt-dlp/yt-dlp#video-selection)

### Video or playlist

```bash
yt-dlp --no-playlist URL      # just the video
yt-dlp --yes-playlist URL     # force the playlist
yt-dlp --playlist-reverse PLAYLIST
```

A `watch?v=…&list=…` URL downloads the playlist by default; add
`--no-playlist` when you only want the current video.

See: [Video selection](https://github.com/yt-dlp/yt-dlp#video-selection)

## Subtitles and metadata

### Download subtitles

```bash
yt-dlp --write-subs --sub-langs en URL
yt-dlp --write-subs --sub-langs "en.*,ja" URL
yt-dlp --write-auto-subs --sub-langs en URL
yt-dlp --list-subs URL
```

`--write-subs` takes uploaded captions, while `--write-auto-subs`
takes machine-generated ones. `--sub-langs` accepts regex.

See: [Subtitle options](https://github.com/yt-dlp/yt-dlp#subtitle-options)

### Embed subtitles

```bash
yt-dlp --embed-subs --sub-langs en URL
yt-dlp --embed-subs --sub-langs "en.*" --merge-output-format mkv URL
```

Embedding works only for mp4, webm, and mkv. A bare `--embed-subs`
fetches the subtitle, embeds it, and deletes the separate file.

See: [Subtitle options](https://github.com/yt-dlp/yt-dlp#subtitle-options)

### Embed metadata

```bash
yt-dlp --embed-metadata URL
yt-dlp --embed-thumbnail URL
yt-dlp --embed-chapters URL
```

`--embed-metadata` also embeds chapters and infojson unless disabled.
All three need ffmpeg.

See: [Post-processing options](https://github.com/yt-dlp/yt-dlp#post-processing-options)

## Download control

### Resume and part files

```bash
yt-dlp --no-part URL          # write straight to the output
yt-dlp --no-continue URL      # restart a partial download
yt-dlp --no-overwrites URL    # skip files already there
```

Downloads use `.part` files and resume by default; `--no-part`
removes the temporary file but loses resuming.

See: [Filesystem options](https://github.com/yt-dlp/yt-dlp#filesystem-options)

### Rate and concurrency

```bash
yt-dlp --limit-rate 4M URL
yt-dlp -N 4 URL               # parallel fragments
yt-dlp --retries 10 URL
yt-dlp --socket-timeout 30 URL
```

`-N` speeds up DASH and HLS downloads; it does not split a plain HTTP
file.

See: [Download options](https://github.com/yt-dlp/yt-dlp#download-options)

### Sections and SponsorBlock

```bash
yt-dlp --download-sections "*00:01:00-00:02:30" URL
yt-dlp --download-sections "*10:15-inf" URL
yt-dlp --sponsorblock-remove all URL
yt-dlp --sponsorblock-remove default URL
```

Sections need ffmpeg. `--sponsorblock-remove` cuts segments by
category; `default` means `all,-filler`.

See: [SponsorBlock options](https://github.com/yt-dlp/yt-dlp#sponsorblock-options)

## Cookies

### Browser cookies

```bash
yt-dlp --cookies-from-browser firefox URL
yt-dlp --cookies-from-browser chrome URL
yt-dlp --cookies-from-browser "chrome:Profile 1" URL
```

The option reads the browser profile directly, including Firefox
containers, so no export step is needed.

See: [FAQ: pass cookies](https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp)

### Cookie files

```bash
yt-dlp --cookies cookies.txt URL
```

The file is a Netscape-format cookie jar, which browser extensions
can export and yt-dlp can update in place.

See: [Authentication options](https://github.com/yt-dlp/yt-dlp#authentication-options)

## Scripting

### Print fields

```bash
yt-dlp --print "%(title)s" URL
yt-dlp --print "%(id)s %(duration_string)s" URL
yt-dlp --print after_move:filepath URL
```

`--print` implies `--simulate`, so it prints metadata without
downloading unless the stage runs later or you pass `--no-simulate`.

See: [Verbosity and simulation options](https://github.com/yt-dlp/yt-dlp#verbosity-and-simulation-options)

### Simulate

```bash
yt-dlp --simulate URL                   # extract, write nothing
yt-dlp --simulate --print title URL
yt-dlp --no-simulate --print title URL  # download and print
```

Use `--simulate` to test a URL, a format selector, or a cookie setup
without touching the disk.

See: [Verbosity and simulation options](https://github.com/yt-dlp/yt-dlp#verbosity-and-simulation-options)

### Run a command

```bash
yt-dlp --exec "echo %(filepath)q" URL
yt-dlp --exec "after_move:echo %(title)q" URL
```

The default stage is `after_move`. Without fields, yt-dlp appends the
quoted file path to the command.

See: [Post-processing options](https://github.com/yt-dlp/yt-dlp#post-processing-options)

## Configuration

### Config file

| System | Path |
| --- | --- |
| Linux/macOS | `${XDG_CONFIG_HOME}/yt-dlp/config` |
| Windows | `%APPDATA%\yt-dlp\config` |
| Portable | `yt-dlp.conf` beside the binary |

#### Example

```bash
# ~/.config/yt-dlp/config
-f "bv*+ba/b"
-S "res:1080"
-o "%(uploader)s/%(title)s [%(id)s].%(ext)s"
--embed-metadata
```

One option per line, with no space after the dashes and shell-style
quoting.

See: [Configuration](https://github.com/yt-dlp/yt-dlp#configuration)

### Ignore or override

```bash
yt-dlp --ignore-config URL              # skip every config file
yt-dlp --config-locations ./ci.conf URL
```

Command-line flags override the config file, and
`--config-locations` can be repeated.

See: [Configuration](https://github.com/yt-dlp/yt-dlp#configuration)

## Recipes

### Music from a playlist

```bash
yt-dlp -x --audio-format mp3 \
  --embed-thumbnail --embed-metadata \
  -o "%(playlist_index)02d - %(title)s.%(ext)s" \
  "PLAYLIST_URL"
```

See: [Post-processing options](https://github.com/yt-dlp/yt-dlp#post-processing-options)

### Offline playlist

```bash
yt-dlp -f "bv*[height<=1080]+ba/b" \
  --download-archive archive.txt \
  -o "%(title)s [%(id)s].%(ext)s" \
  "PLAYLIST_URL"
```

See: [Format selection](https://github.com/yt-dlp/yt-dlp#format-selection)

### Clip a section

```bash
yt-dlp --download-sections "*00:01:00-00:02:30" \
  -f "bv*+ba/b" "URL"
```

See: [Download options](https://github.com/yt-dlp/yt-dlp#download-options)

### Subtitles only

```bash
yt-dlp --skip-download --write-subs \
  --sub-langs "en,ja" "URL"
```

See: [Subtitle options](https://github.com/yt-dlp/yt-dlp#subtitle-options)

### Embed everything

```bash
yt-dlp -f "bv*+ba/b" --merge-output-format mkv \
  --embed-subs --embed-metadata --embed-thumbnail \
  --sub-langs "en.*" "URL"
```

See: [Post-processing options](https://github.com/yt-dlp/yt-dlp#post-processing-options)

### Archive a channel

```bash
yt-dlp --download-archive archive.txt \
  --playlist-items 1-50 \
  -f "bv*[height<=720]+ba/b" \
  "CHANNEL_URL"
```

See: [Video selection](https://github.com/yt-dlp/yt-dlp#video-selection)
