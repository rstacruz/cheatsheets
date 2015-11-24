---
title: Animated gifs
category: CLI
---

### Convert mp4 to gif

    mkdir -p gif
    mplayer -ao null -vo gif89a:outdir=gif $mp4
    mogrify -format gif *.png
    gifsicle --colors=256 --delay=4 --loopcount=0 --dither -O3 gif/*.gif > ${mp4%.*}.gif
    rm -rf gif

### Or a given range (-ss -endpos)

    mplayer -ao null -ss 0:02:06 -endpos 0:05:00 -vo gif89a:outdir=gif videofile.mp4
