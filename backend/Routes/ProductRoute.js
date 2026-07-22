const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../Controller/ProductController");
const UserAuth = require("../Middleware/authMiddleware");

router.post("/create", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id",UserAuth, updateProduct);
router.delete("/products/:id",UserAuth, deleteProduct);


module.exports = router;