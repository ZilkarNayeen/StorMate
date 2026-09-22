import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createBusiness,
  getBusinesses,
  updateBusiness,
  deleteBusiness,
} from "../controllers/businessController.js";

const router = express.Router();

// Protect all routes
router.use(protect);
router.use(adminOnly);

router.post("/", createBusiness);
router.get("/", getBusinesses);
router.put("/:id", updateBusiness);
router.delete("/:id", deleteBusiness);

export default router;
