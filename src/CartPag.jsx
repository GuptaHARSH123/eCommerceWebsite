import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartList from './CartList';

export function getProductsDetails(id) {
    return axios.get('https://dummyjson.com/products/' + id);
}

function CartPag({ cartitem }) {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const convertCartItemToArray = (cartitem) => {
            return Object.entries(cartitem).map(([key, value]) => ({
                id: parseInt(key, 10),
                quantity: value
            }));
        };
        const cart = convertCartItemToArray(cartitem);

        const fetchProducts = () => {
            const productPromises = cart.map(item =>
                getProductsDetails(item.id)
                    .then(response => ({
                        ...response.data,
                        quantity: item.quantity
                    }))
            );

            Promise.all(productPromises)
                .then(products => {
                    setCartItems(products);
                    calculateTotal(products);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        };

        fetchProducts();
    }, [cartitem]);

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(total);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto bg-white my-4 flex flex-col">
            <div className='border border-gray-200 p-2'>
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <CartList items={cartItems} />
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
                    <button className="mt-4 bg-primary-light text-black py-2 px-4 rounded">
                        Update Cart
                    </button>
                </div>
            </div>
            <div className="mt-6 p-4 border border-gray-200 w-1/2 self-end">
                <p className="text-lg">Subtotal: ${total.toFixed(2)}</p>
                <p className="text-lg">Total: ${total.toFixed(2)}</p>
                <button className="mt-4 bg-primary-default text-white py-2 px-4 rounded hover:bg-primary-dark">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPag;
