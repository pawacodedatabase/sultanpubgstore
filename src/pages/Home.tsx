import React from 'react';

// import Header from '../home components/header';
import HeroSection from '../home components/hero';
import FeaturedAccounts from '../home components/hotAccounts';
import EmailPopup from '../home components/banner';
import DualImageComponent from './dualimage';

const Home: React.FC = () => {
  return (
    <>
    
    <HeroSection/>
    <FeaturedAccounts/>
    <EmailPopup/>
    <DualImageComponent/>
    </>
  );
};

export default Home;
