
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";




export const register = async (req, res) => {

  try {
    const { name, email, password, address, role } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const newUser = new User({
      name,
      email: normalizedEmail,
      password,
      address,
      role: role || "customer", // Default to customer if role not provided
    });
    await newUser.save();
    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  console.log("Login request received:", req.body);
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    console.log("Email and password received:", normalizedEmail, password);

    if (!normalizedEmail || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    console.log("Checking user in database for email:", normalizedEmail);
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log("User not found for email:", normalizedEmail);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2d" });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        businessId: user.businessId
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
