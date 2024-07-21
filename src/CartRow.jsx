import React from 'react';
import { useState, useEffect } from 'react';
import { CiCircleRemove } from "react-icons/ci";

function CartRow({ item }){
    const[count, setCount]=useState(item.quantity);
    function handleCountChange(event){
        setCount(+event.target.value);
    
      }
    return (
        <tr>
            <td className="py-2 px-4 border-b flex items-center text-center justify-normal"><CiCircleRemove /><img src={item.thumbnail} alt={item.title} className='h-16'/>{item.title}</td>
            <td className="py-2 px-4 border-b text-center">${item.price.toFixed(2)}</td>
            <td className="py-2 px-4 border-b text-center"><input value={count} type="number" className="border-2 text-center w-16" onChange={handleCountChange} /></td>
            <td className="py-2 px-4 border-b text-center">${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    );
};

export default CartRow;