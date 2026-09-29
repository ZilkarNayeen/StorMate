import SupplierModel from "../models/Suppliers.js";

// Add Supplier
const addSupplier = async (req, res) => {
  try {
    const { name, email, number, address } = req.body;

    if (!name || !email || !number || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const existingSupplier = await SupplierModel.findOne({
      $or: [{ email }, { number }],
      businessId: req.user.businessId,
    });

    if (existingSupplier) {
      return res
        .status(400)
        .json({ success: false, message: "Supplier with this email or number already exists." });
    }

    const newSupplier = new SupplierModel({ name, email, number, address, businessId: req.user.businessId });
    await newSupplier.save();

    return res
      .status(201)
      .json({ success: true, message: "Supplier added successfully!", supplier: newSupplier });
  } catch (error) {
    console.error("Error adding supplier:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Suppliers
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await SupplierModel.find({ businessId: req.user.businessId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, suppliers });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Supplier
const updateSupplier = async (req, res) => {
  try {
    const { name, email, number, address } = req.body;

    if (!name || !email || !number || !address) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

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
};

// Delete Supplier
const deleteSupplier = async (req, res) => {
  try {
    const deleted = await SupplierModel.findOneAndDelete({ _id: req.params.id, businessId: req.user.businessId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }
    return res.json({ success: true, message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addSupplier, getSuppliers, updateSupplier, deleteSupplier };
