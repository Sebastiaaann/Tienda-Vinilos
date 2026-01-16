import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";

// In a real app we would import a DB client here
// import { db } from "@/lib/db"; 

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Simulating DB lookup with hardcoded users for now
        // In a real implementation this would come from a database
        const mockUserHash = await bcrypt.hash("password123", 10);
        const mockAdminHash = await bcrypt.hash("admin123", 10);
        
        // Demo user
        if (credentials.email === "demo@ejemplo.com") {
           const isValid = await bcrypt.compare(credentials.password, mockUserHash);
           if (isValid) {
             return {
               id: "u1",
               name: "Usuario Demo",
               email: "demo@ejemplo.com",
               role: "user"
             };
           }
        }
        
        // Admin user
        if (credentials.email === "admin@tiendavinilos.cl") {
           const isValid = await bcrypt.compare(credentials.password, mockAdminHash);
           if (isValid) {
             return {
               id: "admin1",
               name: "Administrador",
               email: "admin@tiendavinilos.cl",
               role: "admin"
             };
           }
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  }
};

// Helper function to get current session
export async function getSession() {
  return await getServerSession(authOptions);
}

// Helper function to require authentication
export async function requireAuth() {
  const session = await getSession();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

// Helper function to require admin role
export async function requireAdmin() {
  const session = await requireAuth();
  if ((session.user as any).role !== "admin") {
    throw new Error("Forbidden - Admin access required");
  }
  return session;
}
