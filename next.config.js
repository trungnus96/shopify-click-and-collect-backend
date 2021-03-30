const withPlugins = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
const css = require("@zeit/next-css");

module.exports = withPlugins([[sass, css]], {
  // next config here
  // Target must be serverless
  target: "serverless",
});
