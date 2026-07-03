import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Laptop, Shirt, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FadeInSection from '@/components/FadeInSection';
import { categories } from '@/data/mockData';

const categoryMeta: Record<string, { icon: typeof Laptop; image: string; desc: string }> = {
  electronics: {
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
    desc: 'Headphones, laptops, cameras, and everyday tech.',
  },
  fashion: {
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
    desc: 'Clothing, bags, and accessories for all seasons.',
  },
  'home-garden': {
    icon: Home,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    desc: 'Furniture, kitchenware, lighting, and decor.',
  },
};

const Categories = () => {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <FadeInSection className="max-w-2xl mb-12">
          <h1 className="mb-4">Categories</h1>
          <p className="text-muted-foreground text-lg">
            Browse by department. Each category links to a filtered product catalog.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {categories.map((category, i) => {
            const meta = categoryMeta[category.slug];
            const Icon = meta?.icon ?? Home;
            return (
              <FadeInSection key={category.id} delay={i * 0.05}>
                <div className="rounded-lg border border-border bg-card overflow-hidden hover:border-accent/50 transition-colors">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={meta?.image}
                      alt={category.name}
                      width={600}
                      height={375}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <h2 className="text-lg font-semibold">{category.name}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{meta?.desc}</p>
                    <p className="text-xs text-muted-foreground mb-4">{category.productCount}+ products</p>
                    <Button asChild className="w-full">
                      <Link to={`/products?category=${category.slug}`}>
                        Browse {category.name}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>

        <FadeInSection className="text-center border border-border rounded-lg p-10 bg-card">
          <h2 className="text-xl font-semibold mb-3">Not sure where to start?</h2>
          <p className="text-muted-foreground mb-6">View the full catalog or get in touch.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild><Link to="/products">All products</Link></Button>
            <Button variant="outline" asChild><Link to="/contact">Contact us</Link></Button>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Categories;
