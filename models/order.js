const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true},
products: [
    {
        product: { type:mongoose.Schema.Types.ObjectId, ref:"Product", required: true},
        quantity: { type: Number, required:true},

    },
],
status: {type:String , enum: ["pending", "completed", "cancelled"],default:"pending"},
}, { timestamps: true });

module.exports = mongoose.model("order", OrderSchema);
