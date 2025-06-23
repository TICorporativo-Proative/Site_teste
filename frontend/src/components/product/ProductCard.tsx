import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    images: string[];
    category: string;
    customizable?: boolean;
  };
  className?: string;
}

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
  };
  
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };
  
  return (
    <div 
      className={`group bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/produto/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          <div className="absolute top-2 right-2 z-10">
            <button 
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Add to favorites logic
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          
          {product.customizable && (
            <div className="absolute top-2 left-2">
              <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-md">
                Personalizável
              </span>
            </div>
          )}
          
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transform transition-transform duration-300 ${
              isHovered ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="flex space-x-2">
              <button 
                className="bg-primary text-white text-sm py-1 px-3 rounded-md flex-1 hover:bg-blue-600 transition-colors"
                onClick={handleAddToCart}
              >
                Comprar
              </button>
              <Link 
                to={`/produto/${product.id}`}
                className="bg-white text-gray-800 text-sm py-1 px-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Ver Detalhes
              </Link>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <span className="text-xs font-medium text-primary">{product.category}</span>
          <h3 className="font-medium text-gray-900 mt-1">{product.name}</h3>
          <p className="text-gray-700 font-bold mt-1">{formatCurrency(product.price)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;