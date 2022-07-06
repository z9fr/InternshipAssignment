module.exports = {
  transform: { "^.+\\.ts?$": "ts-jest" },
  testEnvironment: "node",
  testRegex: "/tests/.*\\.(test|spec)?\\.(ts|tsx)$",
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
