// Fix 3: Decrement stock when order is placed
// Fix 2: Added input validation

import { Response } from "express"
import Order from "../models/order"
import Product from "../models/product"
import { AuthRequest } from "../types"

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const filter = req.user?.role === "admin" ? {} : { user: req.user?.id }
    const orders = await Order.find(filter).populate("products.product")
    res.json(orders)
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}

export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id).populate("products.product")
    if (!order) {
      res.status(404).json({ message: "Order not found" })
      return
    }
    res.json(order)
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { products } = req.body as { products: { product: string; quantity: number }[] }

    // Fix 2: Validate input
    if (!products || !Array.isArray(products) || products.length === 0) {
      res.status(400).json({ message: "Products are required" })
      return
    }

    // Fix 3: Check stock availability and decrement
    for (const item of products) {
      if (!item.product || !item.quantity || item.quantity < 1) {
        res.status(400).json({ message: "Each item needs a valid product and quantity" })
        return
      }

      const product = await Product.findById(item.product)
      if (!product) {
        res.status(404).json({ message: `Product not found: ${item.product}` })
        return
      }
      if (product.quantity < item.quantity) {
        res.status(400).json({ message: `Not enough stock for ${product.name}. Available: ${product.quantity}` })
        return
      }
    }

    // All checks passed — create order and decrement stock
    const order = await Order.create({ user: req.user?.id, products })

    for (const item of products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { quantity: -item.quantity }
      })
    }

    res.status(201).json(order)
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}

export const updateOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body as { status: "pending" | "completed" | "cancelled" }

    // Fix 2: Validate status value
    if (!["pending", "completed", "cancelled"].includes(status)) {
      res.status(400).json({ message: "Invalid status value" })
      return
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    if (!order) {
      res.status(404).json({ message: "Order not found" })
      return
    }
    res.json(order)
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}

export const deleteOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
      res.status(404).json({ message: "Order not found" })
      return
    }
    res.json({ message: "Order deleted" })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}