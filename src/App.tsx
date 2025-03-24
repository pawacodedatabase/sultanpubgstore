import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./home components/header";
import Accounts from "./pages/Accounts/accounts";
import AccountDetails from "./pages/Accounts/AccountDetail";
import NewArrivals from "./pages/Accounts/NewArrivals";
import SellYourAccount from "./pages/sell/sell";
import Confirmation from "./pages/sell/confirmation";
import Footer from "./home components/footer";
import BuyAccount from "./pages/Accounts/buy";
import ScrollToTop from "./pages/scroll2top";
import ConfirmationPage from "./pages/Accounts/confirmation";
import PaymentForm from "./pages/Accounts/buy";
import AddGameAccountForm from "./pages/jsonBin/addAcct";
import GameAccountsList from "./pages/jsonBin/display";
import GameAccountManager from "./pages/jsonBin/manage";
import AccountDetail from "./pages/jsonBin/accountDetail";
import AdminPanel from "./pages/jsonBin/Admin";
import AdminLogin from "./pages/jsonBin/AdminLogin";
import ProtectedRoute from "./pages/jsonBin/protect";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Accounts />} />
        <Route path="/sell" element={<SellYourAccount />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/account/:id" element={<AccountDetails />} />
        <Route path="/accounts/:id" element={<AccountDetail />} />
        <Route path="/buy/:id" element={<BuyAccount />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddGameAccountForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <GameAccountManager />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/add" element={<AddGameAccountForm />} /> */}
        <Route path="/accounts" element={<GameAccountsList />} />
        {/* <Route path="/manage" element={<GameAccountManager />} /> */}
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/payment/:id" element={<PaymentForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
