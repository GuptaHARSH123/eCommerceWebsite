import React, { useContext } from "react";
import { cartContext } from "./providers/CartProvider"; 
function withCart(IncomingComponent) {
  return function OutgoingComponent(props) {
    const {cart, totalCount ,handleAddToCart , updateCart } = useContext(cartContext);
    return <IncomingComponent {...props} cart={cart} totalCount={totalCount} handleAddToCart={handleAddToCart} updateCart={updateCart} />;
  };
}

export default withCart;
