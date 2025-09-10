import express from "express";
import ItemTransaction from "../models/ItemTransaction.js";

const router = express.Router();

// GET all transactions
router.get("/transactions", async (req, res) => {
    try {
        const transactions = await ItemTransaction.find().sort({ createdAt: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// STOCK RECEIPT – record incoming stock
router.post("/receipt", async (req, res) => {
    try {
        const { itemId, quantity, note, user } = req.body;
        const transaction = await ItemTransaction.create({
            itemId,
            type: "receipt",
            quantity,
            note,
            user
        });
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: "Failed to record receipt" });
    }
});

// DISPENSE – record outgoing stock
router.post("/dispense", async (req, res) => {
    try {
        const { itemId, quantity, note, user } = req.body;
        const transaction = await ItemTransaction.create({
            itemId,
            type: "dispense",
            quantity,
            note,
            user
        });
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: "Failed to record dispense" });
    }
});

// ADJUSTMENT – manual stock correction
router.post("/adjustment", async (req, res) => {
    try {
        const { itemId, quantity, note, user } = req.body;
        const transaction = await ItemTransaction.create({
            itemId,
            type: "adjustment",
            quantity,
            note,
            user
        });
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: "Failed to record adjustment" });
    }
});

export default router;