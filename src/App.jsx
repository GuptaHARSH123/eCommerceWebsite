import React, { useState, useMemo, useCallback, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from './ProductDetails';
import ProductHomePage from './ProductHomePage';
import Navbar from './Navbar';
import NotFound from './Notfound';
import CartPag from './CartPag';
import EnhancedLoginPage from './LoginPage';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import Footer from './footer';
import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';
import Alert from './Alert';
import UserProvider from "./providers/UserProvider"
import Alertprovider from './providers/Alertprovider';
import CartProvider from './providers/CartProvider';

 
export const alertContext = createContext();

function App() {
  return (
    <UserProvider>
      <Alertprovider> 
      <CartProvider> 
      <div className="h-screen bg-gray-100 overflow-scroll flex flex-col">
      <Alert/> 
        <Navbar/>
        <div className="grow">
          <Routes>
            <Route path="/" element={ <ProductHomePage /> } />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cartpag" element={<CartPag />} />
            <Route path="/LoginPage" element={<AuthRoute ><EnhancedLoginPage /></AuthRoute>} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
             
          </Routes>
        </div>
        <Footer />
      </div>
    </CartProvider>
    </Alertprovider>
    </UserProvider>
 
  );
}

export default App;
