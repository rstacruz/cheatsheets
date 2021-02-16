---
title: ZNC bouncer
layout: 2017/sheet
intro: |
  A quick reference to the [ZNC](https://znc.bg) IRC bouncer's common commands.
---

## Start

```
/msg *status addserver irc.undernet.org [6667]
/msg *status connect

/msg *status loadmod webadmin
/msg *status loadmod admin
/msg *status loadmod away
/msg *status loadmod awaynick
/msg *status loadmod clientnotify    # Notifies when another client logs
/msg *status loadmod keepnick
/msg *status loadmod kickrejoin
```

## Away

```
/msg *status loadmod away
/msg *away away
/msg *away back
/msg *away show   #=> Show messages
/msg *away delete all
```

## Watch

```
/msg *status loadmod watch
/msg *watch list
/msg *watch add * *watch *rico*
/msg *watch add * *watch *%nick%*
```
