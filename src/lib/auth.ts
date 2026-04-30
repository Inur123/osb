import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Data Login Admin Terbaru
        const ADMIN_EMAIL = "osbpelajarnumagetan@gmail.com";
        const ADMIN_PASS_PLAIN = "osbjayajayajaya";

        if (credentials?.email === ADMIN_EMAIL && credentials?.password === ADMIN_PASS_PLAIN) {
          return {
            id: "1",
            name: "Admin OSB",
            email: ADMIN_EMAIL,
            role: "admin",
          };
        }

        // Catatan: Di masa depan, di sini kita akan mengambil data dari Database
        // const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        // if (user && await bcrypt.compare(credentials.password, user.password)) { ... }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "rahasia-osb-magetan-2025",
};
