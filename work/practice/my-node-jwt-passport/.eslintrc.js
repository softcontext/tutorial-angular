module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jquery": true
  },
  "extends": "airbnb-base",
  "plugins": ["import", "html"],
  "rules": {
    // 0 "off", 1 "warn" 2 "error"
    "no-console": "warn",
    "quotes": ["error", "single"],
    "no-underscore-dangle": "off",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "comma-dangle": ["error", "never"],
    "func-names": [2, "never"],
    "arrow-parens": 0,
    "linebreak-style": 0,
    "no-console": 0,
    "max-len": ["error", { "code": 100 }],
    "prefer-template": 0,
    "no-unused-vars": 0,
    "object-curly-newline": 0,
    "no-trailing-spaces": 0
  }
};