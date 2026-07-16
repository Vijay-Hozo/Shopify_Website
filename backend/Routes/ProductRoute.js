const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts } = require("../Controller/ProductController");

router.post("/create", createProduct);
router.get("/products", getAllProducts);


module.exports = router;