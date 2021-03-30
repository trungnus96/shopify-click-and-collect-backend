import express from "express";
import next from "next";
require("dotenv").config();
const dev = process.env.NODE_ENV !== "production";
// const nextJsApp = next({ dev });
// const handler = nextJsApp.getRequestHandler();

// configure express
import configureExpressApp from "./configureExpressApp";

// api
import api from "./api";

const port = process.env.PORT || 4000;

async function init() {
  // await nextJsApp.prepare();

  const expressApp = express();

  await configureExpressApp(expressApp);

  // api routes
  expressApp.use("/api", api);

  // expressApp.get("*", (req, res) => {
  //   return handler(req, res);
  // });

  expressApp.listen(port, err => {
    if (err) throw err;
    console.log(`🚀 Ready on port ${port}`);
  });
}

try {
  init();
} catch (e) {
  console.error(e.stack);
  process.exit(1);
}
