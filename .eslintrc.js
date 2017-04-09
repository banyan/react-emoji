module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "jest"
  ],
  "env": {
    "jest/globals": true
  },
  "globals": {
    "context": true,
  },
  "rules": {
    semi: [2, "never"],
    "comma-dangle": [2, "only-multiline"]
  }
}
