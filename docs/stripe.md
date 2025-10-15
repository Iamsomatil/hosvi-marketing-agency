# Stripe Integration Guide

This document explains how to configure and test the Stripe Checkout subscription integration in this project.

## Prerequisites

- Stripe account (test mode)
- Node.js 18+
- PostgreSQL and Prisma set up

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_BASIC=price_...
STRIPE_PRICE_PREMIUM=price_...
```

- Create Prices in Stripe Dashboard for the BASIC ($1,500/mo) and PREMIUM ($3,000/mo) plans. Assign their IDs respectively to `STRIPE_PRICE_BASIC` and `STRIPE_PRICE_PREMIUM`.
- If your product prices include a trial period, `subscription_data.trial_from_plan` is enabled in Checkout.

## Install & Database

```bash
npm install
npx prisma generate
npx prisma db push   # or prisma migrate dev
```

## Run the App

```bash
npm run dev
```

Open `http://localhost:3000` and use the Pricing buttons to start checkout.

## Webhook Setup (Local)

In a new terminal, run:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

- Copy the printed `whsec_...` secret and put it in `STRIPE_WEBHOOK_SECRET`.
- The webhook handler verifies signatures and updates `Org` with:
  - `stripeCustomerId`
  - `stripeSubscriptionId`
  - `stripePriceId`
  - `stripeSubscriptionStatus`
  - `trialEndsAt` (synced from Stripe on checkout completion)
  - `plan` (derived from configured price IDs)

## Test Cards

- Successful: 4242 4242 4242 4242, any future expiry, any CVC, any zip
- 3D Secure: 4000 0025 0000 3155
- Payment failure: 4000 0000 0000 9995

See Stripe docs for more test cards.

## Customer Portal (Billing)

- Optional endpoint `/api/stripe/portal` creates a billing portal session for the logged-in customer to manage subscriptions.

## Production Deployment

- Ensure Node runtime (default) for webhook route.
- Configure environment variables in your hosting provider.
- Set the Stripe webhook endpoint in the Stripe Dashboard to your production URL:
  - `https://your-domain.com/api/stripe/webhook`
- Recommended webhook events:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.paid`
  - `invoice.payment_failed`

## Troubleshooting

- 400 Invalid signature: ensure `STRIPE_WEBHOOK_SECRET` matches the tunnel's secret.
- No redirect to Checkout: confirm `STRIPE_PRICE_BASIC/PREMIUM` are set and active.
- Org not updating: verify that `orgId` metadata is set or that the user has an associated `orgId`.

## Next Steps

- Gate access to dashboard features based on `stripeSubscriptionStatus` (allow `trialing` and `active`).
- Add a "Manage Billing" button linking to `/api/stripe/portal`.
