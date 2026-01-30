'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../../utils/api';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isLoading } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    try {
      await addToCart(product.id, 1, product);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const placeholderImage = 'https://via.placeholder.com/300x300?text=Phone';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <Link href={`/products/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-48 bg-gray-100">
          <img
            src={imageError ? placeholderImage : (product.image_url || placeholderImage)}
            alt={product.name}
            className="w-full h-full object-contain p-4"
            onError={() => setImageError(true)}
          />
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-grow">
          {product.brand && (
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {product.brand}
            </p>
          )}
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3 min-h-[2.5rem]">
            {product.description}
          </p>
          <p className="text-xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isAdding
              ? 'bg-blue-400 text-white cursor-wait'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {isAdding ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
          ) : product.stock === 0 ? (
            'Out of Stock'
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;