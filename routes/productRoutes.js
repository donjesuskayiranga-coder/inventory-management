const express = require ("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


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
router.post("/", auth, admin, async (req, res) => {
    try {     const { name, description, price, quantity } = req.body;}
    catch (error) {
        res.status(500).json({ message: error.message });
        
    }
})
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);
module.exports = router;