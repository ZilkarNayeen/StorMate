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

// POST create a user based on actor role
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, businessId } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (req.user.role === "superadmin") {
      if (!businessId) {
        return res.status(400).json({ success: false, message: "Business is required when creating a business admin" });
      }

      const targetBusinessId = businessId;
      const newUser = new User({
        name: name.trim(),
        email: normalizedEmail,
        password,
        role: "admin",
        businessId: targetBusinessId
      });

      await newUser.save();
      const userResponse = newUser.toObject();
      delete userResponse.password;
      return res.status(201).json({ success: true, message: "Business admin created successfully", user: userResponse });
    }

    if (req.user.role === "admin") {
      const validRoles = ["staff", "customer"];
      const chosenRole = validRoles.includes(role) ? role : "staff";

      const newUser = new User({
        name: name.trim(),
        email: normalizedEmail,
        password,
        role: chosenRole,
        businessId: req.user.businessId
      });

      await newUser.save();
      const userResponse = newUser.toObject();
      delete userResponse.password;
      return res.status(201).json({ success: true, message: "User created successfully", user: userResponse });
    }

    return res.status(403).json({ success: false, message: "You are not allowed to create users" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, message: "Server error creating user" });
  }
};
