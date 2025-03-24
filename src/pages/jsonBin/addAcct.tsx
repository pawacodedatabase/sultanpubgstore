import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const AddGameAccountForm = () => {
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState<GameAccount[]>([]);
  const [formData, setFormData] = useState<GameAccount>({
    id: Date.now(),
    name: "",
    price: 0,
    accountFeatures: [],
    moreFeat: [],
    images: [],
    videoLink: "",
    status: true,
    mythicsCount: 0,
    carsCount: 0,
    gunSkinsCount: 0,
    accountLevel: "",
  });

  // Fetch existing accounts
  useEffect(() => {
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
    fetchAccounts();
  }, []);

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const uploadedImages: string[] = [];
  
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "sultan"); // Your Cloudinary upload preset
  
        try {
          const response = await fetch("https://api.cloudinary.com/v1_1/dx90y9zdx/image/upload", {
            method: "POST",
            body: formData,
          });
  
          if (!response.ok) throw new Error("Failed to upload image");
  
          const data = await response.json();
          
          if (data.secure_url) {
            uploadedImages.push(String(data.secure_url)); // Ensure the URL is a string
          } else {
            console.error("Upload failed: No URL returned", data);
          }
  
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
  
      if (uploadedImages.length > 0) {
        setFormData((prev) => ({ 
          ...prev, 
          images: [...prev.images, ...uploadedImages.map(String)] // Ensure all are strings
        }));
      }
    }
  };
  
  
  // Remove an image from the preview
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Handle feature inputs (comma-separated values)
  const handleFeatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>, key: keyof GameAccount) => {
    setFormData({ ...formData, [key]: e.target.value.split(",").map((feat) => feat.trim()) });
  };

  // Handle status toggle
  const toggleStatus = () => {
    setFormData((prev) => ({ ...prev, status: !prev.status }));
  };

  // Submit new account
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Ensure images are submitted as an array of strings
    const updatedFormData = {
      ...formData,
      images: formData.images.map(String), // Make sure all items are strings
    };
  
    const updatedAccounts = [...accounts, updatedFormData];
  
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
        },
        body: JSON.stringify(updatedAccounts),
      });
  
      if (response.ok) {
        setAccounts(updatedAccounts);
        setFormData({
          id: Date.now(),
          name: "",
          price: 0,
          accountFeatures: [],
          moreFeat: [],
          images: [], // Reset images array after successful submission
          videoLink: "",
          status: true,
          mythicsCount: 0,
          carsCount: 0,
          gunSkinsCount: 0,
          accountLevel: "",
        });
        alert("Game account added successfully!");
        navigate("/manage")
      }
    } catch (error) {
      console.error("Error updating JSONBin:", error);
    }
  };
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add  Account</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="name">Account Name</label>
        <input type="text" name="name" placeholder="Account Name" value={formData.name} onChange={handleChange} required className="border p-2 w-full" />
<br /> <br />
        <label htmlFor="">Price $</label>
        <input type="number" name="price" placeholder="$" value={formData.price} onChange={handleChange} className="border p-2 w-full" />

        <label htmlFor="">Account Features <p className="text-sm italic text-red-400">(seperate each feature with a comma)</p></label>
        <textarea name="accountFeatures" placeholder="Account Features (comma separated)" value={formData.accountFeatures.join(", ")} onChange={(e) => handleFeatureChange(e, "accountFeatures")} className="border p-2 w-full" />
        
        <label htmlFor="">More Features <p className="text-sm italic text-red-400">(seperate each feature with a comma)</p></label>
        
        <textarea name="moreFeat" placeholder="More Features (comma separated)" value={formData.moreFeat.join(", ")} onChange={(e) => handleFeatureChange(e, "moreFeat")} className="border p-2 w-full" />

        <input type="text" name="videoLink" placeholder="Video Link" value={formData.videoLink} onChange={handleChange} className="border p-2 w-full" />

<br /> <br />
<label htmlFor=""><span className="text-sm mt-4">Mythics Count (optional)</span></label>
        <input type="number" name="mythicsCount" placeholder="Mythics Count" value={formData.mythicsCount} onChange={handleChange} className="border p-2 w-full" />
        <br /> <br />
<label htmlFor=""><span className="text-sm mt-4">Car Count (optional)</span></label>

        <input type="number" name="carsCount" placeholder="Cars Count" value={formData.carsCount} onChange={handleChange} className="border p-2 w-full" />
    
        <br /> <br />
<label htmlFor=""><span className="text-sm mt-4">Gun Skin Count (optional)</span></label>

    <input type="number" name="gunSkinsCount" placeholder="Gun Skins Count" value={formData.gunSkinsCount} onChange={handleChange} className="border p-2 w-full" />
    <br /> <br />
<label htmlFor=""><span className="text-sm mt-4">Account Level</span></label>
<p className="text-[13px] px-3 text-red-500">i.e Ace , Conqueror , Master , Diamond...</p>
     
        <input type="text" name="accountLevel" placeholder="Account Level" value={formData.accountLevel} onChange={handleChange} className="border p-2 w-full" />

        {/* Image Upload */}
<br /><br />
        <label htmlFor="">Upload Images </label><p className="text-[13px] px-3 text-red-500">Upload one after the other and make sure the image previews before adding account</p>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="border p-2 w-full" />


        {/* Preview Uploaded Images */}
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.images.map((img, index) => (
            <div key={index} className="relative">
              <img src={img} alt={`Uploaded ${index}`} className="w-16 h-16 object-cover rounded" />
              <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">X</button>
            </div>
          ))}
        </div>

        {/* Status Toggle */}
        <div className="flex items-center">
          <label className="mr-2">Account Status:</label>
          <button type="button" onClick={toggleStatus} className={`px-4 py-2 rounded ${formData.status ? "bg-green-500" : "bg-red-500"} text-white`}>
            {formData.status ? "Available" : "Sold"}
          </button>
        </div>

        <button type="submit" className="bg-black hover:border-2 hover:border-black hover:text-black hover:bg-white text-white p-2 w-full">Add Account</button>
      </form>
    </div>
  );
};

export default AddGameAccountForm;
