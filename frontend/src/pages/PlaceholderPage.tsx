import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  linkText?: string;
  linkUrl?: string;
}

const PlaceholderPage = ({
  title,
  description = 'Esta página está em desenvolvimento e estará disponível em breve.',
  linkText = 'Voltar para a Página Inicial',
  linkUrl = '/'
}: PlaceholderPageProps) => {
  return (
    <MainLayout>
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-8">
            {description}
          </p>
          
          <Link to={linkUrl} className="btn-primary">
            {linkText}
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default PlaceholderPage;