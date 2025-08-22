import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ["sales", "purchase"], required: true },
    customerSupplier: { type: String, required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    expectedDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
