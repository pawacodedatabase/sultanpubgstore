import React, { useState } from "react";
import { FaPlus,FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Correct hook for navigation in v6
import WhySellToSultan from "./sellAccordion";

const SellYourAccount: React.FC = () => {
  const [accountName, setAccountName] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountLevel, setAccountLevel] = useState("");
  const [accountFeatures, setAccountFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState(""); // For the new feature input
  const [moreFeatures, setMoreFeatures] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Use this for navigation

  const handleAddFeature = () => {
    if (newFeature && !accountFeatures.includes(newFeature)) {
      setAccountFeatures([...accountFeatures, newFeature]);
      setNewFeature(""); // Clear input after adding
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setAccountFeatures(accountFeatures.filter((item) => item !== feature));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const accountData = {
      accountName,
      accountId,
      accountLevel,
      accountFeatures,
      moreFeatures,
      price,
    };

    const telegramMessage = `
      New PUBG Account for Sale:
      - Account Name: ${accountName}
      - Account ID: ${accountId}
      - Account Level: ${accountLevel}
      - Features: ${accountFeatures.join(", ")}
      - More Features: ${moreFeatures || "None"}
      - Price: $${price}
    `;

    // Replace with your Telegram Bot Token and Chat ID
    const botToken = "8084822978:AAEiJAl4Z5wg7BrAn9l1w12y1Vd8l7Y8G7w"; // Replace with your bot's token
    const chatId = "1798696662"; // Replace with your chat ID

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
      }),
    });

    if (response.ok) {
      setSuccessMessage("Your account has been submitted successfully!");
      setTimeout(() => {
        // Redirect after 5 seconds
        navigate("/confirmation", { state: { accountData } });
      }, 5000);
    } else {
      setSuccessMessage("Something went wrong, please try again later.");
      setLoading(false);
    }
  };

  return (
    <>
    
    <div className="min-h-screen p-8 text-black">
      <h1 className="text-xl font-bold text-center mb-6 font-gaming">Sell Your PUBG Account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Account Name</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="p-3 w-full bg-[#11120d] text-white rounded-lg"
            placeholder="Enter your account name"
            required
          />
        </div>

        <div>
          <label className="block">Account ID</label>
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="p-3 w-full bg-[#11120d] text-white rounded-lg"
            placeholder="Enter your account ID"
            required
          />
        </div>

        <div>
          <label className="block">Account Level</label>
          <input
            type="text"
            value={accountLevel}
            onChange={(e) => setAccountLevel(e.target.value)}
            className="p-3 w-full bg-[#11120d] text-white rounded-lg"
            placeholder="Enter your account level"
            required
          />
        </div>

        <div>
          <label className="block">Account Features</label>
          
          <div className="flex gap-4">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              className="p-3 w-full bg-[#11120d] text-white rounded-lg"
              placeholder="i.e Mummy Set , Glacier...."
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="bg-[#ff5252] hover:bg-[#d64040] text-white py-1 px-3 "
            >
              <FaPlus/>
            </button>
          </div>
          <div className="mt-2">
            <ul>
              {accountFeatures.map((feature, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(feature)}
                    className="text-red-500"
                  >
                    <FaTrash/>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <label className="block">More Features (Optional)</label>
          <textarea
            value={moreFeatures}
            onChange={(e) => setMoreFeatures(e.target.value)}
            className="p-3 w-full bg-[#11120d] text-white rounded-lg"
            placeholder="Enter more features if any"
          />
        </div>

        <div>
          <label className="block">Price (USD)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 w-full bg-[#11120d] text-white rounded-lg"
            placeholder="Enter your asking price"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#ff5252] hover:bg-[#d64040] text-white py-2 px-6 rounded-lg"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {successMessage && <p className="mt-4 text-center text-lg">{successMessage}</p>}
    </div>
    <WhySellToSultan/>
    </>
  );
};

export default SellYourAccount;
