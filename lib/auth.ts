import { DefaultSession, NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image || undefined,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // Make sure we have all required fields
        if (!token.id || !token.role) {
          console.error('Missing required token fields:', { token, user });
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        console.error('No user in session object');
        return session;
      }

      // Ensure we have all required fields from token
      if (!token.id || !token.role) {
        console.error('Missing required token fields:', { 
          tokenId: !!token.id,
          tokenRole: !!token.role,
          tokenKeys: Object.keys(token)
        });
        return session;
      }

      // Create a new session object with the correct type
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string
        }
      };
      
      try {
        // Fetch the latest user data with org
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          include: { 
            org: {
              select: { 
                id: true,
                name: true 
              }
            } 
          }
        });
        
        if (dbUser) {
          // Ensure we have a valid role
          const userRole = dbUser.role || 'USER';
          
          // Update the session user with all required fields
          updatedSession.user = {
            ...updatedSession.user,
            id: dbUser.id,
            email: dbUser.email || null,
            name: dbUser.name || null,
            role: userRole,
            orgId: dbUser.org?.id || null,
            orgName: dbUser.org?.name || null
          };
          
          // Add role to token for future requests
          token.role = userRole;
        } else {
          console.error('User not found in database:', token.id);
        }
      } catch (error) {
        console.error('Error fetching user data in session callback:', error);
        // Return the session with token data if DB fetch fails
      }
      
      return updatedSession;
    },
  },
  pages: {
    signIn: "/login",
  },
};