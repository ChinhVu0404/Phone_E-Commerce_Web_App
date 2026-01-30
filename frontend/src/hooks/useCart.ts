import { useState, useEffect } from 'react';
import { CartItemType } from '../types';

const useCart = () => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [cartItems]);

    const addToCart = (item: CartItemType) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
                );
            }
            return [...prevItems, item];
        });
    };

    const removeFromCart = (itemId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return {
        cartItems,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
    };
};

export default useCart;