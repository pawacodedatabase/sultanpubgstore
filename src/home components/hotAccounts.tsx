import React from "react";
import {  FaCrown, FaFireAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

import { accounts } from "../pages/Accounts/account";

const FeaturedAccounts: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // Filter and randomly select 4 featured accounts
  const featuredAccounts = accounts
    .filter(account => account.price !== undefined && account.price >= 150 && account.status)
    .sort(() => 0.5 - Math.random()) // Shuffle accounts randomly
    .slice(0, 4); // Select the first 4 accounts

  return (
    <>
    <section className="min-h-screen h-[800px]">
      <div ref={ref} className="p-4 bg-[#000] text-white pmythics
    b-9">
      <header className="text-center mb-6 mt-6">
        <h1 className="text-2xl font-bold text-[#ccc] ">
          🔥 Hot PUBG Accounts
        </h1>
        <p className="text-sm p-5 text-gray-400 mt-3">
          Premium accounts loaded with exclusive skins, mythics, and rare items!
        </p>
        <hr className="border-gray-700 mt-4" />
      </header>

      {/* Featured Accounts Grid */}
      <motion.div
        className="grid grid-cols-2 h-[70vh] gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.8 } },
        }}
      >
        {featuredAccounts.map(account => (
          <motion.div
            key={account.id}
            className="bg-[#2a2a2a] border h-[300px] border-gray-700 shadow-md rounded-lg p-3 relative hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            {/* Account Name */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-md font-bold text-white truncate">{account.name}</h2>
              <FaCrown className="text-yellow-500" size={18} />
            </div>

            {/* Image */}
            <img
              src={account.images && account.images[0]}
              alt={account.name}
              className="w-full h-24 object-cover rounded-md mb-2 border border-gray-600"
            />

            {/* Account Level and Features */}
            <p className="text-xs text-gray-300 mb-2">
              <strong>Level:</strong>{" "}
              <span className="text-green-500 font-bold">
                {account.accountLevel}
              </span>
            </p>

            {/* Stats */}
            {/* <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
              <div className="flex items-center gap-1">
                <FaGamepad className="text-[#f05454]" size={14} />
                <span>{account.mythicsCount}+ Mythics</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCrosshairs className="text-[#6c63ff]" size={14} />
                <span>{account.gunSkinsCount}+ Labs</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCarAlt className="text-[#2ecc71]" size={14} />
                <span>{account.carsCount}+ Cars</span>
              </div>
            </div> */}

            {/* Price and Availability */}
            <div className="flex items-center justify-between">
              <p className="text-md font-bold text-[#ff5252]">
                ${account.price?.toFixed(2)}
              </p>
              <button className="bg-[#ff5252] hover:bg-[#d64040] text-white px-3 py-1 text-xs font-bold rounded-md flex items-center gap-1">
                <FaFireAlt />
              </button>
            </div>

            {/* View Details */}
            <Link to={`/account/${account.id}`}>
              <button className="mt-2 w-full bg-transparent border border-gray-600 hover:bg-white hover:text-black text-gray-400 py-1 rounded-md text-xs font-bold flex items-center justify-center gap-1">
                <FaCrown /> View Account
              </button>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div> 
    </section>
   </>
  );
};

export default FeaturedAccounts;
