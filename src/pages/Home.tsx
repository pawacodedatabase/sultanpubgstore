import React from 'react';

// import Header from '../home components/header';
import HeroSection from '../home components/hero';
import FeaturedAccounts from '../home components/hotAccounts';
import EmailPopup from '../home components/banner';
import DualImageComponent from './dualimage';
import SultanSection from '../home components/sultansection';

const Home: React.FC = () => {
  return (
    <>

    <div className='bg-[#000] gap-5'>
      <EmailPopup/> 
    <HeroSection/>
    <FeaturedAccounts/>
    <SultanSection/>
   <br /> <br />
    <DualImageComponent/>
    
    </div>
    </>
  );
};

export default Home;
