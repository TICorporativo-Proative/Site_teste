import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState('week');
  
  // Mock data for stats
  const stats = {
    revenue: 12589.90,
    orders: 45,
    customers: 28,
    averageOrder: 279.77
  };
  
  // Mock data for recent orders
  const recentOrders = [
    {
      id: 'ORD-12345',
      customer: 'Ana Silva',
      date: '2025-06-22',
      status: 'Pendente',
      total: 159.90,
      items: 3
    },
    {
      id: 'ORD-12344',
      customer: 'Carlos Oliveira',
      date: '2025-06-21',
      status: 'Em produção',
      total: 89.90,
      items: 1
    },
    {
      id: 'ORD-12343',
      customer: 'Mariana Santos',
      date: '2025-06-20',
      status: 'Enviado',
      total: 129.90,
      items: 2
    },
    {
      id: 'ORD-12342',
      customer: 'Pedro Almeida',
      date: '2025-06-19',
      status: 'Entregue',
      total: 219.90,
      items: 4
    },
    {
      id: 'ORD-12341',
      customer: 'Juliana Costa',
      date: '2025-06-18',
      status: 'Entregue',
      total: 79.90,
      items: 1
    }
  ];
  
  // Mock data for print queue
  const printQueue = [
    {
      id: 'PRINT-123',
      model: 'Comedouro Personalizado',
      customer: 'Ana Silva',
      printer: 'Ender 3 Pro',
      material: 'PLA Azul',
      status: 'Em impressão',
      progress: 65,
      estimatedTime: '2h 15m'
    },
    {
      id: 'PRINT-124',
      model: 'Porta Petiscos',
      customer: 'Carlos Oliveira',
      printer: 'Prusa i3 MK3S',
      material: 'PETG Verde',
      status: 'Na fila',
      progress: 0,
      estimatedTime: '3h 30m'
    },
    {
      id: 'PRINT-125',
      model: 'Brinquedo Interativo',
      customer: 'Mariana Santos',
      printer: 'Ender 5 Plus',
      material: 'PLA Laranja',
      status: 'Na fila',
      progress: 0,
      estimatedTime: '1h 45m'
    }
  ];
  
  // Mock data for low stock materials
  const lowStockMaterials = [
    {
      id: 1,
      name: 'PLA Azul',
      stock: 0.5,
      unit: 'kg',
      threshold: 1
    },
    {
      id: 2,
      name: 'PETG Transparente',
      stock: 0.8,
      unit: 'kg',
      threshold: 1
    },
    {
      id: 3,
      name: 'TPU Preto',
      stock: 0.3,
      unit: 'kg',
      threshold: 0.5
    }
  ];
  
  return (
    <AdminLayout>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-500">Receita</h4>
              <p className="text-2xl font-bold text-gray-900">
                R$ {stats.revenue.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-xs text-green-600 mt-1">
                <span className="font-medium">+12.5%</span> em relação ao período anterior
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-500">Pedidos</h4>
              <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
              <p className="text-xs text-green-600 mt-1">
                <span className="font-medium">+8.2%</span> em relação ao período anterior
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-500">Clientes</h4>
              <p className="text-2xl font-bold text-gray-900">{stats.customers}</p>
              <p className="text-xs text-green-600 mt-1">
                <span className="font-medium">+5.1%</span> em relação ao período anterior
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-500">Ticket Médio</h4>
              <p className="text-2xl font-bold text-gray-900">
                R$ {stats.averageOrder.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-xs text-green-600 mt-1">
                <span className="font-medium">+3.8%</span> em relação ao período anterior
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Date Range Selector */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setDateRange('week')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              dateRange === 'week'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            Semana
          </button>
          <button
            type="button"
            onClick={() => setDateRange('month')}
            className={`px-4 py-2 text-sm font-medium ${
              dateRange === 'month'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-t border-b border-gray-300`}
          >
            Mês
          </button>
          <button
            type="button"
            onClick={() => setDateRange('year')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              dateRange === 'year'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            Ano
          </button>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Pedidos Recentes</h3>
              <Link to="/admin/pedidos" className="text-sm font-medium text-primary hover:text-blue-600">
                Ver todos
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
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
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Entregue' ? 'bg-green-100 text-green-800' :
                          order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Em produção' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        R$ {order.total.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/admin/pedidos/${order.id}`} className="text-primary hover:text-blue-600">
                          Detalhes
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Print Queue */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Fila de Impressão</h3>
              <Link to="/admin/fila-impressao" className="text-sm font-medium text-primary hover:text-blue-600">
                Ver todos
              </Link>
            </div>
            
            <div className="p-6 space-y-4">
              {printQueue.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{item.model}</h4>
                      <p className="text-xs text-gray-500">
                        {item.customer} • {item.id}
                      </p>
                    </div>
                    <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                      item.status === 'Em impressão' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span>{item.printer}</span>
                    <span className="mx-2">•</span>
                    <span>{item.material}</span>
                    <span className="mx-2">•</span>
                    <span>Tempo estimado: {item.estimatedTime}</span>
                  </div>
                  
                  {item.status === 'Em impressão' && (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>Progresso</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Side Column */}
        <div>
          {/* Low Stock Materials */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Materiais com Estoque Baixo</h3>
              <Link to="/admin/materiais" className="text-sm font-medium text-primary hover:text-blue-600">
                Ver todos
              </Link>
            </div>
            
            <div className="p-6 space-y-4">
              {lowStockMaterials.map((material) => (
                <div key={material.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{material.name}</h4>
                    <p className="text-xs text-gray-500">
                      Estoque: {material.stock} {material.unit}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Baixo
                  </span>
                </div>
              ))}
              
              <Link 
                to="/admin/materiais" 
                className="block text-center py-2 text-sm font-medium text-primary hover:text-blue-600 border-t border-gray-200 pt-4 mt-4"
              >
                Repor estoque
              </Link>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Ações Rápidas</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <Link 
                to="/admin/produtos/novo" 
                className="flex items-center p-3 bg-blue-50 text-primary rounded-lg hover:bg-blue-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Adicionar Novo Produto
              </Link>
              
              <Link 
                to="/admin/pedidos" 
                className="flex items-center p-3 bg-green-50 text-secondary rounded-lg hover:bg-green-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Gerenciar Pedidos
              </Link>
              
              <Link 
                to="/admin/fila-impressao" 
                className="flex items-center p-3 bg-orange-50 text-accent rounded-lg hover:bg-orange-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Gerenciar Fila de Impressão
              </Link>
              
              <Link 
                to="/admin/custos-impressao" 
                className="flex items-center p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calcular Custos de Impressão
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;