import { DependencyList, useMemo } from "react";
import {
  ImageStyle,
  RegisteredStyle,
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
 * const style = useStyle(() => ({ height: someDynamicValue }), [someDynamicValue])
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

const isRegisteredStyle = <T>(
 style: T | unknown
): style is RegisteredStyle<T> => {
 if (typeof style === "object" && style != null)
   return "__registeredStyleBrand" in style;
 else return false;
};
