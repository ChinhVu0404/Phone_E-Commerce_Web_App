import React from 'react';
import { Product } from '../../types';

interface ProductDetailsProps {
    product: Product | null;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details p-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto max-w-md" />
            <p className="mt-4">{product.description}</p>
            <p className="mt-2 text-lg font-semibold">${product.price.toFixed(2)}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductDetails;