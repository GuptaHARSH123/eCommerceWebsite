import React from 'react';
import { CiCircleRemove } from "react-icons/ci";

function CartRow({ item, localCart, updateCart, setLocalCart }) {
    return (
        <tr>
            <td className="py-2 px-4 border-b flex items-center text-center justify-normal">
                <button  onClick={function(){
                     const newCart = { ...localCart };
                     delete newCart[item.id];
                     setLocalCart(newCart);
                     updateCart(newCart);
                }}>
                    <CiCircleRemove />
                </button>
                <img src={item.thumbnail} alt={item.title} className='h-16' />
                 <div  className='text-primary-default'>{item.title}</div>  
            </td>
            <td className="py-2 px-4 border-b text-center">
                <p>${item.price}</p> 
            </td>
           
            <td className="py-2 px-4 border-b text-center">
                <input
                    productId={item.id}
                    value={localCart[item.id]}
                    type="number"
                    min={1}
                    className="border-2 text-center w-16"
                    onChange={function(event){
                        const newValue= +event.target.value;
                        const newLocalCart = { ...localCart, [item.id]: newValue };
                        setLocalCart(newLocalCart);
                    }}
                />
            </td>
            <td className="py-2 px-4 border-b text-center">
                <p>${(item.price * localCart[item.id]).toFixed(2)}</p>
            </td>
        </tr>
    );
}

export default CartRow;
