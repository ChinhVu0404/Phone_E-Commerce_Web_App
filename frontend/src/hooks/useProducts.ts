'use client';

import { useEffect, useState } from 'react';
import { productApi, Product, ApiError } from '../utils/api';

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
                        setError('Unable to connect to server. Please make sure the backend is running.');
                    } else {
                        setError(err.message);
                    }
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const refetch = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productApi.getAll();
            setProducts(data);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Failed to fetch products');
            }
        } finally {
            setLoading(false);
        }
    };

    return { products, loading, error, refetch };
};

export default useProducts;