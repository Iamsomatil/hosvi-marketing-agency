import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { subDays, format } from "date-fns";

export async function GET(request: NextRequest) {
  console.log('Dashboard summary API called');
  const session = await getServerSession(authOptions);
  console.log('Session in API:', JSON.stringify(session, null, 2));

  if (!session) {
    console.error('No session found');
    return NextResponse.json({ message: "No session found" }, { status: 401 });
  }

  if (!session.user?.orgId) {
    console.error('No orgId in session. User data:', JSON.stringify(session.user, null, 2));
    return NextResponse.json({ message: "Organization ID not found in session" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "30");
    const startDate = subDays(new Date(), days);

    // Get KPIs for the date range
    const kpiData = await prisma.kpiDaily.findMany({
      where: {
        orgId: session.user.orgId,
        date: {
          gte: startDate,
        },
      },
      orderBy: { date: "desc" },
    });

    const kpis = kpiData.reduce(
      (acc, day) => ({
        newLeads: acc.newLeads + day.leads,
        positiveReplies: acc.positiveReplies + day.positiveReplies,
        qualified: acc.qualified + day.qualified,
        booked: acc.booked + day.booked,
        showed: acc.showed + day.showed,
        closed: acc.closed + day.closed,
      }),
      { newLeads: 0, positiveReplies: 0, qualified: 0, booked: 0, showed: 0, closed: 0 }
    );

    // Chart data - leads by day
    const leadsByDay = kpiData
      .reverse()
      .map((day) => ({
        date: format(day.date, "MMM dd"),
        leads: day.leads,
      }));

    // Pipeline funnel data
    const pipelineFunnel = [
      { stage: "Lead", count: kpis.newLeads, color: "#3b82f6" },
      { stage: "Qualified", count: kpis.qualified, color: "#8b5cf6" },
      { stage: "Booked", count: kpis.booked, color: "#f59e0b" },
      { stage: "Showed", count: kpis.showed, color: "#06b6d4" },
      { stage: "Closed", count: kpis.closed, color: "#10b981" },
    ];

    // Latest leads
    const latestLeads = await prisma.lead.findMany({
      where: { orgId: session.user.orgId },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        clinic: true,
        city: true,
        source: true,
        status: true,
        lastTouch: true,
      },
    });

    // Campaign performance
    const campaigns = await prisma.campaign.findMany({
      where: { orgId: session.user.orgId },
      select: {
        name: true,
        sends: true,
        opens: true,
        replies: true,
        replyRate: true,
      },
    });

    // Growth since registration
    const org = await prisma.org.findUnique({
      where: { id: session.user.orgId },
      select: { createdAt: true },
    });

    // Calculate baseline (first week after registration)
    const registrationDate = org?.createdAt || new Date();
    const baselineEnd = new Date(registrationDate);
    baselineEnd.setDate(baselineEnd.getDate() + 7);

    const baselineKpis = await prisma.kpiDaily.findMany({
      where: {
        orgId: session.user.orgId,
        date: {
          gte: registrationDate,
          lte: baselineEnd,
        },
      },
    });

    const baselineLeads = baselineKpis.reduce((sum, day) => sum + day.leads, 0);
    const baselineClosed = baselineKpis.reduce((sum, day) => sum + day.closed, 0);

    const currentLeads = kpis.newLeads;
    const currentClosed = kpis.closed;

    const growthSinceRegistration = {
      leadsGrowth: {
        current: currentLeads,
        baseline: baselineLeads,
        percentage: baselineLeads > 0 ? ((currentLeads - baselineLeads) / baselineLeads * 100) : 0,
      },
      clientsGrowth: {
        current: currentClosed,
        baseline: baselineClosed,
        percentage: baselineClosed > 0 ? ((currentClosed - baselineClosed) / baselineClosed * 100) : 0,
      },
    };

    return NextResponse.json({
      kpis,
      chartSeries: {
        leadsByDay,
        callsByWeek: [], // Placeholder
        replyRateByCampaign: campaigns.map(c => ({ campaign: c.name, rate: c.replyRate })),
        pipelineFunnel,
      },
      tables: {
        latestLeads: latestLeads.map(lead => ({
          ...lead,
          lastTouch: lead.lastTouch ? format(lead.lastTouch, "MMM dd") : "Never",
        })),
        campaignPerformance: campaigns,
      },
      growthSinceRegistration,
    });

  } catch (error) {
    console.error("Dashboard summary error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}