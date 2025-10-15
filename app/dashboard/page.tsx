import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import DashboardClient from "../../components/DashboardClient";

export default async function DashboardPage() {
  console.log("Rendering DashboardPage...");

  // Get the session
  const session = await getServerSession(authOptions);

  // Debug session info
  const debugInfo = {
    hasSession: !!session,
    hasUser: !!session?.user,
    userId: session?.user?.id,
    userRole: session?.user?.role,
    orgId: session?.user?.orgId,
    sessionKeys: session ? Object.keys(session) : [],
  };
  console.log("Session in dashboard page:", JSON.stringify(debugInfo, null, 2));

  // Check if user is authenticated
  if (!session?.user?.id) {
    console.log("No session or user ID, redirecting to login");
    return redirect("/login");
  }

  // Debug role information
  console.log("User role from session:", session.user.role);

  // Handle admin redirection
  if (session.user.role === "ADMIN") {
    console.log("User is an admin, redirecting to admin dashboard");
    return redirect("/admin");
  }

  // For any other role (including CLIENT), proceed to the dashboard
  console.log("Proceeding to dashboard with role:", session.user.role);

  try {
    // Fetch user's org data with error handling
    console.log("Fetching user with org data for ID:", session.user.id);
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        org: true,
      },
    });

    console.log("User data from database:", JSON.stringify(user, null, 2));

    if (!user) {
      console.error("User not found in database");
      redirect("/login");
    }

    if (!user.org) {
      console.log("User has no org, redirecting to trial");
      redirect("/trial");
    }

    // Gate access based on subscription status
    const status = user.org.stripeSubscriptionStatus || null;
    const trialEndsAt = user.org.trialEndsAt
      ? new Date(user.org.trialEndsAt)
      : null;
    const now = new Date();
    const isTrialing =
      status === "trialing" && trialEndsAt ? trialEndsAt > now : false;
    const isActive = status === "active";
    const hasAccess = isActive || isTrialing;

    if (!hasAccess) {
      console.log("Subscription inactive, redirecting to pricing");
      redirect("/#pricing");
    }

    console.log("Rendering DashboardClient with org:", user.org);
    return <DashboardClient org={user.org} />;
  } catch (error) {
    console.error("Error fetching user data:", error);
    redirect("/login");
  }
}
