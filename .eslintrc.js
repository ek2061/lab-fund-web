module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    "parser": "babel-eslint",
    "sourceType": "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "no-useless-escape": 0,
  },
};
