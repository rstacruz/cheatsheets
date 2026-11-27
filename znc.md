---
title: ZNC bouncer
category: Networking
subtitle: IRC bouncer
logo: { set: icon-park-outline, name: connection }
intro: |
  A quick reference to the ZNC IRC bouncer's common commands.
links:
  - title: ZNC
    url: https://wiki.znc.in/ZNC
tier: t3
last_verified_with: "ZNC 1.10.3."
updated: 2026-11-26
---

## Commands

### Start

```
/msg *status addserver irc.undernet.org [6667]
/msg *status connect

/msg *status loadmod webadmin
/msg *status loadmod controlpanel
/msg *status loadmod awaystore <password>
/msg *status loadmod simple_away
/msg *status loadmod clientnotify   # client login alerts
/msg *status loadmod keepnick
/msg *status loadmod kickrejoin
```

See: [Using commands](https://wiki.znc.in/Using_commands)

### Away

```
/msg *status loadmod awaystore <password>
/msg *awaystore away
/msg *awaystore back
/msg *awaystore show   #=> Show messages
/msg *awaystore delete all
```

See: [awaystore](https://wiki.znc.in/Awaystore)

### Watch

```
/msg *status loadmod watch
/msg *watch list
/msg *watch add * *watch *rico*
/msg *watch add * *watch *%nick%*
```

See: [watch](https://wiki.znc.in/Watch)
