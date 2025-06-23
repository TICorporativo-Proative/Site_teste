import AdminLayout from '../../components/layout/AdminLayout';

const AdminPrinters = () => {
  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Gerenciamento de Impressoras</h2>
        <p className="text-gray-600 mb-8">
          Esta página está em desenvolvimento. Em breve você poderá gerenciar as impressoras 3D aqui.
        </p>
      </div>
    </AdminLayout>
  );
};

export default AdminPrinters;