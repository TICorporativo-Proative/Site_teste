import AdminLayout from '../../components/layout/AdminLayout';

const AdminCustomers = () => {
  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Gerenciamento de Clientes</h2>
        <p className="text-gray-600 mb-8">
          Esta página está em desenvolvimento. Em breve você poderá gerenciar os clientes aqui.
        </p>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;