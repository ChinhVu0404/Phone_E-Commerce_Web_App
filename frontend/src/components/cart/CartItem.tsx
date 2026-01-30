import React from 'react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, onRemove }) => {
  return (
    <div className="flex justify-between items-center border-b py-4">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">Price: ${price.toFixed(2)}</p>
        <p className="text-gray-600">Quantity: {quantity}</p>
      </div>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => onRemove(id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;