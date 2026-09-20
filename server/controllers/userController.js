import User from "../models/Users.js";

// GET all users (Admin/Superadmin only)
export const getUsers = async (req, res) => {
  try {
    const filter = req.user.role === "superadmin" ? {} : { businessId: req.user.businessId };
    const users = await User.find(filter, "-password").sort({ createdAt: -1 });
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ success: false, message: "Server error fetching users" });
  }
};

// POST create a user (Admin/Superadmin only)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: role || "customer",
      businessId: req.user.businessId
    });

    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({ success: true, message: "User created successfully", user: userResponse });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, message: "Server error creating user" });
  }
};
