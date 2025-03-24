import { useState, useEffect } from "react";

interface GameAccount {
  id: number;
  name: string;
  price: number;
  accountFeatures: string[];
  moreFeat: string[];
  images: string[];
  videoLink: string;
  status: boolean;
  mythicsCount: number;
  carsCount: number;
  gunSkinsCount: number;
  accountLevel: string;
}

const API_URL = "https://api.jsonbin.io/v3/b/67e137188960c979a5776555";
const MASTER_KEY = "$2a$10$I5TlPdgmFXBQwFjy5lEu0uXHy5oknyPrVX96.BQm8f7LhZjW03X1y"; // Replace with your actual master key

const GameAccountManager = () => {
  const [accounts, setAccounts] = useState<GameAccount[]>([]);
  const [editingAccount, setEditingAccount] = useState<GameAccount | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch(`${API_URL}/latest`, {
        headers: { "X-Master-Key": MASTER_KEY },
      });
      const data = await response.json();
      setAccounts(data.record || []);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const updatedAccounts = accounts.filter((acc) => acc.id !== id);

    try {
      await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify(updatedAccounts),
      });

      setAccounts(updatedAccounts);
      alert("Account deleted successfully!");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleEditClick = (account: GameAccount) => {
    setEditingAccount({ ...account });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingAccount) return;
    const { name, value } = e.target;
    setEditingAccount({ ...editingAccount, [name]: value });
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof GameAccount) => {
    if (!editingAccount) return;
    const values = e.target.value.split(",").map((v) => v.trim());
    setEditingAccount({ ...editingAccount, [field]: values });
  };

  const handleStatusChange = () => {
    if (!editingAccount) return;
    setEditingAccount({ ...editingAccount, status: !editingAccount.status });
  };

  const handleSaveEdit = async () => {
    if (!editingAccount) return;

    const updatedAccounts = accounts.map((acc) =>
      acc.id === editingAccount.id ? editingAccount : acc
    );

    try {
      await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify(updatedAccounts),
      });

      setAccounts(updatedAccounts);
      setEditingAccount(null);
      alert("Account updated successfully!");
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Game Accounts List</h2>
      
      {editingAccount && (
        <div className="p-4 border mb-4">
          <h3 className="text-lg font-semibold">Edit Account</h3>
          
          <br /><br />
          <label htmlFor="">Account Name</label>
          <input type="text" name="name" value={editingAccount.name} onChange={handleEditChange} className="border p-2 w-full mt-2" />
         
         
          <br /><br />
          <label htmlFor="">Price</label>
           <input type="number" name="price" value={editingAccount.price} onChange={handleEditChange} className="border p-2 w-full mt-2" />
         
         
           <br /><br />
          <label htmlFor="">Video Link</label>
           <input type="text" name="videoLink" value={editingAccount.videoLink} onChange={handleEditChange} className="border p-2 w-full mt-2" />

           <br /><br />
          <label htmlFor="">Account Features</label>

          <input type="text" name="accountFeatures" value={editingAccount.accountFeatures.join(", ")} onChange={(e) => handleArrayChange(e, "accountFeatures")} className="border p-2 w-full mt-2" />
          
          
          <br /><br />
          <label htmlFor="">More Account Features</label>
          <input type="text" name="moreFeat" value={editingAccount.moreFeat.join(", ")} onChange={(e) => handleArrayChange(e, "moreFeat")} className="border p-2 w-full mt-2" />
          
          
          <br /><br />
          <label htmlFor="">Images </label>
          <input type="text" name="images" value={editingAccount.images.join(", ")} onChange={(e) => handleArrayChange(e, "images")} className="border p-2 w-full mt-2" />
          
          <br /><br />
          <label htmlFor="">Mythics</label>
          <input type="number" name="mythicsCount" value={editingAccount.mythicsCount} onChange={handleEditChange} className="border p-2 w-full mt-2" />
          
          <br /><br />
          <label htmlFor="">Cars</label>
          <input type="number" name="carsCount" value={editingAccount.carsCount} onChange={handleEditChange} className="border p-2 w-full mt-2" />
          
          <br /><br />
          <label htmlFor="">Gun Skin</label>
          <input type="number" name="gunSkinsCount" value={editingAccount.gunSkinsCount} onChange={handleEditChange} className="border p-2 w-full mt-2" />

          <label className="flex items-center mt-2">
            <input type="checkbox" checked={editingAccount.status} onChange={handleStatusChange} className="mr-2" />
             Account Status 
          </label>
        <p className="text-red-500 text-sm font-bold">  (check the box to identify it's available)</p>
          <button onClick={handleSaveEdit} className="bg-green-500 text-white px-4 py-2 mt-2">Save</button>
        </div>
      )}

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Features</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id} className="text-center">
              <td className="border px-4 py-2">{account.name}</td>
              <td className="border px-4 py-2">${account.price}</td>
              <td className="border px-4 py-2">{account.accountFeatures.join(", ")}</td>
              <td className="border px-4 py-2">
                {account.status ? "Active" : "Inactive"}
              </td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEditClick(account)} className="bg-blue-500 text-white px-3 py-1 mr-2">Edit</button>
                <button onClick={() => handleDelete(account.id)} className="bg-red-500 text-white px-3 py-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameAccountManager;
