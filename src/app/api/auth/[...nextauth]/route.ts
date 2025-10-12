import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";
import { insertUser } from "@/lib/queries";

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
            try {
                // already handling duplicate emails with a unique constraint in the DB
                await insertUser(user.name!, user.email!, user.image!);
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