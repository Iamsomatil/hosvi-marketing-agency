import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createTestUser() {
  const hashedPassword = await bcrypt.hash("test123", 10);

  // Ensure test organization exists (name is not unique, so use find/create)
  let org = await prisma.org.findFirst({ where: { name: "Test Org" } });
  if (!org) {
    org = await prisma.org.create({
      data: {
        name: "Test Org",
        plan: "PREMIUM",
      },
    });
  }

  // Create test user
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      passwordHash: hashedPassword,
      role: "ADMIN",
      orgId: org.id,
      emailVerified: new Date(),
    },
  });

  console.log("Test user created:");
  console.log("Email: test@example.com");
  console.log("Password: test123");
}

createTestUser()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
