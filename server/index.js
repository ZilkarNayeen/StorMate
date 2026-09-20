import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import categoryRoutes from "./routes/category.js";
import authroutes from "./routes/auth.js";
import supplierRoutes from './routes/supplier.js';
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import itemTransactionRoutes from "./routes/itemTransaction.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok", timestamp: new Date() }));

// Routes
app.use("/api/auth", authroutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers",supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);   
app.use("/api/itemTransaction", itemTransactionRoutes);
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 5713;

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();