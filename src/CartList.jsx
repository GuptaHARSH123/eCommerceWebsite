import React from 'react';
import CartRow from './CartRow';

function CartList({ items, localCart, updateCart, setLocalCart }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Product</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Quantity</th>
                        <th className="py-2 px-4 border-b">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <CartRow 
                            key={item.id} 
                            item={item} 
                            localCart={localCart} 
                            updateCart={updateCart}  
                            setLocalCart={setLocalCart} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CartList;
