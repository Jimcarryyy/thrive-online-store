
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Plus, Minus, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/mockData';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/products"><ArrowLeft className="w-4 h-4 mr-2" />Back to shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const variantGroups = product.variants
    ? Object.entries(
        product.variants.reduce<Record<string, typeof product.variants>>((acc, v) => {
          if (!acc[v.name]) acc[v.name] = [];
          acc[v.name].push(v);
          return acc;
        }, {})
      )
    : [];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants);
    toast.success('Added to cart', { description: `${quantity}× ${product.name}` });
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button variant="ghost" asChild className="mb-6 -ml-2">
          <Link to="/products"><ArrowLeft className="w-4 h-4 mr-2" />Back to shop</Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-12">
          <div>
            <div className="aspect-square mb-3 rounded-lg overflow-hidden border border-border bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-accent' : 'border-border'
                    }`}
                  >
                    <img src={image} alt="" width={150} height={150} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <Badge variant="secondary" className="mb-3">{product.category}</Badge>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? 'text-accent fill-current' : 'text-border'
                  }`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <Badge className="bg-accent text-accent-foreground">-{discountPercentage}%</Badge>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {variantGroups.map(([name, variants]) => (
              <div key={name} className="mb-4">
                <label className="text-sm font-medium mb-2 block">{name}</label>
                <Select onValueChange={(value) => setSelectedVariants((p) => ({ ...p, [name]: value }))}>
                  <SelectTrigger><SelectValue placeholder={`Select ${name.toLowerCase()}`} /></SelectTrigger>
                  <SelectContent>
                    {variants.map((v) => (
                      <SelectItem key={v.id} value={v.value}>{v.value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {product.inStock ? (
              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <Check className="w-4 h-4 mr-2 text-accent" />
                In stock — {product.stockQuantity} available
              </div>
            ) : (
              <p className="text-destructive font-medium mb-6">Out of stock</p>
            )}

            <Button onClick={handleAddToCart} disabled={!product.inStock} className="w-full mb-6" size="lg">
              <ShoppingCart className="w-5 h-5 mr-2" /> Add to cart
            </Button>

            <div className="grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-5 h-5 text-primary" /><span>Free ship $50+</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Shield className="w-5 h-5 text-primary" /><span>Secure checkout</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-5 h-5 text-primary" /><span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specs</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <p className="text-muted-foreground leading-relaxed max-w-prose">{product.description}</p>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                {product.specifications ? (
                  <dl className="grid sm:grid-cols-2 gap-3 max-w-2xl">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border text-sm">
                        <dt className="font-medium">{key}</dt>
                        <dd className="text-muted-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-muted-foreground">No specifications listed.</p>
                )}
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <p className="text-muted-foreground text-sm">
                  {product.reviewCount} ratings — detailed reviews coming soon.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
