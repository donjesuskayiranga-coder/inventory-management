
import {Router} from "express"
import { register, login, getUsers } from "../controllers/authcontroller"
import auth from "../middleware/auth"
import admin from "../middleware/admin"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/users", auth, admin, getUsers)

export default router