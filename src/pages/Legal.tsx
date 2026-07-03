import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PolicyLayout = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-background">
    <div className="container mx-auto px-4 py-16 md:py-20 max-w-3xl">
      <h1 className="mb-8">{title}</h1>
      <div className="prose-width space-y-4 text-muted-foreground leading-relaxed">{children}</div>
      <div className="mt-10">
        <Button variant="outline" asChild><Link to="/contact">Contact us</Link></Button>
      </div>
    </div>
  </div>
);

export const Shipping = () => (
  <PolicyLayout title="Shipping">
    <p>Standard shipping is free on orders over $50. Orders below $50 incur a flat $9.99 shipping fee.</p>
    <p>Most packages arrive within 2–4 business days after processing. Processing typically takes one business day.</p>
    <p>Express shipping (1–2 business days) is available at checkout for $14.99.</p>
    <p>Tracking information is provided by email once your order ships. Demo orders do not send real emails.</p>
  </PolicyLayout>
);

export const Returns = () => (
  <PolicyLayout title="Returns & refunds">
    <p>You may return unused items in their original packaging within 30 days of delivery.</p>
    <p>To start a return, contact us with your order ID. We will provide a prepaid return label for eligible items.</p>
    <p>Refunds are issued to the original payment method within 5–7 business days after we receive the return.</p>
    <p>Opened electronics may be subject to a 15% restocking fee if not defective.</p>
  </PolicyLayout>
);

export const Privacy = () => (
  <PolicyLayout title="Privacy policy">
    <p>ThriveStore is a demo storefront. In a production deployment, this page would describe how customer data is collected, stored, and used.</p>
    <p>Demo checkout data is stored locally in your browser (localStorage) and is not transmitted to any server.</p>
    <p>We do not sell personal information. Contact forms in this demo log to the browser console only.</p>
    <p>Last updated: July 2026.</p>
  </PolicyLayout>
);

export const Terms = () => (
  <PolicyLayout title="Terms of service">
    <p>By using ThriveStore you agree to these terms. This is a demonstration e-commerce site — no real transactions are processed.</p>
    <p>Product images and descriptions are for demonstration purposes. Prices and availability may change without notice.</p>
    <p>ThriveStore is provided as-is without warranties. Built by Jimcarry Omambak as a portfolio project.</p>
    <p>Last updated: July 2026.</p>
  </PolicyLayout>
);

const legalPages: Record<string, React.FC> = {
  '/shipping': Shipping,
  '/returns': Returns,
  '/privacy': Privacy,
  '/terms': Terms,
};

export const LegalRouter = () => {
  const { pathname } = useLocation();
  const Page = legalPages[pathname] ?? Shipping;
  return <Page />;
};

export default Shipping;
