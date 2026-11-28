---
title: React Native
subtitle: Cross-platform mobile framework
logo: { set: icon-park-outline, name: components }
category: JavaScript frameworks
tier: t2
last_verified_with: "React Native 0.88.1, Expo SDK 58.1.0, React Navigation 7.5.2."
last_verified_at: 2026-11-28
created_at: 2026-11-28
updated: 2026-11-28
fragments:
  - "npx expo start"
  - "expo run:ios"
  - "create-expo-app"
  - "<View>"
  - "<Text>"
  - "StyleSheet"
  - "flex: 1"
  - "<FlatList"
  - "renderItem"
  - "onPress"
  - "useColorScheme"
  - "Platform.OS"
  - "AppState"
  - "run:android"
  - "adb logcat"
  - "keyevent 82"
keywords:
  - React Native components
  - Expo CLI
  - StyleSheet
  - FlatList
  - React Navigation
  - useColorScheme
intro: |
  [React Native](https://reactnative.dev/) builds Android and iOS apps with React components. This reference covers components, styling, Expo CLI, navigation, and debugging.
links:
  - title: React Native documentation
    url: https://reactnative.dev/docs/getting-started
  - title: Expo CLI
    url: https://docs.expo.dev/more/expo-cli/
  - title: React Navigation
    url: https://reactnavigation.org/docs/getting-started/
---

## Get started

### Start with Expo

```sh
npx create-expo-app@latest awesome-app
cd awesome-app
npx expo start
```
<!-- {: data-highlight="npx expo start"} -->

Creates a project, then opens Metro and its QR code.

See: [Create a project](https://docs.expo.dev/get-started/create-a-project/)

### Without Expo

```sh
npx @react-native-community/cli@latest \
  init AwesomeProject
cd AwesomeProject
npm start
```
<!-- {: data-highlight="init AwesomeProject"} -->

Use the Community CLI when you need native directories in source control.

See: [Get started without a framework](https://reactnative.dev/docs/getting-started-without-a-framework)

### Run on a device

#### Expo

```sh
npx expo run:android --device
```
<!-- {: data-highlight="npx expo run:android"} -->

#### Community CLI

```sh
npm run android
```
<!-- {: data-highlight="npm run android"} -->

Building locally needs Android Studio; `npx expo run:ios` needs macOS and Xcode.

See: [Expo CLI](https://docs.expo.dev/more/expo-cli/#compiling)

## Components
<!-- {: .-three-column} -->

### Views and text

```jsx
<View style={styles.card}>
  <Text>Hello world</Text>
</View>
```
<!-- {: data-highlight="<View; <Text>"} -->

`View` groups children; `Text` renders strings.

See: [View](https://reactnative.dev/docs/view) and [Text](https://reactnative.dev/docs/text)

### Images

```jsx
<Image
  source={require('./assets/logo.png')}
  style={{width: 100, height: 100}}
/>
```
<!-- {: data-highlight="source"} -->

Remote images use `source={{uri: 'https://example.com/a.png'}}`.

See: [Image](https://reactnative.dev/docs/image)

### Text input

```jsx
<TextInput
  value={name}
  onChangeText={setName}
  placeholder="Your name"
/>
```
<!-- {: data-highlight="onChangeText"} -->

Controlled inputs update state on each keystroke.

See: [TextInput](https://reactnative.dev/docs/textinput)

### Pressable

```jsx
<Pressable onPress={onPress}>
  <Text>Tap me</Text>
</Pressable>
```
<!-- {: data-highlight="onPress"} -->

Use `style={({pressed}) => ...}` for press feedback.

See: [Pressable](https://reactnative.dev/docs/pressable)

### ScrollView

```jsx
<ScrollView
  contentContainerStyle={styles.content}
>
  <Text>First</Text>
  <Text>Second</Text>
</ScrollView>
```
<!-- {: data-highlight="ScrollView"} -->

Scrolls a small, finite set of children.

See: [ScrollView](https://reactnative.dev/docs/scrollview)

### FlatList

```jsx
<FlatList
  data={items}
  renderItem={({item}) => (
    <Text>{item.title}</Text>
  )}
/>
```
<!-- {: data-highlight="<FlatList"} -->

Use it for long or growing lists.

See: [FlatList](https://reactnative.dev/docs/flatlist)

## Styling
<!-- {: .-three-column} -->

### StyleSheet

#### Define

```js
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  accent: {color: 'tomato'}
})
```
<!-- {: data-highlight="StyleSheet.create"} -->

#### Apply

```jsx
<Text
  style={[styles.title, styles.accent]}
>
  Hello
</Text>
```
<!-- {: data-highlight="styles.title"} -->

Style arrays merge left to right.

See: [Style](https://reactnative.dev/docs/style)

### Flexbox layout

```jsx
<View style={{
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 8
}}>
  <Text>Left</Text>
</View>
```
<!-- {: data-highlight="flexDirection; justifyContent"} -->

The default direction is column; `gap` adds spacing.

See: [Layout with flexbox](https://reactnative.dev/docs/flexbox)

### Dark mode

```jsx
const theme = useColorScheme()
const color = theme === 'dark'
  ? '#fff'
  : '#000'

return <Text style={{color}}>Hello</Text>
```
<!-- {: data-highlight="useColorScheme"} -->

Returns `light`, `dark`, or `null`, and updates on change.

See: [useColorScheme](https://reactnative.dev/docs/usecolorscheme)

### Screen size

```jsx
const {width, height} =
  useWindowDimensions()
```
<!-- {: data-highlight="useWindowDimensions"} -->

Values refresh on rotation and font-scale changes.

See: [useWindowDimensions](https://reactnative.dev/docs/usewindowdimensions)

## Device APIs

### Platform-specific code

```jsx
const padding = Platform.select({
  ios: 12,
  android: 8,
  default: 12
})
```
<!-- {: data-highlight="Platform.select"} -->

`Platform.OS` is `ios` or `android`; `.ios.tsx` and `.android.tsx` split larger files.

See: [Platform-specific code](https://reactnative.dev/docs/platform-specific-code)

### App state

```jsx
useEffect(() => {
  const sub = AppState.addEventListener('change', setPhase)
  return () => sub.remove()
}, [])
```
<!-- {: data-highlight="AppState.addEventListener"} -->

States are `active`, `background`, and on iOS `inactive`.

See: [AppState](https://reactnative.dev/docs/appstate)

## Navigation

### Install

#### Expo

```sh
npx expo install @react-navigation/native \
  @react-navigation/native-stack \
  react-native-screens react-native-safe-area-context
```
<!-- {: data-highlight="@react-navigation/native"} -->

#### Community CLI

```sh
npm install @react-navigation/native \
  @react-navigation/native-stack \
  react-native-screens \
  react-native-safe-area-context
```
<!-- {: data-highlight="npm install @react-navigation/native"} -->

See: [Getting started](https://reactnavigation.org/docs/getting-started/)

### Stack navigator

#### Stack

```jsx
const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Details: DetailsScreen
  }
})
```
<!-- {: data-highlight="createNativeStackNavigator"} -->

#### Root component

```jsx
const Navigation = createStaticNavigation(RootStack)
```
<!-- {: data-highlight="createStaticNavigation"} -->

Call `createStaticNavigation` once at the app root.

See: [Hello React Navigation](https://reactnavigation.org/docs/hello-react-navigation)

## Debug

### Open the dev menu

```sh
adb shell input keyevent 82
```
<!-- {: data-highlight="keyevent 82"} -->

Opens the dev menu on Android; press `J` in the Expo terminal for DevTools.

See: [Debugging and profiling tools](https://docs.expo.dev/debugging/tools/)

### Native logs

```sh
adb logcat
```
<!-- {: data-highlight="adb logcat"} -->

Shows Android system logs; iOS native logs appear in Xcode.

See: [Debugging runtime issues](https://docs.expo.dev/debugging/runtime-issues/)

## Build

### Local release build

```sh
npx expo run:android --variant release
```
<!-- {: data-highlight="--variant release"} -->

Tests production behaviour locally; it is not signed for the Play Store.

See: [Expo CLI compiling](https://docs.expo.dev/more/expo-cli/#compiling-android)

### APK with EAS

#### eas.json

```json
{
  "build": {
    "preview": {"android": {"buildType": "apk"}}
  }
}
```
<!-- {: data-highlight="buildType"} -->

#### Build

```sh
eas build -p android --profile preview
```
<!-- {: data-highlight="eas build"} -->

An AAB cannot be installed directly; this profile produces a `.apk`.

See: [Build APKs](https://docs.expo.dev/build-reference/apk/)

## Also see

- [Create a React Native app](./react-native-create-app)
- [Run a React Native app](./react-native-run-app)
- [Render lists with FlatList](./react-native-flatlist)
- [Style components with StyleSheet](./react-native-stylesheet)
- [Set up React Navigation](./react-native-navigation)
- [Debug a React Native app](./react-native-debug)
- [Build an Android APK](./react-native-build-apk)
- [Detect app backgrounding](./react-native-appstate)

- [React.js cheatsheet](./react)
