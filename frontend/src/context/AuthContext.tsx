import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AUTH_CONFIG } from '../config';
import apiService from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
    const storedUser = localStorage.getItem(AUTH_CONFIG.userKey);
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem(AUTH_CONFIG.tokenKey);
        localStorage.removeItem(AUTH_CONFIG.userKey);
      }
    }
    
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call the API
      // For demo purposes, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 1,
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : 'customer',
        createdAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Store auth data
      localStorage.setItem(AUTH_CONFIG.tokenKey, mockToken);
      localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(mockUser));
      localStorage.setItem(AUTH_CONFIG.expiresKey, (Date.now() + 24 * 60 * 60 * 1000).toString());
      
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (userData: any) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call the API
      // For demo purposes, we'll simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 1,
        name: userData.name,
        email: userData.email,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Store auth data
      localStorage.setItem(AUTH_CONFIG.tokenKey, mockToken);
      localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(mockUser));
      localStorage.setItem(AUTH_CONFIG.expiresKey, (Date.now() + 24 * 60 * 60 * 1000).toString());
      
      setUser(mockUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    // Clear auth data
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
    localStorage.removeItem(AUTH_CONFIG.userKey);
    localStorage.removeItem(AUTH_CONFIG.expiresKey);
    
    setUser(null);
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isLoading,
    login,
    register,
    logout,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};