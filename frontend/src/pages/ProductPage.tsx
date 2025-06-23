import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ModelViewer from '../components/3d/ModelViewer';
import Button from '../components/ui/Button';

// Mock data - in a real app, this would come from an API
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Comedouro Personalizado para Cães',
    description: 'Comedouro personalizado para cães, feito com material PLA de alta qualidade. Personalize com o nome do seu pet e escolha a cor que mais combina com a decoração da sua casa.',
    price: 59.90,
    images: [
      'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601758177266-bc599de87707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Alimentação',
    customizable: true,
    featured: true,
    inStock: true,
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z',
    modelUrl: 'https://models.readyplayer.me/64fa0e3a9736d65be5a9c8c1.glb'
  },
  {
    id: 2,
    name: 'Brinquedo Interativo para Gatos',
    description: 'Brinquedo interativo para gatos, projetado para estimular a atividade física e mental do seu felino. Feito com materiais seguros e duráveis.',
    price: 45.90,
    images: [
      'https://images.unsplash.com/photo-1526336179256-1347bdb255ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Brinquedos',
    customizable: false,
    featured: true,
    inStock: true,
    createdAt: '2023-02-20T14:30:00Z',
    updatedAt: '2023-02-20T14:30:00Z',
    modelUrl: 'https://models.readyplayer.me/64fa0e3a9736d65be5a9c8c1.glb'
  },
  {
    id: 3,
    name: 'Porta Petiscos Personalizado',
    description: 'Porta petiscos personalizado para armazenar os petiscos do seu pet de forma organizada e bonita. Personalize com o nome do seu pet e escolha a cor que mais combina com a sua casa.',
    price: 39.90,
    images: [
      'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601758174039-617983b8cdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601758174608-205d13801fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Alimentação',
    customizable: true,
    featured: false,
    inStock: true,
    createdAt: '2023-03-10T09:15:00Z',
    updatedAt: '2023-03-10T09:15:00Z',
    modelUrl: 'https://models.readyplayer.me/64fa0e3a9736d65be5a9c8c1.glb'
  }
];

// Mock reviews
const mockReviews = [
  {
    id: 1,
    productId: 1,
    userId: 101,
    userName: 'Maria Silva',
    rating: 5,
    comment: 'Produto excelente! Meu cachorro adorou e a qualidade é ótima.',
    date: '2023-05-15T14:30:00Z'
  },
  {
    id: 2,
    productId: 1,
    userId: 102,
    userName: 'João Santos',
    rating: 4,
    comment: 'Muito bom, mas demorou um pouco para chegar.',
    date: '2023-06-20T10:15:00Z'
  },
  {
    id: 3,
    productId: 1,
    userId: 103,
    userName: 'Ana Oliveira',
    rating: 5,
    comment: 'Perfeito! A personalização ficou exatamente como eu queria.',
    date: '2023-07-05T16:45:00Z'
  }
];

// Mock related products
const getRelatedProducts = (currentProductId: number) => {
  return mockProducts.filter(product => product.id !== currentProductId).slice(0, 4);
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('#2196F3');
  const [customText, setCustomText] = useState('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  const { addItem } = useCart();
  
  const colors = [
    { name: 'Azul', value: '#2196F3' },
    { name: 'Verde', value: '#4CAF50' },
    { name: 'Vermelho', value: '#F44336' },
    { name: 'Roxo', value: '#9C27B0' },
    { name: 'Amarelo', value: '#FFEB3B' },
    { name: 'Laranja', value: '#FF9800' }
  ];
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const productId = parseInt(id || '0', 10);
        const foundProduct = mockProducts.find(p => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
          setRelatedProducts(getRelatedProducts(foundProduct.id));
          
          // Get reviews for this product
          const productReviews = mockReviews.filter(r => r.productId === foundProduct.id);
          setReviews(productReviews);
        } else {
          setError('Produto não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar o produto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    const customization = product.customizable 
      ? JSON.stringify({ color: selectedColor, text: customText })
      : null;
    
    addItem({
      id: Date.now(), // Generate a unique ID for the cart item
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      customization
    });
    
    // Show success message or redirect to cart
    alert('Produto adicionado ao carrinho!');
  };
  
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };
  
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded"></div>
            <div className="w-full md:w-1/2">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-24 bg-gray-200 rounded mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error || 'Produto não encontrado'}</p>
          <Link to="/categorias/pets" className="text-primary hover:underline mt-2 inline-block">
            Ver outros produtos
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <svg className="w-3 h-3 mx-2 fill-current text-gray-400" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
            </svg>
          </li>
          <li className="flex items-center">
            <Link to={`/categorias/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-primary">
              {product.category}
            </Link>
            <svg className="w-3 h-3 mx-2 fill-current text-gray-400" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
            </svg>
          </li>
          <li className="text-gray-700">{product.name}</li>
        </ol>
      </nav>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-96 object-contain"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button 
                key={index}
                className={`border-2 rounded-md overflow-hidden ${selectedImage === index ? 'border-primary' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - imagem ${index + 1}`} 
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star}
                  className={`w-5 h-5 ${star <= calculateAverageRating() ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 ml-2">
              {calculateAverageRating().toFixed(1)} ({reviews.length} avaliações)
            </span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
            <span className="text-sm text-gray-500 ml-2">à vista</span>
            <p className="text-sm text-gray-600 mt-1">
              ou 3x de {formatCurrency(product.price / 3)} sem juros
            </p>
          </div>
          
          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="text-green-600 font-medium flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Em estoque
              </span>
            ) : (
              <span className="text-red-600 font-medium flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Fora de estoque
              </span>
            )}
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade
            </label>
            <div className="flex items-center">
              <button 
                className="bg-gray-200 px-3 py-2 rounded-l-md hover:bg-gray-300"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input 
                type="number" 
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-t border-b border-gray-300 py-2"
              />
              <button 
                className="bg-gray-200 px-3 py-2 rounded-r-md hover:bg-gray-300"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Customization Options */}
          {product.customizable && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Personalização</h3>
              
              {/* Color Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.value ? 'border-gray-800' : 'border-transparent'}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.value)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              
              {/* Text Customization */}
              <div className="mb-4">
                <label htmlFor="customText" className="block text-sm font-medium text-gray-700 mb-2">
                  Texto Personalizado
                </label>
                <input
                  type="text"
                  id="customText"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ex: Nome do seu pet"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  maxLength={20}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Máximo de 20 caracteres
                </p>
              </div>
              
              {/* 3D Preview */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Visualização 3D
                </h4>
                <ModelViewer 
                  url={product.modelUrl} 
                  color={selectedColor}
                  height="300px"
                  className="rounded-lg"
                />
              </div>
            </div>
          )}
          
          {/* Add to Cart Button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button 
              onClick={handleAddToCart}
              className="flex-1 py-3"
              disabled={!product.inStock}
            >
              Adicionar ao Carrinho
            </Button>
            
            <Link to="/personalizar-3d" className="flex-1">
              <Button 
                variant="outline"
                className="w-full py-3"
              >
                Personalizar Modelo 3D
              </Button>
            </Link>
          </div>
          
          {/* Wishlist and Share */}
          <div className="flex gap-4 text-sm text-gray-600">
            <button className="flex items-center hover:text-primary">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Adicionar aos Favoritos
            </button>
            
            <button className="flex items-center hover:text-primary">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Compartilhar
            </button>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'description'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Descrição
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'specifications'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('specifications')}
            >
              Especificações
            </button>
            
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Avaliações ({reviews.length})
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">
                Características
              </h3>
              
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Feito com material PLA de alta qualidade</li>
                <li>Impressão 3D com acabamento premium</li>
                <li>Personalização com nome ou texto de sua escolha</li>
                <li>Disponível em diversas cores</li>
                <li>Produto lavável e durável</li>
                <li>Design exclusivo</li>
              </ul>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">
                Cuidados
              </h3>
              
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Lavar com água morna e sabão neutro</li>
                <li>Não utilizar produtos químicos agressivos</li>
                <li>Não expor a temperaturas elevadas</li>
                <li>Secar completamente antes de utilizar novamente</li>
              </ul>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Especificações Técnicas
              </h3>
              
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Material</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">PLA (Ácido Polilático)</dd>
                  </div>
                  <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Dimensões</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">15cm x 15cm x 5cm</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Peso</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">200g</dd>
                  </div>
                  <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Capacidade</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">500ml</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Cores disponíveis</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Azul, Verde, Vermelho, Roxo, Amarelo, Laranja</dd>
                  </div>
                  <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Personalização</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Texto de até 20 caracteres</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Garantia</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">30 dias contra defeitos de fabricação</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 mr-2">
                    {calculateAverageRating().toFixed(1)}
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className={`w-5 h-5 ${star <= calculateAverageRating() ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">
                    {reviews.length} avaliações
                  </span>
                </div>
                
                <div className="ml-auto">
                  <Button variant="outline" size="sm">
                    Escrever Avaliação
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star}
                            className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-900 font-medium ml-2">
                        {review.userName}
                      </span>
                      <span className="text-gray-500 text-sm ml-auto">
                        {new Date(review.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
                
                {reviews.length > 3 && (
                  <div className="text-center">
                    <button 
                      className="text-primary hover:text-primary-dark font-medium"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                      {showAllReviews ? 'Ver menos avaliações' : 'Ver todas as avaliações'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos Relacionados</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link to={`/produto/${relatedProduct.id}`} className="block">
                <img 
                  src={relatedProduct.images[0]} 
                  alt={relatedProduct.name} 
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-4">
                  <span className="text-xs font-medium text-primary">{relatedProduct.category}</span>
                  <h3 className="font-medium text-gray-900 mt-1">{relatedProduct.name}</h3>
                  <p className="text-gray-700 font-bold mt-1">{formatCurrency(relatedProduct.price)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;