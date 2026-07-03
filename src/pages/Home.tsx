import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/Product/ProductGrid';
import FadeInSection from '@/components/FadeInSection';
import { products, categories } from '@/data/mockData';

const categoryImages: Record<string, string> = {
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
  fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
  'home-garden': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
};

const Home = () => {
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeInSection>
              <p className="text-sm font-medium text-accent uppercase tracking-wide mb-3">
                12 categories · Free shipping over $50
              </p>
              <h1 className="text-display text-foreground mb-5">
                Electronics, style, and home essentials — shipped in 2–4 days.
              </h1>
              <p className="text-muted-foreground text-lg prose-width mb-8">
                ThriveStore brings together tech, fashion, and home goods in one place.
                Every item is vetted for quality before it hits the shelf.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Button asChild size="lg">
                  <Link to="/products?category=electronics">
                    Shop Electronics
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/categories">Browse Categories</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.slug}`}
                    className="text-sm px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </FadeInSection>

            <FadeInSection delay={0.1} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop"
                alt="Curated products on a wooden table"
                width={800}
                height={600}
                loading="eager"
                className="w-full h-full object-cover ken-burns"
              />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 md:py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <FadeInSection className="mb-10">
            <h2 className="mb-2">Shop by category</h2>
            <p className="text-muted-foreground">Three departments, hundreds of products.</p>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <FadeInSection key={cat.id} delay={i * 0.05}>
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="group block rounded-lg overflow-hidden border border-border bg-card hover:border-accent/50 transition-colors"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={categoryImages[cat.slug]}
                      alt={cat.name}
                      width={600}
                      height={400}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-1">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground">{cat.productCount}+ items</p>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <FadeInSection className="flex items-end justify-between mb-10">
            <div>
              <h2 className="mb-2">New arrivals</h2>
              <p className="text-muted-foreground">Fresh picks added this month.</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link to="/products?sort=newest">
                View all <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
          </FadeInSection>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <FadeInSection className="mb-10">
            <h2 className="mb-2">Best sellers</h2>
            <p className="text-muted-foreground">What shoppers are buying right now.</p>
          </FadeInSection>
          <ProductGrid products={bestSellers} />
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: 'Free shipping over $50', desc: 'Standard delivery in 2–4 business days.' },
              { icon: RotateCcw, title: '30-day returns', desc: 'Unused items in original packaging.' },
              { icon: Shield, title: 'Secure checkout', desc: 'Encrypted payment processing on every order.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
