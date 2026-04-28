import {Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import {AuthRequest} from "../types"

interface  JwtPayload {
  id: string
  role: "user" | "admin"

}

const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Not logged in" })
    return
  }
  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    req.user = {id: decoded.id, role:decoded.role }
    next()
  } catch {
    res.status(401).json({ message: "Invalid token" })

  }
}

  export default auth