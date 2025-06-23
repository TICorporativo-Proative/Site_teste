import CustomerLayout from '../../components/layout/CustomerLayout';

const CustomerProfile = () => {
  return (
    <CustomerLayout>
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Seus Dados</h2>
        <p className="text-gray-600 mb-8">
          Esta página está em desenvolvimento. Em breve você poderá gerenciar seus dados pessoais aqui.
        </p>
      </div>
    </CustomerLayout>
  );
};

export default CustomerProfile;