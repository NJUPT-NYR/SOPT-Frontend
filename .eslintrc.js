module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    // "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    // "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {},
  settings: {
    "import-resolver": {
      alias: {
        map: [["@", "./src"]],
      },
    },
    react: {
      version: "detect",
    },
  },
};
