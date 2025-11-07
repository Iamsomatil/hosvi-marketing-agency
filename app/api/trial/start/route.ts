import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    console.log("Trial start API called");

    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not set");
      return NextResponse.json(
        { message: "Server misconfiguration: DATABASE_URL is missing" },
        { status: 500 }
      );
    }

    console.log("DATABASE_URL is set, parsing request body");
    const {
      name,
      email,
      phone,
      businessName,
      city,
      state,
      plan = "BASIC",
    } = await request.json();

    console.log("Request body parsed:", {
      name,
      email,
      businessName,
      city,
      state,
      plan,
    });

    // Check if user already exists
    console.log("Checking if user exists for email:", email);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", email);
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create organization first
    console.log("Creating organization for:", businessName);
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 30);

    const org = await prisma.org.create({
      data: {
        name: businessName,
        city,
        state,
        plan: plan as "BASIC" | "PREMIUM",
        trialEndsAt,
        onboardedAt: new Date(),
      },
    });
    console.log("Organization created with ID:", org.id);

    // Create user
    console.log("Creating user for:", email);
    const tempPassword = Math.random().toString(36).slice(-8);
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        orgId: org.id,
      },
    });
    console.log("User created with ID:", user.id);

    // Create some demo data for the new organization
    console.log("Creating demo data for org:", org.id);
    await createDemoData(org.id);
    console.log("Demo data created successfully");

    // In a real app, you'd send an email with login credentials here
    console.log(
      `Created account for ${email} with temp password: ${tempPassword}`
    );

    return NextResponse.json({
      message: "Account created successfully",
      orgId: org.id,
      userId: user.id,
      tempPassword, // Remove in production - send via email instead
    });
  } catch (error: any) {
    console.error("Trial creation error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error?.message ?? "unknown" },
      { status: 500 }
    );
  }
}

async function createDemoData(orgId: string) {
  // Create demo leads
  const demoLeads = [
    {
      name: "Dr. Sarah Johnson",
      clinic: "Wellness Chiropractic",
      city: "Miami",
      source: "Email Campaign",
      status: "QUALIFIED",
    },
    {
      name: "Dr. Michael Chen",
      clinic: "Chen Family Practice",
      city: "Tampa",
      source: "LinkedIn",
      status: "BOOKED",
    },
    {
      name: "Dr. Lisa Rodriguez",
      clinic: "Sunshine Chiropractic",
      city: "Orlando",
      source: "Email Campaign",
      status: "CLOSED",
    },
    {
      name: "Dr. James Wilson",
      clinic: "Wilson Chiropractic",
      city: "Jacksonville",
      source: "Referral",
      status: "NEW",
    },
    {
      name: "Dr. Emily Davis",
      clinic: "Rejuvenate Chiropractic",
      city: "Fort Lauderdale",
      source: "Email Campaign",
      status: "SHOWED",
    },
  ];

  await Promise.all(
    demoLeads.map((lead) =>
      prisma.lead.create({
        data: {
          ...lead,
          orgId,
          status: lead.status as any,
          lastTouch: new Date(
            Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
          ), // Random date within last 7 days
        },
      })
    )
  );

  // Create demo campaigns
  const demoCampaigns = [
    {
      name: "Chiro New Patient Campaign",
      channel: "email",
      sends: 150,
      opens: 45,
      replies: 8,
      replyRate: 5.3,
    },
    {
      name: "New Patient Holiday Promo",
      channel: "email",
      sends: 200,
      opens: 72,
      replies: 12,
      replyRate: 6.0,
    },
    {
      name: "LinkedIn Outreach",
      channel: "linkedin",
      sends: 100,
      opens: 35,
      replies: 4,
      replyRate: 4.0,
    },
  ];

  await Promise.all(
    demoCampaigns.map((campaign) =>
      prisma.campaign.create({
        data: {
          ...campaign,
          orgId,
        },
      })
    )
  );

  // Create demo KPI data for the last 30 days
  const kpiPromises = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    kpiPromises.push(
      prisma.kpiDaily.create({
        data: {
          orgId,
          date: date,
          leads: Math.floor(Math.random() * 10) + 1,
          positiveReplies: Math.floor(Math.random() * 5),
          qualified: Math.floor(Math.random() * 3),
          booked: Math.floor(Math.random() * 2),
          showed: Math.floor(Math.random() * 2),
          closed: Math.floor(Math.random() * 1),
        },
      })
    );
  }

  await Promise.all(kpiPromises);
}
