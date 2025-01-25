import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { accounts } from "./account";
import { FaHome, FaRegCopy, FaWhatsapp } from "react-icons/fa";
import WhySellToSultan from "../sell/sellAccordion";
// import logo from '../../images/banner_1.jpg'

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
  const [showPopup, setShowPopup] = useState(false);

  const account = accounts.find((acc) => acc.id === parseInt(id!));
  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl">
        Account not found
      </div>
    );
  }

  const paymentDetails: Record<string, string> = {
    USDT_Trc20: "TVAWBRZMoo9yz2dZH6bn9wT2rH5RCjAefk",
    Bitcoin: "1Pq76TMqjt23EpjvaBUcCE6aLRSk5WNvTn",
    "Bank Transfer":
      "Account Name: Daniel\nAccount Number: 8167548118\nBank: Opay",
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

  const handlePayNow = () => {
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

    setTimeout(() => {
      setIsLoading(false);
      setShowPopup(true);
      sendToTelegram();
    }, 4000); // Simulate loading for 2 seconds
  };


  


  const sendToTelegram = async () => {
    const message = `Hello, a payment has been made!\n\nName: ${userData.name}\nCountry: ${userData.country}\nWhatsApp: ${userData.whatsapp}\nAmount Paid: ${userData.amountPaid}\nPayment Method: ${selectedPayment}`;
  
    const telegramToken = "8084822978:AAEiJAl4Z5wg7BrAn9l1w12y1Vd8l7Y8G7w"; // Replace with your Telegram bot token
    const chatId = "1798696662"; // Replace with your chat ID (can be a group or individual chat)
  
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
    const params = new URLSearchParams({
      chat_id: chatId,
      text: message,
    });
  
    try {
      const response = await fetch(`${url}?${params.toString()}`, {
        method: "GET",
      });
  
      if (response.ok) {
        console.log("Message sent successfully");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
    }
  };


  const sendToWhatsApp = () => {
    const message = `Hello Sultan, I have made a payment.\n\nName: ${userData.name}\nCountry: ${userData.country}\nWhatsApp: ${userData.whatsapp}\nAmount Paid: ${userData.amountPaid}\nPayment Method: ${selectedPayment}`;
    const whatsappLink = `https://wa.me/+2348167548118?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  const goHome = () => {
    navigate("/");
  };

  return (

    <>
   
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6 bg-white rounded-lg shadow-lg">
        {/* Left Section: Account Info */}
        <div className="md:col-span-7 bg-gray-50 p-6 rounded-l-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            {account.name}
          </h2>
          <div className="flex flex-col items-center">
            <img
              src={account.images?.[0]}
              alt="Account Preview"
              className="rounded w-full h-full"
            />
            <p className="text-4xl font-semibold mt-4 text-red-500">
              ${account.price?.toFixed(2)}
            </p>
            <p className="text-sm font-thin mt-4 text-black">
              {account.accountFeatures}
            </p>
          </div>
        </div>

        {/* Right Section: Payment */}
        <div className="md:col-span-5 bg-white p-8 rounded-r-lg">
          <h2 className="text-xl font-semibold text-center mb-6">
            Mode of Payment
          </h2>
          <div className="space-y-4 ">
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-lg bg-[#000] text-white "
            />
            <input
              type="text"
              name="country"
              value={userData.country}
              onChange={handleInputChange}
              required
              placeholder="Your Country"
              className="w-full px-4 py-3 border rounded-lg bg-[#000] text-white"
            />
            <input
              type="text"
              name="whatsapp"
              value={userData.whatsapp}
              onChange={handleInputChange}
              required
              placeholder="WhatsApp Number"
              className="w-full px-4 py-3 border rounded-lg bg-[#000] text-white"
            />
            <input
              type="text"
              name="amountPaid"
              required
              value={userData.amountPaid}
              onChange={handleInputChange}
              placeholder="Amount Paid"
              className="w-full px-4 py-3 border rounded-lg bg-[#000] text-white"
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
                    ? "bg-black text-white"
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
                : "bg-red-600 hover:bg-red-700"
            }`}
            disabled={isLoading || !selectedPayment}
          >
            {isLoading ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </div>

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
          <div className="text-white text-xl">Processing...</div>
          <div className="loader border-t-4 border-b-4 border-red-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>
      )}

      {/* WhatsApp Popup */}
      {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div
      className="bg-cover bg-center rounded-lg w-full max-w-lg text-center p-8"
     
    >
      <h2 className="text-2xl font-semibold text-white mb-4">Confirming Payment</h2>
      <p className="text-xl text-gray-300 mb-6">
        Kindly send your payment details via WhatsApp to confirm.
      </p>

      <div className="flex  items-center  gap-3 justify-center">
        <button
          onClick={sendToWhatsApp}
          className="px-8 py-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition ease-in-out"
        >
          <FaWhatsapp/>
        </button>

        <button
          onClick={goHome}
          className="px-8 py-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition ease-in-out"
        >
          <FaHome/>
        </button>
      </div>
    </div>
  </div>
)}


    </div>
    <WhySellToSultan/>
     </>
  );
};

export default PaymentForm;
