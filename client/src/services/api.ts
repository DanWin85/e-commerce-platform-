import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Add this for CORS
});

// Products API
export const productsApi = {
  getAll: (params?: { category?: string; search?: string; page?: number; limit?: number }) =>
    api.get('/api/products', { params }),
  
  getById: (id: string) =>
    api.get(`/api/products/${id}`),
  
  getCategories: () =>
    api.get('/api/categories'),
};

// Orders API
export const ordersApi = {
  create: (orderData: {
    items: Array<{ productId: string; quantity: number }>;
    customerInfo: any;
    shippingAddress: any;
    paymentIntentId?: string;
  }) => api.post('/api/orders', orderData),
};

// Stats API (for demo purposes)
export const statsApi = {
  get: () => api.get('/api/stats'),
};

export default api;