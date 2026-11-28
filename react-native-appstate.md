---
title: How to detect app backgrounding
link_title: Detect app backgrounding
subtitle: AppState in React Native
logo: { set: icon-park-outline, name: data }
category: JavaScript frameworks
layout: snippet
tier: t3
last_verified_with: "React Native 0.88.1."
last_verified_at: 2026-11-28
created_at: 2026-11-28
updated: 2026-11-28
links:
  - title: AppState
    url: https://reactnative.dev/docs/appstate
  - title: React Native cheatsheet
    url: /react-native
---

## Detect app state
<!-- {: .-snippets} -->

### Current state
<!-- {: .-snippet} -->

```js
const phase = AppState.currentState
```
<!-- {: data-highlight="currentState"} -->

**Reads the current state**: `active`, `background`, or on iOS `inactive`. See [AppState](https://reactnative.dev/docs/appstate#app-states).

### Listen for changes
<!-- {: .-snippet} -->

```js
useEffect(() => {
  const sub = AppState.addEventListener(
    'change',
    setPhase
  )
  return () => sub.remove()
}, [])
```
<!-- {: data-highlight="addEventListener"} -->

**Subscribes to changes** and cleans up on unmount. See [AppState](https://reactnative.dev/docs/appstate#addeventlistener).

### Check a specific state
<!-- {: .-snippet} -->

```js
if (phase === 'background') {
  pauseSync()
}
```
<!-- {: data-highlight="'background'"} -->

**Runs work** only when the app is in the background. See [AppState](https://reactnative.dev/docs/appstate#app-states).

### Android focus events
<!-- {: .-snippet} -->

```js
AppState.addEventListener('blur', onBlur)
```
<!-- {: data-highlight="'blur'"} -->

**Detects focus loss** when the notification drawer or another app takes focus. See [AppState](https://reactnative.dev/docs/appstate#blur-android).
