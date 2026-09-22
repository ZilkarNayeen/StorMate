import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  number: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  createdAt: { type: Date, default: Date.now },
});

supplierSchema.index({ email: 1, businessId: 1 }, { unique: true });
supplierSchema.index({ number: 1, businessId: 1 }, { unique: true });

const SupplierModel = mongoose.model("Supplier", supplierSchema);

export default SupplierModel;
