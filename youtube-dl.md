---
title: youtube-dl
layout: 2017/sheet
category: CLI
updated: 2023-06-11
authors:
  - github: sh1shkev1ch
description: YouTube-dl is a powerful command-line tool for downloading videos from YouTube. It supports downloading videos, playlists, and even extracting audio. 
---

{: .-three-column}

### Usage

```sh
$ youtube-dl [options] [video_url]
$ youtube-dl --help
```

### Download video

```sh
$ youtube-dl https://www.youtube.com/watch?v=jNQXAC9IVRw
```

#### Common flags

| -q | Activate quiet mode. |
| -v | Print various debugging information |
| -s | Do not download the video and do not write anything to disk |

### Download playlist

```sh
$ youtube-dl -i https://www.youtube.com/playlist?list=PLWIAYJI5mZBD9pPacIvZVTsjOv5XzN_sv
```

We use the -i option to ignore errors and continue downloading other videos if any fail. 

### See available formats for video

```sh
$ youtube-dl -F https://www.youtube.com/watch?v=jNQXAC9IVRw
```

### Specifying Download Format

```sh
$ youtube-dl -f 17 https://www.youtube.com/watch?v=jNQXAC9IVRw
```

We chose format `17` - in this video it's 3gp and 144p. In your case, you need to find out the available formats (check **«See available formats for video»**) , and then select the desired ID.

### Download audio

To convert audio to MP3 you need ffprobe and ffmpeg.
{: .-setup}

```sh
$ youtube-dl -x --audio-format mp3 https://www.youtube.com/watch?v=jNQXAC9IVRw
```

The `-x` option tells YouTube-dl to extract audio only, and `--audio-format` specifies the desired audio format.

### Getting list of video thumbnails

```sh
$ youtube-dl --list-thumbnails https://www.youtube.com/watch?v=jNQXAC9IVRw
```

### Getting list of subtitles

```sh
$ youtube-dl --list-subs https://www.youtube.com/watch?v=jNQXAC9IVRw
```