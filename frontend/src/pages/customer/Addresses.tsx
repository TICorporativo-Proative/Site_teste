import CustomerLayout from '../../components/layout/CustomerLayout';

const CustomerAddresses = () => {
  return (
    <CustomerLayout>
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Seus Endereços</h2>
        <p className="text-gray-600 mb-8">
          Esta página está em desenvolvimento. Em breve você poderá gerenciar seus endereços aqui.
        </p>
      </div>
    </CustomerLayout>
  );
};

export default CustomerAddresses;