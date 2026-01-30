'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalPrice, isLoading } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    if (items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <svg className="w-24 h-24 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Add some products to your cart to get started.</p>
                <Link
                    href="/products"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                    {items.map(item => {
                        const itemPrice = item.product?.price || item.price || 0;
                        const itemName = item.product?.name || item.name || `Product #${item.product_id}`;
                        const itemImage = item.product?.image_url || item.image_url || 'https://via.placeholder.com/100x100?text=Phone';
                        
                        return (
                            <div key={item.id} className="p-6 flex items-center gap-6">
                                {/* Product Image */}
                                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img 
                                        src={itemImage}
                                        alt={itemName}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                
                                {/* Product Info */}
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-gray-800">{itemName}</h3>
                                    <p className="text-blue-600 font-medium">{formatPrice(itemPrice)}</p>
                                </div>
                                
                                {/* Quantity Controls */}
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button
                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                        disabled={item.quantity <= 1 || isLoading}
                                    >
                                        −
                                    </button>
                                    <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                        disabled={isLoading}
                                    >
                                        +
                                    </button>
                                </div>
                                
                                {/* Item Total */}
                                <div className="text-right min-w-[100px]">
                                    <p className="font-bold text-gray-800">{formatPrice(itemPrice * item.quantity)}</p>
                                </div>
                                
                                {/* Remove Button */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                    disabled={isLoading}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        );
                    })}
                </div>
                
                {/* Cart Summary */}
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                        <span className="text-2xl font-bold text-gray-800">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/products"
                            className="flex-1 text-center py-3 px-6 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                        <Link
                            href="/checkout"
                            className="flex-1 text-center py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}