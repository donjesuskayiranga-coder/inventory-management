import { Response, NextFunction} from "express"
import {AuthRequest } from "../types"

const admin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !=="admin") {
    res.status(403).json({ message: "Admin access only"})
    return 
  }
  next()
}


export default admin