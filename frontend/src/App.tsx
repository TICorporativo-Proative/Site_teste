import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Lazy-loaded pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderDetailPage = lazy(() => import('./pages/OrderDetailPage'));
const Personalization3DPage = lazy(() => import('./pages/Personalization3DPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/admin/Products'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const AdminCustomers = lazy(() => import('./pages/admin/Customers'));
const AdminPrinters = lazy(() => import('./pages/admin/Printers'));
const AdminMaterials = lazy(() => import('./pages/admin/Materials'));
const AdminPrintQueue = lazy(() => import('./pages/admin/PrintQueue'));
const AdminPrintCosts = lazy(() => import('./pages/admin/PrintCosts'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const AdminCategories = lazy(() => import('./pages/admin/Categories'));

// Customer Pages
const CustomerDashboard = lazy(() => import('./pages/customer/Dashboard'));
const CustomerOrders = lazy(() => import('./pages/customer/Orders'));
const CustomerProfile = lazy(() => import('./pages/customer/Profile'));
const CustomerAddresses = lazy(() => import('./pages/customer/Addresses'));
const Customer3DModels = lazy(() => import('./pages/customer/Models3D'));
const CustomerFavorites = lazy(() => import('./pages/customer/Favorites'));

// Category Pages
const PetsCategory = lazy(() => import('./pages/categories/Pets'));
const HomeCategory = lazy(() => import('./pages/categories/Home'));
const GardenCategory = lazy(() => import('./pages/categories/Garden'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/produto/:id" element={<ProductPage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/pedido/:id" element={<OrderDetailPage />} />
              <Route path="/personalizacao-3d" element={<Personalization3DPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cadastro" element={<RegisterPage />} />
              
              {/* Category Routes */}
              <Route path="/categorias/pets" element={<PetsCategory />} />
              <Route path="/categorias/casa" element={<HomeCategory />} />
              <Route path="/categorias/jardim" element={<GardenCategory />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/produtos" element={<AdminProducts />} />
              <Route path="/admin/pedidos" element={<AdminOrders />} />
              <Route path="/admin/clientes" element={<AdminCustomers />} />
              <Route path="/admin/impressoras" element={<AdminPrinters />} />
              <Route path="/admin/materiais" element={<AdminMaterials />} />
              <Route path="/admin/fila-impressao" element={<AdminPrintQueue />} />
              <Route path="/admin/custos-impressao" element={<AdminPrintCosts />} />
              <Route path="/admin/configuracoes" element={<AdminSettings />} />
              <Route path="/admin/categorias-precificacao" element={<AdminCategories />} />
              
              {/* Customer Routes */}
              <Route path="/conta" element={<CustomerDashboard />} />
              <Route path="/conta/pedidos" element={<CustomerOrders />} />
              <Route path="/conta/dados" element={<CustomerProfile />} />
              <Route path="/conta/enderecos" element={<CustomerAddresses />} />
              <Route path="/conta/modelos-3d" element={<Customer3DModels />} />
              <Route path="/conta/favoritos" element={<CustomerFavorites />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
