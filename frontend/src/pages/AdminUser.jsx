import React, { useState, useEffect } from "react";
import api from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const AdminUsers = () => {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === "superadmin";

  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: isSuperAdmin ? "admin" : "staff", businessId: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
    if (isSuperAdmin) fetchBusinesses();
  }, [isSuperAdmin]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      if (res.data.success && Array.isArray(res.data.users)) {
        setUsers(res.data.users);
      } else if (Array.isArray(res.data)) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBusinesses = async () => {
    try {
      const res = await api.get("/businesses");
      setBusinesses(Array.isArray(res.data) ? res.data : res.data.businesses || []);
    } catch (err) {
      console.error(err);
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
    setSuccess("");

    try {
      const payload = isSuperAdmin
        ? { ...form, role: "admin", businessId: form.businessId }
        : { ...form, role: form.role || "staff" };

      const res = await api.post("/users/create", payload);
      setUsers(prev => [...prev, res.data.user]);
      setForm({ name: "", email: "", password: "", role: isSuperAdmin ? "admin" : "staff", businessId: "" });
      setSuccess(res.data.message || "User created successfully");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isSuperAdmin ? "Business Admin Management" : "Manage Users"}</h1>
      <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
        <h2 className="text-lg font-semibold mb-4">{isSuperAdmin ? "Create Business Admin" : "Create User"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isSuperAdmin && (
            <select name="businessId" value={form.businessId} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select business</option>
              {businesses.map((business) => (
                <option key={business._id} value={business._id}>{business.name}</option>
              ))}
            </select>
          )}

          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded" required />

          {!isSuperAdmin && (
            <select name="role" value={form.role} onChange={handleChange} className="border p-2 rounded">
              <option value="staff">Staff</option>
              <option value="customer">Customer</option>
            </select>
          )}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {loading ? "Creating..." : isSuperAdmin ? "Create Business Admin" : "Create User"}
          </button>
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </form>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
