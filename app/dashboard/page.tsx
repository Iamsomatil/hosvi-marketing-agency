import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import DashboardClient from "../../components/DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "CLIENT") {
    redirect("/admin");
  }

  // Fetch user's org data
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { org: true },
  });

  if (!user?.org) {
    redirect("/trial");
  }

  return <DashboardClient org={user.org} />;
}