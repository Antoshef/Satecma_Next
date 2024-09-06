/* eslint-disable @typescript-eslint/no-var-requires */
const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const reactPlugin = require("eslint-plugin-react");
const typescriptParser = require("@typescript-eslint/parser");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const unusedImports = require("eslint-plugin-unused-imports");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser, // Correct parser reference
      globals: {
        browser: true, // Define globals here instead of "env"
        es2021: true,
        node: true,
      },
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": typescriptPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      "no-unused-vars": "warn",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@next/next/no-duplicate-head": "off",
    },
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "next",
    "next/core-web-vitals",
  ),
];
