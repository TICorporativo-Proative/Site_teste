import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

// Mock order data
const mockOrders: Order[] = [
  {
    id: 'PET-123456',
    userId: 1,
    items: [
      {
        id: 1,
        productId: 1,
        name: 'Comedouro Personalizado para Cães',
        price: 59.90,
        quantity: 1,
        customization: JSON.stringify({ color: '#2196F3', text: 'Rex' }),
      },
      {
        id: 2,
        productId: 3,
        name: 'Porta Petiscos Personalizado',
        price: 39.90,
        quantity: 2,
        customization: JSON.stringify({ color: '#4CAF50', text: 'Rex' }),
      }
    ],
    status: 'processing',
    shippingAddress: {
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
    paymentMethod: 'credit_card',
    subtotal: 139.70,
    discount: 0,
    shipping: 15.90,
    total: 155.60,
    createdAt: '2023-06-15T14:30:00Z',
    updatedAt: '2023-06-15T14:35:00Z',
  },
  {
    id: 'PET-789012',
    userId: 1,
    items: [
      {
        id: 3,
        productId: 2,
        name: 'Brinquedo Interativo para Gatos',
        price: 45.90,
        quantity: 1,
        customization: null,
      }
    ],
    status: 'delivered',
    shippingAddress: {
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
    paymentMethod: 'pix',
    subtotal: 45.90,
    discount: 0,
    shipping: 0,
    total: 45.90,
    createdAt: '2023-05-10T09:15:00Z',
    updatedAt: '2023-05-15T16:20:00Z',
  }
];

// Mock tracking data
const mockTrackingEvents = [
  {
    date: '2023-06-15T14:35:00Z',
    status: 'Pedido recebido',
    description: 'Seu pedido foi recebido e está sendo processado.',
    location: 'São Paulo, SP',
  },
  {
    date: '2023-06-16T10:20:00Z',
    status: 'Pagamento confirmado',
    description: 'O pagamento do seu pedido foi confirmado.',
    location: 'São Paulo, SP',
  },
  {
    date: '2023-06-17T08:45:00Z',
    status: 'Em produção',
    description: 'Seu pedido está sendo produzido.',
    location: 'São Paulo, SP',
  },
  {
    date: '2023-06-19T14:10:00Z',
    status: 'Enviado',
    description: 'Seu pedido foi enviado.',
    location: 'São Paulo, SP',
  },
  {
    date: '2023-06-21T09:30:00Z',
    status: 'Em trânsito',
    description: 'Seu pedido está a caminho.',
    location: 'Campinas, SP',
  },
  {
    date: '2023-06-22T16:45:00Z',
    status: 'Entregue',
    description: 'Seu pedido foi entregue com sucesso.',
    location: 'São Paulo, SP',
  }
];

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackingEvents, setTrackingEvents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('details');
  
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const foundOrder = mockOrders.find(o => o.id === id);
        
        if (foundOrder) {
          setOrder(foundOrder);
          
          // Get tracking events based on order status
          if (foundOrder.status === 'delivered') {
            setTrackingEvents(mockTrackingEvents);
          } else if (foundOrder.status === 'shipped') {
            setTrackingEvents(mockTrackingEvents.slice(0, 5));
          } else if (foundOrder.status === 'processing') {
            setTrackingEvents(mockTrackingEvents.slice(0, 3));
          } else {
            setTrackingEvents(mockTrackingEvents.slice(0, 2));
          }
        } else {
          setError('Pedido não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar o pedido');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [id]);
  
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: 'Pendente', color: 'bg-yellow-100 text-yellow-800' };
      case 'processing':
        return { text: 'Em Processamento', color: 'bg-blue-100 text-blue-800' };
      case 'shipped':
        return { text: 'Enviado', color: 'bg-indigo-100 text-indigo-800' };
      case 'delivered':
        return { text: 'Entregue', color: 'bg-green-100 text-green-800' };
      case 'cancelled':
        return { text: 'Cancelado', color: 'bg-red-100 text-red-800' };
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Cartão de Crédito';
      case 'boleto':
        return 'Boleto Bancário';
      case 'pix':
        return 'PIX';
      default:
        return method;
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-32 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error || 'Pedido não encontrado'}</p>
            <Link to="/cliente/pedidos" className="text-primary hover:underline mt-2 inline-block">
              Ver todos os pedidos
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Pedido #{order.id}</h1>
            <p className="text-gray-600 mt-1">
              Realizado em {formatDate(order.createdAt)}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusLabel(order.status).color}`}>
              {getStatusLabel(order.status).text}
            </span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'details'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Detalhes do Pedido
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tracking'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('tracking')}
            >
              Rastreamento
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'invoice'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('invoice')}
            >
              Nota Fiscal
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Order Details Tab */}
          {activeTab === 'details' && (
            <div className="p-6">
              {/* Order Items */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Itens do Pedido</h2>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Produto
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Preço
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantidade
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                            </div>
                            {item.customization && (
                              <div className="text-xs text-gray-500 mt-1">
                                {(() => {
                                  try {
                                    const custom = JSON.parse(item.customization);
                                    return (
                                      <div className="flex items-center">
                                        <span>Personalização: </span>
                                        <span 
                                          className="w-3 h-3 rounded-full inline-block ml-1 mr-1"
                                          style={{ backgroundColor: custom.color }}
                                        ></span>
                                        <span>{custom.text || 'Sem texto'}</span>
                                      </div>
                                    );
                                  } catch (e) {
                                    return item.customization;
                                  }
                                })()}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumo</h2>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(order.subtotal)}</span>
                      </div>
                      
                      {order.discount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Desconto</span>
                          <span className="text-green-600">-{formatCurrency(order.discount)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frete</span>
                        <span>
                          {order.shipping === 0 ? 'Grátis' : formatCurrency(order.shipping)}
                        </span>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>{formatCurrency(order.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Shipping & Payment Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações</h2>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="font-medium text-gray-800 mb-2">Endereço de Entrega</h3>
                    <div className="text-sm text-gray-600">
                      <p>{order.shippingAddress.street}, {order.shippingAddress.number}</p>
                      {order.shippingAddress.complement && (
                        <p>{order.shippingAddress.complement}</p>
                      )}
                      <p>
                        {order.shippingAddress.neighborhood}, {order.shippingAddress.city} - {order.shippingAddress.state}
                      </p>
                      <p>CEP: {order.shippingAddress.zipCode}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-2">Pagamento</h3>
                    <div className="text-sm text-gray-600">
                      <p>Método: {getPaymentMethodLabel(order.paymentMethod)}</p>
                      <p>Status: Pago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/cliente/pedidos')}
                >
                  Voltar para Meus Pedidos
                </Button>
                
                {order.status === 'pending' || order.status === 'processing' ? (
                  <Button 
                    variant="outline" 
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Cancelar Pedido
                  </Button>
                ) : null}
                
                {order.status === 'delivered' && (
                  <Button>
                    Comprar Novamente
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {/* Tracking Tab */}
          {activeTab === 'tracking' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Rastreamento do Pedido</h2>
              
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-8">
                  {trackingEvents.map((event, index) => (
                    <div key={index} className="relative flex items-start">
                      <div className={`absolute left-0 mt-1 w-10 h-10 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {index === 0 && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {index > 0 && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      
                      <div className="ml-16">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{event.status}</h3>
                            <p className="text-gray-600 mt-1">{event.description}</p>
                          </div>
                          <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                            {formatDate(event.date)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {order.status !== 'delivered' && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Informação de Entrega</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          O prazo estimado de entrega é de 5 a 7 dias úteis após a confirmação do pagamento.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Invoice Tab */}
          {activeTab === 'invoice' && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Nota Fiscal</h2>
              
              {order.status === 'pending' || order.status === 'processing' ? (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Nota fiscal pendente</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          A nota fiscal será emitida após a confirmação do pagamento e envio do pedido.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800">Nota Fiscal Eletrônica</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          NF-e: 123456789
                        </p>
                        <p className="text-sm text-gray-600">
                          Emitida em: {formatDate(order.updatedAt)}
                        </p>
                      </div>
                      <Button>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Baixar PDF
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b">
                      <h3 className="font-medium text-gray-800">Detalhes da Nota Fiscal</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Emitente</h4>
                          <div className="text-sm text-gray-600">
                            <p>Jardim dos Pets Toys LTDA</p>
                            <p>CNPJ: 12.345.678/0001-90</p>
                            <p>Rua das Empresas, 789</p>
                            <p>São Paulo - SP, 01234-567</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Destinatário</h4>
                          <div className="text-sm text-gray-600">
                            <p>Cliente</p>
                            <p>CPF: 123.456.789-00</p>
                            <p>
                              {order.shippingAddress.street}, {order.shippingAddress.number}
                              {order.shippingAddress.complement && `, ${order.shippingAddress.complement}`}
                            </p>
                            <p>
                              {order.shippingAddress.city} - {order.shippingAddress.state}, {order.shippingAddress.zipCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;