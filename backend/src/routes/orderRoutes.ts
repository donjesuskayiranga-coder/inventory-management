
import { Router } from "express"
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController"
import auth from "../middleware/auth"
import admin from "../middleware/admin"

const router = Router()

router.get("/", auth, getOrders)
router.get("/:id", auth, getOrderById)
router.post("/", auth, createOrder)
router.put("/:id", auth, admin, updateOrder)
router.delete("/:id", auth, admin, deleteOrder)

export default router