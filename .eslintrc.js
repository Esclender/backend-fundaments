module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: "standard",
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    quotes: ["error", "double"],
    eqeqeq: "off",
    "no-import-assign": "off",
    "no-implicit-globals": "off",
    "prefer-const": "off"
  }
}
