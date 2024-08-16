import React from 'react';
import {Link} from 'react-router-dom';
function Product({title,category,price,thumbnail,id}){
  console.log("Product is running...");
  return (
    <div className="max-w-xs mx-auto hover:bg-gray-100  flex flex-col">
      <div className="w-full aspect-square">
      <img className="w-full h-full object-cover" src={thumbnail} alt="product Image" />
      </div>
      
      <div className="grow"></div>
        <p className="text-gray-500">{title}</p>
        <h1>{category}</h1>
        <div className="w-4 flex">
         <img src="./star.svg" alt="star"/>
          <img src="./star.svg" alt="star"/>
          <img src="./star.svg" alt="star"/>
          <img src="./star.svg" alt="star"/>
          <img src="./star.svg" alt="star"/>
        </div>
        <h2>Rs{price}</h2>
       <Link className=' text-white  py-1 text-center rounded-md  hover:bg-primary-dark bg-primary-default my-4' to= {"/ProductDetails/"+ id} >View Details</Link>
    </div>
    
  );
}
export default  React.memo(Product);