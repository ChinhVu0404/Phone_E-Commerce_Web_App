'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-900 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 text-white">
                        <span className="text-2xl">📱</span>
                        <span className="text-xl font-bold">PhoneShop</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            href="/" 
                            className="text-gray-300 hover:text-white font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <Link 
                            href="/products" 
                            className="text-gray-300 hover:text-white font-medium transition-colors"
                        >
                            Products
                        </Link>
                        <Link 
                            href="/cart" 
                            className="relative text-gray-300 hover:text-white font-medium transition-colors flex items-center"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="ml-1">Cart</span>
                        </Link>
                        <Link 
                            href="/checkout" 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Checkout
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-300 hover:text-white"
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

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-700">
                        <div className="flex flex-col space-y-3">
                            <Link 
                                href="/" 
                                className="text-gray-300 hover:text-white font-medium py-2 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/products" 
                                className="text-gray-300 hover:text-white font-medium py-2 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Products
                            </Link>
                            <Link 
                                href="/cart" 
                                className="text-gray-300 hover:text-white font-medium py-2 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Cart
                            </Link>
                            <Link 
                                href="/checkout" 
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;