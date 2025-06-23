import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const HomePage = () => {
  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Comedouro Personalizado',
      price: 59.90,
      image: 'https://via.placeholder.com/300x300',
      category: 'Pets'
    },
    {
      id: 2,
      name: 'Porta Petiscos',
      price: 45.90,
      image: 'https://via.placeholder.com/300x300',
      category: 'Pets'
    },
    {
      id: 3,
      name: 'Brinquedo Interativo',
      price: 39.90,
      image: 'https://via.placeholder.com/300x300',
      category: 'Pets'
    },
    {
      id: 4,
      name: 'Vaso Decorativo',
      price: 79.90,
      image: 'https://via.placeholder.com/300x300',
      category: 'Casa'
    },
    {
      id: 5,
      name: 'Suporte para Plantas',
      price: 49.90,
      image: 'https://via.placeholder.com/300x300',
      category: 'Jardim'
    },
    {
      id: 6,
      name: 'Identificador de Plantas',
      price: 29.90,
      image: 'https://via.placeholder.com/300x300',
      category: 'Jardim'
    },
    {
      id: 7,
      name: 'Porta-Chaves',
      price: 34.90,
      image: 'https://via.placeholder.com/300x300',
      category: 'Casa'
    },
    {
      id: 8,
      name: 'Organizador de Mesa',
      price: 69.90,
      image: 'https://via.placeholder.com/300x300',
      category: 'Casa'
    },
  ];
  
  // Mock data for testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Ana Silva',
      image: 'https://via.placeholder.com/100x100',
      text: 'Fiz um comedouro personalizado para meu cachorro e ficou incrível! A qualidade do material é excelente e o design ficou exatamente como eu queria.',
      rating: 5
    },
    {
      id: 2,
      name: 'Carlos Oliveira',
      image: 'https://via.placeholder.com/100x100',
      text: 'Comprei vários itens para decorar meu jardim e todos chegaram perfeitos. O material é resistente e as cores são vibrantes. Recomendo!',
      rating: 5
    },
    {
      id: 3,
      name: 'Mariana Santos',
      image: 'https://via.placeholder.com/100x100',
      text: 'O processo de personalização 3D é super intuitivo e o resultado final superou minhas expectativas. Já estou planejando minha próxima compra!',
      rating: 4
    },
  ];
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Produtos Personalizados para seu Pet
              </h1>
              <p className="text-xl mb-6">
                Crie itens únicos com impressão 3D para seu melhor amigo. Comedouros, brinquedos, identificadores e muito mais!
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/categorias/pets" className="btn-accent text-center">
                  Ver Produtos
                </Link>
                <Link to="/personalizacao-3d" className="bg-white text-primary font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors duration-300 text-center">
                  Personalizar em 3D
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="Produtos para Pets" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Categorias</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/categorias/pets" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md h-64">
                <img 
                  src="https://via.placeholder.com/400x300" 
                  alt="Categoria Pets" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Pets</h3>
                    <p className="text-white text-sm mb-4">Produtos personalizados para seu melhor amigo</p>
                    <span className="text-white text-sm font-medium flex items-center">
                      Ver Produtos
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/categorias/casa" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md h-64">
                <img 
                  src="https://via.placeholder.com/400x300" 
                  alt="Categoria Casa" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Casa</h3>
                    <p className="text-white text-sm mb-4">Decoração e utilidades para seu lar</p>
                    <span className="text-white text-sm font-medium flex items-center">
                      Ver Produtos
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/categorias/jardim" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md h-64">
                <img 
                  src="https://via.placeholder.com/400x300" 
                  alt="Categoria Jardim" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Jardim</h3>
                    <p className="text-white text-sm mb-4">Itens decorativos e funcionais para seu jardim</p>
                    <span className="text-white text-sm font-medium flex items-center">
                      Ver Produtos
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* 3D Personalization Section */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://via.placeholder.com/600x400" 
                alt="Personalização 3D" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-4">Personalização 3D</h2>
              <p className="text-lg text-gray-700 mb-6">
                Crie produtos únicos com nossa ferramenta de personalização 3D. Faça upload do seu modelo, escolha o material e as cores, e nós imprimimos para você!
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Upload de arquivos STL (máximo 25MB)</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Visualização 3D em tempo real</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Escolha de materiais e cores</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Precificação dinâmica baseada no volume e complexidade</span>
                </li>
              </ul>
              <Link to="/personalizacao-3d" className="btn-accent">
                Começar a Personalizar
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">Produtos em Destaque</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Conheça nossos produtos mais populares, todos feitos com impressão 3D de alta qualidade e materiais duráveis.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex space-x-2">
                      <button className="bg-primary text-white text-sm py-1 px-3 rounded-md flex-1 hover:bg-blue-600 transition-colors">
                        Comprar
                      </button>
                      <button className="bg-white text-gray-800 text-sm py-1 px-3 rounded-md hover:bg-gray-100 transition-colors">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-primary">{product.category}</span>
                  <h3 className="font-medium text-gray-900 mt-1">{product.name}</h3>
                  <p className="text-gray-700 font-bold mt-1">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/categorias/pets" className="btn-primary">
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">O que Nossos Clientes Dizem</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Veja o que nossos clientes estão falando sobre nossos produtos e serviços.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Fique por Dentro das Novidades</h2>
            <p className="mb-8">
              Inscreva-se em nossa newsletter para receber novidades, dicas e promoções exclusivas.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button type="submit" className="btn-accent py-3">
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;