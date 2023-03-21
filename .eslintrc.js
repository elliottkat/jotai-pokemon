module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    plugins: ["react", "react-hooks", "unused-imports"],
    extends: [
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended"
    ],
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/prop-types": "off",
        "unused-imports/no-unused-imports-ts": 2,
        "@typescript-eslint/no-explicit-any": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          { 
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_",
            "caughtErrorsIgnorePattern": "^_"
          }
        ],
        "prettier/prettier": ['error', {}, { usePrettierrc: true }]
    },
  };