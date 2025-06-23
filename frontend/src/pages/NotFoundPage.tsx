import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Página não encontrada</h2>
          <p className="text-lg text-gray-600 mb-8">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/" className="btn-primary">
              Voltar para a Página Inicial
            </Link>
            <Link to="/categorias/pets" className="btn-secondary">
              Ver Produtos para Pets
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;