'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductDetails from '../../../components/products/ProductDetails';
import { Product } from '../../../types';

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        try {
          const response = await fetch(`/api/products/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
          const data = await response.json();
          setProduct(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        } finally {
          setLoading(false);
        }
      };
      getProduct();
    }
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!product) return <div className="p-4">Product not found</div>;

  return <ProductDetails product={product} />;
}