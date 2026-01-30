'use client';

import React from 'react';
import ProductList from '../../components/products/ProductList';

export default function ProductsPage() {
    return (
        <div className="container mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Product Catalog</h1>
                <p className="text-gray-600">Browse our selection of the latest smartphones</p>
            </div>
            <ProductList initialLoad={true} />
        </div>
    );
}