import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/Users.js";
import Business from "./models/Business.js";

dotenv.config();

const BUSINESS_NAME = "Tech Corp";
const BUSINESS_EMAIL = "admin@techcorp.com";
const ADMIN_EMAIL = "admin@techcorp.com";
const ADMIN_PASSWORD = "admintech";

const createAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.Mongo_URI || "mongodb://127.0.0.1:27017/storemate";
    await mongoose.connect(mongoUri);

    console.log("Connected to MongoDB");

    let business = await Business.findOne({
      $or: [{ name: BUSINESS_NAME }, { email: BUSINESS_EMAIL }, { slug: "tech-corp" }],
    });

    if (!business) {
      business = await Business.create({
        name: BUSINESS_NAME,
        email: BUSINESS_EMAIL,
        slug: "tech-corp",
      });
      console.log("Tech Corp business created");
    } else {
      console.log("Tech Corp business already exists");
    }

    const existingUser = await User.findOne({ email: ADMIN_EMAIL });

    if (existingUser) {
      console.log("Admin user already exists");
      return;
    }

    const admin = new User({
      name: "Tech Corp Admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      address: "Tech Corp",
      role: "admin",
      businessId: business._id,
    });

    await admin.save();

    console.log("Admin user created successfully");
    console.log("Email:", ADMIN_EMAIL);
    console.log("Business:", business.name);
    console.log("Business ID:", business._id.toString());
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
};

createAdmin();
