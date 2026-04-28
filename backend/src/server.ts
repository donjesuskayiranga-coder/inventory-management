import "dotenv/config"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import connectDB from "./config/database"
import authRoutes from "./routes/authRoutes"
import productRoutes from "./routes/productRoutes"
import orderRoutes from "./routes/orderRoutes"
import morgan from "morgan"


connectDB()

const app = express()
app.use(helmet())
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)


app.get("/", (req, res) => {
    res.send("VaultIQ is running")

})

app.all("*path", (req, res) => {
    res.status(404).json( { message: `Route ${req.url} not found`})

})

const PORT = process.env.PORT || 7000
app.listen( PORT, () => {
    console.log(`server running on http: //localhost:${PORT}`)
})


