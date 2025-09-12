import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5713/api/itemTransaction";

const ItemTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    itemId: "",
    type: "receipt",
    quantity: 0,
    note: "",
    user: "",
    price: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/transactions`);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load transactions");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let url = `${API_BASE}/${form.type}`;
      const res = await axios.post(url, form);
      setTransactions(prev => [res.data, ...prev]);
      setForm({ itemId: "", type: "receipt", quantity: 0, note: "", user: "", price: 0 });
    } catch (err) {
      console.error(err);
      setError("Failed to record transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Item Transactions</h1>

      {/* Transaction Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input
          name="itemId"
          value={form.itemId}
          onChange={handleChange}
          placeholder="Item ID / SKU"
          className="border p-2 rounded"
          required
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price per item"
          className="border p-2 rounded"
          required
        />
        <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
          <option value="receipt">Receipt</option>
          <option value="dispense">Dispense</option>
          <option value="adjustment">Adjustment</option>
        </select>
        <input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="border p-2 rounded"
          required
        />
        <input
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Note"
          className="border p-2 rounded"
        />
        <input
          name="user"
          value={form.user}
          onChange={handleChange}
          placeholder="User"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Saving..." : "Save Transaction"}
        </button>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Transaction Table */}
      <table className="min-w-full border mb-6">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">Item ID</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Qty</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, idx) => (
            <tr
              key={idx}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedTransaction(t)}
            >
              <td className="p-2">{t.itemId}</td>
              <td className="p-2">{t.type}</td>
              <td className="p-2">{t.quantity}</td>
              <td className="p-2">${t.price || 0}</td>
              <td className="p-2">{t.user}</td>
              <td className="p-2">{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Selected Transaction Receipt */}
      {selectedTransaction && (
        <div className="p-4 border rounded shadow bg-gray-50">
          <h2 className="text-xl font-bold mb-2">Transaction Receipt</h2>
          <p><strong>Item ID:</strong> {selectedTransaction.itemId}</p>
          <p><strong>Type:</strong> {selectedTransaction.type}</p>
          <p><strong>Quantity:</strong> {selectedTransaction.quantity}</p>
          <p><strong>Price per item:</strong> ${selectedTransaction.price || 0}</p>
          <p><strong>Total:</strong> ${(selectedTransaction.price || 0) * selectedTransaction.quantity}</p>
          <p><strong>User:</strong> {selectedTransaction.user}</p>
          <p><strong>Note:</strong> {selectedTransaction.note}</p>
          <p><strong>Date:</strong> {new Date(selectedTransaction.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default ItemTransaction;
