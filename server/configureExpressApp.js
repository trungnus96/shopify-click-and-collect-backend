import express from "express";
import path from "path";
import logger from "morgan";
import compression from "compression";
import helmet from "helmet";

export default expressApp => {
  return new Promise(resolve => {
    // logger
    expressApp.use(logger("dev"));
    // helmet, compression, body-parser
    expressApp.use(helmet());
    expressApp.use(compression());
    // support parsing of application/json
    expressApp.use(express.json());
    //support parsing of application/x-www-form-urlencoded post data
    expressApp.use(express.urlencoded({ extended: true }));

    // view engine setup
    expressApp.set("views", path.join(__dirname, "views"));
    expressApp.set("view engine", "hjs");

    // static folders
    expressApp.use(
      "/static",
      express.static(__dirname + "/../static", { maxAge: "1d" })
    );

    resolve();
  });
};
