import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How to buy PUBG Mobile Accounts?",
    answer: "You can purchase PUBG Mobile accounts from our website by selecting an account and then making your payment ",
  },
  {
    question: "How will I receive the account details?",
    answer: "Once the payment is completed, account details will be sent to your registered email address  within a few minutes.",
  },
  {
    question: "What should I do if I encounter any issues with my account?",
    answer: "If you face any issues, please contact our support team via the help section, and we will resolve your issue promptly.",
  },
  {
    question: "How long does it take to receive my PUBG Mobile account?",
    answer: "It usually takes 5-10 minutes to deliver your account details after payment confirmation. In rare cases, it might take up to an hour.",
  },
  {
    question: "What should I do after receiving my PUBG Mobile account?",
    answer: "After receiving your account, log in immediately to verify the details and change the password for security purposes.",
  },
];

const Accordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center mt-8">
      <div className="max-w-3xl w-full px-6">
        <h2 className="text-xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gray-400">
          FAQs About Sultan Pubg Store
        </h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105"
          >
            <button
              className="w-full flex justify-between items-center p-6 focus:outline-none text-left transition-colors hover:bg-gray-700"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              <span className="ml-2 text-xl text-purple-400">
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                openIndex === index ? "max-h-40" : "max-h-0"
              }`}
            >
              <div className="p-6 bg-gray-900 border-t border-gray-700 text-gray-300">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
