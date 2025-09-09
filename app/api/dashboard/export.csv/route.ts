import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { subDays } from "date-fns";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.orgId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "leads";
    const days = parseInt(searchParams.get("days") || "30");
    const startDate = subDays(new Date(), days);

    let csvContent = "";

    if (type === "leads") {
      const leads = await prisma.lead.findMany({
        where: {
          orgId: session.user.orgId,
          createdAt: { gte: startDate },
        },
        orderBy: { createdAt: "desc" },
      });

      csvContent = "Name,Clinic,City,Source,Status,Last Touch,Created At\n";
      csvContent += leads
        .map((lead) => [
          lead.name,
          lead.clinic || "",
          lead.city || "",
          lead.source || "",
          lead.status,
          lead.lastTouch?.toISOString() || "",
          lead.createdAt.toISOString(),
        ].map(field => `"${field}"`).join(","))
        .join("\n");

    } else if (type === "campaigns") {
      const campaigns = await prisma.campaign.findMany({
        where: { orgId: session.user.orgId },
        orderBy: { createdAt: "desc" },
      });

      csvContent = "Campaign Name,Channel,Sends,Opens,Replies,Reply Rate,Created At\n";
      csvContent += campaigns
        .map((campaign) => [
          campaign.name,
          campaign.channel,
          campaign.sends.toString(),
          campaign.opens.toString(),
          campaign.replies.toString(),
          campaign.replyRate.toString(),
          campaign.createdAt.toISOString(),
        ].map(field => `"${field}"`).join(","))
        .join("\n");
    }

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${type}-export.csv"`,
      },
    });

  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}