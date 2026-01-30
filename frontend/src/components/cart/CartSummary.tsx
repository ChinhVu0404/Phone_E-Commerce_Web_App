'use client';

import React from 'react';
import useCart from '../../hooks/useCart';

const CartSummary: React.FC = () => {
    const { cartItems, totalPrice } = useCart();

    return (
        <div className="cart-summary p-4 border rounded mt-4">
            <h2 className="text-xl font-bold mb-2">Cart Summary</h2>
            <ul className="mb-4">
                {cartItems.map(item => (
                    <li key={item.id} className="flex justify-between py-1">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)} x {item.quantity}</span>
                    </li>
                ))}
            </ul>
            <div className="total border-t pt-2">
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
            </div>
        </div>
    );
};

export default CartSummary;