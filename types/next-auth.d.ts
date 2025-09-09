import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: string;
      orgId?: string;
    };
  }

  interface User {
    role: string;
    orgId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    orgId?: string;
  }
}