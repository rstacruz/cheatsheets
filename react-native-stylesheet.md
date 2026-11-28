---
title: How to style components with StyleSheet
link_title: StyleSheet in React Native
subtitle: Reusable styles and layout
logo: { set: icon-park-outline, name: color-card }
category: JavaScript frameworks
layout: snippet
tier: t3
last_verified_with: "React Native 0.88.1."
last_verified_at: 2026-11-28
updated: 2026-11-28
links:
  - title: Style
    url: https://reactnative.dev/docs/style
  - title: Layout with flexbox
    url: https://reactnative.dev/docs/flexbox
  - title: React Native cheatsheet
    url: /react-native
---

## Style components
<!-- {: .-snippets} -->

### Define and apply
<!-- {: .-snippet} -->

#### Define

```js
const styles = StyleSheet.create({
  title: {fontSize: 20, fontWeight: 'bold'}
})
```
<!-- {: data-highlight="StyleSheet.create"} -->

#### Apply

```jsx
<Text style={styles.title}>Hello</Text>
```
<!-- {: data-highlight="styles.title"} -->

**Defines named styles** once and applies them by reference. See [Style](https://reactnative.dev/docs/style).

### Merge styles
<!-- {: .-snippet} -->

```jsx
<View
  style={[
    styles.base,
    isActive && styles.active
  ]}
>
  <Text>Item</Text>
</View>
```
<!-- {: data-highlight="styles.base; styles.active"} -->

**Merges styles** left to right; later styles win. See [Style](https://reactnative.dev/docs/style).

### Flexbox layout
<!-- {: .-snippet} -->

```jsx
<View
  style={{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8
  }}
>
  <Text>Left</Text>
  <Text>Right</Text>
</View>
```
<!-- {: data-highlight="flexDirection; gap"} -->

**Lays children out** along a row with even spacing. See [Layout with flexbox](https://reactnative.dev/docs/flexbox).

### Platform values
<!-- {: .-snippet} -->

```js
const padding = Platform.select({
  ios: 12,
  android: 8,
  default: 12
})
```
<!-- {: data-highlight="Platform.select"} -->

**Picks a value** for the current platform. See [Platform-specific code](https://reactnative.dev/docs/platform-specific-code).
