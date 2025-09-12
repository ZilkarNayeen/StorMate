const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // --- Hardcoded Admin ---
  if (email === "admin@gmail.com" && password === "admin") {
    return res.json({
      name: "Admin",
      email: "admin@gmail.com",
      role: "admin",
      token: "fake-admin-token"
    });
  }

  // --- Normal user login ---
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    return res.json({
      name: user.name,
      email: user.email,
      role: user.role, // admin or customer
      token: "fake-user-token"
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
