import React from "react";
import logo from '../assets/SULTAN_logo.gif'
import { FaEnvelope, FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#fffbf4] text-white py-12">
      <div className="container mx-auto px-6 sm:px-12">
        {/* Footer Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* About Section */}
          <div className="space-y-6">
          <div className="m-auto flex justify-center"> <img src={logo} alt="logo" width={200}  />
            </div>   
           
            <p className="text-lg text-[#565449] p-4">
              Sultan’s PUBG Accounts is the #1 account dealer in Nigeria. We provide premium, secure, and fast services for buying and selling PUBG accounts.
            </p>
          </div>

          
          

          {/* Newsletter Signup */}
          <div className="space-y-6">
           
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 w-full rounded-l-lg bg-[#fff] text-white border border-[#000] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
              />
              <button className="px-6 py-3 bg-[#000] text-white rounded-r-lg hover:bg-[#d64040] transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright Section */}
        <div className="mt-12 border-t border-gray-600 pt-8 text-center">
          <div className="flex justify-center gap-8 mb-6">
            {/* <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transform hover:scale-110 transition-all duration-300"
            >
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transform hover:scale-110 transition-all duration-300"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a> */}
            <a
              href="mailto:Sultanpubgstoree@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transform hover:scale-110 transition-all duration-300"
            >
              <FaEnvelope className="text-2xl"/>
            </a>
            <a
              href="https://t.me/Sultan_pubg_acc_Dealerr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transform hover:scale-110 transition-all duration-300"
            >
              <FaTelegram className="text-2xl"/>
            </a>
          </div>

          <p className="text-sm text-gray-500">
            &copy; 2025 Sultan's PUBG Accounts. All rights reserved.
          </p>

          <p className="mt-5 text-sm text-gray-500">Website Created & Designed by <span className="font-semibold"> <Link to="https://wa.me/2348053208997?" target="_blank" rel="noopener noreferrer">
  @Pawacode
</Link></span>
</p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
