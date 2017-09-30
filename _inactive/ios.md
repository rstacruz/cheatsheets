---
title: iOS
---

Multiple Exchange accounts:

    scp root@iphone.local:/private/var/mobile/Library/Preferences/com.apple.accountsettings.plist .

Paths:

    /Library/Themes           # Winterboard themes
    /User/Media/DCIM/100APPLE # Photos
    /User/Media/Recordings    # Voice recordings

Copy photos:

    rsync -v -r root@iphone.local:/User/Media/DCIM/100APPLE ./photos

Ringtone conversion using ffmpeg:

    ffmpeg -i foo.mp3 -ac 1 -ab 128000 -f mp4 -acodec libfaac -y target.m4r
