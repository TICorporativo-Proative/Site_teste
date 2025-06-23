import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

// Mock user addresses
const mockAddresses = [
  {
    id: 1,
    userId: 1,
    type: 'Residencial',
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 101',
    neighborhood: 'Jardim Primavera',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    isDefault: true,
  },
  {
    id: 2,
    userId: 1,
    type: 'Trabalho',
    street: 'Avenida Paulista',
    number: '1000',
    complement: 'Sala 210',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    isDefault: false,
  }
];

// Payment methods
const paymentMethods = [
  { id: 'credit_card', name: 'Cartão de Crédito', icon: 'credit-card' },
  { id: 'boleto', name: 'Boleto Bancário', icon: 'barcode' },
  { id: 'pix', name: 'PIX', icon: 'qrcode' },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: 'Residencial',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false,
  });
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: '1',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // In a real app, this would be an API call to get user addresses
    setAddresses(mockAddresses);
    
    // Set default address if available
    const defaultAddress = mockAddresses.find(addr => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
    } else if (mockAddresses.length > 0) {
      setSelectedAddressId(mockAddresses[0].id);
    }
    
    // Check if cart is empty
    if (cart.items.length === 0) {
      navigate('/carrinho');
    }
  }, [navigate, cart.items.length]);
  
  const handleAddressSelect = (addressId: number) => {
    setSelectedAddressId(addressId);
    setShowNewAddressForm(false);
  };
  
  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setNewAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateAddress = () => {
    const newErrors: Record<string, string> = {};
    
    if (showNewAddressForm) {
      if (!newAddress.street) newErrors.street = 'Rua é obrigatória';
      if (!newAddress.number) newErrors.number = 'Número é obrigatório';
      if (!newAddress.neighborhood) newErrors.neighborhood = 'Bairro é obrigatório';
      if (!newAddress.city) newErrors.city = 'Cidade é obrigatória';
      if (!newAddress.state) newErrors.state = 'Estado é obrigatório';
      if (!newAddress.zipCode) newErrors.zipCode = 'CEP é obrigatório';
      
      // Validate zipCode format (12345-678)
      if (newAddress.zipCode && !/^\d{5}-\d{3}$/.test(newAddress.zipCode)) {
        newErrors.zipCode = 'CEP inválido. Use o formato 12345-678';
      }
    } else if (!selectedAddressId) {
      newErrors.address = 'Selecione um endereço de entrega';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validatePayment = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedPaymentMethod) {
      newErrors.paymentMethod = 'Selecione um método de pagamento';
    } else if (selectedPaymentMethod === 'credit_card') {
      if (!cardInfo.number) newErrors.cardNumber = 'Número do cartão é obrigatório';
      if (!cardInfo.name) newErrors.cardName = 'Nome no cartão é obrigatório';
      if (!cardInfo.expiry) newErrors.cardExpiry = 'Data de validade é obrigatória';
      if (!cardInfo.cvv) newErrors.cardCvv = 'Código de segurança é obrigatório';
      
      // Validate card number (simplified)
      if (cardInfo.number && cardInfo.number.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Número do cartão inválido';
      }
      
      // Validate expiry date (MM/YY)
      if (cardInfo.expiry && !/^\d{2}\/\d{2}$/.test(cardInfo.expiry)) {
        newErrors.cardExpiry = 'Data inválida. Use o formato MM/AA';
      }
      
      // Validate CVV (3 or 4 digits)
      if (cardInfo.cvv && !/^\d{3,4}$/.test(cardInfo.cvv)) {
        newErrors.cardCvv = 'CVV inválido';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setCardInfo(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSaveAddress = () => {
    if (validateAddress()) {
      // In a real app, this would be an API call to save the address
      const newAddr: Address = {
        id: Date.now(),
        userId: 1, // This would come from the authenticated user
        ...newAddress as any,
      };
      
      setAddresses(prev => [...prev, newAddr]);
      setSelectedAddressId(newAddr.id);
      setShowNewAddressForm(false);
    }
  };
  
  const handleContinueToPayment = () => {
    if (validateAddress()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBackToAddress = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };
  
  const handleContinueToReview = () => {
    if (validatePayment()) {
      setStep(3);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBackToPayment = () => {
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // In a real app, this would be an API call to place the order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random order ID
      const generatedOrderId = `PET-${Date.now().toString().slice(-6)}`;
      setOrderId(generatedOrderId);
      setOrderComplete(true);
      
      // Clear the cart
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardInfo(prev => ({ ...prev, number: formattedValue }));
    
    // Clear error for this field if it exists
    if (errors.cardNumber) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.cardNumber;
        return newErrors;
      });
    }
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    setCardInfo(prev => ({ ...prev, expiry: value }));
    
    // Clear error for this field if it exists
    if (errors.cardExpiry) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.cardExpiry;
        return newErrors;
      });
    }
  };
  
  const getSelectedAddress = () => {
    return addresses.find(addr => addr.id === selectedAddressId);
  };
  
  // If order is complete, show the success page
  if (orderComplete && orderId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Pedido Realizado com Sucesso!</h1>
            <p className="text-gray-600">
              Seu pedido #{orderId} foi confirmado e está sendo processado.
            </p>
          </div>
          
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Detalhes do Pedido</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600">Número do Pedido:</span>
                <span className="font-medium">{orderId}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Data:</span>
                <span className="font-medium">{new Date().toLocaleDateString('pt-BR')}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-medium">{formatCurrency(cart.total)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Método de Pagamento:</span>
                <span className="font-medium">
                  {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name || 'Não especificado'}
                </span>
              </p>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Você receberá um e-mail de confirmação com os detalhes do seu pedido em breve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/cliente/pedidos')}>
                Ver Meus Pedidos
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Continuar Comprando
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Finalizar Compra</h1>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              step >= 2 ? 'bg-primary' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              step >= 3 ? 'bg-primary' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div className={`${step >= 1 ? 'text-primary font-medium' : 'text-gray-500'}`}>
              Endereço
            </div>
            <div className={`${step >= 2 ? 'text-primary font-medium' : 'text-gray-500'}`}>
              Pagamento
            </div>
            <div className={`${step >= 3 ? 'text-primary font-medium' : 'text-gray-500'}`}>
              Revisão
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Endereço de Entrega</h2>
                
                {errors.address && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                    {errors.address}
                  </div>
                )}
                
                {/* Saved Addresses */}
                {addresses.length > 0 && !showNewAddressForm && (
                  <div className="space-y-4 mb-6">
                    {addresses.map(address => (
                      <div 
                        key={address.id}
                        className={`border rounded-lg p-4 cursor-pointer ${
                          selectedAddressId === address.id 
                            ? 'border-primary bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleAddressSelect(address.id)}
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            <div className={`w-5 h-5 rounded-full border ${
                              selectedAddressId === address.id 
                                ? 'border-primary' 
                                : 'border-gray-300'
                            } flex items-center justify-center`}>
                              {selectedAddressId === address.id && (
                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="font-medium">{address.type}</span>
                              {address.isDefault && (
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  Padrão
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                              {address.street}, {address.number}
                              {address.complement && `, ${address.complement}`}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {address.neighborhood}, {address.city} - {address.state}
                            </p>
                            <p className="text-gray-600 text-sm">
                              CEP: {address.zipCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add New Address Button */}
                {!showNewAddressForm && (
                  <button
                    className="text-primary hover:text-primary-dark flex items-center mb-6"
                    onClick={() => setShowNewAddressForm(true)}
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Adicionar Novo Endereço
                  </button>
                )}
                
                {/* New Address Form */}
                {showNewAddressForm && (
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Novo Endereço</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo de Endereço
                        </label>
                        <select
                          id="type"
                          name="type"
                          value={newAddress.type}
                          onChange={handleNewAddressChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="Residencial">Residencial</option>
                          <option value="Trabalho">Trabalho</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          CEP
                        </label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          type="text"
                          placeholder="12345-678"
                          value={newAddress.zipCode}
                          onChange={handleNewAddressChange}
                          error={errors.zipCode}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="md:col-span-2">
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                          Rua
                        </label>
                        <Input
                          id="street"
                          name="street"
                          type="text"
                          placeholder="Rua das Flores"
                          value={newAddress.street}
                          onChange={handleNewAddressChange}
                          error={errors.street}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                          Número
                        </label>
                        <Input
                          id="number"
                          name="number"
                          type="text"
                          placeholder="123"
                          value={newAddress.number}
                          onChange={handleNewAddressChange}
                          error={errors.number}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-1">
                        Complemento (opcional)
                      </label>
                      <Input
                        id="complement"
                        name="complement"
                        type="text"
                        placeholder="Apto 101, Bloco B"
                        value={newAddress.complement}
                        onChange={handleNewAddressChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                          Bairro
                        </label>
                        <Input
                          id="neighborhood"
                          name="neighborhood"
                          type="text"
                          placeholder="Jardim Primavera"
                          value={newAddress.neighborhood}
                          onChange={handleNewAddressChange}
                          error={errors.neighborhood}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          Cidade
                        </label>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          placeholder="São Paulo"
                          value={newAddress.city}
                          onChange={handleNewAddressChange}
                          error={errors.city}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          Estado
                        </label>
                        <select
                          id="state"
                          name="state"
                          value={newAddress.state}
                          onChange={handleNewAddressChange}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.state ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Selecione</option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </select>
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={newAddress.isDefault}
                          onChange={handleNewAddressChange}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Definir como endereço padrão
                        </span>
                      </label>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button onClick={handleSaveAddress}>
                        Salvar Endereço
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowNewAddressForm(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/carrinho')}
                  >
                    Voltar para o Carrinho
                  </Button>
                  <Button onClick={handleContinueToPayment}>
                    Continuar para Pagamento
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Método de Pagamento</h2>
                
                {errors.paymentMethod && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                    {errors.paymentMethod}
                  </div>
                )}
                
                <div className="space-y-4 mb-6">
                  {paymentMethods.map(method => (
                    <div 
                      key={method.id}
                      className={`border rounded-lg p-4 cursor-pointer ${
                        selectedPaymentMethod === method.id 
                          ? 'border-primary bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-center">
                        <div className="mr-3">
                          <div className={`w-5 h-5 rounded-full border ${
                            selectedPaymentMethod === method.id 
                              ? 'border-primary' 
                              : 'border-gray-300'
                          } flex items-center justify-center`}>
                            {selectedPaymentMethod === method.id && (
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          {method.icon === 'credit-card' && (
                            <svg className="w-6 h-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          )}
                          {method.icon === 'barcode' && (
                            <svg className="w-6 h-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                            </svg>
                          )}
                          {method.icon === 'qrcode' && (
                            <svg className="w-6 h-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                          )}
                          <span className="font-medium">{method.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Credit Card Form */}
                {selectedPaymentMethod === 'credit_card' && (
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Informações do Cartão</h3>
                    
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Número do Cartão
                      </label>
                      <Input
                        id="cardNumber"
                        name="number"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.number}
                        onChange={handleCardNumberChange}
                        error={errors.cardNumber}
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome no Cartão
                      </label>
                      <Input
                        id="cardName"
                        name="name"
                        type="text"
                        placeholder="NOME COMO ESTÁ NO CARTÃO"
                        value={cardInfo.name}
                        onChange={handleCardInfoChange}
                        error={errors.cardName}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                          Validade (MM/AA)
                        </label>
                        <Input
                          id="cardExpiry"
                          name="expiry"
                          type="text"
                          placeholder="MM/AA"
                          value={cardInfo.expiry}
                          onChange={handleExpiryChange}
                          error={errors.cardExpiry}
                          maxLength={5}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                          Código de Segurança (CVV)
                        </label>
                        <Input
                          id="cardCvv"
                          name="cvv"
                          type="text"
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={handleCardInfoChange}
                          error={errors.cardCvv}
                          maxLength={4}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="installments" className="block text-sm font-medium text-gray-700 mb-1">
                        Parcelas
                      </label>
                      <select
                        id="installments"
                        name="installments"
                        value={cardInfo.installments}
                        onChange={handleCardInfoChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="1">1x de {formatCurrency(cart.total)} (à vista)</option>
                        <option value="2">2x de {formatCurrency(cart.total / 2)} sem juros</option>
                        <option value="3">3x de {formatCurrency(cart.total / 3)} sem juros</option>
                        <option value="4">4x de {formatCurrency(cart.total / 4)} sem juros</option>
                        <option value="5">5x de {formatCurrency(cart.total / 5)} sem juros</option>
                        <option value="6">6x de {formatCurrency(cart.total / 6)} sem juros</option>
                      </select>
                    </div>
                  </div>
                )}
                
                {/* Boleto Information */}
                {selectedPaymentMethod === 'boleto' && (
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-4">
                      <svg className="w-8 h-8 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h3 className="font-medium text-gray-800">Informações sobre o Boleto</h3>
                        <p className="text-sm text-gray-600">
                          O boleto será gerado após a confirmação do pedido.
                        </p>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-2 ml-4 list-disc">
                      <li>O boleto tem vencimento em 3 dias úteis.</li>
                      <li>Após o pagamento, a compensação pode levar até 3 dias úteis.</li>
                      <li>Seu pedido será processado após a confirmação do pagamento.</li>
                    </ul>
                  </div>
                )}
                
                {/* PIX Information */}
                {selectedPaymentMethod === 'pix' && (
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-4">
                      <svg className="w-8 h-8 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h3 className="font-medium text-gray-800">Informações sobre o PIX</h3>
                        <p className="text-sm text-gray-600">
                          O QR Code do PIX será gerado após a confirmação do pedido.
                        </p>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-2 ml-4 list-disc">
                      <li>O pagamento via PIX é processado instantaneamente.</li>
                      <li>O QR Code tem validade de 30 minutos.</li>
                      <li>Seu pedido será processado imediatamente após a confirmação do pagamento.</li>
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline" 
                    onClick={handleBackToAddress}
                  >
                    Voltar para Endereço
                  </Button>
                  <Button onClick={handleContinueToReview}>
                    Continuar para Revisão
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Order Review */}
            {step === 3 && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Revisão do Pedido</h2>
                
                {/* Order Items */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">Itens do Pedido</h3>
                  
                  <div className="space-y-4">
                    {cart.items.map(item => (
                      <div key={item.id} className="flex items-center">
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            Quantidade: {item.quantity}
                          </p>
                          {item.customization && (
                            <p className="text-xs text-gray-500">
                              Personalização: {
                                (() => {
                                  try {
                                    const custom = JSON.parse(item.customization);
                                    return `Cor: ${custom.color}, Texto: ${custom.text || 'Nenhum'}`;
                                  } catch (e) {
                                    return item.customization;
                                  }
                                })()
                              }
                            </p>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Shipping Address */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-800">Endereço de Entrega</h3>
                    <button 
                      className="text-primary text-sm hover:text-primary-dark"
                      onClick={() => setStep(1)}
                    >
                      Alterar
                    </button>
                  </div>
                  
                  {getSelectedAddress() && (
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">{getSelectedAddress()?.type}</p>
                      <p>
                        {getSelectedAddress()?.street}, {getSelectedAddress()?.number}
                        {getSelectedAddress()?.complement && `, ${getSelectedAddress()?.complement}`}
                      </p>
                      <p>
                        {getSelectedAddress()?.neighborhood}, {getSelectedAddress()?.city} - {getSelectedAddress()?.state}
                      </p>
                      <p>CEP: {getSelectedAddress()?.zipCode}</p>
                    </div>
                  )}
                </div>
                
                {/* Payment Method */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-800">Método de Pagamento</h3>
                    <button 
                      className="text-primary text-sm hover:text-primary-dark"
                      onClick={() => setStep(2)}
                    >
                      Alterar
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {selectedPaymentMethod === 'credit_card' && (
                      <div>
                        <p className="font-medium">Cartão de Crédito</p>
                        <p>Terminado em {cardInfo.number.slice(-4)}</p>
                        <p>{cardInfo.installments}x de {formatCurrency(cart.total / parseInt(cardInfo.installments))}</p>
                      </div>
                    )}
                    
                    {selectedPaymentMethod === 'boleto' && (
                      <div>
                        <p className="font-medium">Boleto Bancário</p>
                        <p>Vencimento em 3 dias úteis</p>
                      </div>
                    )}
                    
                    {selectedPaymentMethod === 'pix' && (
                      <div>
                        <p className="font-medium">PIX</p>
                        <p>Pagamento instantâneo</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline" 
                    onClick={handleBackToPayment}
                  >
                    Voltar para Pagamento
                  </Button>
                  <Button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando...
                      </span>
                    ) : (
                      'Finalizar Pedido'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(cart.subtotal)}</span>
                </div>
                
                {cart.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Desconto</span>
                    <span className="font-medium text-green-600">-{formatCurrency(cart.discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-medium">
                    {cart.shipping === 0 ? 'Grátis' : formatCurrency(cart.shipping)}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-lg">{formatCurrency(cart.total)}</span>
                  </div>
                </div>
              </div>
              
              {cart.couponCode && (
                <div className="bg-green-50 p-3 rounded-md mb-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-green-800">
                      Cupom <span className="font-medium">{cart.couponCode}</span> aplicado
                    </span>
                  </div>
                </div>
              )}
              
              <div className="text-xs text-gray-500 mt-4">
                <p>
                  Ao finalizar a compra, você concorda com os Termos de Serviço e Política de Privacidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;