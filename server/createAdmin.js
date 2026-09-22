import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/Users.js";
import Business from "./models/Business.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(
     process.env.Mongo_URI || process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    let business = await Business.findOne({
      email: "admin@techcorp.com"
    });

    if (!business) {
      business = await Business.create({
        name: "Tech Corp",
        email: "admin@techcorp.com",
        slug: "tech-corp"
      });

      console.log("Tech Corp business created");
    } else {
      console.log("Tech Corp business already exists");
    }

    const existingUser = await User.findOne({
      email: "admin@techcorp.com"
    });

    if (existingUser) {
      console.log("Admin user already exists");
      return;
    }

    const admin = new User({
      name: "Tech Corp Admin",
      email: "admin@techcorp.com",
      password: "admintech",
      address: "Tech Corp",
      role: "admin",
      businessId: business._id
    });

    await admin.save();

    console.log("Admin user created successfully");
    console.log("Email: admin@techcorp.com");
    console.log("Password: admintech");
    console.log("Business:", business.name);
    console.log("Business ID:", business._id.toString());

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
