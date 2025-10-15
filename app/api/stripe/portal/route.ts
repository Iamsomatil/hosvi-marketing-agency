import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { org: { select: { id: true, stripeCustomerId: true } } },
    });

    const customerId = user?.org?.stripeCustomerId;
    if (!customerId) {
      return NextResponse.json(
        { error: "No Stripe customer found" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.nextUrl.origin}/dashboard`,
    });

    return NextResponse.json({ url: portal.url });
  } catch (err) {
    console.error("billing portal error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
