import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true }, // existing item ID or SKU
    type: { 
      type: String, 
      enum: ["receipt", "dispense", "adjustment"], 
      required: true 
    },
    quantity: { type: Number, required: true }, // + for receipt, - for dispense
    note: { type: String },
    user: { type: String }, // optional
  },
  { timestamps: true }
);

const ItemTransaction = mongoose.model("ItemTransaction", transactionSchema);
export default ItemTransaction;