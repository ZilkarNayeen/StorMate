import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// POST a new category
router.post("/add", async (req, res) => {
  const { name } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    // Check if already exists
    const exists = await Category.findOne({ name: name.trim() });
    if (exists) {
      return res.status(409).json({ error: "Category already exists" });
    }

    const category = new Category({ name: name.trim() });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({ error: "Failed to add category" });
  }
});

// DELETE a category
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

export default router;
