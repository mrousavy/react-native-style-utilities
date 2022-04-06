module.exports = {
  globals: {
    Logger: true,
  },
  root: true,
  env: {
    "react-native/react-native": true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "react", "react-native"],
  extends: [
    "@react-native-community",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  rules: {
    // regular rules
    "no-catch-shadow": "off",
    "arrow-body-style": "warn",
    "no-return-await": "warn",
    // "prefer-arrow-callback": "error", //not sure about this one, might be buggy
    "func-style": ["error", "expression"],
    "eslint-comments/no-unused-disable": "error",
    "no-console": "error",
    radix: "error",
    "spaced-comment": [
      "error",
      "always",
      {
        block: { balanced: true },
        // allow repeating * instead of a whole comment
        exceptions: ["*"],
        // allow these markers to appear before the required space
        markers: ["#region", "#endregion", "+", "-", "*"],
      },
    ],
    "no-implicit-coercion": "error",
    "no-nested-ternary": "warn",
    "operator-linebreak": [
      "warn",
      "after",
      // must be ignored since it conflicts with prettier
      { overrides: { "?": "ignore", ":": "ignore" } },
    ],
    eqeqeq: ["error", "always", { null: "never" }],

    // dumb rules that are off so the much smarter typescript-eslint can use them
    "no-shadow": "off",
    "no-unused-vars": "off",
    "require-await": "off",

    // react-native rules
    "react-native/no-unused-styles": "error",
    "react-native/no-inline-styles": "error",
    "react-native/no-single-element-style-arrays": "error",
    // "react-native/no-raw-text": "error", // doesn't work since we use "<CuventText>"
    // react-native/no-color-literals: "warn", //also do this at some point

    // not type-aware rules
    "@typescript-eslint/no-shadow": "warn",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        functions: true,
        classes: true,
        variables: false,
        enums: true,
        typedefs: true,
      },
    ],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/member-delimiter-style": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/class-literal-property-style": "error",
    "@typescript-eslint/unified-signatures": "error",
    "@typescript-eslint/no-invalid-void-type": "error",
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-non-null-assertion": "error",

    // react hooks
    "react-hooks/exhaustive-deps": [
      "error",
      {
        additionalHooks: "(useStyle|useFlatStyle)",
      },
    ],

    // Prettier
    "prettier/prettier": "warn",
  },
  // Rules requiring types
  overrides: [
    {
      files: "src/**/*.+(ts|tsx)",
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        "@typescript-eslint/require-await": "warn", // changes default severity
        "@typescript-eslint/no-base-to-string": "error",
        "@typescript-eslint/no-throw-literal": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-unnecessary-qualifier": "error",
        "@typescript-eslint/no-unnecessary-type-arguments": "warn",
        "@typescript-eslint/prefer-includes": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "warn",
        "@typescript-eslint/prefer-readonly": "warn",
        "@typescript-eslint/prefer-reduce-type-parameter": "warn",
        "@typescript-eslint/prefer-string-starts-ends-with": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/require-array-sort-compare": "warn",
        "@typescript-eslint/switch-exhaustiveness-check": "warn",
        "@typescript-eslint/unbound-method": "warn",
        "@typescript-eslint/strict-boolean-expressions": [
          "error",
          {
            allowString: false,
            allowNullableObject: false,
            allowNumber: false,
            allowNullableBoolean: true,
          },
        ],
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-unsafe-member-access": "warn",
        // "any" rules that _should_ be enabled but are too much work for us rn
        "@typescript-eslint/restrict-template-expressions": [
          "warn",
          {
            allowNumber: true,
            allowBoolean: true,
            allowNullish: true,
          },
        ],
      },
    },
  ],
};
