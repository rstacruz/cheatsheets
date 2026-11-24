---
title: How to make an animated GIF with ffmpeg
link_title: Animated GIF with ffmpeg
subtitle: Video to GIF conversion
category: Media tools
layout: snippet
last_verified_with: "ffmpeg 9.0.2."
updated: 2026-11-24
links:
  - title: ffmpeg documentation
    url: https://ffmpeg.org/documentation.html
  - title: FFmpeg wiki — animated GIFs
    url: https://trac.ffmpeg.org/wiki/How%20to%20encode%20animated%20GIF%20images%20with%20ffmpeg
---

## Convert
<!-- {: .-snippets} -->

### Basic conversion
<!-- {: .-snippet} -->

```bash
ffmpeg -i in.mp4 out.gif
```

**Converts the whole clip with default settings.** Output is large; the palette recipe below gives better colors and a smaller file; see the [ffmpeg documentation](https://ffmpeg.org/documentation.html).

### Better colors
<!-- {: .-snippet} -->

```bash
ffmpeg -i in.mp4 -filter_complex \
  "[0:v]split[a][b];\
[a]palettegen[p];[b][p]paletteuse" \
  out.gif
```

**Builds one palette from the clip and reuses it.** The split filter feeds a copy to `palettegen` and applies the palette to the original; see the [FFmpeg wiki](https://trac.ffmpeg.org/wiki/How%20to%20encode%20animated%20GIF%20images%20with%20ffmpeg).

### Trim and resize
<!-- {: .-snippet} -->

```bash
ffmpeg -ss 0:01:30 -t 5 -i in.mp4 \
  -vf "fps=15,scale=480:-1" out.gif
```

**Converts five seconds at 15 fps, 480 px wide.** `-ss` before `-i` seeks fast, and `-1` keeps the aspect ratio; see [scale](https://ffmpeg.org/ffmpeg-filters.html#scale).
