import AdminLayout from '../../components/layout/AdminLayout';

const AdminPrintQueue = () => {
  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Fila de Impressão</h2>
        <p className="text-gray-600 mb-8">
          Esta página está em desenvolvimento. Em breve você poderá gerenciar a fila de impressão 3D aqui.
        </p>
      </div>
    </AdminLayout>
  );
};

export default AdminPrintQueue;