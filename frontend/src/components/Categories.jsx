import { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_BASE = "http://localhost:5713/api/categories";

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add a new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!category.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/add`, { name: category });
      setSuccess("Category added successfully.");
      setCategory("");
      setCategories((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding category:", err);
      setError("Failed to add category.");
    }
  };

  // Delete a category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      setSuccess("Category deleted.");
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Failed to delete category.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Categories</h2>

      <form onSubmit={handleSubmit} className="mb-8 max-w-md space-y-4">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Add Category
        </button>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </form>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b font-semibold text-gray-700">
          Category List
        </div>

        {loading ? (
          <div className="p-4 text-gray-500">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="p-4 text-gray-500">No categories found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {categories.map((cat, index) => (
                <tr key={cat._id}>
                  <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{cat.name}</td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-600 hover:text-red-800 font-medium transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Categories;
