import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Mock cart data
  const cartItems = 3;
  
  return (
    <header className="bg-white shadow-md">
      {/* Promotional Banner */}
      <div className="bg-accent text-white text-center py-2 px-4">
        <p className="text-sm font-medium">Frete grátis acima de R$ 150</p>
      </div>
      
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Jardim dos Pets Toys</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Início</Link>
            <Link to="/categorias/pets" className="text-gray-700 hover:text-primary transition-colors">Pets</Link>
            <Link to="/categorias/casa" className="text-gray-700 hover:text-primary transition-colors">Casa</Link>
            <Link to="/categorias/jardim" className="text-gray-700 hover:text-primary transition-colors">Jardim</Link>
            <Link to="/personalizacao-3d" className="text-accent font-medium hover:text-orange-600 transition-colors">Personalização 3D</Link>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="text-gray-700 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Account */}
            <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            
            {/* Cart */}
            <button 
              className="text-gray-700 hover:text-primary transition-colors relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 border-t border-gray-200">
            <ul className="space-y-2">
              <li><Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Início</Link></li>
              <li><Link to="/categorias/pets" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Pets</Link></li>
              <li><Link to="/categorias/casa" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Casa</Link></li>
              <li><Link to="/categorias/jardim" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Jardim</Link></li>
              <li><Link to="/personalizacao-3d" className="block px-4 py-2 text-accent font-medium hover:bg-gray-100 rounded-md">Personalização 3D</Link></li>
            </ul>
          </nav>
        )}
        
        {/* Mini Cart */}
        {isCartOpen && (
          <div className="absolute right-4 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Seu Carrinho</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {cartItems > 0 ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="h-16 w-16 bg-gray-200 rounded-md"></div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Brinquedo para Cachorro</h4>
                        <p className="text-sm text-gray-500">R$ 39,90</p>
                        <div className="flex items-center mt-1">
                          <button className="text-gray-500 hover:text-primary">-</button>
                          <span className="mx-2 text-sm">1</span>
                          <button className="text-gray-500 hover:text-primary">+</button>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-16 w-16 bg-gray-200 rounded-md"></div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Comedouro Personalizado</h4>
                        <p className="text-sm text-gray-500">R$ 59,90</p>
                        <div className="flex items-center mt-1">
                          <button className="text-gray-500 hover:text-primary">-</button>
                          <span className="mx-2 text-sm">2</span>
                          <button className="text-gray-500 hover:text-primary">+</button>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-4">Seu carrinho está vazio</p>
                )}
              </div>
              
              {cartItems > 0 && (
                <>
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Subtotal:</span>
                      <span className="font-medium">R$ 159,70</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Frete calculado no checkout</p>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Link to="/carrinho" className="btn-primary w-full text-center block">
                      Ver Carrinho
                    </Link>
                    <Link to="/checkout" className="btn-secondary w-full text-center block">
                      Finalizar Compra
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;