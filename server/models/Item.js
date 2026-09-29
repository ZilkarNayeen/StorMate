import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, default: 0 },
});

export default mongoose.model("Item", itemSchema);