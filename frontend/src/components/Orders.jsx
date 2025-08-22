import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customerSupplier: "",
    type: "purchase",
    items: [],
    expectedDate: "",
    notes: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5713/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    setNewOrder(prev => ({
      ...prev,
      items: [...prev.items, { product: "", quantity: 1, unitPrice: 0 }],
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...newOrder.items];
    updatedItems[index][field] = value;
    setNewOrder(prev => ({ ...prev, items: updatedItems }));
  };

  const saveOrder = async () => {
    try {
      await axios.post("http://localhost:5713/api/orders", newOrder);
      fetchOrders();
      setShowModal(false);
      setNewOrder({
        customerSupplier: "",
        type: "purchase",
        items: [],
        expectedDate: "",
        notes: "",
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5713/api/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders Dashboard</h1>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Create Order
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">Order ID</th>
            <th className="border px-2 py-1">Order Number</th>
            <th className="border px-2 py-1">Customer/Supplier</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Total</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="border px-2 py-1">{order._id}</td>
              <td className="border px-2 py-1">{order.orderNumber}</td>
              <td className="border px-2 py-1">{order.customerSupplier}</td>
              <td className="border px-2 py-1">{order.type}</td>
              <td className="border px-2 py-1">৳{order.totalAmount}</td>
              <td className="border px-2 py-1 space-x-2">
                <button className="bg-yellow-500 px-2 py-1 text-white rounded">Edit</button>
                <button onClick={() => deleteOrder(order._id)} className="bg-red-500 px-2 py-1 text-white rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold mb-4">Create New Order</h2>

            <input
              type="text"
              name="customerSupplier"
              placeholder="Customer or Supplier Name"
              value={newOrder.customerSupplier}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />

            <select name="type" value={newOrder.type} onChange={handleChange} className="w-full border p-2 mb-2">
              <option value="purchase">Purchase</option>
              <option value="sales">Sales</option>
            </select>

            <div className="mb-2">
              <h3 className="font-bold mb-2">Items</h3>
              {newOrder.items.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input type="text" placeholder="Product" value={item.product} onChange={e => handleItemChange(index, 'product', e.target.value)} className="border p-2 flex-1" />
                  <input type="number" placeholder="Qty" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', Number(e.target.value))} className="border p-2 w-20" />
                  <input type="number" placeholder="Price" value={item.unitPrice} onChange={e => handleItemChange(index, 'unitPrice', Number(e.target.value))} className="border p-2 w-24" />
                </div>
              ))}
              <button onClick={addItem} className="bg-green-600 text-white px-2 py-1 rounded">+ Add Item</button>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={saveOrder} className="bg-blue-600 text-white px-4 py-2 rounded">Save Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
