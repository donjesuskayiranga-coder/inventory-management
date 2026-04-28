import { Request } from "express"
import { Document, Types } from "mongoose"

export interface IUser extends Document {
  username: string
  email: string
  password: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface IProduct extends Document {
  name: string
  sku: string
  price: number
  quantity: number
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface IOrderItem {
  product: Types.ObjectId
  quantity: number
}

export interface IOrder extends Document {
  user: Types.ObjectId
  products: IOrderItem[]
  status: "pending" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

export interface AuthRequest extends Request {
  user?: {
    id: string
    role: "user" | "admin"
  }
}