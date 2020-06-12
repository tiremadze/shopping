const express = require("express");
const router = express.Router();

const productsRouter = require("./productsRouter");
const contactRouter = require("./contactRouter");
router.use("/products", productsRouter);
router.use("/contact", contactRouter);

module.exports = router;
