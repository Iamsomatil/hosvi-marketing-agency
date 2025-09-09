import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const orgs = await prisma.org.findMany({
      select: {
        id: true,
        name: true,
        plan: true,
        createdAt: true,
        trialEndsAt: true,
        _count: {
          select: {
            users: true,
            leads: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const orgSummaries = orgs.map((org) => {
      const now = new Date();
      let status = "ACTIVE";
      
      if (org.trialEndsAt) {
        if (now < org.trialEndsAt) {
          status = "TRIAL";
        } else {
          status = "EXPIRED";
        }
      }

      return {
        id: org.id,
        name: org.name,
        plan: org.plan,
        createdAt: org.createdAt,
        trialEndsAt: org.trialEndsAt,
        userCount: org._count.users,
        leadCount: org._count.leads,
        status,
      };
    });

    return NextResponse.json(orgSummaries);

  } catch (error) {
    console.error("Admin orgs error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}