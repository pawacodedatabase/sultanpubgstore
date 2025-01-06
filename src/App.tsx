import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Header from './home components/header';
import Accounts from './pages/Accounts/accounts';
import AccountDetails from './pages/Accounts/AccountDetail';

const App: React.FC = () => {
  return (
    <Router>
     <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Accounts />} />
        <Route path="/account/:id" element={<AccountDetails/>} />
        
      </Routes>
    </Router>
  );
};

export default App;
