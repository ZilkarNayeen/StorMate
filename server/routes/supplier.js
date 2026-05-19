import express from "express";
import { addSupplier, getSuppliers, deleteSupplier } from "../controllers/supplierController.js";
import SupplierModel from "../models/Suppliers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// GET all suppliers
router.get("/", getSuppliers);

// POST a new supplier
router.post("/add", addSupplier);

// UPDATE a supplier
router.put("/:id", async (req, res) => {
  try {
    const { name, email, number, address } = req.body;

    // Validate input
    if (!name || !email || !number || !address) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check for duplicates (optional)
    const existing = await SupplierModel.findOne({
      $or: [{ email }, { number }],
      businessId: req.user.businessId,
      _id: { $ne: req.params.id },
    });

    if (existing) {
      return res.status(400).json({ success: false, message: "Supplier with this email or number already exists" });
    }

    const updatedSupplier = await SupplierModel.findOneAndUpdate(
      { _id: req.params.id, businessId: req.user.businessId },
      { name, email, number, address },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }

    return res.status(200).json({ success: true, message: "Supplier updated", supplier: updatedSupplier });
  } catch (err) {
    console.error("Error updating supplier:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE a supplier
router.delete("/:id", deleteSupplier);

export default router;
