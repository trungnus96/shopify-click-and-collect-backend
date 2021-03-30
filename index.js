const mode = process.env.NODE_ENV;
const isProd = mode === "production";

// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('@babel/register')({
  "presets": [
    [
      "next/babel",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
});

console.log(`Running in ${mode}...`);

module.exports = require('./server/index.js');