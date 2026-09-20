import express from "express";
import { getCategories, addCategory, deleteCategory } from "../controllers/categoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getCategories);
router.post("/add", addCategory);
router.delete("/:id", deleteCategory);

export default router;
