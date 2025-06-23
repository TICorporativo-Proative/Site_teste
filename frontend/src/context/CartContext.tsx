import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SHIPPING_CONFIG } from '../config';

interface CartContextType {
  cart: Cart;
  addItem: (item: CartItem) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  calculateShipping: (zipCode: string) => Promise<void>;
  selectShippingMethod: (index: number) => void;
  itemCount: number;
}

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  discount: 0,
  shipping: 0,
  total: 0,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<number | null>(null);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart data:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
  }, [cart]);
  
  // Calculate subtotal, total whenever items change
  useEffect(() => {
    const newSubtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const newTotal = newSubtotal - cart.discount + cart.shipping;
    
    setCart(prev => ({
      ...prev,
      subtotal: newSubtotal,
      total: newTotal,
    }));
  }, [cart.items, cart.discount, cart.shipping]);
  
  const addItem = (item: CartItem) => {
    setCart(prev => {
      // Check if item already exists in cart
      const existingItemIndex = prev.items.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prev.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity,
        };
        
        return {
          ...prev,
          items: updatedItems,
        };
      } else {
        // Add new item
        return {
          ...prev,
          items: [...prev.items, item],
        };
      }
    });
  };
  
  const updateItemQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  };
  
  const removeItem = (id: number) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };
  
  const clearCart = () => {
    setCart(initialCart);
    setShippingOptions([]);
    setSelectedShipping(null);
  };
  
  const applyCoupon = (code: string) => {
    // In a real app, this would validate the coupon with an API
    if (code.toUpperCase() === 'PETS10') {
      setCart(prev => ({
        ...prev,
        couponCode: code.toUpperCase(),
        discount: prev.subtotal * 0.1, // 10% discount
      }));
      return true;
    }
    return false;
  };
  
  const removeCoupon = () => {
    setCart(prev => ({
      ...prev,
      couponCode: undefined,
      discount: 0,
    }));
  };
  
  const calculateShipping = async (zipCode: string) => {
    // In a real app, this would call a shipping API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const qualifiesForFreeShipping = cart.subtotal >= SHIPPING_CONFIG.freeShippingThreshold;
      
      const options = [
        { 
          id: 1, 
          name: 'PAC', 
          price: qualifiesForFreeShipping ? 0 : 15.90, 
          days: '3-5 dias úteis' 
        },
        { 
          id: 2, 
          name: 'SEDEX', 
          price: 25.90, 
          days: '1-2 dias úteis' 
        }
      ];
      
      setShippingOptions(options);
      setSelectedShipping(0);
      
      // Update cart with shipping cost
      setCart(prev => ({
        ...prev,
        shipping: options[0].price,
      }));
      
      return options;
    } catch (error) {
      console.error('Failed to calculate shipping:', error);
      throw error;
    }
  };
  
  const selectShippingMethod = (index: number) => {
    if (index >= 0 && index < shippingOptions.length) {
      setSelectedShipping(index);
      
      setCart(prev => ({
        ...prev,
        shipping: shippingOptions[index].price,
      }));
    }
  };
  
  // Calculate total number of items in cart
  const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
  
  const value = {
    cart,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    calculateShipping,
    selectShippingMethod,
    itemCount,
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};