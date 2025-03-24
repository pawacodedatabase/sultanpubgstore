import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion';
import logo from '../assets/SULTAN_logo.gif';


const isAdminLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true";
const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-[#fffbf4] z-50 shadow-md transition-transform duration-500 ease-in-out">
      <div className="flex items-center justify-between px-4  md:px-">
        {/* Logo */}
        <div className="text-2xl font-bold text-orange-600">
          <Link to="/">
            <img src={logo} alt="logo" width={100} />
          </Link>
        </div>

        {/* Right Section: Store Icon, Sell Button, Hamburger */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            className="text-[#11120d] hover:text-[#565449] transition"
            onClick={() => navigate('/new-arrivals')}
          >
            <FaShoppingBag size={24} />
          </button>
          <button
            className="px-3 py-1 border-2 border-[#11120d] text-000  font-semibold text-sm hover:bg-black hover:text-[#fff] transition"
            onClick={() => navigate('/sell')}
          >
            Sell
          </button>
          <button
            className="flex flex-col space-y-1 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`h-1 w-6 bg-gray-700 rounded transform transition-transform duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`h-1 w-6 bg-gray-700 rounded transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`h-1 w-6 bg-gray-700 rounded transform transition-transform duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex space-x-6 px-7">
          <motion.div
            className="relative group"
            whileHover={{
              scale: 1.1,
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="/store"
              className="text-gray-700 hover:text-red-500 hover:font-bold relative"
            >
              Store
              {/* Underline Effect */}
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-600"
                whileHover={{ width: '100%' }}
                initial={{ width: 0 }}
                animate={{ width: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </Link>
          </motion.div>

          <motion.div
            className="relative group"
            whileHover={{
              scale: 1.1,
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="https://wa.me/2348167548118"
              className="text-gray-700 hover:text-red-500 hover:font-bold relative"
            >
             Contact Us
              {/* Underline Effect */}
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-600"
                whileHover={{ width: '100%' }}
                initial={{ width: 0 }}
                animate={{ width: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </Link>
          </motion.div>

          <motion.div
            className="relative group"
            whileHover={{
              scale: 1.1,
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="/new-arrivals"
              className="text-gray-700 hover:text-red-500 hover:font-bold relative"
            >
              Newest Arrivals
              {/* Underline Effect */}
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-600"
                whileHover={{ width: '100%' }}
                initial={{ width: 0 }}
                animate={{ width: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </Link>
          </motion.div>
          <motion.div
            className="relative group"
            whileHover={{
              scale: 1.1,
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="/sell"
              className="text-gray-700 hover:text-red-500 hover:font-bold relative"
            >
              Sell Your Account
              {/* Underline Effect */}
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-600"
                whileHover={{ width: '100%' }}
                initial={{ width: 0 }}
                animate={{ width: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </Link>
          </motion.div>

          <motion.div
            className="relative group"
            whileHover={{
              scale: 1.1,
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              to="/faq"
              className="text-gray-700 hover:text-red-500 hover:font-bold relative"
            >
              FAQ
              {/* Underline Effect */}
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-600"
                whileHover={{ width: '100%' }}
                initial={{ width: 0 }}
                animate={{ width: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </Link>
          </motion.div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`absolute top-0 left-0 w-full bg-white shadow-lg transform transition-all duration-500 ease-in-out ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        } md:hidden`}
        initial={{ opacity: 0 }}
        animate={{ opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex flex-col items-center space-y-4 py-4 mt-8">
          <motion.div
            className="relative group"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/store"
              className="text-gray-700 hover:text-red-500 hover:font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Store 
              
              <motion.div
                className="absolute inset-0 bg-orange-600 rounded-full scale-0 opacity-20 group-hover:scale-110"
                initial={{ scale: 0 }}
                animate={{ scale: 0 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.4 }}
              />
            </Link>

            <hr/>
          </motion.div>

          <motion.div
            className="relative group"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/sell"
              className="text-gray-700 hover:text-red-500 hover:font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Sell Your Account
              <motion.div
                className="absolute inset-0 bg-orange-600 rounded-full scale-0 opacity-20 group-hover:scale-110"
                initial={{ scale: 0 }}
                animate={{ scale: 0 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
            <hr />
          </motion.div>
          <motion.div
            className="relative group"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/new-arrivals"
              className="text-gray-700 hover:text-red-500 hover:font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Newest Arrivals
              <motion.div
                className="absolute inset-0 bg-orange-600 rounded-full scale-0 opacity-20 group-hover:scale-110"
                initial={{ scale: 0 }}
                animate={{ scale: 0 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
            <hr />
          </motion.div>

          <motion.div
            className="relative group"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="https://wa.me/2348167548118"
              className="text-gray-700 hover:text-red-500 hover:font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
              <motion.div
                className="absolute inset-0 bg-orange-600 rounded-full scale-0 opacity-20 group-hover:scale-110"
                initial={{ scale: 0 }}
                animate={{ scale: 0 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
            <hr />
          </motion.div>

          <motion.div
            className="relative group"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/new-arrivals"
              className="text-gray-700 hover:text-red-500 hover:font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Get Offer
              <motion.div
                className="absolute inset-0 bg-orange-600 rounded-full scale-0 opacity-20 group-hover:scale-110"
                initial={{ scale: 0 }}
                animate={{ scale: 0 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
            <hr />
          </motion.div>
          <motion.div
      className="relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={isAdminLoggedIn ? "/admin" : "/login"}
        className="text-gray-700 hover:text-red-500 hover:font-bold"
        onClick={() => setMenuOpen(false)}
      >
        {isAdminLoggedIn ? "Admin Panel" : "Login"}
        <motion.div
          className="absolute inset-0 bg-orange-600 rounded-full scale-0 opacity-20 group-hover:scale-110"
          initial={{ scale: 0 }}
          animate={{ scale: 0 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.4 }}
        />
      </Link>
      <hr />
    </motion.div>

          <button
            className="mt-4 text-gray-700 hover:text-white flex items-center space-x-2 border-2 p-2 border-black hover:bg-black hover:text-[#fff]"
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineClose size={15} />
            <span>Close</span>
          </button>
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;
