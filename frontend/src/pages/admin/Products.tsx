import AdminLayout from '../../components/layout/AdminLayout';

const AdminProducts = () => {
  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Gerenciamento de Produtos</h2>
        <p className="text-gray-600 mb-8">
          Esta página está em desenvolvimento. Em breve você poderá gerenciar os produtos aqui.
        </p>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;