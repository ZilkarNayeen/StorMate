import express from "express";
import { addProduct, getProducts, updateProduct, deleteProduct, addStock, removeStock } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/add", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Stock routes
router.put("/add-stock/:id", addStock);
router.put("/remove-stock/:id", removeStock);

export default router;
