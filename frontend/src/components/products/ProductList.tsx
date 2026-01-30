'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { productApi, ApiError, Product } from '../../utils/api';

interface ProductListProps {
  products?: Product[];
  initialLoad?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products: propProducts, initialLoad = true }) => {
  const [products, setProducts] = useState<Product[]>(propProducts || []);
  const [loading, setLoading] = useState(initialLoad && !propProducts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If products are passed as props, use them
    if (propProducts) {
      setProducts(propProducts);
      setLoading(false);
      return;
    }

    // Otherwise, fetch from API
    if (!initialLoad) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await productApi.getAll();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        
        if (err instanceof ApiError) {
          if (err.status === 0) {
            setError('Unable to connect to the server. Please make sure the backend is running on http://localhost:8000');
          } else {
            setError(`Failed to load products: ${err.message}`);
          }
        } else {
          setError('An unexpected error occurred while loading products.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [propProducts, initialLoad]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-4">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-red-800 font-semibold mb-1">Failed to Load Products</h3>
            <p className="text-red-600 text-sm mb-3">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 className="text-gray-600 font-medium mb-2">No Products Found</h3>
        <p className="text-gray-500 text-sm">Check back later for new arrivals!</p>
      </div>
    );
  }

  // Success state with product grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;