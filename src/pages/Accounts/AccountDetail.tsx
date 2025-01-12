import React, { useState } from "react";
import {  useParams } from "react-router-dom";
import { accounts } from "./account";
import { FaCrown, FaCar, FaStar, FaWhatsapp, FaFire, FaTag, FaDiscord, FaMagento, FaShoppingBasket,  FaBitcoin, FaCreditCard } from "react-icons/fa";
import logo from '../../images/pubg-mobile.webp'
import Accordion from "./accordion"
import ReactPlayer from 'react-player';
import { useNavigate } from "react-router-dom";
import FeaturedAccounts from "../../home components/hotAccounts";
;
const AccountDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const account = accounts.find(acc => acc.id === parseInt(id!));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();

  if (!account) {
    return <div className="min-h-screen bg-[#1e1e2e] p-8 text-white text-center">Account not found</div>;
  }

  return (

    <>
    <div className=" bg-[#0d1117] text-white">
      {/* Header Section */}
      <header className="py-6 px-8 flex justify-between items-center bg-[#161b22]">
        <h1 className="text-2xl font-thin flex items-center gap-2">
          <img src={logo} alt="PUBG" className="w-8 h-8" />
          PUBG Mobile
        </h1>
        <button className="bg-[#5865f2] text-white py-2 px-4 rounded-lg font-semibold">
          <FaDiscord/>
        </button>
      </header>

      {/* Main Content */}
      <div className="p-8 grid grid-cols-12 gap-8">
        {/* Left Section */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Title */} 
          <h2 className="text-3xl font-thin flex text-red-500 justify-center "><FaFire/> {account.name}</h2>
          <div className="flex items-center gap-4">
           
            <div className="flex items-center gap-2">
              <span className="bg-[#ff5252] flex text-white text-[12px] px-3 py-2 rounded-lg ">
              <FaTag/>    Resell value
              </span>
              <span className="bg-[#ffcc00] flex  text-black text-sm px-3 py-2 rounded-lg">
              <FaTag/>  3% Cashback
              </span>
              <span className="bg-[#4caf50] flex  text-white text-sm px-3 py-2 rounded-lg">
              <FaTag/>  Instant Account Delivery
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
             Account Level: <span className="text-yellow-500">{account.accountLevel}</span> · <span className="text-green-400">Full Access Included</span>
          </p>

          {/* Image Slider */}
          <div className="bg-[#161b22] p-6 rounded-lg shadow-md">
            <div className="relative">
              {/* Main Image */}
              <img
                src={account.images?.[selectedImageIndex]}
                alt="Account Preview"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto">
                {account.images?.map((image, index) => (
                  <button
                    key={index}
                    className={`w-16 h-16 border-2 ${
                      index === selectedImageIndex ? "border-[#ff5252]" : "border-gray-600"
                    } rounded-lg overflow-hidden`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img src={image} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#161b22] p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-thin flex items-center gap-2">
          <img src={logo} alt="PUBG" className="w-8 h-8" />
          Watch Account Video
        </h1>
          {account.videoLink && (
  <div className="bg-[#161b22] p-6 rounded-lg shadow-md">
    
    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4">
      <ReactPlayer
        url={account.videoLink}
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        controls
        playing={false}
        light
      />
    </div>
    <a
      href={account.videoLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block border w-full hover:bg-[#000]  text-white py-2 px-4 rounded-lg text-lg font-bold text-center"
    >
      Watch on Telegram
    </a>
  </div>
)}

            </div>
          {/* Account Details */}
          <div className="bg-[#161b22] p-6 rounded-lg shadow-md">
           

           <div className="flex mb-4 gap-2  text-center m-auto justify-center">

            <span className="text-gray-500 text-2xl"><FaMagento/></span>
             
            <h3 className="text-xl font-thin text-green-400  text-center ">Account Details</h3>

           </div>
          

            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <FaCrown className="text-[#ffcc00]" />
                Level: <span className="font-bold text-yellow-500">{account.accountLevel}</span>
              </li>
              <li className="flex items-center gap-2">
                <FaStar className="text-[#ff7b7b]" />
                Mythics: <span className="font-bold text-red-500">{account.mythicsCount}+</span>
              </li>
              <li className="flex items-center gap-2">
                <FaStar className="text-[#4caf50]" />
                Gun Labs: <span className="font-bold text-gray-500">{account.gunSkinsCount}+</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCar className="text-[#ff5252]" />
                Cars: <span className="font-bold text-blue-500">{account.carsCount}+</span>
              </li>
             
            </ul>
            <div className="mt-6">
            <div className="flex mb-4 gap-2  text-center m-auto justify-center">

<span className="text-gray-500 text-2xl"><FaMagento/></span>
 
<h3 className="text-xl font-thin text-green-400  text-center ">Account Features</h3>

</div>

  <table className="table-auto w-full text-left text-gray-300">
    <tbody>
      {account.accountFeatures?.map((feature, index) => (
        <tr key={index} className="border-b border-gray-700 last:border-none">
          <td className="py-3 px-4">
            <span className="flex items-center gap-3">
              {/* Icon for each feature */}
              <span className="text-[yellow]">
                <FaStar />
              </span>
              {feature}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
            <div className="mt-6">
            <div className="flex mb-4 gap-2  text-center m-auto justify-center">

<span className="text-gray-500 text-2xl"><FaMagento/></span>
 
<h3 className="text-xl font-thin text-green-400  text-center ">More Features</h3>

</div>

  <table className="table-auto w-full text-left text-gray-300">
    <tbody>
      {account.moreFeat?.map((feature, index) => (
        <tr key={index} className="border-b border-gray-700 last:border-none">
          <td className="py-3 px-4">
            <span className="flex items-center gap-3">
              {/* Icon for each feature */}
              <span className="text-[yellow]">
                <FaCrown />
              </span>
              {feature}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-[#161b22] p-6 rounded-lg shadow-md">
          <div className="flex mb-4 gap-2  text-center m-auto justify-center">

<span className="text-gray-500 text-2xl"><FaShoppingBasket/></span>
 
<h3 className="text-xl font-thin text-green-400  text-center ">Fast Checkout</h3>

</div>

            <ul className="text-gray-400 text-sm space-y-3">
              <li> <span className="text-green-500">✔ </span>You'll get the account logins instantly after payment</li>
              <li> <span className="text-green-500"> ✔</span> Email and password can be changed</li>
              <li> <span className="text-green-500"> ✔</span> Instant delivery after payment</li>
              <li> <span className="text-green-500"> ✔</span> Free warranty and support</li>
            </ul>
            <div className="mt-6 text-center">
              <p className="text-4xl font-thin text-[#ff5252]">${account.price?.toFixed(2)}</p>

              <button
                className="p-4 border-2 mt-4 rounded hover:bg-[#000] transition-transform transform hover:scale-105"
                onClick={() => navigate(`/buy/${account.id}`)} // Navigate to the Buy Account page
              >
                Buy Account
              </button>
              

              <div className="flex  gap-2 justify-center mt-2 text-2xl"><FaBitcoin/> <FaCreditCard/> </div>
            </div>
          </div>
          <div className="bg-green-500 p-6 rounded-lg text-center shadow-md">
  <h3 className="text-xl font-bold text-white">Need Help?</h3>
  <p className="text-gray-100 text-sm">Join our WhatsApp group for live support and updates!</p>
  <a
    href="https://wa.me/2348167548118" // Replace with your WhatsApp group link
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-4 bg-white text-green-600 py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-100"
  >
    <FaWhatsapp className="text-2xl" />
    Contact us on WhatsApp
  </a>
</div>

        </div>
      </div>
    </div>
 <FeaturedAccounts/>   
    <Accordion/>

    </>
  );
};

export default AccountDetails;
