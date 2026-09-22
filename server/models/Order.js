import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true },
    type: { type: String, enum: ["sales", "purchase"], required: true },
    customerSupplier: { type: String, required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    expectedDate: { type: Date },
    notes: { type: String },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  },
  { timestamps: true }
);

orderSchema.index({ orderNumber: 1, businessId: 1 }, { unique: true });

export default mongoose.model("Order", orderSchema);
