---
title: How to run a React Native app
link_title: Run a React Native app
subtitle: Devices and simulators
logo: { set: icon-park-outline, name: connection }
category: JavaScript frameworks
layout: snippet
tier: t3
last_verified_with: "React Native 0.88.1, Expo SDK 58.1.0."
last_verified_at: 2026-11-28
updated: 2026-11-28
links:
  - title: Expo CLI
    url: https://docs.expo.dev/more/expo-cli/
  - title: Get started without a framework
    url: https://reactnative.dev/docs/getting-started-without-a-framework
  - title: React Native cheatsheet
    url: /react-native
---

## Run app
<!-- {: .-snippets} -->

### On Android
<!-- {: .-snippet} -->

```sh
npx expo run:android
```
<!-- {: data-highlight="run:android"} -->

**Builds and installs** on a connected Android device. See [Expo CLI](https://docs.expo.dev/more/expo-cli/#compiling).

### On iOS
<!-- {: .-snippet} -->

```sh
npx expo run:ios
```
<!-- {: data-highlight="run:ios"} -->

**Builds for iOS** and installs on a Simulator. Requires macOS and Xcode; see [Expo CLI](https://docs.expo.dev/more/expo-cli/#compiling).

### Choose a device
<!-- {: .-snippet} -->

```sh
npx expo run:android --device
```
<!-- {: data-highlight="--device"} -->

**Prompts for a device**, connected or virtual. See [Expo CLI](https://docs.expo.dev/more/expo-cli/#compiling).

### Community CLI project
<!-- {: .-snippet} -->

```sh
npm start
```
<!-- {: data-highlight="npm start"} -->

**Starts Metro**; run `npm run android` in a second terminal. See [Get started without a framework](https://reactnative.dev/docs/getting-started-without-a-framework).
