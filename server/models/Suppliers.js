import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  number: { type: String, required: true, trim: true, unique: true },
  address: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const SupplierModel = mongoose.model("Supplier", supplierSchema);

export default SupplierModel;
