import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  price: { 
    type: Number, 
    required: true, 
    min: [0, "Price cannot be negative"] 
  },
  stock: { 
    type: Number, 
    required: true, 
    default: 0,
    min: [0, "Stock cannot be negative"] 
  },
  serialNo: { type: String, required: true, trim: true },
  supplier: { type: String },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  createdAt: { type: Date, default: Date.now },
});

productSchema.index({ serialNo: 1, businessId: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
