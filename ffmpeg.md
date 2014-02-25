---
title: Ffmpeg
layout: default
---

### Common switches

    -codecs    # list codecs
    -c:v       # video codec (-vcodec) - 'copy' to copy stream
    -c:a       # audio codec (-acodec)

    -fs SIZE         # limit file size (bytes)

    -b:v 1M          # video bitrate (1M = 1Mbit/s)
    -b:a 1M          # audio bitrate

    -aspect RATIO    # aspect ratio (4:3, 16:9, or 1.25)
    -r RATE          # frame rate per sec
    -s WIDTHxHEIGHT  # frame size
    -vn              # no video

    -aq QUALITY      # audio quality (codec-specific)
    -ar 44100        # audio sample rate (hz)
    -ac 1            # audio channels (1=mono, 2=stereo)
    -an              # no audio
    -vol N           # volume (256=normal)
    
### Ringtone conversion using ffmpeg

    ffmpeg -i foo.mp3 -ac 1 -ab 128000 -f mp4 -acodec libfaac -y target.m4r

### To webm

    ffmpeg -i input.mp4 -vcodec libvpx -acoder libvorbis output.webm

