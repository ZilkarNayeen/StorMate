// src/components/ItemList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5713/api/itemTransaction";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/items`);
      setItems(res.data || []);
    } catch (err) {
      console.error("Fetch items error:", err.response?.data || err);
      setError(err.response?.data?.error || "Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Current Stock</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div className="mb-4">Loading items...</div>}

      <table className="min-w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">SKU</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Stock</th>
            <th className="p-2 text-left">Updated</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="p-2">{item.sku}</td>
              <td className="p-2">{item.name || "-"}</td>
              <td className="p-2">{item.stock}</td>
              <td className="p-2">
                {item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
