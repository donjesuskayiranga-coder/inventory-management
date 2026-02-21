const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = require("../config/database");
const User = require("../models/user");
const Product = require("../models/product");
async function seed() {
    try {
        await connectDB();
        console.log('seeding database...');


        await User.deleteMany();
        await Product.deleteMany();

        const admin = await User.create({
            username : "Admin User",
            email: "admin@inventory.com",
            password: "admin123",
            role:"admin",
        });
     console.log("Admin User created");

        const products = await Product.insertMany([
            {
                name: "Laptop",
                sku: "LAP123",
                price : 1200,
                quantity: 10,
            },
            {
                name: "Mouse",
                sku: "MOU456",
                price:25,
                quantity:100,
            },
            {
                name: "Keyboard",
                sku: "KEY789",
                price:60,
                quantity:50,
            },
        ]);

        console.log("products created");
        console.log(" seeding completed");
        process.exit();
    } catch (error) {

        console.error(" seeding error:",error);
        
        process.exit(1);
    }
}
seed();