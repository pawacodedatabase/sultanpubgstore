import React, { useState } from "react";
import { FaFire, FaCrown, FaCarAlt, FaCrosshairs, FaGamepad, FaShoppingCart } from "react-icons/fa";
import logo from '../../assets/logo.png'
import {  accounts } from "./account"; // Make sure to import your accounts and types
import { Link } from "react-router-dom";

const NewArrivals: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 6;

  // Assuming you are fetching all accounts (you can filter for 'new' accounts if needed)
  const currentAccounts = accounts;

  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccountsPaginated = currentAccounts.slice(indexOfFirstAccount, indexOfLastAccount);

  // Reverse the accounts to show them in ascending order (bottom to top)
  const currentAccountsPaginatedReversed = [...currentAccountsPaginated].reverse();

  const totalPages = Math.ceil(currentAccounts.length / accountsPerPage);

  return (
    <div className="min-h-screen p-8 text-black">
      <h1 className="text-xl font-bold text-center mb-6 font-gaming">New Arrivals</h1>

      {/* Accounts Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAccountsPaginatedReversed.map((account) => (
          <div
            key={account.id}
            className="bg-[#000000] border shadow-lg rounded-lg p-6 w-full relative hover:shadow-2xl transition-all duration-300"
          >
            {/* Status Banner */}
            <div
              className={`absolute top-2 right-2 text-xs font-bold py-2 px-4 text-white ${account.status ? 'bg-[#4caf50]' : 'bg-[#f44336]'}`}
            >
              {account.status ? 'Active' : 'Sold'}
            </div>

            {/* Account Content */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[#f05454] flex items-center gap-2 text-sm font-bold">
                  <FaFire size={18} /> Fire Account
                </div>
                <h2 className="text-xl font-bold text-[#ffffff]">{account.name}</h2>
                <p className="text-sm text-gray-400">Level <span className="text-yellow-200 font-bold">{account.accountLevel}</span></p>
              </div>
              <div className="text-yellow-400">
                <FaCrown size={24} />
              </div>
            </div>

            {/* Image Section */}
            <div className="mb-5 relative">
              <img
                src={account.images && account.images[0]}
                alt={account.name}
                className="w-full h-44 object-cover rounded-md border border-gray-700 hover:scale-105 transition-all duration-300"
              />
            </div>

            {/* Features */}
            <p className="text-sm text-gray-300 mb-5">
              {account.accountFeatures?.join(" ").split(" ").slice(0, 10).join(" ")}...
            </p>

            {/* Stats */}
            <div className="flex justify-between text-sm text-gray-400 mb-5">
              <div className="flex items-center gap-1">
                <FaGamepad className="text-[#f05454]" size={16} /> {account.mythicsCount}+ Mythics
              </div>
              <div className="flex items-center gap-1">
                <FaCrosshairs className="text-[#6c63ff]" size={16} /> {account.gunSkinsCount}+ Gun Labs
              </div>
              <div className="flex items-center gap-1">
                <FaCarAlt className="text-[#2ecc71]" size={16} /> {account.carsCount}+ Cars
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-[#ff5252]">
                ${account.price?.toFixed(2)} <span className="font-thin text-sm text-gray-300">USD</span>
              </p>
              <button
                className={`bg-[#ff5252] hover:bg-[#d64040] text-white px-4 py-2 text-sm font-bold rounded-lg ${!account.status ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!account.status}
              >
                {account.status ? <><FaShoppingCart className="mr-2" /> </> : "Sold"}
              </button>
            </div>

            {/* Account Details Button */}
            <Link to={`/account/${account.id}`}>
              <button className="mt-4 w-full bg-[transparent] border hover:bg-[#fff] hover:text-black text-white py-2 rounded-lg text-sm font-bold">
                View Account
              </button>
            </Link>

            {/* Footer */}
            <div className="flex items-center justify-between mt-5 text-xs text-gray-400">
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="Sultan Pubg Store"
                  className="w-6 h-6 mr-2 rounded-full border border-gray-700"
                />
                Sultan Pubg Store
              </div>
              <span className="text-green-500">100% Positive</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          className="py-2 px-4 bg-[#333333] text-white rounded-lg hover:bg-[#444444] transition-all duration-200"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        >
          Prev
        </button>
        <span className="text-white text-lg">{currentPage} of {totalPages}</span>
        <button
          className="py-2 px-4 bg-[#333333] text-white rounded-lg hover:bg-[#444444] transition-all duration-200"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewArrivals;
