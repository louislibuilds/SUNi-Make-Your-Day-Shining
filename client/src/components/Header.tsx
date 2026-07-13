import { Search, ShoppingCart, Menu, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCartStore } from '../store/cartStore';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  isAdmin?: boolean;
  userEmail?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

export function Header({ 
  currentPage, 
  onNavigate, 
  isLoggedIn = false, 
  isAdmin = false, 
  userEmail = '',
  onLogin,
  onLogout 
}: HeaderProps) {
  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                suni
              </span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')} 
              className={`hover:text-orange-600 transition-colors ${currentPage === 'home' ? 'text-orange-600' : 'text-foreground'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('products')} 
              className={`hover:text-orange-600 transition-colors ${currentPage === 'products' ? 'text-orange-600' : 'text-foreground'}`}
            >
              Products
            </button>
            <button 
              onClick={() => onNavigate('categories')} 
              className={`hover:text-orange-600 transition-colors ${currentPage.startsWith('category-') ? 'text-orange-600' : 'text-foreground'}`}
            >
              Categories
            </button>
            <button 
              onClick={() => onNavigate('about')} 
              className={`hover:text-orange-600 transition-colors ${currentPage === 'about' ? 'text-orange-600' : 'text-foreground'}`}
            >
              About
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className={`hover:text-orange-600 transition-colors ${currentPage === 'contact' ? 'text-orange-600' : 'text-foreground'}`}
            >
              Contact
            </button>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:flex">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 w-64 bg-muted/50 border-0 focus:bg-white"
                onFocus={() => onNavigate('products')}
              />
            </div>

            {/* User Account */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onNavigate('admin')}
                    className="hidden md:flex border-orange-200"
                  >
                    Admin
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onNavigate('profile')}
                  title={userEmail}
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onLogout}
                  className="hidden md:flex border-orange-200"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogin}
                className="hidden md:flex border-orange-200"
              >
                Sign In
              </Button>
            )}

            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => onNavigate('cart')}
              title="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}