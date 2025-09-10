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
    user: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let url = `${API_BASE}/${form.type}`;
      const res = await axios.post(url, { ...form, quantity: Number(form.quantity) });
      setTransactions(prev => [res.data, ...prev]);
      setForm({ itemId: "", type: "receipt", quantity: 0, note: "", user: "" });
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input
          name="itemId"
          value={form.itemId}
          onChange={handleChange}
          placeholder="Item ID / SKU"
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

      <table className="min-w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Item ID</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">Note</th>
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2">{t.itemId}</td>
              <td className="p-2">{t.type}</td>
              <td className="p-2">{t.quantity}</td>
              <td className="p-2">{t.note}</td>
              <td className="p-2">{t.user}</td>
              <td className="p-2">{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTransaction;