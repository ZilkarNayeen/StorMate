import Category from "../models/Category.js";

// GET all categories for the authenticated business
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ businessId: req.user.businessId }).sort({ name: 1 });
    return res.status(200).json({ success: true, categories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch categories" });
  }
};

// POST add a new category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const existing = await Category.findOne({ name: name.trim(), businessId: req.user.businessId });
    if (existing) {
      return res.status(409).json({ success: false, message: "Category already exists" });
    }

    const category = new Category({ name: name.trim(), businessId: req.user.businessId });
    await category.save();
    return res.status(201).json({ success: true, message: "Category added successfully", category });
  } catch (err) {
    console.error("Error adding category:", err);
    return res.status(500).json({ success: false, message: "Failed to add category" });
  }
};

// DELETE a category
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ _id: req.params.id, businessId: req.user.businessId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    return res.status(500).json({ success: false, message: "Failed to delete category" });
  }
};