import React, { useState, useMemo, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './productlist';
import Box from './box';
import ProductDetails from './ProductDetails';
import ProductHomePage from "./ProductHomePage";
import Navbar from './Navbar';
import Footer from './footer';
import Notfound from './Notfound';
import { getProductsDetails } from './api';
import CartPag from './CartPag';
function App() {
  const savedDataString = localStorage.getItem('myCartItem') || "{}";
  const savedData = JSON.parse(savedDataString);
  
  const [cart, setCart] = useState(savedData);

  const handleAddToCart = useCallback((productId, count) => {
    const oldCount = cart[productId] || 0;
    const newCart = { ...cart, [productId]: oldCount + count };
    setCart(newCart);
    console.log(cart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem('myCartItem', cartString);
  }, [cart]);

  const totalCount = useMemo(() => {
    return Object.keys(cart).reduce((previous, current) => {
      return previous + cart[current];
    }, 0);
  }, [cart]);

  return (
    <div className="h-screen bg-gray-100 overflow-scroll flex flex-col">
      <Navbar productCount={totalCount} />
      <div className="grow">
        <Routes>
          <Route index element={<ProductHomePage />} />
          <Route path="/ProductDetails/:id/" element={<ProductDetails onAddToCart={handleAddToCart} />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/cartPag" element={<CartPag cartitem={cart}/>} ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
