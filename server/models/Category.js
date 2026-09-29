import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  }
});

categorySchema.index({ name: 1, businessId: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
