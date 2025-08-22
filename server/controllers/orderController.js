import Order from "../models/Order.js";

// GET all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new order
export const createOrder = async (req, res) => {
  try {
    const { type, customerSupplier, items, expectedDate, notes } = req.body;

    if (!type || !customerSupplier || !items || items.length === 0) {
      return res.status(400).json({ message: "All fields are required and at least one item must be added." });
    }

    const mappedItems = items.map(item => ({
      product: item.product,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));

    const totalAmount = mappedItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    // Generate unique orderNumber
    let lastOrder = await Order.findOne().sort({ createdAt: -1 });
    let lastNumber = 0;
    if (lastOrder && lastOrder.orderNumber) {
      const match = lastOrder.orderNumber.match(/\d+$/);
      lastNumber = match ? parseInt(match[0]) : 0;
    }
    const orderNumber = `ORD-${lastNumber + 1}`;

    const order = new Order({
      type,
      customerSupplier,
      items: mappedItems,
      totalAmount,
      orderNumber,
      expectedDate,
      notes,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
