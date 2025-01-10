import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { accounts } from "./account";
import { FaRegCopy } from "react-icons/fa";

const PaymentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    name: "",
    country: "",
    whatsapp: "",
    amountPaid: "",
  });
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const account = accounts.find((acc) => acc.id === parseInt(id!));
  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl">
        Account not found
      </div>
    );
  }

  const paymentDetails: Record<string, string> = {
    USDT: "TRC20: TAbc123456789Example",
    Bitcoin: "1BitcoinExampleAddress",
    "Bank Transfer":
      "Account Name: Example Bank\nAccount Number: 123456789\nBank: Example Bank",
  };

  const handlePaymentSelection = (paymentType: string) => {
    setSelectedPayment(paymentType);
    setCopied(false);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayNow = async () => {
    if (
      !selectedPayment ||
      !userData.name ||
      !userData.whatsapp ||
      !userData.amountPaid
    ) {
      alert("Please fill in all fields and select a payment method.");
      return;
    }

    setIsLoading(true);

    const message = `Name: ${userData.name}\nCountry: ${userData.country}\nWhatsApp: ${userData.whatsapp}\nAmount Paid: ${userData.amountPaid}\nPayment Method: ${selectedPayment}\nAccount Details: ${paymentDetails[selectedPayment]}`;

    try {
      // Replace `TELEGRAM_BOT_TOKEN` and `CHAT_ID` with your details
      await fetch(
        `https://api.telegram.org/bot8119231817:AAGAmxzBGY0vBPeVFM2hEEBbXkoAUGxm_HE
/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: "6837437455",
            text: message,
          }),
        }
      );

      // Redirect to WhatsApp with pre-filled message
      const whatsappMessage = encodeURIComponent(
        `Hello, I made a payment:\n\n${message}`
      );
      navigate(`https://wa.me/+2348053208997?text=${whatsappMessage}`);
    } catch (error) {
      console.error("Error sending message:", error);
      // alert("Failed to process payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6 bg-white rounded-lg shadow-lg">
        {/* Left Section: Cart */}
        <div className=" bg-gray-50 p-6 rounded-l-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            {account.name}
          </h2>

          <h2>
            
          </h2>
          <div className="space-y-4">
            {/* <div className="flex items-start justify-between border-b pb-4"> */}
              <div>
                
                <div className="m-auto flex justify-center item-center">
                  <img
                    src={account.images?.[0]}
                    alt="Account Preview"
                    className="rounded"
                  />
                
              </div>
             
            <div>
            <p className="text-4xl font-semibold text-center mt-4 text-red-500">
                ${account.price?.toFixed(2)}
              </p>
            </div>
            </div>
          </div>
        </div>

        {/* Right Section: Payment */}
        <div className="md:col-span-5 bg-white p-8 rounded-r-lg">
          <h2 className="text-xl font-gaming text-center mb-6">
            Mode Of Payment
          </h2>

          {/* User Info */}
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-lg bg-[#000]  "
            />
            <input
              type="text"
              name="country"
              value={userData.country}
              onChange={handleInputChange}
              placeholder="Your Country"
              required
              className="w-full px-4 py-3 border rounded-lg bg-[#000]  "
            />
            <input
              type="text"
              name="whatsapp"
              value={userData.whatsapp}
              onChange={handleInputChange}
              placeholder="WhatsApp Number"
              required
              className="w-full px-4 py-3 border rounded-lg bg-[#000]  "
            />
            <input
              type="text"
              name="amountPaid"
              value={userData.amountPaid}
              onChange={handleInputChange}
              placeholder="Amount Paid"
              required
              className="w-full px-4 py-3 border rounded-lg bg-[#000]  "
            />
          </div>

          {/* Payment Options */}
          <div className="space-y-4 mt-6">
            {Object.keys(paymentDetails).map((paymentType) => (
              <button
                key={paymentType}
                onClick={() => handlePaymentSelection(paymentType)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  selectedPayment === paymentType
                    ? "hover:bg-black  border-black text-black hover:text-white"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {paymentType}
              </button>
            ))}
          </div>

          {/* Payment Details */}
          {selectedPayment && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">
                {selectedPayment} Details
              </h3>
              <textarea
                readOnly
                value={paymentDetails[selectedPayment]}
                rows={selectedPayment === "Bank Transfer" ? 4 : 1}
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 resize-none"
              />
              {selectedPayment !== "Bank Transfer" && (
                <button
                  onClick={() =>
                    handleCopyToClipboard(paymentDetails[selectedPayment])
                  }
                  className="text-gray-500 hover:text-gray-700 mt-2"
                >
                  <FaRegCopy />
                  {copied && <span> Copied!</span>}
                </button>
              )}
            </div>
          )}

          {/* Pay Now Button */}
          <button
            onClick={handlePayNow}
            className={`w-full mt-6 px-6 py-3 rounded-lg font-medium text-white ${
              isLoading
                ? "bg-red-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-black"
            }`}
            disabled={isLoading || !selectedPayment}
          >
            {isLoading ? "Processing..." : "Paid"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
