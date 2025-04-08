import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const binId = "67f4ece28561e97a50fae858";
const apiKey = "$2a$10$M/z2e.cKX1SUsOT62D4pk.gbhiuJhRx0u3VzNAe.DsTPIHHAQE6Zu";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<any>({});

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) navigate("/login");
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: {
          "X-Master-Key": apiKey,
        },
      });
      const data = await response.json();
      console.log("Fetched data:", data); // Check the response here
      setUsers(data.record.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  

  const updateUsersInBin = async (updatedUsers: any[]) => {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
        body: JSON.stringify({ users: updatedUsers }),
      });
      const data = await response.json();
      console.log("Updated bin:", data);
    } catch (error) {
      console.error("Error updating users:", error);
    }
  };

  const handleDelete = async (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    await updateUsersInBin(updatedUsers);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedUser(users[index]);
  };

  const handleSave = async () => {
    const updatedUsers = [...users];
    updatedUsers[editingIndex!] = editedUser;
    setUsers(updatedUsers);
    setEditingIndex(null);
    await updateUsersInBin(updatedUsers);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Panel</h2>
        <button
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/add")}
        >
          Add Account
        </button>
        <button
          className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
          onClick={() => navigate("/manage")}
        >
          Manage Accounts
        </button>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-10 px-4">
  <div className="overflow-x-auto rounded-lg shadow-lg">
    <table className="min-w-full bg-white text-sm text-left text-black">
      <thead className="bg-gray-100 text-gray-800 uppercase tracking-wider">
        <tr>
          <th className="px-6 py-3">Username</th>
          <th className="px-6 py-3">User Id</th>
          <th className="px-6 py-3">Email</th>
          <th className="px-6 py-3">Phone</th>
          <th className="px-6 py-3">Password</th>
          <th className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {users.map((user, index) => (
          <tr key={index} className="hover:bg-gray-50">
            {editingIndex === index ? (
              <>
                <td className="px-6 py-4">
                  <input
                    name="username"
                    value={editedUser.username}
                    onChange={handleChange}
                    className="border border-gray-300 px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    name="id"
                    readOnly
                    value={editedUser.id}
                    onChange={handleChange}
                    className="border border-gray-300 px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                    className="border border-gray-300 px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    name="phoneNumber"
                    value={editedUser.phoneNumber}
                    onChange={handleChange}
                    className="border border-gray-300 px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    name="password"
                    value={editedUser.password}
                    onChange={handleChange}
                    className="border border-gray-300 px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="px-6 py-4 flex gap-2 justify-center">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </td>
              </>
            ) : (
              <>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phoneNumber}</td>
                <td className="px-6 py-4">{user.password}</td>
                <td className="px-6 py-4 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default AdminPanel;
