---
title: Animated GIFs
category: CLI
layout: 2017/sheet
---

## Animated GIFs
{: .-one-column}

### Convert MP4 to GIF

```bash
mkdir -p gif
mplayer -ao null -vo gif89a:outdir=gif $INPUT
mogrify -format gif *.png
gifsicle --colors=256 --delay=4 --loopcount=0 --dither -O3 gif/*.gif > ${INPUT%.*}.gif
rm -rf gif
```

You'll need `mplayer`, `imagemagick` and `gifsicle`. This converts frames to .png, then turns them into an animated gif.

### A given range

```bash
mplayer -ao null -ss 0:02:06 -endpos 0:05:00 -vo gif89a:outdir=gif videofile.mp4
```

See `-ss` and `-endpos`.
