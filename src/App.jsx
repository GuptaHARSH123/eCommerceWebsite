import React, { useState, useMemo, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './productlist';
import Box from './box';
import ProductDetails from './ProductDetails';
import ProductHomePage from "./ProductHomePage";
import Navbar from './Navbar';
import Footer from './Footer';
import Notfound from './Notfound';
import { getProductsDetails } from './api';

let data = localStorage.getItem("hello");
console.log(data);

function cart() {
  const a = { 1: 3, 2: 5, 8: 10 };
  const promises = Object.keys(a).map(b => getProductsDetails(b));
  Promise.all(promises).then(responses => {
    console.log(responses[2].data);
  });
}
cart();

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
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
