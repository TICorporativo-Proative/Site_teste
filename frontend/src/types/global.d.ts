interface Window {
  SITE_CONFIG: {
    siteName: string;
    apiUrl: string;
    defaultCurrency: string;
    defaultLanguage: string;
    version: string;
  };
}

// Product types
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  customizable: boolean;
  featured: boolean;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

// Cart types
interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization?: string | null;
}

interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode?: string;
}

// User types
interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

interface Address {
  id: number;
  userId: number;
  type: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

// Order types
interface Order {
  id: string;
  userId: number;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  customization?: string | null;
}

// 3D Model types
interface Model3D {
  id: number;
  userId: number;
  name: string;
  fileUrl: string;
  thumbnailUrl: string;
  fileSize: number;
  volume: number;
  createdAt: string;
}

// Material types
interface Material {
  id: number;
  name: string;
  description: string;
  pricePerGram: number;
  color: string;
  inStock: boolean;
  stockAmount: number;
  unit: string;
}

// Printer types
interface Printer {
  id: number;
  name: string;
  model: string;
  status: 'idle' | 'printing' | 'maintenance' | 'offline';
  printVolume: {
    x: number;
    y: number;
    z: number;
  };
  materials: string[];
}