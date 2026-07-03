
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Browse the shop and add items to get started.
          </p>
            <Button asChild size="lg">
              <Link to="/products">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const shipping = state.total > 50 ? 0 : 9.99;
  const tax = state.total * 0.08;
  const finalTotal = state.total + shipping + tax;

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Button variant="ghost" asChild className="mb-4 -ml-2">
          <Link to="/products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue shopping
          </Link>
        </Button>
        <h1 className="mb-1">Shopping cart</h1>
        <p className="text-muted-foreground mb-8">{state.itemCount} items</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={`${item.productId}-${JSON.stringify(item.selectedVariants)}`} className="border-border">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Link to={`/product/${item.product.id}`}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full md:w-24 h-24 object-cover rounded-lg bg-gray-100 hover:opacity-80 transition-opacity"
                      />
                    </Link>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <Link to={`/product/${item.product.id}`}>
                            <h3 className="font-semibold hover:text-accent transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">{item.product.category}</p>
                          {item.selectedVariants && (
                            <div className="mt-2">
                              {Object.entries(item.selectedVariants).map(([key, value]) => (
                                <span key={key} className="text-sm text-gray-500">
                                  {key}: {value}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            ${item.product.price.toFixed(2)}
                          </p>
                          {item.product.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              ${item.product.originalPrice.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedVariants)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-medium text-gray-900 w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.selectedVariants)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-4">
                          <p className="font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.productId, item.selectedVariants)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <p className="text-sm text-gray-600">
                {state.itemCount} item{state.itemCount !== 1 ? 's' : ''} in cart
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${state.total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                {shipping > 0 && (
                  <p className="text-sm text-accent bg-accent/10 p-3 rounded-md">
                    Add ${(50 - state.total).toFixed(2)} more for free shipping
                  </p>
                )}

                <div className="space-y-3 pt-4">
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>

                <div className="pt-4 text-xs text-gray-500">
                  <p className="mb-2">✓ Secure checkout with SSL encryption</p>
                  <p className="mb-2">✓ Free returns within 30 days</p>
                  <p>✓ 24/7 customer support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
