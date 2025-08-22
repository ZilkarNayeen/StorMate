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
    });

    if (existingSupplier) {
      return res
        .status(400)
        .json({ success: false, message: "Supplier already exists." });
    }

    const newSupplier = new SupplierModel({ name, email, number, address });
    await newSupplier.save();

    return res
      .status(201)
      .json({ success: true, message: "Supplier added successfully!" });
  } catch (error) {
    console.error("Error adding supplier:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Suppliers
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await SupplierModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, suppliers });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Supplier
const deleteSupplier = async (req, res) => {
  try {
    const deleted = await SupplierModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }
    return res.json({ success: true, message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addSupplier, getSuppliers, deleteSupplier };
