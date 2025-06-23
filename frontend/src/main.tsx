import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Set up global variables
window.SITE_CONFIG = {
  siteName: 'Jardim dos Pets Toys',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  defaultCurrency: 'BRL',
  defaultLanguage: 'pt-BR',
  version: '1.0.0',
};

// Create a custom event for cart updates
window.addEventListener('cart-updated', (e: Event) => {
  console.log('Cart updated:', e);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
