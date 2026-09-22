import Order from "../models/Order.js";
import Product from "../models/Product.js";
import ItemTransaction from "../models/ItemTransaction.js";

// GET all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ businessId: req.user.businessId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE new order with inventory sync & transaction logging
export const createOrder = async (req, res) => {
  try {
    const { type, customerSupplier, items, expectedDate, notes } = req.body;

    if (!type || !customerSupplier || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "All fields are required and at least one item must be added." });
    }

    const mappedItems = items.map(item => ({
      product: item.product,
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice),
    }));

    const totalAmount = mappedItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    // Generate unique orderNumber per business
    const count = await Order.countDocuments({ businessId: req.user.businessId });
    const orderNumber = `ORD-${Date.now().toString().slice(-4)}-${count + 1}`;

    const order = new Order({
      type,
      customerSupplier,
      items: mappedItems,
      totalAmount,
      orderNumber,
      expectedDate,
      notes,
      businessId: req.user.businessId,
    });

    await order.save();

    // Sync inventory stock and write audit transaction logs
    for (const lineItem of mappedItems) {
      const product = await Product.findOne({ name: lineItem.product, businessId: req.user.businessId });
      
      if (product) {
        if (type === "sales") {
          product.stock = Math.max(0, product.stock - lineItem.quantity);
        } else if (type === "purchase") {
          product.stock += lineItem.quantity;
        }
        await product.save();

        // Write transaction log
        await ItemTransaction.create({
          itemId: product._id.toString(),
          type: type === "purchase" ? "receipt" : "dispense",
          quantity: lineItem.quantity,
          price: lineItem.unitPrice,
          note: `Order ${orderNumber} (${type})`,
          user: req.user.email,
          businessId: req.user.businessId,
        });
      }
    }

    return res.status(201).json({ success: true, message: "Order created successfully", order });
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate({ _id: req.params.id, businessId: req.user.businessId }, req.body, { new: true });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    return res.status(200).json({ success: true, order });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id, businessId: req.user.businessId });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    return res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
