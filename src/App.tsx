import React from 'react';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Header from './home components/header';
import Accounts from './pages/Accounts/accounts';
import AccountDetails from './pages/Accounts/AccountDetail';
import NewArrivals from './pages/Accounts/NewArrivals';
import SellYourAccount from './pages/sell/sell';
import Confirmation from './pages/sell/confirmation';
import Footer from './home components/footer';
import BuyAccount from './pages/Accounts/buy';
import ScrollToTop from './pages/scroll2top';
import ConfirmationPage from './pages/Accounts/confirmation';
import PaymentForm from './pages/Accounts/buy';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop/>
     <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Accounts />} />
        <Route path="/sell" element={<SellYourAccount />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/confirmation" element={<Confirmation/>} />
        <Route path="/account/:id" element={<AccountDetails/>} />
        <Route path="/buy/:id" element={<BuyAccount />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/payment/:id" element={<PaymentForm />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
