import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { upsertUser } from "@/lib/queries";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async signIn({ user }) {
            if (!user.email) {
                console.error("No email found for user:", user);
                return false;
            }
            try {
                await upsertUser(
                    user.name || '',
                    user.email!,
                    user.image || undefined
                );
                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false;
            }
        },
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };