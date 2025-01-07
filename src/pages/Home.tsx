import React from 'react';

// import Header from '../home components/header';
import HeroSection from '../home components/hero';
import FeaturedAccounts from '../home components/hotAccounts';
import EmailPopup from '../home components/banner';

const Home: React.FC = () => {
  return (
    <>
    
    <HeroSection/>
    <FeaturedAccounts/>
    <EmailPopup/>
    </>
  );
};

export default Home;
