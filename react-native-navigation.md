---
title: How to set up React Navigation
link_title: Set up React Navigation
subtitle: Install and define screens
logo: { set: icon-park-outline, name: deeplink }
category: JavaScript frameworks
layout: snippet
tier: t3
last_verified_with: "React Navigation 7.5.2, Expo SDK 58.1.0."
last_verified_at: 2026-11-28
updated: 2026-11-28
links:
  - title: Getting started
    url: https://reactnavigation.org/docs/getting-started/
  - title: Hello React Navigation
    url: https://reactnavigation.org/docs/hello-react-navigation
  - title: React Native cheatsheet
    url: /react-native
---

## Navigate
<!-- {: .-snippets} -->

### Install in Expo
<!-- {: .-snippet} -->

```sh
npx expo install @react-navigation/native \
  @react-navigation/native-stack \
  react-native-screens \
  react-native-safe-area-context
```
<!-- {: data-highlight="npx expo install"} -->

**Installs the core library**, native stack, and required native dependencies. See [Getting started](https://reactnavigation.org/docs/getting-started/).

### Define a stack
<!-- {: .-snippet} -->

```jsx
const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Details: DetailsScreen
  }
})

const Navigation =
  createStaticNavigation(RootStack)
```
<!-- {: data-highlight="createNativeStackNavigator"} -->

**Declares routes** under `screens` and creates the root component. See [Hello React Navigation](https://reactnavigation.org/docs/hello-react-navigation).

### Navigate to a screen
<!-- {: .-snippet} -->

```js
const navigation = useNavigation()

navigation.navigate('Details')
```
<!-- {: data-highlight="navigation.navigate"} -->

**Pushes a route** from inside a screen component. See [useNavigation](https://reactnavigation.org/docs/use-navigation).

### Set the first screen
<!-- {: .-snippet} -->

```jsx
const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: HomeScreen,
    Details: DetailsScreen
  }
})
```
<!-- {: data-highlight="initialRouteName"} -->

**Opens `Home`** instead of the first declared route. See [Hello React Navigation](https://reactnavigation.org/docs/hello-react-navigation#configuring-the-navigator).
