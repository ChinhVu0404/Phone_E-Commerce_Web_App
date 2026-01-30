import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  onAddToCart: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, price, onAddToCart }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <p className="text-lg font-semibold">${price.toFixed(2)}</p>
        <button
          onClick={onAddToCart}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;