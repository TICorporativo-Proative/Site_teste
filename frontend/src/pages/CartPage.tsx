import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const CartPage = () => {
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Comedouro Personalizado',
      price: 59.90,
      quantity: 1,
      image: 'https://via.placeholder.com/100x100',
      customization: 'Nome: Rex, Cor: Azul'
    },
    {
      id: 2,
      name: 'Porta Petiscos',
      price: 45.90,
      quantity: 2,
      image: 'https://via.placeholder.com/100x100',
      customization: 'Cor: Verde'
    },
    {
      id: 3,
      name: 'Brinquedo Interativo',
      price: 39.90,
      quantity: 1,
      image: 'https://via.placeholder.com/100x100',
      customization: null
    }
  ]);
  
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [zipCode, setZipCode] = useState('');
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<number | null>(null);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate shipping cost
  const shippingCost = selectedShipping !== null ? shippingOptions[selectedShipping].price : 0;
  
  // Calculate total
  const total = subtotal - couponDiscount + shippingCost;
  
  // Check if free shipping applies
  const freeShippingThreshold = 150;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;
  
  // Handle quantity change
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Handle item removal
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Handle coupon application
  const handleApplyCoupon = () => {
    // In a real app, this would validate the coupon with an API
    if (couponCode.toUpperCase() === 'PETS10') {
      setCouponApplied(true);
      setCouponDiscount(subtotal * 0.1); // 10% discount
    } else {
      alert('Cupom inválido');
    }
  };
  
  // Handle shipping calculation
  const handleCalculateShipping = () => {
    // In a real app, this would call a shipping API
    if (zipCode.length === 8 || zipCode.length === 9) {
      setShippingOptions([
        { id: 1, name: 'PAC', price: qualifiesForFreeShipping ? 0 : 15.90, days: '3-5 dias úteis' },
        { id: 2, name: 'SEDEX', price: 25.90, days: '1-2 dias úteis' }
      ]);
      setSelectedShipping(0);
    } else {
      alert('CEP inválido');
    }
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };
  
  // Handle ZIP code input
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setZipCode(value);
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Itens do Carrinho ({cartItems.length})</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-24 sm:h-24 flex-shrink-0 mb-4 sm:mb-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-1 sm:ml-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                              {item.customization && (
                                <p className="mt-1 text-sm text-gray-500">{item.customization}</p>
                              )}
                              <p className="mt-1 text-lg font-medium text-gray-900">{formatCurrency(item.price)}</p>
                            </div>
                            
                            <div className="mt-4 sm:mt-0">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-800"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-800"
                                >
                                  +
                                </button>
                              </div>
                              
                              <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Remover
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between">
                    <Link to="/" className="text-primary hover:text-blue-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Continuar Comprando
                    </Link>
                    
                    <button 
                      onClick={() => setCartItems([])}
                      className="text-gray-600 hover:text-gray-800 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Limpar Carrinho
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Resumo do Pedido</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto (Cupom: {couponCode.toUpperCase()})</span>
                      <span>-{formatCurrency(couponDiscount)}</span>
                    </div>
                  )}
                  
                  {selectedShipping !== null && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Frete ({shippingOptions[selectedShipping].name})
                        {qualifiesForFreeShipping && shippingOptions[selectedShipping].price === 0 && (
                          <span className="text-green-600 ml-1">(Grátis)</span>
                        )}
                      </span>
                      <span className="text-gray-900 font-medium">{formatCurrency(shippingCost)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(total)}</span>
                  </div>
                  
                  {/* Coupon Code */}
                  <div className="mt-6">
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                      Cupom de Desconto
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Digite seu cupom"
                        className="input-field rounded-r-none flex-1"
                        disabled={couponApplied}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={couponApplied || !couponCode}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="mt-1 text-sm text-green-600">Cupom aplicado com sucesso!</p>
                    )}
                  </div>
                  
                  {/* Shipping Calculator */}
                  <div className="mt-6">
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                      Calcular Frete
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="zipCode"
                        value={zipCode}
                        onChange={handleZipCodeChange}
                        placeholder="Digite seu CEP"
                        className="input-field rounded-r-none flex-1"
                        maxLength={9}
                      />
                      <button
                        onClick={handleCalculateShipping}
                        disabled={zipCode.length < 8}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Calcular
                      </button>
                    </div>
                    
                    {shippingOptions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {shippingOptions.map((option, index) => (
                          <div key={option.id} className="flex items-center">
                            <input
                              type="radio"
                              id={`shipping-${option.id}`}
                              name="shipping"
                              checked={selectedShipping === index}
                              onChange={() => setSelectedShipping(index)}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            />
                            <label htmlFor={`shipping-${option.id}`} className="ml-2 flex flex-1 justify-between text-sm text-gray-900">
                              <span>{option.name} ({option.days})</span>
                              <span>
                                {option.price === 0 ? (
                                  <span className="text-green-600 font-medium">Grátis</span>
                                ) : (
                                  formatCurrency(option.price)
                                )}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {qualifiesForFreeShipping && (
                      <p className="mt-2 text-sm text-green-600">
                        Você ganhou frete grátis para PAC em compras acima de {formatCurrency(freeShippingThreshold)}!
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="btn-primary w-full text-center block"
                    >
                      Finalizar Compra
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Secure Checkout */}
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Pagamento Seguro</h3>
                <div className="flex items-center space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm text-gray-600">Seus dados estão protegidos por criptografia SSL</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-8">
              Parece que você ainda não adicionou nenhum item ao seu carrinho.
            </p>
            <Link to="/" className="btn-primary">
              Continuar Comprando
            </Link>
          </div>
        )}
        
        {/* Recommended Products */}
        {cartItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Você também pode gostar</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <img 
                      src={`https://via.placeholder.com/300x300`} 
                      alt={`Produto recomendado ${id}`} 
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">Produto Recomendado {id}</h3>
                    <p className="text-gray-700 font-bold mt-1">R$ 49,90</p>
                    
                    <button className="mt-3 w-full bg-gray-100 text-gray-800 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors">
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;