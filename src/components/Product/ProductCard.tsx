import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const prefersReducedMotion = useReducedMotion();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success('Added to cart', { description: product.name });
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -2 }}
      transition={{ duration: 0.2 }}
      className="group bg-card rounded-lg border border-border hover:border-accent/30 transition-colors overflow-hidden flex flex-col h-full"
    >
      <Link to={`/product/${product.id}`} className="block flex-1">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            loading="lazy"
            className="w-full h-full object-cover group-hover:opacity-95 transition-opacity duration-300"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discountPercentage > 0 && (
              <Badge className="bg-accent text-accent-foreground text-xs">-{discountPercentage}%</Badge>
            )}
            {product.newArrival && (
              <Badge variant="secondary" className="text-xs">New</Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="text-xs">Out of stock</Badge>
            )}
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{product.category}</p>
          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) ? 'text-accent fill-current' : 'text-border'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <Button onClick={handleAddToCart} disabled={!product.inStock} className="w-full" size="sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
