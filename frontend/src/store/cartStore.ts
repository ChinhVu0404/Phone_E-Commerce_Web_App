import { CartItemType } from '../types';

interface CartState {
    items: CartItemType[];
    total: number;
}

const createCartStore = () => {
    let state: CartState = {
        items: [],
        total: 0,
    };
    const listeners: Set<() => void> = new Set();

    const calculateTotal = () => {
        state.total = state.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    };

    const notify = () => {
        listeners.forEach((listener) => listener());
    };

    return {
        getState: () => state,
        subscribe: (listener: () => void) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        addItem: (item: CartItemType) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                state.items = state.items.map((i) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            } else {
                state.items = [...state.items, item];
            }
            calculateTotal();
            notify();
        },
        removeItem: (itemId: string) => {
            state.items = state.items.filter((item) => item.id !== itemId);
            calculateTotal();
            notify();
        },
        clearCart: () => {
            state = { items: [], total: 0 };
            notify();
        },
    };
};

const cartStore = createCartStore();
export default cartStore;