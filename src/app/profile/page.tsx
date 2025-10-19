import { UserData } from "@/types/userData";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Bookmark, CalendarDays, ChefHat, Clock, Mail } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import Image from "next/image";

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
    const joinedAt = new Date(userInfo.created_at);

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto p-6">
                <div className="rounded-lg shadow-sm p-8 mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <Image
                            src={userInfo.avatar_url || '/default-avatar.jpg'}
                            alt="User avatar"
                            width={350}
                            height={350}
                            className="w-24 h-24 rounded-full border-4 border-blue-600"
                        />
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold mb-2">{userInfo.username}</h1>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>{userInfo.email}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4" />
                                    <span>Joined at {joinedAt.toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="rounded-lg shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-6 h-6 text-blue-600" />
                            <h2 className="text-2xl font-bold">Recent Recipes</h2>
                        </div>
                        <p className="mb-4">Your last 10 generated recipes</p>
                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {userGeneratedRecipes.map(recipe => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    icon={ChefHat}
                                    dateLabel="Generated"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Bookmark className="w-6 h-6 text-blue-600" />
                            <h2 className="text-2xl font-bold">Saved Recipes</h2>
                        </div>
                        <p className="mb-4">Your favorite recipes collection</p>
                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                            {userSavedRecipes.length > 0 ? (
                                userSavedRecipes.map(recipe => (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        icon={Bookmark}
                                        dateLabel="Saved"
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-400">
                                    <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p>No saved recipes yet</p>
                                    <p className="text-sm mt-1">Start saving your favorites!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}