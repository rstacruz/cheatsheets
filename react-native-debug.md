---
title: How to debug a React Native app
link_title: Debug a React Native app
subtitle: DevTools and native logs
logo: { set: icon-park-outline, name: bug }
category: JavaScript frameworks
layout: snippet
tier: t3
last_verified_with: "React Native 0.88.1, Expo SDK 58.1.0."
last_verified_at: 2026-11-28
updated: 2026-11-28
links:
  - title: Debugging and profiling tools
    url: https://docs.expo.dev/debugging/tools/
  - title: Debugging basics
    url: https://reactnative.dev/docs/debugging
  - title: React Native cheatsheet
    url: /react-native
---

## Debug app
<!-- {: .-snippets} -->

### Start the dev server
<!-- {: .-snippet} -->

```sh
npx expo start
```
<!-- {: data-highlight="npx expo start"} -->

**Starts the dev server.** Press `J` in this terminal to open React Native DevTools. See [Debugging tools](https://docs.expo.dev/debugging/tools/#debugging-with-react-native-devtools).

### Open the dev menu
<!-- {: .-snippet} -->

```sh
adb shell input keyevent 82
```
<!-- {: data-highlight="keyevent 82"} -->

**Shows the developer menu** on an Android Emulator or device. See [Debugging tools](https://docs.expo.dev/debugging/tools/#developer-menu).

### Pause execution
<!-- {: .-snippet} -->

```js
debugger
```
<!-- {: data-highlight="debugger"} -->

**Breaks into DevTools** at this line when a debugger is attached. See [Pausing on breakpoints](https://docs.expo.dev/debugging/tools/#pausing-on-breakpoints).

### Read native logs
<!-- {: .-snippet} -->

```sh
adb logcat
```
<!-- {: data-highlight="adb logcat"} -->

**Streams Android logs** for native crashes. See [Debugging runtime issues](https://docs.expo.dev/debugging/runtime-issues/).
