
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const getItemKey = (productId: string, variants?: Record<string, string>) =>
  `${productId}::${JSON.stringify(variants ?? {})}`;

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; variants?: Record<string, string> } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variants?: Record<string, string> } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number; variants?: Record<string, string> } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product, quantity?: number, variants?: Record<string, string>) => void;
  removeFromCart: (productId: string, variants?: Record<string, string>) => void;
  updateQuantity: (productId: string, quantity: number, variants?: Record<string, string>) => void;
  clearCart: () => void;
} | null>(null);

const calcTotals = (items: CartItem[]) => ({
  total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, variants } = action.payload;
      const key = getItemKey(product.id, variants);
      const existingIndex = state.items.findIndex(
        (item) => getItemKey(item.productId, item.selectedVariants) === key
      );

      let newItems: CartItem[];
      if (existingIndex >= 0) {
        newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
      } else {
        newItems = [
          ...state.items,
          {
            productId: product.id,
            product,
            quantity,
            selectedVariants: variants,
            addedAt: new Date(),
          },
        ];
      }

      return { items: newItems, ...calcTotals(newItems) };
    }

    case 'REMOVE_ITEM': {
      const key = getItemKey(action.payload.productId, action.payload.variants);
      const newItems = state.items.filter(
        (item) => getItemKey(item.productId, item.selectedVariants) !== key
      );
      return { items: newItems, ...calcTotals(newItems) };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity, variants } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId, variants } });
      }

      const key = getItemKey(productId, variants);
      const newItems = state.items.map((item) =>
        getItemKey(item.productId, item.selectedVariants) === key
          ? { ...item, quantity }
          : item
      );
      return { items: newItems, ...calcTotals(newItems) };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    case 'LOAD_CART': {
      const items = action.payload;
      return { items, ...calcTotals(items) };
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems: CartItem[] = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, quantity = 1, variants?: Record<string, string>) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, variants } });
  };

  const removeFromCart = (productId: string, variants?: Record<string, string>) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variants } });
  };

  const updateQuantity = (productId: string, quantity: number, variants?: Record<string, string>) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity, variants } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
