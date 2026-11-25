---
title: ffmpeg
subtitle: Audio and video transcoder
category: Media tools
last_verified_with: "FFmpeg 9.1."
updated: 2026-11-25
tier: t3
---

### Common switches

```bash
-codecs          # list codecs
-c:v             # video codec (-vcodec) - 'copy' to copy stream
-c:a             # audio codec (-acodec)
-ss POS          # start time offset (in seconds or HH:MM:SS)
-t DUR           # duration of output (in seconds or HH:MM:SS)
```

```bash
-fs SIZE         # limit file size (bytes)
```

See: [Main options](https://ffmpeg.org/ffmpeg.html#Main-options)

### Bitrate

```bash
-b:v 1M          # video bitrate (1M = 1Mbit/s)
-b:a 1M          # audio bitrate
```

See: [Video options](https://ffmpeg.org/ffmpeg.html#Video-Options)

### Video

```bash
-aspect RATIO    # aspect ratio (4:3, 16:9, or 1.25)
-r RATE          # frame rate per sec
-s WIDTHxHEIGHT  # frame size
-vn              # no video
-pix_fmt FORMAT  # pixel format (yuv420p, yuv420p10le)
-crf N           # 0–51, lower = higher quality
```

See: [Video options](https://ffmpeg.org/ffmpeg.html#Video-Options)

### Audio

```bash
-aq QUALITY      # audio quality (codec-specific)
-ar 44100        # audio sample rate (hz)
-ac 1            # audio channels (1=mono, 2=stereo)
-an              # no audio
-vol N           # volume (256=normal)
```

See: [Audio options](https://ffmpeg.org/ffmpeg.html#Audio-Options)

## Example

### Ringtone conversion using ffmpeg

```bash
ffmpeg -i foo.mp3 -ac 1 -ab 128000 -f mp4 -acodec libfaac -y target.m4r
```

See: [Examples](https://ffmpeg.org/ffmpeg.html#Examples-1)

### Stream selection

```bash
# video from 1st file, audio from 2nd
ffmpeg -i input1.mp4 -i input2.mp4 -map 0:v:0 -map 1:a:0 output.mp4
```

```bash
# all video from 1st file, all audio from 2nd
ffmpeg -i input1.mp4 -i input2.mp3 -map 0:v -map 1:a output.mkv
```

`-map` syntax: `-map INPUT:STREAM_TYPE[:STREAM_INDEX]`

See: [Manual stream selection](https://ffmpeg.org/ffmpeg.html#Manual-stream-selection)

### To web

```bash
# no audio
ffmpeg -i input.mov -vcodec h264   -an -strict -2 output.mp4
ffmpeg -i input.mov -vcodec libvpx -an output.webm
```

```bash
ffmpeg -i input.mov -vcodec h264 -acodec aac -strict -2 output.mp4
ffmpeg -i input.mov -vcodec libvpx -acodec libvorbis output.webm
```

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type='video/mp4'></source>
  <source src="movie.webm" type='video/ogg'></source>
</video>
```

See: [Video and audio file format conversion](https://ffmpeg.org/ffmpeg.html#Video-and-Audio-file-format-conversion)
