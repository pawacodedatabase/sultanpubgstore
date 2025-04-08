import  { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import img1 from "../images/PUBG.jpeg";
import img2 from "../images/pubg2.jpg";
import img3 from "../images/pubggreen.jpg";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: `Sell/Swap your accounts. `,
    image: img1,
  },
  {
    id: 2,
    title: "Explore Mythic Accounts",
    image: img2,
  },
  {
    id: 3,
    title: "Level up with cutting-edge accounts.",
    image: img3,
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className=" flex flex-row items-center justify-between px-4 sm:px-8 lg:px-20 bg-black text-white relative overflow-hidden transition-all duration-700 ease-in-out">
      {/* Left Content */}
      <div className="w-full sm:w-1/2 text-center sm:text-left mt-10 sm:mt-0">
        <p className="text-sm text-gray-400 mb-2">0{currentSlide + 1}</p>
        <h1 className="text-[20px] text-[#ccc] sm:text-xl lg:text-5xl font-semibold leading-tight mb-6 transition-all duration-700 ease-in-out">
        {user ? `Hello, ${user.username}` : 'Hello, Guest'} {slides[currentSlide].title}
        </h1>
        <button className="relative overflow-hidden border-none cursor-pointer text-white font-medium text-[10px] py-3 px-[2.7em] bg-[#1f2937] rounded-[0.6em] active:scale-[0.97]">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 rounded-[0.6em] -mt-[0.25em]"></div>
  <span className="relative -top-[1px]">Browse Accounts</span>
  <div className="absolute inset-0 bg-[#10b981]/60 rounded-full transition-all duration-500 ease-[cubic-bezier(0,_0,_0.2,_1)] transform -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-125 group-hover:w-[14em] group-hover:h-[14em]"></div>
</button>



       
      </div>

      {/* Right Content (Image) */}
      <div className="w-full sm:w-1/2 mt-8 sm:mt-0 relative z-10 transition-all duration-700 ease-in-out">
        <img
          src={slides[currentSlide].image}
          alt="Hero"
          className="w-full object-cover rounded-xl shadow-lg transition-all duration-700 ease-in-out"
        />
      </div>

      {/* Social Icons */}
      <div className="absolute left-4 bottom-10 flex flex-col gap-4 z-20">
        <a href="#"><FaInstagram className="hover:text-purple-500" /></a>
        <a href="#"><FaFacebookF className="hover:text-blue-500" /></a>
        <a href="#"><FaTwitter className="hover:text-sky-400" /></a>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-10 right-6 flex items-center gap-2 text-sm z-20">
        {slides.map((_, index) => {
          const isActive = currentSlide === index;
          const baseColor =
            index === 0
              ? "bg-white text-black"
              : index === 1
              ? "bg-red-500"
              : "bg-green-500";

          return (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`border px-2 py-1 rounded font-semibold transition-all duration-300 ${
                baseColor
              } ${isActive ? "scale-110 shadow-lg shadow-white" : "opacity-60 hover:opacity-100"}`}
            >
              0{index + 1}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
