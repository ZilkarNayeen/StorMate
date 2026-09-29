import Business from "../models/Business.js";
import asyncHandler from "express-async-handler";

// @desc    Create a new business
// @route   POST /api/businesses
// @access  Admin only (business admin)
export const createBusiness = asyncHandler(async (req, res) => {
  const { name, email, slug } = req.body;
  if (!name || !email || !slug) {
    return res.status(400).json({ message: "Name, email, and slug are required" });
  }
  const existing = await Business.findOne({ $or: [{ email }, { slug }] });
  if (existing) {
    return res.status(400).json({ message: "Business with this email or slug already exists" });
  }
  const business = new Business({ name, email, slug });
  await business.save();
  res.status(201).json({ success: true, business });
});

// @desc    Get all businesses for admin's company (admin can see all)
// @route   GET /api/businesses
// @access  Admin only
export const getBusinesses = asyncHandler(async (req, res) => {
  // Admin can view all businesses; adjust filter if needed per role
  const businesses = await Business.find();
  res.status(200).json(businesses);
});

// @desc    Update a business
// @route   PUT /api/businesses/:id
// @access  Admin only
export const updateBusiness = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const business = await Business.findByIdAndUpdate(id, updates, { new: true });
  if (!business) {
    return res.status(404).json({ message: "Business not found" });
  }
  res.status(200).json({ success: true, business });
});

// @desc    Delete a business
// @route   DELETE /api/businesses/:id
// @access  Admin only
export const deleteBusiness = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const business = await Business.findByIdAndDelete(id);
  if (!business) {
    return res.status(404).json({ message: "Business not found" });
  }
  res.status(200).json({ success: true, message: "Business deleted" });
});
