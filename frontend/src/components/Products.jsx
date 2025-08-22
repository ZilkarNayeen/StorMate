import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    serialNo: "",
    supplier: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Stock Modal
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [stockProduct, setStockProduct] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [stockType, setStockType] = useState("add"); // add or remove

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5713/api/products");
      if (res.data.success && Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (product = null) => {
    if (product) {
      setEditProduct(product);
      setFormData({
        name: product.name,
        category: product.category || "",
        price: product.price,
        stock: product.stock,
        serialNo: product.serialNo || "",
        supplier: product.supplier || "",
      });
    } else {
      setEditProduct(null);
      setFormData({ name: "", category: "", price: "", stock: "", serialNo: "", supplier: "" });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("pos-token");
    if (!token) {
      setError("You must be logged in");
      setLoading(false);
      return;
    }

    try {
      if (editProduct) {
        await axios.put(
          `http://localhost:5713/api/products/${editProduct._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:5713/api/products/add", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      fetchProducts();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("pos-token");
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5713/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError("Failed to delete product");
    }
  };

  // Stock Receipt / Dispense
  const handleStock = (product, type) => {
    setStockProduct(product);
    setStockType(type);
    setStockQuantity(0);
    setStockModalOpen(true);
  };

  const submitStockChange = async () => {
    if (!stockProduct || stockQuantity <= 0) return;
    const token = localStorage.getItem("pos-token");
    try {
      const url =
        stockType === "add"
          ? `http://localhost:5713/api/products/add-stock/${stockProduct._id}`
          : `http://localhost:5713/api/products/remove-stock/${stockProduct._id}`;
      await axios.put(url, { quantity: stockQuantity }, { headers: { Authorization: `Bearer ${token}` } });
      fetchProducts();
      setStockModalOpen(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating stock");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Product
      </button>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Low stock alert */}
      {products.some((p) => p.stock < 10) && (
        <div className="mb-2 p-2 bg-red-100 text-red-700 rounded">
          ⚠️ Low stock for: {products.filter((p) => p.stock < 10).map((p) => p.name).join(", ")}
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Stock</th>
            <th className="border px-2 py-1">Serial No</th>
            <th className="border px-2 py-1">Supplier</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-100">
                <td className="border px-2 py-1">{p.name}</td>
                <td className="border px-2 py-1">{p.category || "N/A"}</td>
                <td className="border px-2 py-1">৳{p.price}</td>
                <td className={`border px-2 py-1 ${p.stock < 10 ? "text-red-600 font-bold" : ""}`}>
                  {p.stock} {p.stock < 10 && <span className="ml-1 text-red-600">⚠️</span>}
                </td>
                <td className="border px-2 py-1">{p.serialNo || "N/A"}</td>
                <td className="border px-2 py-1">{p.supplier || "N/A"}</td>
                <td className="border px-2 py-1 flex gap-2">
                  <button onClick={() => openModal(p)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                  <button onClick={() => handleStock(p, "add")} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                    + Stock
                  </button>
                  <button onClick={() => handleStock(p, "remove")} className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600">
                    - Stock
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center p-2">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-1/3 relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl">&times;</button>
            <h2 className="text-xl font-bold mb-2">{editProduct ? "Edit Product" : "Add Product"}</h2>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="border p-1 rounded px-2" required />
              <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="border p-1 rounded px-2" required />
              <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-1 rounded px-2" required />
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock Available" className="border p-1 rounded px-2" required />
              <input type="text" name="serialNo" value={formData.serialNo} onChange={handleChange} placeholder="Serial Number" className="border p-1 rounded px-2" />
              <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} placeholder="Supplier Name" className="border p-1 rounded px-2" />
              <button type="submit" disabled={loading} className="mt-2 px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                {loading ? "Saving..." : editProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Stock Modal */}
      {stockModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-1/4 relative">
            <button onClick={() => setStockModalOpen(false)} className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl">&times;</button>
            <h2 className="text-xl font-bold mb-2">{stockType === "add" ? "Add Stock" : "Remove Stock"}</h2>
            <input type="number" value={stockQuantity} onChange={e => setStockQuantity(Number(e.target.value))} placeholder="Quantity" className="border p-1 rounded w-full mb-2" />
            <button onClick={submitStockChange} className="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
