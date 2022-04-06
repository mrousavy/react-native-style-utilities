<div align="center">
  <h1>react-native-style-utilities</h1>
  <p>Fully typed hooks and utility functions for the React Native StyleSheet API</p>
  <br />
  <pre align="center">npm i <a href="https://www.npmjs.com/package/react-native-style-utilities">react-native-style-utilities</a></pre>
  <br />
</div>

## ESLint Setup

If you're using the [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) plugin, add the following to your `.eslintrc.js`:

```js
"react-hooks/exhaustive-deps": [
  "error",
  {
    additionalHooks: "(useStyle|useFlatStyle)",
  },
],
```

<br />
<br />

## `useStyle`

A hook to memoize dynamic styles.

> See ["Memoize!!! 💾 - a react (native) performance guide"](https://gist.github.com/mrousavy/0de7486814c655de8a110df5cef74ddc)

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

<br />
<br />

## `useFlatStyle`

Same as `useStyle`, but flattens ("merges") the returned values into a simple object with [`StyleSheet.flatten(...)`](https://reactnative.dev/docs/stylesheet#flatten).

> See ["Memoize!!! 💾 - a react (native) performance guide"](https://gist.github.com/mrousavy/0de7486814c655de8a110df5cef74ddc)

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

<br />
<br />

## `findStyle`

A helper function to find a given style property in any style object without using expensive flattening (no `StyleSheet.flatten(...)`).

```tsx
function Component({ style, ...props }) {
  const borderRadius = style.borderRadius // <-- does not work, style type is complex
  const borderRadius = findStyle(style, "borderRadius") // <-- works, is 'number | undefined'
}
```

## `createStyles`

A helper that is similar to `StyleSheet.create`, but allows passing `StyleProp` arrays as well as styles. This makes it easier to compose flat styles from helpers, while retaining all the types.

```tsx
// Define some helpers
const flex = StyleSheet.create({
  full: { flex: 1 },
  row: { flexDirection: "row" } /* etc. */,
});
const padding = StyleSheet.create({
  p4: { padding: 12 },
  pr2: { paddingRight: 4 } /* etc. */,
});

// Compose into flat named styles, like StyleSheet.create
const styles = createStyles({
  header: [flex.row, padding.p4, padding.pr2],
});

styles.header;
// Type: {
//   readonly flexDirection: "row"
//   readonly padding: number
//   readonly paddingRight: number
// }
```

### `createStyles` Caveats

**Flattening:** Because this is flattening named styles, it has an initialization cost greater than `StyleSheet.create`. This should be used for composition in place of passing arrays to style props in components.

**Using `as const` with `createStyles`**: Additionally, we recommend using `StyleSheet.create` or `createStyle` itself for creating helper objects. While you can use `as const` objects to get literal type information, it can cause type collisions when flattening, if two of the same keys are used:

```tsx
const paddingConst = {
  p3: { padding: 8 },
  p4: { padding: 12 },
} as const;
const paddingCreate = StyleSheet.create({
  p3: { padding: 8 },
  p4: { padding: 12 },
});

const constStyle = createStyles({ a: [paddingConst.p3] });
constStyle.a; // Type: { readonly padding: 8 }

const constStyleOops = createStyles({ a: [paddingConst.p3, paddingConst.p4] });
constStyleOops.a; // Type: never

const style = createStyles({ a: [paddingCreate.p3, paddingCreate.p4] });
style.a; // Type: { readonly padding: number }
```
