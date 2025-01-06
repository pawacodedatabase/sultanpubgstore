import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Header from './home components/header';
import Accounts from './pages/Accounts/accounts';
import AccountDetails from './pages/Accounts/AccountDetail';
import NewArrivals from './pages/Accounts/NewArrivals';
import SellYourAccount from './pages/sell/sell';
import Confirmation from './pages/sell/confirmation';
import Footer from './home components/footer';

const App: React.FC = () => {
  return (
    <Router>
     <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Accounts />} />
        <Route path="/sell" element={<SellYourAccount />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/confirmation" element={<Confirmation/>} />
        <Route path="/account/:id" element={<AccountDetails/>} />
        
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
