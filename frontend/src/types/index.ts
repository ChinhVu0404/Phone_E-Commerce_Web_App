export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

export type ChatMessage = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp?: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
};