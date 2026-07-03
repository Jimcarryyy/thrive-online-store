import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FadeInSection from '@/components/FadeInSection';

const About = () => {
  const stats = [
    { number: '18', label: 'Curated products' },
    { number: '3', label: 'Departments' },
    { number: '30', label: 'Day returns' },
    { number: '2–4', label: 'Day shipping' },
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <FadeInSection className="max-w-3xl mb-16">
          <h1 className="mb-5">Our story</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            ThriveStore started with a simple idea: online shopping should feel less like
            digging through a warehouse and more like browsing a well-run shop. We list
            electronics, fashion, and home goods — only items we would actually recommend.
          </p>
        </FadeInSection>

        <FadeInSection className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-lg border border-border bg-card">
              <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </FadeInSection>

        <FadeInSection className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="prose-width">
            <h2 className="mb-4">How we pick products</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Every listing goes through a basic quality check: accurate specs, fair pricing,
              and reliable stock. We do not list thousands of drop-shipped generics — we
              focus on products that earn their shelf space.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Shipping is straightforward. Orders over $50 ship free. Everything else is a
              flat $9.99. If something is not right, you have 30 days to send it back.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=450&fit=crop"
              alt="Warehouse shelves with organized packages"
              width={600}
              height={450}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </FadeInSection>

        <FadeInSection>
          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">How this store was built</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    ThriveStore is a frontend storefront demo built by{' '}
                    <a
                      href="https://github.com/jimcarry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      Jimcarry Omambak
                    </a>
                    . It runs on React 18, TypeScript, Vite, and shadcn/ui — with a full
                    cart-to-checkout flow backed by localStorage. No backend required for
                    the demo, but the architecture is ready to plug into a real API.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    React · TypeScript · Vite · Tailwind CSS · React Router · Framer Motion
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>

        <FadeInSection className="text-center mt-16">
          <Button asChild size="lg">
            <Link to="/products">
              Start shopping <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </FadeInSection>
      </div>
    </div>
  );
};

export default About;
