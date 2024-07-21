import React from 'react';
import {Link} from 'react-router-dom';
import { IoBagOutline } from "react-icons/io5";
function Navbar({productCount}){
  console.log("Navbar is running..");
  return(
    <div className="py-4 bg-white shadow-lg">
      <div className="max-w-5xl flex justify-between mx-auto px-9  ">
        
        <img
        className="h-16"
        src="./amazon_logo.svg"
        alt="Amazon Logo"/>
       
        <div className="flex flex-col justify-center items-center relative ">
        <span className="text-5xl text-primary-default ">
         <Link to= {"/CartPag"} ><IoBagOutline /></Link>
        </span>
        <span className="text-primary-default text-sm absolute bottom-4">{productCount}</span>
         </div>
      </div>
          
    </div>
    
  );
}
export default React.memo(Navbar);