import {useState , createContext, useCallback , useMemo,useEffect} from "react"
import withUser from "../withUser";
import { saveCart } from "../api";
import { getCart } from "../api";

export const cartContext = createContext();
function  CartProvider({user, children}){
  const [cart, setCart] = useState({});
  useEffect(function(){
    if(!user){
      const savedDataString = localStorage.getItem('myCartItem') || "{}";
      const savedData = JSON.parse(savedDataString);
      setCart(savedData);
     }
    else{
       getCart().then(function(data){
        console.log("data is " ,data );
        
         setCart(data);
      })
    }  
  },[user]);
   
    const handleAddToCart = useCallback((productId, count) => {
      const oldCount = cart[productId] || 0;
      const newCart = { ...cart, [productId]: oldCount + count };
      updateCart(newCart);
    }, [cart]);
  
    const updateCart = (newCart) => {
      if(!user){
      setCart(newCart);
      const cartString = JSON.stringify(newCart);
      localStorage.setItem('myCartItem', cartString);
      }
      else{
         saveCart(newCart);
         setCart(newCart)
      }
    };
  
    const totalCount = useMemo(() => {
      return Object.keys(cart).reduce((previous, current) => {
        return previous + cart[current];
      }, 0);
    }, [cart]);
  
    
  
  
  return (<cartContext.Provider value={{  cart, totalCount ,handleAddToCart , updateCart }}>
  {children}
  </cartContext.Provider>);
}
export default  withUser(CartProvider);