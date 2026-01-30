'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
    const { totalItems } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl">📱</span>
                        <span className="text-xl font-bold text-gray-800">PhoneShop</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link 
                            href="/" 
                            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <Link 
                            href="/products" 
                            className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                        >
                            Products
                        </Link>
                    </nav>

                    {/* Right Side - Cart */}
                    <div className="flex items-center space-x-4">
                        {/* Cart Icon */}
                        <Link 
                            href="/cart" 
                            className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-blue-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <nav className="flex flex-col space-y-3">
                            <Link 
                                href="/" 
                                className="text-gray-600 hover:text-blue-600 font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/products" 
                                className="text-gray-600 hover:text-blue-600 font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Products
                            </Link>
                            <Link 
                                href="/cart" 
                                className="text-gray-600 hover:text-blue-600 font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Cart ({totalItems})
                            </Link>
                            <Link 
                                href="/checkout" 
                                className="text-gray-600 hover:text-blue-600 font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Checkout
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;