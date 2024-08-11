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
import Footer from './Footer';
import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';
import Alert from './Alert';
import UserProvider from "./providers/UserProvider"
import Alertprovider from './providers/Alertprovider';

 
export const alertContext = createContext();

function App() {
  const savedDataString = localStorage.getItem('myCartItem') || "{}";
  const savedData = JSON.parse(savedDataString);

  const [cart, setCart] = useState(savedData);

  const handleAddToCart = useCallback((productId, count) => {
    const oldCount = cart[productId] || 0;
    const newCart = { ...cart, [productId]: oldCount + count };
    updateCart(newCart);
  }, [cart]);

  const updateCart = (newCart) => {
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem('myCartItem', cartString);
  };

  const totalCount = useMemo(() => {
    return Object.keys(cart).reduce((previous, current) => {
      return previous + cart[current];
    }, 0);
  }, [cart]);

  

  return (
    <UserProvider>
      <Alertprovider> 
      
      <div className="h-screen bg-gray-100 overflow-scroll flex flex-col">
      <Alert/> 
        <Navbar productCount={totalCount} />
        <div className="grow">
          <Routes>
            <Route path="/" element={<UserRoute><ProductHomePage /></UserRoute>} />
            <Route path="/productdetails/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cartpag" element={ <UserRoute> <CartPag cartitem={cart} updateCart={updateCart} /> </UserRoute> } />
            <Route path="/LoginPage" element={<AuthRoute ><EnhancedLoginPage /></AuthRoute>} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
             
          </Routes>
        </div>
        <Footer />
      </div>
    </Alertprovider>
    </UserProvider>
 
  );
}

export default App;
