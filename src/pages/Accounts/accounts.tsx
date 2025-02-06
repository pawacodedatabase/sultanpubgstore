import React, { useState } from "react";
import { FaFire, FaCrown, FaCarAlt, FaCrosshairs, FaSearch, FaSnowflake, FaTshirt } from "react-icons/fa";

import { Link } from "react-router-dom"; // Import Link for routing
import logo from "../../assets/logo.png";
import {  accounts } from "./account";
import ScrollToTop from "../scroll2top";

const Accounts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 10;



  const searches = [
    { label: "Glacier", icon: <FaSnowflake size={18} className="text-blue-300" /> },
    { label: "Mummy", icon: <FaTshirt size={18} className="text-white-300" /> },
    { label: "Tesla", icon: <FaCarAlt size={18} className="text-green-400" /> },
    { label: "Fool", icon: <FaCrosshairs size={18} className="text-red-400" /> },
    { label: "Kone", icon: <FaCrosshairs size={18} className="text-red-400" /> },
  ];

  const filteredAccounts = accounts.filter(account =>
    // Search through multiple properties in the GameAccount interface
    (account.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountLevel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountFeatures?.some(feature =>
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      account.moreFeat?.some(feature =>
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      account.mythicsCount?.toString().includes(searchTerm) ||
      account.carsCount?.toString().includes(searchTerm) ||
      account.gunSkinsCount?.toString().includes(searchTerm) ||
      account.price?.toFixed(2).includes(searchTerm) // Searching by price as a string
    )
  );
  

  const activeAccounts = filteredAccounts.filter(account => account.status);
  const soldAccounts = filteredAccounts.filter(account => !account.status);

  const currentAccounts = showActive === "all"
    ? [...activeAccounts, ...soldAccounts]
    : showActive === "active"
    ? activeAccounts
    : soldAccounts;

  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccountsPaginated = currentAccounts.slice(indexOfFirstAccount, indexOfLastAccount);

  const totalPages = Math.ceil(currentAccounts.length / accountsPerPage);

  // Function to handle adding a search term when a "Popular search" button is clicked
  const handlePopularSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
    <ScrollToTop/>
    <div className="min-h-screen  p-8 text-white">
      {/* Marketplace Header */}
      <header className="text-center mb-10">
       
        <div> 
          <h1 className="text-xl font-extrabold text-[#000] font-gaming">Sultan Pubg Store</h1>
          <p className="text-lg text-gray-400 mt-2">Shop the best PUBG accounts with exclusive features</p>
        </div>
       
        {/* Search Bar */}
        <div className="relative mt-6 w-full sm:w-1/2 mx-auto">
          <input
            type="text"
            placeholder="Search accounts..."
            className="p-3 bg-[#11120d] text-white rounded-lg w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white" size={20} />
        </div>

         
        <div className="text-black mt-4">
      <h1 className="text-xl font-semibold text-center  mb-2">Popular Searches:</h1>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide ">
        {searches.map((search, index) => (
          <div
            key={index}
            onClick={() => handlePopularSearch(search.label)}
            className="flex items-center text-black p-1  text-sm font-semibold hover:bg-gray-900 hover:text-white cursor-pointer  shadow-md transition-all duration-300"
          >
            {search.icon}
            <span className="ml-2">{search.label}</span>
          </div>
        ))}
      </div>

      {/* Add Custom Scrollbar Style */}
      <style >{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
      
    
      </header>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          className={`py-2 px-6 font-thin  text-white ${showActive === "all" ? 'bg-[#ff5252]' : 'bg-black hover:bg-red-500'}`}
          onClick={() => setShowActive("all")}
        >
          All
        </button>
        <button
          className={`py-2 px-6 ro font-thin  text-white ${showActive === "active" ? 'bg-[#4caf50]' : 'bg-black hover:bg-red-500'}`}
          onClick={() => setShowActive("active")}
        >
          Active
        </button>
        <button
          className={`py-2 px-6   font-thin  text-white ${showActive === "sold" ? 'bg-[#f44336]' : 'bg-black hover:bg-red-500'}`}
          onClick={() => setShowActive("sold")}
        >
          Sold
        </button>
      </div>

      {/* Accounts Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAccountsPaginated.map((account) => (
          <div
            key={account.id}
            className="bg-[#000000] border  shadow-lg rounded-lg p-6 w-full relative hover:shadow-2xl transition-all duration-300"
          >
            {/* Status Banner */}
            <div
              className={`absolute top-2 right-2 text-xs font-bold py-2 px-4  text-white ${account.status ? 'bg-[#4caf50]' : 'bg-[#f44336]'}`}
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
            {/* <div className="flex justify-between text-sm text-gray-400 mb-5">
              <div className="flex items-center gap-1">
                <FaGamepad className="text-[#f05454]" size={16} /> {account.mythicsCount}+ Mythics
              </div>
              <div className="flex items-center gap-1">
                <FaCrosshairs className="text-[#6c63ff]" size={16} /> {account.gunSkinsCount}+ Gun Labs
              </div>
              <div className="flex items-center gap-1">
                <FaCarAlt className="text-[#2ecc71]" size={16} /> {account.carsCount}+ Cars
              </div>
            </div> */}

            {/* Price & Action */}
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-[#ff5252]">
                ${account.price?.toFixed(2)} <span className=" font-thin text-sm text-gray-300">USD</span>
              </p>
              {/* <button
                className={`bg-[#ff5252] hover:bg-[#d64040] text-white px-4 py-2 text-sm font-bold rounded-lg ${!account.status ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!account.status}
              >
                {account.status ? <><FaShoppingCart className="mr-2" /> Buy Now</> : "Sold"}
              </button> */}
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
    </div></>
  );
};

export default Accounts;
