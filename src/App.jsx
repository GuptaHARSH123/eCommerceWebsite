import React, {useState} from 'react';
import ProductList from './productlist';
import Box from './box';
import ProductDetails from './ProductDetails';
import ProductHomePage from "./ProductHomePage";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './footer'
import Notfound from './Notfound';


function App() {
const savedDataString = localStorage.getItem('myCartItem')|| "{}";
  const savedData=JSON.parse(savedDataString);
  
  const[cart , setCart]=useState(savedData);
  function handleAddToCart(productId, count) {
    const oldCount = cart[productId] || 0;
    const newCart= {...cart, [productId]: oldCount + count};
    setCart(newCart);
    console.log(cart);
    const cartString=JSON.stringify(newCart);
    localStorage.setItem('myCartItem',cartString);
  }

  const totalCount = Object.keys(cart).reduce((previous, current) => {
    return previous + cart[current];
  }, 0);
  
   return (
     <div className="h-screen bg-gray-100 overflow-scroll flex flex-col"> 
       <Navbar productCount={totalCount}/> 
       <div className="grow"> 
     <Routes >
       <Route
        index element={<ProductHomePage/>}
        ></Route>
       <Route
        path="/ProductDetails/:id/"
        element={<ProductDetails onAddToCart={handleAddToCart}  />}
         ></Route>
       <Route
         path="*"
        element={<Notfound/>}
         ></Route>
      </Routes>
        </div>
        <Footer/>
     </div>
     
   
  );
}

export default App;
