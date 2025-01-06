import React, { useState } from "react";

const AccordionItem: React.FC<{
  title: string;
  content: string;
}> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b">
      <div
        className="flex justify-between items-center py-4 cursor-pointer bg-[#11120d] text-white hover:bg-[#222] px-6"
        onClick={toggleAccordion}
      >
        <h3 className="font-semibold">{title}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && (
        <div className="px-6 py-4 bg-[#11120d] text-white">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

const WhySellToSultan: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Why Sell Your PUBG Account to Sultan, the #1 PUBG Account Dealer in Nigeria?
      </h2>

      <div className="accordion">
        <AccordionItem
          title="Trustworthy and Reliable"
          content="Sultan is known for his professionalism and trustworthiness. As the #1 PUBG account dealer in Nigeria, he has built a reputation for offering the best prices and ensuring smooth transactions."
        />
        <AccordionItem
          title="Fast and Secure Transactions"
          content="With Sultan, you can rest assured that your transaction will be fast, secure, and hassle-free. He ensures that every account sale is handled with utmost care and efficiency."
        />
        <AccordionItem
          title="Best Prices in the Market"
          content="As the top PUBG account dealer in Nigeria, Sultan offers the best rates for your PUBG accounts. No one else can match his competitive prices and fair deals."
        />
        <AccordionItem
          title="24/7 Customer Support"
          content="Sultan offers around-the-clock customer support, ensuring that you get assistance whenever you need it. Whether you're selling or have any questions, he's always there to help."
        />
        <AccordionItem
          title="Quick Payment"
          content="When you sell your account to Sultan, you won’t have to wait long to get paid. His fast payment processing ensures that you receive your payment as soon as the transaction is completed."
        />
        <AccordionItem
          title="Safe and Confidential"
          content="Sultan takes your privacy seriously. He guarantees that all transactions are done safely, and your personal information is kept confidential."
        />
      </div>
    </div>
  );
};

export default WhySellToSultan;
