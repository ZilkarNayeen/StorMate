import express from "express";
import { addSupplier, getSuppliers, updateSupplier, deleteSupplier } from "../controllers/supplierController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getSuppliers);
router.post("/add", addSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;
