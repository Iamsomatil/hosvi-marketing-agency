import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@hosvi.com" },
    update: {},
    create: {
      email: "admin@hosvi.com",
      name: "Admin User",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  // Create demo organization
  const demoOrg = await prisma.org.upsert({
    where: { id: "demo-org-id" },
    update: {},
    create: {
      id: "demo-org-id",
      name: "Demo Chiropractic Clinic",
      industry: "Healthcare",
      city: "Miami",
      state: "Florida",
      plan: "PREMIUM",
      trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      onboardedAt: new Date(),
    },
  });

  // Create demo client user
  const clientPassword = await bcrypt.hash("demo123", 12);
  
  const client = await prisma.user.upsert({
    where: { email: "demo@clinic.com" },
    update: {},
    create: {
      email: "demo@clinic.com",
      name: "Dr. Demo User",
      passwordHash: clientPassword,
      role: "CLIENT",
      orgId: demoOrg.id,
    },
  });

  console.log("Seed completed successfully!");
  console.log("Admin login: admin@hosvi.com / admin123");
  console.log("Demo client login: demo@clinic.com / demo123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });