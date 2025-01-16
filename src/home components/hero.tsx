import React, { useState, useEffect } from 'react';

import banner_1 from '../images/banner_1.jpg'; 
import banner_2 from '../images/banner_2.jpg';
import banner_3 from '../images/banner_3.jpg';
import banner_4 from '../images/banner_4.jpg';
import banner_5 from '../images/banner_5.jpg';
import banner_6 from '../images/banner_6.jpg';
import banner_7 from '../images/banner_7.jpg';
import banner_8 from '../images/banner_8.jpg';
import banner_9 from '../images/banner_9.jpg';
import {  FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface HeroSlide {
  image: string;
  heading: string;
  text: string;
  buttonLabel: string;
  buttonLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    image: banner_1,
    heading: 'Unleash the Ultimate PUBG Experience!',
    text: 'Find premium PUBG accounts with rare skins, high ranks, and exclusive gear. Level up your game today!',
    buttonLabel: 'Shop Now',
    buttonLink: '/store',
  },
  {
    image: banner_2,
    heading: 'New Arrivals',
    text: `Discover fresh PUBG accounts with unbeatable stats, top-tier skins, and more. Don't miss out!`,
    buttonLabel: 'Browse Now',
    buttonLink: '/new-arrivals',
  },
  {
    image: banner_3,
    heading: 'Unlock Elite PUBG Accounts Now!',
    text: 'Access rare and highly-ranked PUBG accounts at unbeatable prices. Elevate your gameplay today',
    buttonLabel: 'Grab the Deal',
    buttonLink: '/new-arrivals',
  },
  {
    image: banner_4,
    heading: 'Unlock Elite PUBG Accounts Now!',
    text: 'Access rare and highly-ranked PUBG accounts at unbeatable prices. Elevate your gameplay today',
    buttonLabel: 'Grab the Deal',
    buttonLink: '/new-arrivals',
  },
  {
    image: banner_5,
    heading: 'Unleash the Ultimate PUBG Experience!',
    text: 'Find premium PUBG accounts with rare skins, high ranks, and exclusive gear. Level up your game today!',
    buttonLabel: 'Shop Now',
    buttonLink: '/store',
  },
  {
    image: banner_6,
    heading: 'Unlock Elite PUBG Accounts Now!',
    text: 'Access rare and highly-ranked PUBG accounts at unbeatable prices. Elevate your gameplay today',
    buttonLabel: 'Grab the Deal',
    buttonLink: '/store',
  },
  {
    image: banner_7,
    heading: 'Unleash the Ultimate PUBG Experience!',
    text: 'Find premium PUBG accounts with rare skins, high ranks, and exclusive gear. Level up your game today!',
    buttonLabel: 'Shop Now',
    buttonLink: '/store',
  },
  {
    image: banner_8,
    heading: 'Unleash the Ultimate PUBG Experience!',
    text: 'Find premium PUBG accounts with rare skins, high ranks, and exclusive gear. Level up your game today!',
    buttonLabel: 'Shop Now',
    buttonLink: '/store',
  },
  {
    image: banner_9,
    heading: 'Unlock Elite PUBG Accounts Now!',
    text: 'Access rare and highly-ranked PUBG accounts at unbeatable prices. Elevate your gameplay today',
    buttonLabel: 'Grab the Deal',
    buttonLink: '/store',
  },
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const { image, heading, text, buttonLabel, buttonLink } = heroSlides[currentSlide];

  return (
    <div
      className="relative bg-cover bg-center min-h-[100vh]  flex items-center justify-center"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Darker Overlay */}
      <div className="absolute inset-0 bg-[#000] bg-opacity-60"></div>

      {/* Content */}
      <div className="relative text-center text-white px-4 animate__animated animate__fadeIn animate__delay-1s">
      
       <h1 className="text-xl font-extrabold mb-4 text-shadow-lg font-gaming">
              {heading}
        </h1>
        <p className="text-sm font-thin p-6 mb-8 max-w-lg mx-auto text-shadow-md">
          {text}
        </p>
       
          
        
<div className='px-2 py-2 bg-[#000]  flex justify-center m-auto w-[150px] text-white border-2   font-thin hover:bg-transparent hover:text-white transition transform hover:scale-105'>

  <Link to={buttonLink}>
        {buttonLabel}
        </Link>
</div>
        
      </div>

      {/* Slide Navigation Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          className="px-6 py-3 bg-transparent text-white text-3xl rounded-full shadow-lg  transition"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + heroSlides.length) % heroSlides.length)}
        >
          <FaArrowAltCircleLeft/>
        </button>
        <button
          className="px-6 py-3 bg-transparent text-white text-3xl rounded-full shadow-lg  transition"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length)}
        >
          <FaArrowAltCircleRight/>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
