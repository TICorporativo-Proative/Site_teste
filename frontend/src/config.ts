// Site configuration
export const SITE_CONFIG = {
  name: 'Jardim dos Pets Toys',
  description: 'Produtos personalizados para pets com impressão 3D',
  url: 'https://jardimpets.com.br',
  logo: '/logo.svg',
  email: 'contato@jardimpets.com.br',
  phone: '(11) 99999-9999',
  address: 'Rua das Flores, 123 - São Paulo, SP',
  socialMedia: {
    facebook: 'https://facebook.com/jardimpets',
    instagram: 'https://instagram.com/jardimpets',
    twitter: 'https://twitter.com/jardimpets',
    youtube: 'https://youtube.com/jardimpets',
  },
};

// API configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  withCredentials: true,
};

// Authentication configuration
export const AUTH_CONFIG = {
  tokenKey: 'jardim_pets_token',
  userKey: 'jardim_pets_user',
  expiresKey: 'jardim_pets_expires',
};

// 3D Printing configuration
export const PRINTING_CONFIG = {
  maxFileSize: 25 * 1024 * 1024, // 25MB
  supportedFormats: ['stl'],
  materials: [
    { id: 'PLA', name: 'PLA', price: 0.15, description: 'Econômico e biodegradável' },
    { id: 'ABS', name: 'ABS', price: 0.20, description: 'Resistente e durável' },
    { id: 'PETG', name: 'PETG', price: 0.25, description: 'Resistente a impactos e água' },
    { id: 'TPU', name: 'TPU', price: 0.30, description: 'Flexível e elástico' },
  ],
  colors: [
    { id: 'blue', value: '#2196F3', name: 'Azul' },
    { id: 'green', value: '#4CAF50', name: 'Verde' },
    { id: 'orange', value: '#FF9800', name: 'Laranja' },
    { id: 'red', value: '#F44336', name: 'Vermelho' },
    { id: 'purple', value: '#9C27B0', name: 'Roxo' },
    { id: 'black', value: '#000000', name: 'Preto' },
    { id: 'white', value: '#FFFFFF', name: 'Branco' },
  ],
  qualities: [
    { id: 'low', name: 'Baixa (0.3mm)', multiplier: 0.8 },
    { id: 'medium', name: 'Média (0.2mm)', multiplier: 1.0 },
    { id: 'high', name: 'Alta (0.1mm)', multiplier: 1.3 },
  ],
  infills: [
    { id: '20', name: 'Padrão (20%)', multiplier: 1.0 },
    { id: '50', name: 'Médio (50%)', multiplier: 1.2 },
    { id: '80', name: 'Alto (80%)', multiplier: 1.4 },
    { id: '100', name: 'Sólido (100%)', multiplier: 1.6 },
  ],
};

// Shipping configuration
export const SHIPPING_CONFIG = {
  freeShippingThreshold: 150,
  methods: [
    { id: 'PAC', name: 'PAC', days: '3-5 dias úteis' },
    { id: 'SEDEX', name: 'SEDEX', days: '1-2 dias úteis' },
  ],
};

// Payment configuration
export const PAYMENT_CONFIG = {
  methods: [
    { id: 'pix', name: 'PIX', icon: 'pix.svg' },
    { id: 'credit_card', name: 'Cartão de Crédito', icon: 'credit-card.svg' },
    { id: 'boleto', name: 'Boleto Bancário', icon: 'boleto.svg' },
  ],
  installments: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  minInstallmentValue: 10,
};

// Categories configuration
export const CATEGORIES = [
  { id: 'pets', name: 'Pets', icon: 'pets.svg', description: 'Produtos para seu pet' },
  { id: 'casa', name: 'Casa', icon: 'home.svg', description: 'Decoração e utilidades para seu lar' },
  { id: 'jardim', name: 'Jardim', icon: 'garden.svg', description: 'Itens para seu jardim' },
];

// Theme configuration
export const THEME_CONFIG = {
  colors: {
    primary: '#2196F3',
    secondary: '#4CAF50',
    accent: '#FF9800',
  },
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Poppins, sans-serif',
  },
};