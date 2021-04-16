<div align="center">
  <h1>react-native-style-utilities</h1>
  <p>Fully typed hooks and utility functions for the React Native StyleSheet API</p>
  <br />
  <pre align="center">npm i <a href="https://www.npmjs.com/package/react-native-style-utilities">react-native-style-utilities</a></pre>
  <br />
</div>


## `useStyle`

A hook to memoize dynamic styles.

### Objects

By using `useStyle` the object `{ height: number }` gets memoized and will only be re-created if `someDynamicValue` changes, resulting in **better optimized re-renders**.

#### Bad

```tsx
return <View style={{ height: someDynamicValue }} />
```

#### Good

```tsx
const style = useStyle(() => ({ height: someDynamicValue }), [someDynamicValue])

return <View style={style} />
```

### Arrays

`useStyle` can also be used to join arrays together, also improving re-render times.

#### Bad

```tsx
return <View style={[styles.container, props.style, { height: someDynamicValue }]} />
```

#### Good

```tsx
const style = useStyle(
  () => [styles.container, props.style, { height: someDynamicValue }],
  [props.style, someDynamicValue]
);

return <View style={style} />
```

## `useFlatStyle`

Same as `useStyle`, but flattens ("merges") the returned values into a simple object with [`StyleSheet.flatten(...)`](https://reactnative.dev/docs/stylesheet#flatten).

```tsx
const style1 = useStyle(
  () => [styles.container, props.style, { height: someDynamicValue }],
  [props.style, someDynamicValue]
);
style1.borderRadius // <-- does not work, `style1` is an array!

const style2 = useFlatStyle(
  () => [styles.container, props.style, { height: someDynamicValue }],
  [props.style, someDynamicValue]
);
style2.borderRadius // <-- works, will return 'number | undefined'
```

## `findStyle`

A helper function to find a given style property in any style object without using expensive flattening (no `StyleSheet.flatten(...)`).

```tsx
function Component({ style, ...props }) {
  const borderRadius = style.borderRadius // <-- does not work, style type is complex
  const borderRadius = findStyle(style, "borderRadius") // <-- works, is 'number | undefined'
}
```
