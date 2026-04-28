import { Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/user"
import { AuthRequest } from "../types"

// helper — signs a JWT token
const signToken = (id: string, role: string): string => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  )
}

// POST /api/auth/register
export const register = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body as {
      username: string
      email: string
      password: string
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400).json({ message: "Email already in use" })
      return
    }

    const user = await User.create({ username, email, password })

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}

// POST /api/auth/login
export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as {
      email: string
      password: string
    }

    // select("+password") because password has select:false in model
    const user = await User.findOne({ email }).select("+password")

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Wrong email or password" })
      return
    }

    const token = signToken(user._id.toString(), user.role)

    res.json({
      token,
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}

// GET /api/auth/users  (admin only)
export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (error) {
    const err = error as Error
    res.status(500).json({ message: err.message })
  }
}