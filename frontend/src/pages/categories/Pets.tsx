import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import ProductCard from '../../components/product/ProductCard';
import Card from '../../components/ui/Card';

const PetsCategory = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    sortBy: 'featured',
    subcategories: [] as string[],
  });
  
  // Mock subcategories
  const subcategories = [
    { id: 'comedouros', name: 'Comedouros' },
    { id: 'bebedouros', name: 'Bebedouros' },
    { id: 'brinquedos', name: 'Brinquedos' },
    { id: 'camas', name: 'Camas' },
    { id: 'identificacao', name: 'Identificação' },
    { id: 'higiene', name: 'Higiene' },
  ];
  
  // Fetch products on mount
  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    const fetchProducts = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock products data
        const mockProducts = [
          {
            id: 1,
            name: 'Comedouro Personalizado',
            price: 59.90,
            images: ['https://via.placeholder.com/300x300'],
            category: 'Pets',
            subcategory: 'comedouros',
            customizable: true,
            featured: true,
          },
          {
            id: 2,
            name: 'Porta Petiscos',
            price: 45.90,
            images: ['https://via.placeholder.com/300x300'],
            category: 'Pets',
            subcategory: 'comedouros',
            customizable: true,
            featured: false,
          },
          {
            id: 3,
            name: 'Brinquedo Interativo',
            price: 39.90,
            images: ['https://via.placeholder.com/300x300'],
            category: 'Pets',
            subcategory: 'brinquedos',
            customizable: false,
            featured: true,
          },
          {
            id: 4,
            name: 'Placa de Identificação',
            price: 29.90,
            images: ['https://via.placeholder.com/300x300'],
            category: 'Pets',
            subcategory: 'identificacao',
            customizable: true,
            featured: true,
          },
          {
            id: 5,
            name: 'Bebedouro Automático',
            price: 79.90,
            images: ['https://via.placeholder.com/300x300'],
            category: 'Pets',
            subcategory: 'bebedouros',
            customizable: false,
            featured: false,
          },
          {
            id: 6,
            name: 'Cama Personalizada',
            price: 89.90,
            images: ['https://via.placeholder.com/300x300'],
            category: 'Pets',
            subcategory: 'camas',
            customizable: true,
            featured: true,
          },
          {
            id: 7,
            name: 'Escova de Dentes',
            price: 19.90,
            images: ['https://via.placeholder.com/300x300'],
            category: 'Pets',
            subcategory: 'higiene',
            customizable: false,
            featured: false,
          },
          {
            id: 8,
            name: 'Dispenser de Sacolinhas',
            price: 24.90,
            images: ['https://via.placeholder.com/300x300'],
            category: 'Pets',
            subcategory: 'higiene',
            customizable: true,
            featured: false,
          },
        ];
        
        setProducts(mockProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Filter by price range
      const inPriceRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      
      // Filter by subcategories
      const inSubcategory = filters.subcategories.length === 0 || filters.subcategories.includes(product.subcategory);
      
      return inPriceRange && inSubcategory;
    })
    .sort((a, b) => {
      // Sort products
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return b.featured ? 1 : -1;
      }
    });
  
  // Handle filter changes
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      sortBy: e.target.value,
    }));
  };
  
  const handleSubcategoryChange = (subcategory: string) => {
    setFilters(prev => {
      const subcategories = [...prev.subcategories];
      
      if (subcategories.includes(subcategory)) {
        // Remove subcategory
        return {
          ...prev,
          subcategories: subcategories.filter(sc => sc !== subcategory),
        };
      } else {
        // Add subcategory
        return {
          ...prev,
          subcategories: [...subcategories, subcategory],
        };
      }
    });
  };
  
  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [min, max],
    }));
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Produtos para Pets</h1>
          <p className="text-gray-600">
            Encontre produtos personalizados e únicos para seu melhor amigo.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <Card title="Filtros" className="sticky top-4">
              {/* Subcategories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Subcategorias</h3>
                <div className="space-y-2">
                  {subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="flex items-center">
                      <input
                        id={`subcategory-${subcategory.id}`}
                        type="checkbox"
                        checked={filters.subcategories.includes(subcategory.id)}
                        onChange={() => handleSubcategoryChange(subcategory.id)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`subcategory-${subcategory.id}`} className="ml-2 text-sm text-gray-700">
                        {subcategory.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Faixa de Preço</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="price-range-1"
                      type="radio"
                      checked={filters.priceRange[0] === 0 && filters.priceRange[1] === 1000}
                      onChange={() => handlePriceRangeChange(0, 1000)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="price-range-1" className="ml-2 text-sm text-gray-700">
                      Todos os preços
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-range-2"
                      type="radio"
                      checked={filters.priceRange[0] === 0 && filters.priceRange[1] === 50}
                      onChange={() => handlePriceRangeChange(0, 50)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="price-range-2" className="ml-2 text-sm text-gray-700">
                      Até R$ 50
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-range-3"
                      type="radio"
                      checked={filters.priceRange[0] === 50 && filters.priceRange[1] === 100}
                      onChange={() => handlePriceRangeChange(50, 100)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="price-range-3" className="ml-2 text-sm text-gray-700">
                      R$ 50 - R$ 100
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="price-range-4"
                      type="radio"
                      checked={filters.priceRange[0] === 100 && filters.priceRange[1] === 1000}
                      onChange={() => handlePriceRangeChange(100, 1000)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <label htmlFor="price-range-4" className="ml-2 text-sm text-gray-700">
                      Acima de R$ 100
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Custom Price Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Preço Personalizado</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.priceRange[1])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Min"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    min="0"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>
            </Card>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-sm text-gray-500 mb-4 sm:mb-0">
                Mostrando {filteredProducts.length} produtos
              </p>
              
              <div className="flex items-center">
                <label htmlFor="sort-by" className="text-sm text-gray-700 mr-2">
                  Ordenar por:
                </label>
                <select
                  id="sort-by"
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="featured">Destaque</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name">Nome</option>
                </select>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600">
                  Tente ajustar seus filtros ou buscar por outra categoria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PetsCategory;