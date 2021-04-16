import {
  ImageStyle,
  RegisteredStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

const isRegisteredStyle = <T>(
  style: T | unknown
): style is RegisteredStyle<T> => {
  if (typeof style === "object" && style != null)
    return "__registeredStyleBrand" in style;
  else return false;
};

/**
 * Find a specific value in the given style
 * @param style The style to search the given key in
 * @param stylePropertyKey The style property to search for
 * @returns The value of the found style property, or `undefined` if not found
 * @example
 *
 * function Component({ style, ...props }) {
 *    const borderRadius = useMemo(() => findStyle(style, "borderRadius"), [style])
 *    // borderRadius is 'number' if the style (array, object, ...) has a borderRadius set somewhere,
 *    // 'undefined' if not.
 *
 *    // change logic to apply borderRadius somewhere, e.g. use `overflow: 'hidden'` on children
 * }
 */
export const findStyle = <
  TStyle extends ViewStyle | TextStyle | ImageStyle,
  TResult extends TStyle extends (infer U)[] ? U : TStyle,
  TName extends keyof TResult
>(
  style: StyleProp<TStyle>,
  stylePropertyKey: TName
): TResult[TName] | undefined => {
  if (Array.isArray(style)) {
    // we're doing a reverse loop because values in elements at the end override values at the beginning
    for (let i = style.length - 1; i >= 0; i--) {
      const result = findStyle<TStyle, TResult, TName>(
        // @ts-expect-error it's complaining because it is `readonly`, but we're not modifying it anyways. StyleProp<T>::RecursiveArray<T> needs to be readonly.
        style[i],
        stylePropertyKey
      );
      if (result != null) return result;
    }
    // style not found in array
    return undefined;
  } else {
    if (style == null) {
      // null, undefined
      return undefined;
    } else if (typeof style === "boolean") {
      // false
      return undefined;
    } else if (isRegisteredStyle(style)) {
      // RegisteredStyle<T> (number) - does not actually exist.
      // @ts-expect-error typings for StyleProp<> are really hard
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return style.__registeredStyleBrand[stylePropertyKey];
    } else if (typeof style === "object") {
      // { ... }
      // @ts-expect-error typings for StyleProp<> are really hard
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return style[stylePropertyKey];
    } else {
      // it's not a known style type.
      return undefined;
    }
  }
};
