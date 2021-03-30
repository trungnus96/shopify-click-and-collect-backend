import express from "express";
import mongoose from "mongoose";
// import next from "next";

require("dotenv").config();

// const dev = process.env.NODE_ENV !== "production";
// const nextJsApp = next({ dev });
// const handler = nextJsApp.getRequestHandler();

// configure express
import configureExpressApp from "./configureExpressApp";

// api
import routes from "./routes";

// constants
import { MONGO_DB_CONNECTION_STRING } from "./constants/env";

const port = process.env.PORT || 4000;

async function init() {
  // connect to mongoDB
  await mongoose.connect(MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // await nextJsApp.prepare();

  const expressApp = express();

  await configureExpressApp(expressApp);

  // api routes
  expressApp.use("/api", routes);

  // expressApp.get("*", (req, res) => {
  //   return handler(req, res);
  // });

  expressApp.listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Ready on port ${port} [ ${process.env.NODE_ENV} ]`);
  });
}

try {
  init();
} catch (e) {
  console.error(e.stack);
  process.exit(1);
}
