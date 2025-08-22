import React, { useState, useEffect } from "react";
import axios from "axios";

const Suppliers = () => {
  const [addEditModal, setAddEditModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });

  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("pos-token");

  // Fetch suppliers
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5713/api/suppliers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setSuppliers(res.data.suppliers);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.number || !formData.address) {
      setError("Please fill in all supplier details.");
      setLoading(false);
      return;
    }

    try {
      let response;
      if (editMode) {
        // Edit supplier
        response = await axios.put(
          `http://localhost:5713/api/suppliers/${editId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Add supplier
        response = await axios.post(
          "http://localhost:5713/api/suppliers/add",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.data.success) {
        setSuccessMessage(editMode ? "Supplier updated!" : "Supplier added!");
        setFormData({ name: "", email: "", number: "", address: "" });
        setAddEditModal(false);
        setEditMode(false);
        fetchSuppliers(); // refresh list
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error submitting supplier:", err);
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (supplier) => {
    setFormData({
      name: supplier.name,
      email: supplier.email,
      number: supplier.number,
      address: supplier.address,
    });
    setEditMode(true);
    setEditId(supplier._id);
    setAddEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      const res = await axios.delete(`http://localhost:5713/api/suppliers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        fetchSuppliers();
      } else {
        alert(res.data.message || "Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting supplier:", err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Supplier Management</h1>

      <div className="flex justify-between items-center">
        <input type="text" placeholder="Search" className="border p-1 bg-white rounded px-4" />
        <button
          className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer"
          onClick={() => { setAddEditModal(true); setEditMode(false); }}
        >
          Add Supplier
        </button>
      </div>

      {/* Supplier Table */}
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Number</th>
            <th className="border px-2 py-1">Address</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((sup) => (
            <tr key={sup._id}>
              <td className="border px-2 py-1">{sup.name}</td>
              <td className="border px-2 py-1">{sup.email}</td>
              <td className="border px-2 py-1">{sup.number}</td>
              <td className="border px-2 py-1">{sup.address}</td>
              <td className="border px-2 py-1 flex gap-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded"
                  onClick={() => handleEdit(sup)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(sup._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {addEditModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
            <button
              onClick={() => setAddEditModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h1 className="text-xl font-bold">{editMode ? "Edit Supplier" : "Add Supplier"}</h1>

            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Supplier Name" className="border p-1 rounded px-4" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Supplier Email" className="border p-1 rounded px-4" />
              <input type="text" name="number" value={formData.number} onChange={handleChange} placeholder="Supplier Number" className="border p-1 rounded px-4" />
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Supplier Address" className="border p-1 rounded px-4" />
              <button type="submit" disabled={loading} className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer">
                {loading ? "Saving..." : editMode ? "Update Supplier" : "Add Supplier"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
