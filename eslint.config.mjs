import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "module" } },
  {
    files: ["test/**"],
    ...jest.configs["flat/recommended"],
    ...jest.configs["flat/style"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      ...jest.configs["flat/style"].rules,
      "jest/prefer-expect-assertions": "off",
    },
    languageOptions: { globals: jest.environments.globals.globals },
  },
  { languageOptions: { globals: globals.browser } },
  {
    files: ["test/**"],
    ...jest.configs["flat/style"],
    rules: {
      ...jest.configs["flat/style"].rules,
      "jest/prefer-expect-assertions": "off",
    },
    languageOptions: { globals: globals.jest },
  },
  {
    ignores: [
      "node_modules/*",
      "dist/*",
      "package.json",
      "package-lock.json",
      "webpack.common.js",
      "webpack.dev.js",
      "webpack.prod.js",
    ],
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];
