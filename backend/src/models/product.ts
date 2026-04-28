import mongoose,  {Schema} from "mongoose"
import {IProduct } from "../types"

const productSchema = new Schema<IProduct>(
    {
        name:  {type:String, required:true},
        sku:   {type:String, required:true, unique:true},
        price: {type:Number, required:true},
        quantity: {type:Number, required:true},
        description:{type:String},
    },
    {timestamps:true }
)

export default mongoose.model<IProduct>("Product", productSchema)
