
// Product and order type definitions
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stockQuantity: number;
  image?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
  addedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
  wishlist: string[];
  orderHistory: Order[];
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent?: string;
  children: Category[];
  productCount: number;
}
