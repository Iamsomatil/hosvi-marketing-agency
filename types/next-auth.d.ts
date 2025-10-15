import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role: string;
      orgId?: string | null;
      orgName?: string | null;
    };
  }

  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    role: string;
    orgId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    orgId?: string | null;
  }
}