import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes (requires valid token)
export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user; // attach user to request
        next();
    } catch (error) {
        console.error("Error in protect middleware:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Middleware to allow only admin users
export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ success: false, message: "Admin access required" });
    }
};
