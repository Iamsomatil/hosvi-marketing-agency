import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const sig = headers().get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or secret" },
      { status: 400 }
    );
  }

  let event;
  try {
    const raw = await req.text();
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        const subscriptionId = session.subscription as string | undefined;
        const customerId = session.customer as string | undefined;
        const orgId = session.metadata?.orgId as string | undefined;
        const plan = session.metadata?.plan as string | undefined;
        const trialEnd = (session?.trial_end ||
          session?.subscription?.trial_end) as number | undefined;

        if (orgId) {
          await prisma.org
            .update({
              where: { id: orgId },
              data: {
                stripeCustomerId: customerId,
                stripeSubscriptionId: subscriptionId,
                stripePriceId: plan
                  ? process.env[`STRIPE_PRICE_${plan.toUpperCase()}` as const]
                  : undefined,
                stripeSubscriptionStatus: "trialing",
                plan: plan === "PREMIUM" ? "PREMIUM" : "BASIC",
                trialEndsAt: trialEnd ? new Date(trialEnd * 1000) : undefined,
              },
            })
            .catch(async () => {
              // Org might not exist yet; ignore if not found
            });
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as any;
        const subscriptionId = sub.id as string;
        const status = sub.status as string;
        const priceId = sub.items?.data?.[0]?.price?.id as string | undefined;
        const customerId = sub.customer as string | undefined;
        const orgId = sub.metadata?.orgId as string | undefined;

        if (orgId) {
          await prisma.org
            .update({
              where: { id: orgId },
              data: {
                stripeSubscriptionId: subscriptionId,
                stripeSubscriptionStatus: status,
                stripePriceId: priceId,
                stripeCustomerId: customerId,
              },
            })
            .catch(() => {});
        }
        break;
      }
      case "invoice.paid": {
        // Optionally track invoices here
        break;
      }
      case "invoice.payment_failed": {
        // Optionally notify admins/users
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook handler error", err);
    return NextResponse.json(
      { error: "Webhook handler error" },
      { status: 500 }
    );
  }
}
