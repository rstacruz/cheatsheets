---
title: adb (Android Debug Bridge)
category: CLI
weight: -1
authors:
  - github: ZackNeyland
updated: 2018-03-06
---

### Device Basics

| Command                           | Description                                 |
| ---                               | ---                                         |
| `adb devices`                     | Lists connected devices                     |
| `adb devices -l`                  | Lists connected devices and kind            |
| ---                               | ---                                         |
| `adb root`                        | Restarts adbd with root permissions         |
| `adb start-server`                | Starts the adb server                       |
| `adb kill-server`                 | Kills the adb server                        |
| `adb remount`                     | Remounts file system with read/write access |
| `adb reboot`                      | Reboots the device                          |
| `adb reboot bootloader`           | Reboots the device into fastboot            |
| `adb disable-verity`              | Reboots the device into fastboot            |

`wait-for-device` can be specified after `adb` to ensure that the command will run once the device is connected.

`-s` can be used to send the commands to a specific device when multiple are connected.

#### Examples

```
$ adb wait-for-device devices
 List of devices attached
 somedevice-1234 device
 someotherdevice-1234 device
```

```
$ adb -s somedevice-1234 root
```

### Logcat

| Command                              | Description                            |
| ---                                  | ---                                    |
| `adb logcat`                         | Starts printing log messages to stdout |
| `adb logcat -g`                      | Displays current log buffer sizes      |
| `adb logcat -G <size>`               | Sets the buffer size (K or M)          |
| `adb logcat -c`                      | Clears the log buffers                 |
| `adb logcat *:V`                     | Enables ALL log messages (verbose)     |
| `adb logcat -f <filename>`           | Dumps to specified file                |

#### Examples
```
$ adb logcat -G 16M
$ adb logcat *:V > output.log
```

### File Management

| Command                              | Description                       |
| ---                                  | ---                               |
| `adb push <local> <remote>` | Copies the local to the device at remote   |
| `adb pull <remote> <local>` | Copies the remote from the device to local |

#### Examples

```
$ echo "This is a test" > test.txt
$ adb push  test.txt /sdcard/test.txt
$ adb pull /sdcard/test.txt pulledTest.txt
```

### Remote Shell

| Command                                | Description                                                           |
| ---                                    | ---                                                                   |
| `adb shell <command>`                  | Runs the specified command on device (most unix commands work here)   |
| `adb shell wm size`                    | Displays the current screen resolution                                |
| `adb shell wm size WxH`                | Sets the resolution to WxH                                            |
| `adb shell pm list packages`           | Lists all installed packages                                          |
| `adb shell pm list packages -3`        | Lists all installed 3rd-party packages                                |
| `adb shell monkey -p app.package.name` | Starts the specified package                                          |
