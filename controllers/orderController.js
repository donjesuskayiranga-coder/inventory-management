
const Order = require("../models/order");
exports.getOrders = async ( req, res) => {
    try {
        const orders = await Order.find({user:req.user.id}).populate("products.product");
        res.json(orders);

    } catch(err) {

        res.status(500).json({message:err.message});
    }
};
exports.getOrderById = async (req, res) => {

    try {
        const order = await Order.findById(req.params.id).populate("products.product");
        if(!order ) return res.status(404).json({message:"order not found"});
        res.json(order);
    }
    catch (err) {
        res.status(500).json({message:err.message});

    }
};
exports.createOrder = async (req , res) => {

    try{
        const { products} = req.body;
         const order = await Order.create({
            user: req.user.id,
            products,
         });

         res.status(201).json(order);
        
    } catch(err) {
        res.status(500).json({message:err.message});

    }
};
exports.updateOrder = async (req, res) => {
    try {
        const {status}  = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {status},

            {new:true}
            


        );

        if(!order) return res.status(404).json({message: "order not found"});

        res.json(order);

    } catch (err) {
        res.status(500).json({ message:err.message});

    }

};


exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({message: "order not found"});
        res.json({ message: "order deleted"});

    } catch (err) {
        res.status(500).json({message:err.message});

    }

};