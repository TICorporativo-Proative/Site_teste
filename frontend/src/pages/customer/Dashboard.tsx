import { Link } from 'react-router-dom';
import CustomerLayout from '../../components/layout/CustomerLayout';

const CustomerDashboard = () => {
  // Mock data for recent orders
  const recentOrders = [
    {
      id: 'ORD-12345',
      date: '2025-06-20',
      status: 'Entregue',
      total: 159.90,
      items: 3
    },
    {
      id: 'ORD-12344',
      date: '2025-06-15',
      status: 'Em produção',
      total: 89.90,
      items: 1
    },
    {
      id: 'ORD-12343',
      date: '2025-06-10',
      status: 'Enviado',
      total: 129.90,
      items: 2
    }
  ];
  
  // Mock data for saved addresses
  const addresses = [
    {
      id: 1,
      type: 'Principal',
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    {
      id: 2,
      type: 'Trabalho',
      street: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    }
  ];
  
  // Mock data for saved 3D models
  const models = [
    {
      id: 1,
      name: 'Comedouro Personalizado',
      date: '2025-06-18',
      size: '2.5 MB',
      thumbnail: 'https://via.placeholder.com/100x100'
    },
    {
      id: 2,
      name: 'Porta Petiscos',
      date: '2025-06-15',
      size: '1.8 MB',
      thumbnail: 'https://via.placeholder.com/100x100'
    }
  ];
  
  return (
    <CustomerLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Bem-vindo de volta, Usuário!</h3>
        <p className="text-gray-600">
          Aqui você pode gerenciar seus pedidos, endereços, modelos 3D e muito mais.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-500">Total de Pedidos</h4>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-500">Modelos 3D</h4>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-500">Favoritos</h4>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Pedidos Recentes</h3>
          <Link to="/conta/pedidos" className="text-sm font-medium text-primary hover:text-blue-600">
            Ver todos
          </Link>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedido
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Itens
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Entregue' ? 'bg-green-100 text-green-800' :
                      order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    R$ {order.total.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/pedido/${order.id}`} className="text-primary hover:text-blue-600">
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Access Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Addresses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Endereços Salvos</h3>
            <Link to="/conta/enderecos" className="text-sm font-medium text-primary hover:text-blue-600">
              Gerenciar
            </Link>
          </div>
          
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mb-2">
                      {address.type}
                    </span>
                    <p className="text-sm text-gray-900">{address.street}</p>
                    <p className="text-sm text-gray-500">
                      {address.city}, {address.state} - {address.zipCode}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 3D Models */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Meus Modelos 3D</h3>
            <Link to="/conta/modelos-3d" className="text-sm font-medium text-primary hover:text-blue-600">
              Ver todos
            </Link>
          </div>
          
          <div className="space-y-4">
            {models.map((model) => (
              <div key={model.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <img 
                    src={model.thumbnail} 
                    alt={model.name} 
                    className="h-12 w-12 rounded-md object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{model.name}</h4>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{new Date(model.date).toLocaleDateString('pt-BR')}</span>
                      <span className="mx-2">•</span>
                      <span>{model.size}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-primary hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <Link 
              to="/personalizacao-3d" 
              className="block text-center py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-primary hover:border-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Criar Novo Modelo
            </Link>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;