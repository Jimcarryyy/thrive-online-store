# ThriveStore

ThriveStore is a portfolio-grade e-commerce storefront built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. It presents a curated multi-category shopping experience across electronics, fashion, and home goods, with a polished frontend, motion system, cart flow, legal pages, and Vercel-ready deployment.

## Highlights

- Marketplace-style homepage with category shortcuts, new arrivals, best sellers, and trust messaging
- Product catalog with search, category filtering, sorting, and grid/list views
- Product detail pages with image gallery, variant selection, and add-to-cart flow
- Cart, checkout, and order confirmation flow backed by `localStorage`
- Account area for demo order history
- Shipping, returns, privacy, and terms pages
- Scroll-to-top route handling and subtle motion with `framer-motion`
- Vercel-compatible SPA routing via `vercel.json`

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix UI
- React Router
- TanStack Query
- Framer Motion
- Sonner

## Routes

- `/` - Home
- `/products` - Product catalog
- `/product/:id` - Product detail
- `/categories` - Category hub
- `/about` - Brand story and build notes
- `/contact` - Support and FAQ
- `/cart` - Shopping cart
- `/checkout` - Checkout
- `/order-confirmation/:orderId` - Order confirmation
- `/account` - Demo account and orders
- `/shipping` - Shipping policy
- `/returns` - Returns policy
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The Vite dev server runs on `http://localhost:8080`.

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Deployment

This project is configured for Vercel.

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrite config: [`vercel.json`](vercel.json)

## Project Structure

```text
src/
  components/
    Layout/
    Product/
    ui/
  contexts/
  data/
  pages/
  types/
```

## Notes

- Product, checkout, and account data are demo-only and stored locally in the browser.
- No backend or real payment gateway is connected in this version.

## Author

Built by Jimcarry Omambak.
