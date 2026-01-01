import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Get admin credentials from environment variables
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          console.error("Admin credentials not configured in environment variables");
          return null;
        }

        // Check email
        if (credentials.email !== adminEmail) {
          return null;
        }

        // For new setup, hash the password and store it
        // For now, we'll compare with the hashed password from env
        // In production, you should hash the password and store it
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          adminPassword
        );

        // If adminPassword is not hashed, do a direct comparison (for initial setup)
        // Then hash it and update .env.local
        if (!passwordMatch && credentials.password === adminPassword) {
          // This is for initial setup - password is plain text
          // In production, always use hashed passwords
          return {
            id: "1",
            email: credentials.email,
            role: "admin",
          };
        }

        if (!passwordMatch) {
          return null;
        }

        return {
          id: "1",
          email: credentials.email,
          role: "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

