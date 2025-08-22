import Product from "../models/Product.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, serialNo, supplier } = req.body;
    if (!name || !category || !price || !stock || !serialNo) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const existing = await Product.findOne({ serialNo });
    if (existing) return res.status(400).json({ success: false, message: "Product with this serial number exists." });

    const product = new Product({ name, category, price, stock, serialNo, supplier });
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, product: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Stock Receipt
export const addStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (!quantity || quantity <= 0) return res.status(400).json({ success: false, message: "Invalid quantity" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    product.stock += quantity;
    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Stock Dispense
export const removeStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (!quantity || quantity <= 0) return res.status(400).json({ success: false, message: "Invalid quantity" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (product.stock < quantity) return res.status(400).json({ success: false, message: "Not enough stock" });

    product.stock -= quantity;
    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
