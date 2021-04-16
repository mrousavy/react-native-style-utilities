import { DependencyList, useMemo } from "react";
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

/**
 * A hook to memoize a style and flatten it into a single object. Uses `ViewStyle` per default, but can be used with other styles deriving from `FlexStyle` as well, such as `TextStyle`.
 * @param styleFactory The function that returns a style
 * @param deps The dependencies to trigger memoization re-evaluation
 * @example
 *
 * // simple object styles, same as with `useStyle`
 * const style1 = useFlatStyle(() => ({ height: someDynamicValue }), [someDynamicValue])
 *
 * // array styles get flattened into a single object
 * const style2 = useFlatStyle(
 *   () => [styles.container, props.style, { height: someDynamicValue }],
 *   [props.style, someDynamicValue]
 * );
 * Array.isArray(style2); // => false
 */
export const useFlatStyle = <
  TStyle extends ViewStyle | TextStyle | ImageStyle,
  TOutput extends StyleProp<TStyle>
>(
  styleFactory: () => TOutput,
  deps?: DependencyList
): TStyle extends (infer U)[] ? U : TStyle =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => StyleSheet.flatten(styleFactory()), deps);
