import mongoose, {Schema } from "mongoose";
import {IOrder } from "../types"

const orderSchema = new Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            product:  { type:Schema.Types.ObjectId, ref: "Product"},
            quantity: { type: Number, required: true},
        },
    ],
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
    },

    },
    {timestamps: true }
)


export default mongoose.model<IOrder>("Order", orderSchema)
