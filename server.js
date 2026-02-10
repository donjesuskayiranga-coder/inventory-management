const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const orderRoutes= require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

connectDB(); 

app.use(express.json());
app.use("/api/products",productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.get("/",(req,res) => {
    res.send("Inventory Api is running");


});
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});