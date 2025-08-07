import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




export const register = async (req, res) => {

  try {
    const { name, email, password, address, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
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
    console.log("Email and password received:", email, password);

    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    console.log("Checking user in database for email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate token and respond
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2d" });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
