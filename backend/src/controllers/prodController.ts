// Fix 2: Added input validation for product fields

import { Response } from "express"
import Product from "../models/product"
import { AuthRequest } from "../types"

export const getProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}

export const getProductById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }
    res.json(product)
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}

export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, sku, price, quantity, description } = req.body as {
      name: string
      sku: string
      price: number
      quantity: number
      description?: string
    }

    // Fix 2: Validate fields
    if (!name || !sku) {
      res.status(400).json({ message: "Name and SKU are required" })
      return
    }
    if (price === undefined || price < 0) {
      res.status(400).json({ message: "Price must be 0 or greater" })
      return
    }
    if (quantity === undefined || quantity < 0) {
      res.status(400).json({ message: "Quantity must be 0 or greater" })
      return
    }

    const product = await Product.create({ name, sku, price, quantity, description })
    res.status(201).json(product)
  } catch (error) {
    const err = error as Error
    // Handle duplicate SKU error
    if ((error as any).code === 11000) {
      res.status(400).json({ message: "A product with this SKU already exists" })
      return
    }
    res.status(500).json({ message: err.message })
  }
}

export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { price, quantity } = req.body

    // Fix 2: Validate numeric fields if provided
    if (price !== undefined && price < 0) {
      res.status(400).json({ message: "Price must be 0 or greater" })
      return
    }
    if (quantity !== undefined && quantity < 0) {
      res.status(400).json({ message: "Quantity must be 0 or greater" })
      return
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }
    res.json(product)
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}

export const deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      res.status(404).json({ message: "Product not found" })
      return
    }
    res.status(204).send()
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}