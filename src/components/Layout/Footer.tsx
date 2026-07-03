import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-bold">ThriveStore</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              Electronics, fashion, and home essentials — shipped in 2–4 business days.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">Shop</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/products" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">All Products</Link></li>
              <li><Link to="/products?category=electronics" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=fashion" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Fashion</Link></li>
              <li><Link to="/products?category=home-garden" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Home & Garden</Link></li>
              <li><Link to="/products?sort=deals" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Deals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">Help</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact</Link></li>
              <li><Link to="/shipping" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Returns</Link></li>
              <li><Link to="/contact#faq" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm mb-6">
              <li><Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Our Story</Link></li>
              <li><Link to="/privacy" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Terms</Link></li>
            </ul>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>hello@thrivestore.demo</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+1 (312) 555-0198</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>2847 W Fulton St, Chicago, IL 60612</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/15 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} ThriveStore. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm">
            Storefront demo built by{' '}
            <a
              href="https://github.com/jimcarry"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Jimcarry Omambak
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
