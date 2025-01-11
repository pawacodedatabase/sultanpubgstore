import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  // const navigate = useNavigate();ngi

  // Handle case where no state is passed
  if (!location.state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl">
        No payment details found. Please try again.
      </div>
    );
  }

  const {
    name,
    country,
    whatsapp,
    amountPaid,
    paymentMethod,
    accountName,
    accountPrice,
    paymentDetails,
  } = location.state;

  return (
    <div>
      <h1>Payment Confirmation</h1>
      <p>Name: {name}</p>
      <p>Country: {country}</p>
      <p>WhatsApp: {whatsapp}</p>
      <p>Amount Paid: {amountPaid}</p>
      <p>Payment Method: {paymentMethod}</p>
      <p>Account Name: {accountName}</p>
      <p>Account Price: {accountPrice}</p>
      <p>Payment Details: {paymentDetails}</p>
    </div>
  );
};

export default ConfirmationPage;
