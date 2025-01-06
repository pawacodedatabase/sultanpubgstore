import React from "react";
import { useLocation } from "react-router-dom";

const Confirmation: React.FC = () => {
  const location = useLocation();
  const accountData = location.state?.accountData;

  if (!accountData) {
    return <div>No data found</div>;
  }

  const { accountName, accountId, accountLevel, accountFeatures, moreFeatures, price } = accountData;

  const whatsappMessage = encodeURIComponent(
    `I would like to buy the following PUBG account:\n
    Account Name: ${accountName}\n
    Account ID: ${accountId}\n
    Account Level: ${accountLevel}\n
    Features: ${accountFeatures.join(", ")}\n
    More Features: ${moreFeatures || "None"}\n
    Price: $${price}`
  );

  const whatsappLink = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen p-8 text-black">
      <h1 className="text-xl font-bold text-center mb-6 font-gaming">Confirmation</h1>

      <p className="text-center mb-4">Your account details have been submitted successfully!</p>
      <p className="text-center mb-6">Click the button below to message us on WhatsApp:</p>

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <button className="bg-[#25D366] hover:bg-[#128C7E] text-white py-2 px-6 rounded-lg">
          Message on WhatsApp
        </button>
      </a>
    </div>
  );
};

export default Confirmation;
