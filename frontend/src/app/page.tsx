import React from 'react';
import Link from 'next/link';
import ProductList from '../components/products/ProductList';

export default function HomePage() {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 md:p-12">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome to PhoneShop
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8">
                        Discover the latest smartphones at unbeatable prices. From iPhone to Samsung, we&apos;ve got you covered.
                    </p>
                    <Link 
                        href="/products"
                        className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                    >
                        Shop Now →
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-4xl mb-4">🚚</div>
                    <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
                    <p className="text-gray-600">Free delivery on all orders over $50</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
                    <p className="text-gray-600">100% secure payment processing</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-4xl mb-4">💬</div>
                    <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                    <p className="text-gray-600">Dedicated support team ready to help</p>
                </div>
            </section>

            {/* Featured Products */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
                    <Link href="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                        View All →
                    </Link>
                </div>
                <ProductList initialLoad={true} />
            </section>
        </div>
    );
}