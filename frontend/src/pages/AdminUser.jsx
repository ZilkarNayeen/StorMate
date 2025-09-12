import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

const API_BASE = "http://localhost:5713/api/users";

const AdminUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_BASE, { headers: { Authorization: `Bearer ${user.token}` } });
      setUsers(res.data);
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
    try {
      const res = await axios.post(API_BASE + "/create", form, { headers: { Authorization: `Bearer ${user.token}` } });
      setUsers(prev => [...prev, res.data.user]);
      setForm({ name: "", email: "", password: "", role: "customer" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded" required />
        <select name="role" value={form.role} onChange={handleChange} className="border p-2 rounded">
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? "Creating..." : "Create User"}</button>
        {error && <p className="text-red-600">{error}</p>}
      </form>

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
