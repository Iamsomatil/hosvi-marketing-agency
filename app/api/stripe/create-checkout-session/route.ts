import { NextRequest, NextResponse } from "next/server";
import { getStripe, STRIPE_PRICES, PlanKey } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { plan, orgId } = (await req.json()) as {
      plan: PlanKey;
      orgId?: string;
    };
    if (!plan || !(plan in STRIPE_PRICES)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Debug logs to help diagnose env issues (visible only on server)
    console.log("[Stripe] Requested plan:", plan);
    console.log("[Stripe] STRIPE_PRICES map:", {
      BASIC: !!STRIPE_PRICES.BASIC ? "set" : "missing",
      PREMIUM: !!STRIPE_PRICES.PREMIUM ? "set" : "missing",
    });

    const priceId = STRIPE_PRICES[plan];
    if (!priceId) {
      return NextResponse.json(
        {
          error: "Price not configured",
          hint:
            process.env.NODE_ENV !== "production"
              ? `Missing env for ${plan}. Set STRIPE_PRICE_${plan} in .env.local and restart the server.`
              : undefined,
        },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email ?? undefined;
    const userId = session?.user?.id ?? undefined;

    let resolvedOrgId = orgId;
    if (!resolvedOrgId && userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { orgId: true },
      });
      resolvedOrgId = user?.orgId ?? undefined;
    }

    const stripe = getStripe();

    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: userEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
        metadata: {
          orgId: resolvedOrgId ?? "",
          userId: userId ?? "",
          plan,
        },
      },
      metadata: {
        orgId: resolvedOrgId ?? "",
        userId: userId ?? "",
        plan,
      },
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ url: checkout.url }, { status: 200 });
  } catch (err) {
    console.error("create-checkout-session error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
