import { DependencyList, useMemo } from "react";
import {
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

/**
 * A hook to memoize a style. Uses `ViewStyle` per default, but can be used with other styles deriving from `FlexStyle` as well, such as `TextStyle`.
 * @param styleFactory The function that returns a style
 * @param deps The dependencies to trigger memoization re-evaluation
 * @example
 *
 * const style = useStyle(() => ({ height: someDynamicValue }), [someDynamicValue])
 */
 export const useStyle = <
 TStyle extends ViewStyle | TextStyle | ImageStyle,
 TOutput extends StyleProp<TStyle>
>(
 styleFactory: () => TOutput,
 deps?: DependencyList
): TOutput =>
 // eslint-disable-next-line react-hooks/exhaustive-deps
 useMemo(styleFactory, deps);
