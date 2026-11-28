---
title: How to render a list with FlatList
link_title: FlatList in React Native
subtitle: Keys, separators, pagination
logo: { set: icon-park-outline, name: list }
category: JavaScript frameworks
layout: snippet
tier: t3
last_verified_with: "React Native 0.88.1."
last_verified_at: 2026-11-28
updated: 2026-11-28
links:
  - title: FlatList
    url: https://reactnative.dev/docs/flatlist
  - title: React Native cheatsheet
    url: /react-native
---

## Render lists
<!-- {: .-snippets} -->

### Basic list
<!-- {: .-snippet} -->

```jsx
<FlatList
  data={items}
  renderItem={({item}) => (
    <Text>{item.title}</Text>
  )}
/>
```
<!-- {: data-highlight="data={items}"} -->

**Renders each item** in `data` with `renderItem`. See [FlatList](https://reactnative.dev/docs/flatlist#required-renderitem).

### Stable keys
<!-- {: .-snippet} -->

```jsx
<FlatList
  data={items}
  keyExtractor={item => item.id}
  renderItem={renderItem}
/>
```
<!-- {: data-highlight="keyExtractor"} -->

**Uses item IDs** instead of a `key` field. See [FlatList](https://reactnative.dev/docs/flatlist#keyextractor).

### Separators and empty state
<!-- {: .-snippet} -->

```jsx
<FlatList
  data={items}
  ItemSeparatorComponent={() => (
    <View style={styles.line} />
  )}
  ListEmptyComponent={<Text>Nothing here</Text>}
  renderItem={renderItem}
/>
```
<!-- {: data-highlight="ItemSeparatorComponent; ListEmptyComponent"} -->

**Renders a divider** between items and an empty-state placeholder. See [FlatList](https://reactnative.dev/docs/flatlist#itemseparatorcomponent).

### Pagination
<!-- {: .-snippet} -->

```jsx
<FlatList
  data={items}
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
  renderItem={renderItem}
/>
```
<!-- {: data-highlight="onEndReached"} -->

**Loads more rows** near the end of the list. See [FlatList](https://reactnative.dev/docs/virtualizedlist#onendreached).
