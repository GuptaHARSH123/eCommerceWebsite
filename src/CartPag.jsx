import React, { useState, useEffect, useCallback } from 'react';
import CartList from './CartList';
import { getProductsDetails } from './api';
import Loading from './Loading';

function CartPag({ cartitem, updateCart }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [localCart, setLocalCart] = useState(cartitem);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const myProductPromises = Object.keys(cartitem).map((itemId) =>
                getProductsDetails(itemId)
            );
            const products = await Promise.all(myProductPromises);
            setCartItems(products);
            setLoading(false);
        };

        fetchProductDetails();
    }, [cartitem]);

    useEffect(() => {
        setLocalCart(cartitem);
    }, [cartitem]);

    useEffect(() => {
        const calculateTotal = () => {
            let newTotal = 0;
            for (let i = 0; i < cartItems.length; i++) {
                newTotal += cartItems[i].price * (localCart[cartItems[i].id] || 0);
            }
            setTotal(newTotal);
        };

        calculateTotal();
    }, [cartItems, localCart]);

    const handleUpdateCart = useCallback(() => {
        updateCart(localCart);
    }, [localCart, updateCart]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto bg-white my-4 flex flex-col">
            <div className='border border-gray-200 p-2'>
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <CartList 
                    items={cartItems} 
                    setLocalCart={setLocalCart} 
                    localCart={localCart} 
                    updateCart={updateCart} 
                />
                <div className='flex justify-between'>
                    <div>
                        <input
                            className='border py-2 px-4 rounded'
                            type="text"
                            placeholder='Enter Coupon Code'
                        />
                        <button className="mt-4 bg-primary-default text-white py-2 px-4 rounded hover:bg-primary-dark ml-2">
                            Apply Coupon Code
                        </button>
                    </div>
                    <button
                        onClick={handleUpdateCart}
                        className="mt-4 bg-primary-light text-black py-2 px-4 rounded"
                    >
                        Update Cart
                    </button>
                </div>
            </div>
            <div className="mt-6 p-4 border border-gray-200 w-1/2 self-end">
                <h1 className="text-xl font-bold  ">Cart Total</h1>
                <div className="text-lg flex justify-between"><p>Subtotal</p> <p>${total.toFixed(2)}</p></div>
                <div className="text-lg flex justify-between"><p>Total</p> <p>${total.toFixed(2)}</p></div>
                <button className="mt-4 bg-primary-default text-white py-2 px-4 rounded hover:bg-primary-dark">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default CartPag;
