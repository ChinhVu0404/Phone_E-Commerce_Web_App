/**
 * Centralized API client for the Phone E-commerce App
 * Handles all communication with the FastAPI backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Custom error class for API errors
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-OK responses
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { detail: response.statusText };
      }
      
      throw new ApiError(
        errorData.detail || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    // Handle empty responses (204 No Content)
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network errors or other issues
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error - Is the backend running?',
      0
    );
  }
}

// ============ PRODUCT API ============

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  brand?: string;
  category?: string;
  specs?: Record<string, string>;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export const productApi = {
  getAll: () => fetchApi<Product[]>('/products/'),
  
  getById: (id: number) => fetchApi<Product>(`/products/${id}`),
  
  create: (product: ProductCreate) => 
    fetchApi<Product>('/products/', {
      method: 'POST',
      body: JSON.stringify(product),
    }),
  
  update: (id: number, product: ProductUpdate) =>
    fetchApi<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),
  
  delete: (id: number) =>
    fetchApi<{ message: string }>(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// ============ CART API ============

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product?: Product;
}

export interface AddToCartRequest {
  product_id: number;
  quantity: number;
}

export const cartApi = {
  get: () => fetchApi<CartItem[]>('/cart/'),
  
  addItem: (item: AddToCartRequest) =>
    fetchApi<{ message: string; cart_id: number }>('/cart/', {
      method: 'POST',
      body: JSON.stringify(item),
    }),
  
  updateItem: (cartItemId: number, quantity: number) =>
    fetchApi<{ message: string }>(`/cart/${cartItemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),
  
  removeItem: (cartItemId: number) =>
    fetchApi<{ message: string }>(`/cart/${cartItemId}`, {
      method: 'DELETE',
    }),
};

// ============ CHAT API ============

export interface ChatRequest {
  message: string;
  user_id?: string;
}

export interface ChatResponse {
  response: string;
  success: boolean;
}

export const chatApi = {
  sendMessage: (message: string, userId?: string) =>
    fetchApi<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, user_id: userId }),
    }),
};

// ============ ORDER API ============

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  status: string;
  created_at: string;
}

export interface CreateOrderRequest {
  items: { product_id: number; quantity: number }[];
  shipping_address: string;
  payment_method: string;
}

export const orderApi = {
  getAll: () => fetchApi<Order[]>('/orders/'),
  
  getById: (id: number) => fetchApi<Order>(`/orders/${id}`),
  
  create: (order: CreateOrderRequest) =>
    fetchApi<Order>('/orders/', {
      method: 'POST',
      body: JSON.stringify(order),
    }),
};

// ============ HEALTH CHECK ============

export const healthApi = {
  check: () => fetchApi<{ status: string }>('/health'),
};

// Default export for convenience
const api = {
  products: productApi,
  cart: cartApi,
  chat: chatApi,
  orders: orderApi,
  health: healthApi,
};

export default api;
