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
import Business from "./models/Business.js";
import User from "./models/Users.js";
import { setupSwagger } from "./swagger.js";

dotenv.config();

const ensureDemoData = async () => {
  try {
    const hasSuperadmin = await User.findOne({ role: "superadmin" });
    if (hasSuperadmin) {
      return;
    }

    const existingBusiness = await Business.findOne();
    const techCorp = existingBusiness || await Business.create({
      name: "Tech Corp",
      email: "info@techcorp.com",
      slug: "techcorp",
    });

    await User.create({
      name: "Owner Superadmin",
      email: "owner@storemate.com",
      password: "ownersuperadmin",
      address: "Owner HQ",
      role: "superadmin",
    });

    const adminExists = await User.findOne({ email: "admin@techcorp.com" });
    if (!adminExists) {
      await User.create({
        name: "Tech Admin",
        email: "admin@techcorp.com",
        password: "admintech",
        address: "Tech Corp HQ",
        role: "admin",
        businessId: techCorp._id,
      });
    }

    const staffExists = await User.findOne({ email: "staff@techcorp.com" });
    if (!staffExists) {
      await User.create({
        name: "Tech Staff",
        email: "staff@techcorp.com",
        password: "stafftech",
        address: "Tech Corp Store",
        role: "staff",
        businessId: techCorp._id,
      });
    }

    console.log("Demo superadmin and business accounts ensured for login.");
  } catch (error) {
    console.error("Demo seeding failed:", error.message);
  }
};

const app = express();
app.use(cors());
app.use(express.json());

// Setup Swagger API docs
setupSwagger(app);

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
    await ensureDemoData();
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();