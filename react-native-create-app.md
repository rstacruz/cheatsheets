---
title: How to create a React Native app
link_title: Create a React Native app
subtitle: Expo or Community CLI
logo: { set: icon-park-outline, name: box }
category: JavaScript frameworks
layout: snippet
tier: t3
last_verified_with: "React Native 0.88.1, Expo SDK 58.1.0."
last_verified_at: 2026-11-28
updated: 2026-11-28
links:
  - title: Create an Expo project
    url: https://docs.expo.dev/get-started/create-a-project/
  - title: Get started without a framework
    url: https://reactnative.dev/docs/getting-started-without-a-framework
  - title: React Native cheatsheet
    url: /react-native
---

## Create app
<!-- {: .-snippets} -->

### Expo project
<!-- {: .-snippet} -->

```sh
npx create-expo-app@latest my-app
cd my-app
```
<!-- {: data-highlight="create-expo-app"} -->

**Creates a project** with Expo's default template. See [Create a project](https://docs.expo.dev/get-started/create-a-project/).

### Community CLI project
<!-- {: .-snippet} -->

```sh
npx @react-native-community/cli@latest \
  init MyApp
```
<!-- {: data-highlight="init MyApp"} -->

**Creates a bare project** with native directories. See [Get started without a framework](https://reactnative.dev/docs/getting-started-without-a-framework).

### Development server
<!-- {: .-snippet} -->

```sh
npx expo start
```
<!-- {: data-highlight="npx expo start"} -->

**Starts Metro** and shows a QR code for your device. See [Expo CLI](https://docs.expo.dev/more/expo-cli/#develop).

### Native directories
<!-- {: .-snippet} -->

```sh
npx expo prebuild
```
<!-- {: data-highlight="npx expo prebuild"} -->

**Generates native folders** for Android and iOS edits. See [Expo CLI](https://docs.expo.dev/more/expo-cli/#prebuild).
