---
title: adb (Android Debug Bridge)
category: CLI
weight: -1
authors:
  - github: ZackNeyland
updated: 2026-11-14
intro: |
  [adb](https://developer.android.com/tools/adb) talks to an Android device
  over USB or Wi-Fi. This sheet targets platform-tools 37.
links:
  - title: adb documentation
    url: https://developer.android.com/tools/adb
---

## Basics

### Devices

| Command                | Description                     |
| ---                    | ---                             |
| `adb devices`          | List connected devices          |
| `adb devices -l`       | List with model and product     |
| `adb get-state`        | Print offline/bootloader/device |
| `adb wait-for-device`  | Block until a device connects   |
| ---                    | ---                             |
| `adb -s SERIAL <cmd>`  | Target one device               |
| `adb -e <cmd>`         | Target the emulator             |
| `adb -d <cmd>`         | Target the only USB device      |
| ---                    | ---                             |
| `adb start-server`     | Start the adb server            |
| `adb kill-server`      | Stop the adb server             |
| `adb server-status`    | Show server diagnostics         |

`$ANDROID_SERIAL` sets the default target; `-s` overrides it.

See: [adb documentation](https://developer.android.com/tools/adb)

### Wireless debugging

```bash
adb pair 192.168.1.20:37123     # code from the pairing dialog
adb connect 192.168.1.20:5555   # wireless debugging port
adb disconnect 192.168.1.20:5555
adb tcpip 5555                  # Android 10 and lower, after USB
```

`pair` uses the port shown in the pairing dialog; `connect` uses the wireless
debugging port. `adb mdns services` discovers devices on the network.

See: [Connect over Wi-Fi](https://developer.android.com/tools/adb#wireless-adb-android-11)

### Installing apps

```bash
adb install app.apk
adb install -r app.apk          # replace, keep data
adb install -g app.apk          # grant runtime permissions
adb install-multiple a.apk b.apk
adb uninstall com.example.app
adb uninstall -k com.example.app  # keep data
```

#### Install options

| Option  | Description                    |
| ---     | ---                            |
| `-r`    | Replace an existing app        |
| `-t`    | Allow test packages            |
| `-d`    | Allow a version downgrade      |
| `-g`    | Grant all runtime permissions  |
| `--abi` | Override the device ABI        |

See: [Package manager](https://developer.android.com/tools/adb#pm)

## Files and shell

### File transfer

```bash
adb push local.txt /sdcard/local.txt
adb pull /sdcard/local.txt ./
adb pull -a /sdcard/DCIM ./photos  # keep timestamps
adb push --sync ./build /sdcard/build
```

`adb sync` copies a local AOSP build to the device.

See: [Copy files](https://developer.android.com/tools/adb#copyfiles)

### Remote shell

| Command                             | Description                |
| ---                                 | ---                        |
| `adb shell`                         | Interactive shell          |
| `adb shell <command>`               | Run one command            |
| `adb shell wm size`                 | Print screen resolution    |
| `adb shell wm size 1080x1920`       | Override resolution        |
| `adb shell pm list packages`        | List installed packages    |
| `adb shell pm list packages -3`     | Third-party packages only  |
| `adb exec-out screencap -p > a.png` | Raw stdout, no pty         |

#### Quoting

Arguments are passed like `ssh`, so quote twice for the device shell:

```bash
adb shell setprop key "'two words'"
```

See: [Issue shell commands](https://developer.android.com/tools/adb#shellcommands)

### Port forwarding

```bash
adb forward tcp:6100 tcp:7100  # host port → device port
adb forward --list
adb reverse tcp:8080 tcp:8080  # device port → host port
adb reverse --list
```

Use `reverse` to point an app at a server running on the workstation.

See: [Port forwarding](https://developer.android.com/tools/adb#forwardports)

## Debugging

### Logcat

| Command                     | Description                  |
| ---                         | ---                          |
| `adb logcat`                | Stream log messages          |
| `adb logcat -d`             | Dump the buffers and exit    |
| `adb logcat -c`             | Clear the buffers            |
| `adb logcat -g`             | Show buffer sizes            |
| `adb logcat -G 16M`         | Set the buffer size          |
| ---                         | ---                          |
| `adb logcat -s MyTag`       | Filter to one tag            |
| `adb logcat *:E`            | Errors only                  |
| `adb logcat -f out.log`     | Write to a file              |

See: [Logcat](https://developer.android.com/tools/logcat)

### Screenshots and recordings

```bash
adb exec-out screencap -p > screen.png
adb shell screenrecord /sdcard/demo.mp4
adb pull /sdcard/demo.mp4
```

`screenrecord` takes `--time-limit` (max 180) and `--bit-rate`.

See: [Take a screenshot](https://developer.android.com/tools/adb#screencap)

### Dumps and bug reports

| Command                                 | Description          |
| ---                                     | ---                  |
| `adb bugreport report.zip`              | Full bug report      |
| `adb shell dumpsys activity`            | Activity state       |
| `adb shell dumpsys meminfo <pkg>`       | Memory use           |
| `adb shell dumpsys gfxinfo <pkg>`       | Frame stats          |
| `adb shell dumpsys battery`             | Battery state        |
| `adb jdwp`                              | Debuggable PIDs      |

See: [Bug reports](https://developer.android.com/studio/debug/bug-report)

## Device control

### Activities and input

| Command                                              | Description       |
| ---                                                  | ---               |
| `adb shell am start -n com.example/.MainActivity`    | Start an activity |
| `adb shell am start -a android.intent.action.VIEW`   | Send a VIEW intent|
| `adb shell am force-stop com.example`                | Stop the app      |
| `adb shell monkey -p com.example 1`                  | Launch the app    |
| `adb shell input tap 500 800`                        | Tap a coordinate  |
| `adb shell input text 'hello'`                       | Type text         |
| `adb shell input keyevent 26`                        | Send a key event  |

Add `-d https://example.com` to open a URL with the VIEW intent.

See: [Activity manager](https://developer.android.com/tools/adb#am)

### Power and system

| Command                     | Description                        |
| ---                         | ---                                |
| `adb reboot`                | Reboot                             |
| `adb reboot bootloader`     | Reboot to the bootloader           |
| `adb reboot recovery`       | Reboot to recovery                 |
| `adb sideload ota.zip`      | Sideload an OTA package            |
| ---                         | ---                                |
| `adb root` / `adb unroot`   | Restart adbd with/without root     |
| `adb remount`               | Remount partitions read-write      |
| `adb disable-verity`        | Disable dm-verity (userdebug)      |
| `adb shell cmd testharness enable` | Reset a test device         |

See: [Platform tools](https://developer.android.com/tools/releases/platform-tools)

### Emulator console

```bash
adb emu kill    # stop the emulator
adb emu avd name
```

`adb emu` forwards a command to the emulator console of the target.

See: [Emulator console](https://developer.android.com/studio/run/emulator-console)

## Also see

- [adb documentation](https://developer.android.com/tools/adb)
- [Platform tools release notes](https://developer.android.com/tools/releases/platform-tools)
- [Logcat command line](https://developer.android.com/tools/logcat)
