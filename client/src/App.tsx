import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import CategoriesPage from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import { useAuthStore } from './store/authStore';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, isAuthenticated, logout } = useAuthStore();

  const isLoggedIn = isAuthenticated;
  const isAdmin = user?.role === 'admin';
  const userEmail = user?.email ?? '';

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  useEffect(() => {
    if (currentPage === 'admin' && (!isAuthenticated || user?.role !== 'admin')) {
      setCurrentPage(isAuthenticated ? 'home' : 'login');
    }
  }, [currentPage, isAuthenticated, user]);

  const getCategoryFromPage = (page: string) => {
    const categoryMap: { [key: string]: string } = {
      'category-home-living': 'Home & Living',
      'category-kitchen-essentials': 'Kitchen Essentials',
      'category-work-productivity': 'Work & Productivity',
      'category-wellness-self-care': 'Wellness & Self-Care',
      'category-garden-outdoor': 'Garden & Outdoor',
    };
    return categoryMap[page] || 'All Products';
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;

      case 'products':
        return <Products />;

      case 'category-home-living':
      case 'category-kitchen-essentials':
      case 'category-work-productivity':
      case 'category-wellness-self-care':
      case 'category-garden-outdoor':
        return <CategoryPage category={getCategoryFromPage(currentPage)} />;

      case 'categories':
        return <CategoriesPage onNavigate={handleNavigate} />;

      case 'about':
        return <About />;

      case 'contact':
        return <Contact />;

      case 'admin':
        if (!isAuthenticated || user?.role !== 'admin') {
          return null;
        }
        return <Admin onNavigate={handleNavigate} />;

      case 'checkout':
        return (
          <Checkout
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
            userEmail={userEmail}
          />
        );

      case 'order-confirmation':
        return (
          <Orders
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
            orderType="confirmation"
          />
        );

      case 'order-history':
        return (
          <Orders
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
            orderType="history"
          />
        );

      case 'order-tracking':
        return (
          <Orders
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
            orderType="tracking"
          />
        );

      case 'profile':
        return (
          <Profile
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
            profileType="account"
          />
        );

      case 'guest-lookup':
        return (
          <Profile
            onNavigate={handleNavigate}
            isLoggedIn={false}
            profileType="guest-lookup"
          />
        );

      case 'login':
        return <Login onNavigate={handleNavigate} />;

      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      {currentPage !== 'login' && currentPage !== 'admin' && (
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          userEmail={userEmail}
          onLogin={() => handleNavigate('login')}
          onLogout={handleLogout}
        />
      )}
      {renderPage()}
      {currentPage !== 'login' && currentPage !== 'admin' && <Footer />}
    </div>
  );
}
