import Stripe from "stripe";

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key, {
    apiVersion: "2024-04-10",
  });
}

export const STRIPE_PRICES = {
  BASIC: process.env.STRIPE_PRICE_BASIC,
  PREMIUM: process.env.STRIPE_PRICE_PREMIUM,
} as const;

export type PlanKey = keyof typeof STRIPE_PRICES;
