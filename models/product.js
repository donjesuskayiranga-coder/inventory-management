const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
name: {type: String, required:true},
sku: { type:String, required:true, unique:true},
price: {type:Number, required:true},
quantity: {type:Number, default:0},
description: {type:String },
}, {timestamps:true});
module.exports = mongoose.model("Product", ProductSchema);