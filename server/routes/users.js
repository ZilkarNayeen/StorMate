import express from "express";
import User from "../models/Users.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all users (Admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const filter = req.user.role === "superadmin" ? {} : { businessId: req.user.businessId };
    const users = await User.find(filter, "-password"); // Exclude passwords from return
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error fetching users" });
  }
});

// POST create a user (Admin only)
router.post("/create", protect, adminOnly, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: role || "customer",
      businessId: req.user.businessId
    });

    await newUser.save();
    
    // Return the new user without password
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    res.status(201).json({ success: true, user: userResponse });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error creating user" });
  }
});

export default router;
