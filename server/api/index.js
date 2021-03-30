import express from "express";

// sub routes
import webhook from "./webhook";
import shopify from "./shopify";

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index", { title: `API - ${process.env.NODE_ENV}` });
});

router.use(`/webhook`, webhook);
router.use(`/shopify`, shopify);

export default router;
