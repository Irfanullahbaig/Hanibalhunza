# Haniball Hunza

Dried fruits and nuts from Hunza Valley: retail shop (B2C) and wholesale quote platform (B2B). Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS 4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev`: development server (Turbopack)
- `npm run build`: production build
- `npm start`: start production server
- `npm run lint`: ESLint

## How it works

| Area | Where | Notes |
| --- | --- | --- |
| Catalogue | `lib/data.ts` | Products, pack-size variants, categories, FAQs |
| Cart | `hooks/use-cart.tsx` | Persisted in `localStorage`; also holds the wholesale shortlist |
| Pricing | `lib/pricing.ts` | Shared by the UI and the server; the server always re-prices from the catalogue |
| Orders, quotes, messages | `app/actions.ts` | Server actions with Zod validation (`lib/schemas.ts`) |
| Delivery of submissions | `lib/notify.ts` | Posts to `SUBMISSIONS_WEBHOOK_URL` when set |

### Order and inquiry flow

1. The visitor submits checkout, the wholesale quote form or the contact form.
2. The server validates the input, re-prices the cart and creates a reference (`HH-…`, `WQ-…`, `MSG-…`).
3. If `SUBMISSIONS_WEBHOOK_URL` is set, the submission is POSTed there as JSON (`{ kind, reference, submittedAt, payload }`).
4. The visitor gets a pre-filled WhatsApp message. Without a webhook this is the only channel, and the UI says so.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `SUBMISSIONS_WEBHOOK_URL` | Endpoint that receives orders, quote requests, contact messages and newsletter sign-ups (Zapier, Make, Google Apps Script, Slack, CRM…). Newsletter sign-up stays disabled until it is set. |
| `SUBMISSIONS_WEBHOOK_SECRET` | Optional bearer token sent with each webhook call |

## Business settings to confirm

These are deliberately left empty rather than guessed. The site shows "confirmed with your order" or "per quote" until they are filled in.

- `commerceConfig.shippingFlatRate` / `freeShippingThreshold`: delivery charges
- `commerceConfig.paymentMethods`: e.g. `["Cash on delivery", "Bank transfer"]`; adds a payment choice at checkout
- `wholesaleConfig.minimumOrder`, `volumePricing`, `privateLabel`, `email`
- Per product: `wholesale.bulkFormats`, `wholesale.moq`, extra `variants` (e.g. 250 g / 1 kg)
- Nutrition panels (the product page says they are being prepared)
- `testimonials[].verified`: the reviews inherited from the old template are hidden until confirmed as genuine
- Product photography: gift sets use a representative photo and are labelled as such. The product images are crops of the existing marketing posters; clean studio shots would improve the cards.

## Not yet built (needs a backend)

These need a database and authentication, which the project does not have yet:

- Customer and business accounts, login
- B2B dashboard: quotes, order history, re-order, invoices, saved products
- Business-specific / tiered wholesale pricing (must be enforced server-side behind auth; no wholesale prices are exposed today)
- Order tracking and status updates
- Online payment (e.g. a Pakistani gateway such as PayFast/JazzCash/Easypaisa, or Stripe for international)
- Inventory management (stock is the `inStock` flag on each variant)
