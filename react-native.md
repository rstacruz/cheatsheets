---
title: React Native
category: React
layout: 2017/sheet
updated: 2019-11-09
weight: -10
keywords:
  - react
  - react-native
  - mobile
  - android
  - ios
intro: |
  [React Native](https://facebook.github.io/react-native/) is a framework for building native iOS and Android application with React. This guide will target React Native 0.61 

---
{%raw%}

Command line
----------
{: .-three-column}

### Initialize a project

```bash
react-native init MyProject
cd MyProject
```

Don't forget to install the dependecies (see [npm](https://devhints.io/npm))

### run on device 

```bash
react-native run-android
react-native run-ios
```

### Linking dependencies

```bash
react-native link
```

Some libraries need additional steps for linking, read the documentations.

Development flow
----------------
{: .-three-column}

### Show/Hide Dev Menu

In the iOS simulator type `⌘ + D `

In the Android emulator type `⌘ + M` or `ctrl + M`
On a physical Android device you can also shake

[React Native Debugger](https://github.com/jhen0409/react-native-debugger) is recommended with the option "Debug JS remotely"


Specific Code Snippets
----------------

### Getting screen dimensions
```js
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
```

### Component
```jsx
import React from 'react';
import { Text, View } from 'react-native';

export default () =>(
	<View>
		<Text>Hello, world!</Text>
	</View>
)
```

### Style
```jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default () => (
	<View>
		<Text style={styles.red}>just red</Text>
		<Text style={styles.bigBlue}>just bigBlue</Text>
		<Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
		<Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
		<Text style={{color: yellow}}>Yellow as inline style</Text>
	</View>
);
```

Some components like the `Button` are native components that will render differently on each plateform and have few style options. Use `TouchableOpacity` or `TouchableWithoutFeedback` instead.

### Images
```jsx
import React from 'react';
import { Image, View } from 'react-native';

export default ({fromNetwork}) => (
		<Image
			style={{
				width: 50,
				height: 50,
				resizeMode: 'contain',
			}}
			source={ fromNetwork ? {uri: 'https://example.com/myImage.png'} : require('/path/to/myImage.png')}
		/>
	</View>
);
```

Also see
--------

* [React.js cheatsheet](react) _React_
* [React cheatsheet](https://rationalappdev.com/react-native-cheat-sheet/) _(rationalappdev.com)_

{%endraw%}
