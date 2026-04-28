

import { Router } from "express"
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/prodController"
import auth from "../middleware/auth"
import admin from "../middleware/admin"

const router = Router()

router.get("/", auth, getProducts)
router.get("/:id", auth, getProductById)
router.post("/", auth, admin, createProduct)
router.put("/:id", auth, admin, updateProduct)
router.delete("/:id", auth, admin, deleteProduct)

export default router