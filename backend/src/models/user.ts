import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
import { IUser } from "../types"

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role:     { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
)

userSchema.pre("save", async function (this: IUser, next) {
  if (!this.isModified("password")) return 
  this.password = await bcrypt.hash(this.password, 10)
  
})

export default mongoose.model<IUser>("User", userSchema)