import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG, AUTH_CONFIG } from '../config';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  withCredentials: API_CONFIG.withCredentials,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // In a real app, we would refresh the token here
        // For demo purposes, we'll just clear the auth data
        localStorage.removeItem(AUTH_CONFIG.tokenKey);
        localStorage.removeItem(AUTH_CONFIG.userKey);
        localStorage.removeItem(AUTH_CONFIG.expiresKey);
        
        // Redirect to login
        window.location.href = '/login';
        
        return Promise.reject(error);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// API service
const apiService = {
  // Auth
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (userData: any) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  
  // Products
  getProducts: (params?: any) => api.get('/products', { params }),
  getProduct: (id: number) => api.get(`/products/${id}`),
  
  // Categories
  getCategories: () => api.get('/categories'),
  getCategory: (id: string) => api.get(`/categories/${id}`),
  
  // Cart
  getCart: () => api.get('/cart'),
  addToCart: (productId: number, quantity: number, customization?: any) => 
    api.post('/cart/add', { productId, quantity, customization }),
  updateCartItem: (itemId: number, quantity: number) => 
    api.put(`/cart/items/${itemId}`, { quantity }),
  removeCartItem: (itemId: number) => api.delete(`/cart/items/${itemId}`),
  applyCoupon: (code: string) => api.post('/cart/coupon', { code }),
  
  // Orders
  createOrder: (orderData: any) => api.post('/orders', orderData),
  getOrders: () => api.get('/orders'),
  getOrder: (id: string) => api.get(`/orders/${id}`),
  
  // User
  getProfile: () => api.get('/user/profile'),
  updateProfile: (userData: any) => api.put('/user/profile', userData),
  
  // Addresses
  getAddresses: () => api.get('/user/addresses'),
  addAddress: (addressData: any) => api.post('/user/addresses', addressData),
  updateAddress: (id: number, addressData: any) => api.put(`/user/addresses/${id}`, addressData),
  deleteAddress: (id: number) => api.delete(`/user/addresses/${id}`),
  
  // 3D Models
  getModels: () => api.get('/user/models'),
  uploadModel: (formData: FormData) => 
    api.post('/user/models', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  deleteModel: (id: number) => api.delete(`/user/models/${id}`),
  
  // Shipping
  calculateShipping: (zipCode: string, items: any[]) => 
    api.post('/shipping/calculate', { zipCode, items }),
  
  // Admin
  admin: {
    // Products
    getProducts: (params?: any) => api.get('/admin/products', { params }),
    createProduct: (productData: any) => api.post('/admin/products', productData),
    updateProduct: (id: number, productData: any) => api.put(`/admin/products/${id}`, productData),
    deleteProduct: (id: number) => api.delete(`/admin/products/${id}`),
    
    // Orders
    getOrders: (params?: any) => api.get('/admin/orders', { params }),
    updateOrderStatus: (id: string, status: string) => 
      api.put(`/admin/orders/${id}/status`, { status }),
    
    // Customers
    getCustomers: (params?: any) => api.get('/admin/customers', { params }),
    getCustomer: (id: number) => api.get(`/admin/customers/${id}`),
    
    // Printers
    getPrinters: () => api.get('/admin/printers'),
    createPrinter: (printerData: any) => api.post('/admin/printers', printerData),
    updatePrinter: (id: number, printerData: any) => api.put(`/admin/printers/${id}`, printerData),
    deletePrinter: (id: number) => api.delete(`/admin/printers/${id}`),
    
    // Materials
    getMaterials: () => api.get('/admin/materials'),
    createMaterial: (materialData: any) => api.post('/admin/materials', materialData),
    updateMaterial: (id: number, materialData: any) => api.put(`/admin/materials/${id}`, materialData),
    deleteMaterial: (id: number) => api.delete(`/admin/materials/${id}`),
    
    // Print Queue
    getPrintQueue: () => api.get('/admin/print-queue'),
    updatePrintJob: (id: number, jobData: any) => api.put(`/admin/print-queue/${id}`, jobData),
    
    // Settings
    getSettings: () => api.get('/admin/settings'),
    updateSettings: (settingsData: any) => api.put('/admin/settings', settingsData),
  },
};

export default apiService;