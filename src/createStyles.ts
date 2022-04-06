import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

/**
 * Black magic for turning a union into an intersection.
 * @see https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
 */
type ReadonlyUnionToIntersection<U> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? // NOTE: This extra mapping "flattens" the intersection into a single readonly object
      { readonly [P in keyof I]: I[P] }
    : never;

type CreateNamedStyles<T> = {
  readonly [P in keyof T]: StyleProp<ViewStyle | TextStyle | ImageStyle>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlattenedNamedStyles<T extends CreateNamedStyles<any>> = {
  readonly [P in keyof T]: T[P] extends (infer U)[]
    ? ReadonlyUnionToIntersection<U>
    : T[P];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createStyles = <T extends CreateNamedStyles<any>>(
  styles: T
): FlattenedNamedStyles<T> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v: any = {};

  for (const k in styles) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    v[k] = StyleSheet.flatten(styles[k]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return v;
};
