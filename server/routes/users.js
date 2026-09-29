import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getUsers);
router.post("/create", createUser);

export default router;
