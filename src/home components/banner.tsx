import React, { useEffect, useState } from 'react';
import img from '../../src/images/banner_4.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; // Import React icon for the close button

const EmailPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
     useEffect(() => {
        const loggedUser = localStorage.getItem("loggedUser");
        if (loggedUser) {
          const userData = JSON.parse(loggedUser);
          setUser(userData);
          
        } else {
          // navigate("/userlogin");
        }
      }, [navigate]);


  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] flex relative rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-xl text-black hover:text-gray-300"
              onClick={closePopup}
            >
              <FaTimes />
            </button>

            {/* Popup Content */}
            <div className="flex w-full h-full">
              {/* Image on the left */}
              <div className="w-1/2">
                <img
                  src={img} // Replace with the actual image link
                  alt="Model"
                  className="w-full h-full object-cover "
                />
              </div>

              {/* Text and Call to Action Button on the right */}
              <div className="w-1/2 p-6 flex flex-col justify-center items-center text-center">
              <h2 className="text-sm font-bold text-gray-800">
  {user ? `${user.username}, Check New Arrivals` : 'Guest, Check New Arrivals'}
</h2>

                <p className="text-gray-600 mt-4 text-[10px]  font-semibold ">
                Discover our latest addition!! Unlock the ultimate gaming experience with a premium PUBG account featuring exclusive skins, mythic outfits, and high-level achievements. Don’t miss out </p>
                <Link to="/new-arrivals">
                  <button className="mt-6 px-6 py-2 text-sm bg-black text-white hover:bg-white hover:border hover:text-black hover:border-black mb-9">
                   New Arrivals
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailPopup;
