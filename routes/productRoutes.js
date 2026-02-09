const express = require ("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/prodController");


router.get("/", auth, getProducts);
router.get("/:id", auth, getProductById);
router.post("/", auth, createProduct);
router.post("/", auth, updateProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);
module.exports = router;