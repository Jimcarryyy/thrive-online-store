import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useCart();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const navigation = [
    { name: 'Shop', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Our Story', href: '/about' },
    { name: 'Help', href: '/contact' },
  ];

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/products?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/products');
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="bg-primary text-primary-foreground text-center text-sm py-2 px-4">
        Free shipping on orders over $50 · 30-day returns
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={handleNavClick}>
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-accent font-bold text-sm">T</span>
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">ThriveStore</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-0"
              />
            </div>
          </form>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {state.itemCount > 0 && (
                  <motion.span
                    key={state.itemCount}
                    initial={prefersReducedMotion ? false : { scale: 1.4 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  >
                    {state.itemCount}
                  </motion.span>
                )}
                <span className="ml-2 hidden lg:inline">Cart</span>
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link to="/account">
                <User className="w-5 h-5" />
                <span className="ml-2 hidden lg:inline">Account</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <nav className="hidden md:flex gap-8 py-3 border-t border-border">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {isMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-t border-border py-4"
          >
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-0"
                />
              </div>
            </form>
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                  onClick={handleNavClick}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/account"
                className="block py-2 text-sm font-medium text-foreground hover:text-accent transition-colors sm:hidden"
                onClick={handleNavClick}
              >
                Account
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
