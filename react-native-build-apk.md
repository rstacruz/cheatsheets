---
title: How to build an Android APK
link_title: Build an Android APK
subtitle: Expo and EAS builds
logo: { set: icon-park-outline, name: android }
category: JavaScript frameworks
layout: snippet
tier: t3
last_verified_with: "Expo SDK 58.1.0."
last_verified_at: 2026-11-28
created_at: 2026-11-28
updated: 2026-11-28
links:
  - title: Build APKs
    url: https://docs.expo.dev/build-reference/apk/
  - title: Expo CLI
    url: https://docs.expo.dev/more/expo-cli/
  - title: React Native cheatsheet
    url: /react-native
---

## Build APK
<!-- {: .-snippets} -->

### Local release build
<!-- {: .-snippet} -->

```sh
npx expo run:android --variant release
```
<!-- {: data-highlight="--variant release"} -->

**Compiles a release variant** locally for testing. See [Expo CLI](https://docs.expo.dev/more/expo-cli/#compiling-android).

### Configure an APK profile
<!-- {: .-snippet} -->

```json
{
  "build": {
    "preview": {"android": {"buildType": "apk"}}
  }
}
```
<!-- {: data-highlight="buildType"} -->

**Sets the format** to APK in `eas.json`. See [Build APKs](https://docs.expo.dev/build-reference/apk/#configuring-a-profile-to-build-apks).

### Run the build
<!-- {: .-snippet} -->

```sh
eas build -p android --profile preview
```
<!-- {: data-highlight="eas build"} -->

**Builds an installable APK** in the cloud. See [Build APKs](https://docs.expo.dev/build-reference/apk/#configuring-a-profile-to-build-apks).

### Install the APK
<!-- {: .-snippet} -->

```sh
adb install path/to/app.apk
```
<!-- {: data-highlight="adb install"} -->

**Installs a downloaded APK** on a connected device. See [Build APKs](https://docs.expo.dev/build-reference/apk/#install-with-adb).

### Install the latest build
<!-- {: .-snippet} -->

```sh
eas build:run -p android --latest
```
<!-- {: data-highlight="build:run"} -->

**Downloads and installs** the most recent build on an emulator. See [Build APKs](https://docs.expo.dev/build-reference/apk/#running-the-latest-build).
