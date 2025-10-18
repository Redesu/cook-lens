// TODO: show user's saved recipes
// TODO: show user's generated recipes (limit to 10 or so?)
// TODO: show user's profile picture
// TODO: show user's username

import { UserData } from "@/types/userData";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function getUserInfo(userId: string): Promise<UserData> {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            notFound();
        }

        const data = await response.json();

        return {
            userInfo: data.user,
            userSavedRecipes: data.savedRecipes,
            userGeneratedRecipes: data.generatedRecipes
        };
    } catch (error) {
        console.error(error);
        notFound();
    }
}

export default async function Profile() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        notFound();
    }

    const { userInfo, userSavedRecipes, userGeneratedRecipes } = await getUserInfo(session.user.id);

    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
                <p className="text-center text-lg text-gray-400">Profile</p>
                <h1>{userInfo.username}</h1>
            </main>
        </div>
    )
}