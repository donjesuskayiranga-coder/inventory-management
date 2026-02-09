const Product = require("../models/product");

exports.createProduct = async (req, res)=> {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);

    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

exports.getProducts = async (req , res) => {
    try {
        const products = await Product.find();
        res.json(products);
} catch (error) {

    res.status(500).json({message:error.message});
}
};

exports.getProductById = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({message: "Product not found"});
        res.json(product);
    } 
    catch (err) {
        res.status(500).json({message:err.message});


    }

};


exports.updateProduct = async ( req, res) => {
    try{ 
        const { name , price , stock} = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {name , price, stock},
            { new: true}
        );
        if(!product) return res.status(404).json({message: " product not found"});
        res.json(product);
    } catch (err) {
        res.status(500).json({message:err.message});
    }
};

exports.deleteProduct = async (req, res) => {

    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({message: "Product not found"});
        res.json({message: "Product deleted"});

    } catch (err) {
        res.status(500).json({message:err.message});
    }
};
