import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">📱 PhoneShop</h3>
                        <p className="text-sm leading-relaxed">
                            Your trusted destination for the latest smartphones at unbeatable prices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                            <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
                            <li><Link href="/checkout" className="hover:text-white transition-colors">Checkout</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                                <span className="mr-2">📧</span>
                                support@phoneshop.com
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">📞</span>
                                1-800-PHONES
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">📍</span>
                                123 Tech Street, Silicon Valley
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} PhoneShop. All rights reserved.</p>
                    <p className="mt-2">
                        <a href="#" className="text-gray-400 hover:text-white mr-4">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;