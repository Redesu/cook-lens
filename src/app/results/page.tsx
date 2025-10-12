'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Recipe, sampleRecipes } from "../../lib/mockData";
import getDifficultyColor from "@/utils/getDifficultyColor";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ResultsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSavingRecipe, setIsSavingRecipe] = useState<string | false>(false);


    useEffect(() => {
        const ingredients = searchParams.get("ingredients");
        if (!ingredients) {
            return;
        }
        generateRecipes(ingredients);
    }, [searchParams]);

    // using mock data for now
    const generateRecipes = (ingredients: string) => {
        setLoading(true);
        setTimeout(() => {
            setRecipes(sampleRecipes);
            setLoading(false);
        }, 2000);
    };

    const saveRecipe = (recipe: Recipe) => {
        if (!session) {
            alert("Please log in to save recipes.");
            router.push("/login");
            return;
        }
        setIsSavingRecipe(recipe.id);

        // simulating async api call for now
        setTimeout(() => {
            setIsSavingRecipe(false);
            alert(`Recipe "${recipe.title}" saved!`);
            router.push(`/recipe/${recipe.id}`);
        }, 500);
    }

    return (
        <div className="min-h-screen flex flex-coltext-white">
            <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
                <h2 className="text-4xl text-center mb-8">
                    Recipe Ideas
                </h2>
                {loading ? (
                    <div className="flex flex-col items-center space-y-4">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <p className="text-center text-lg text-gray-400">Loading delicious ideas...</p>
                    </div>
                ) : recipes.length === 0 ? (
                    <p className="text-center text-lg text-gray-400">
                        No recipes found. Try different ingredients.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                className="
                                bg-gray-800
                                text-gray-100
                                rounded-xl
                                shadow-2xl
                                p-6 
                                border border-gray-700 
                                hover:bg-gray-700 
                                transition-all duration-300 
                                flex flex-col
                            "
                            >
                                <h3 className="text-2xl mb-3 text-indigo-400">
                                    {recipe.title}
                                </h3>

                                <div className="space-y-1 mb-4 text-sm text-gray-300">
                                    <p>
                                        Cook Time: <span className="font-medium text-white">{recipe.cookTime} minutes</span>
                                    </p>
                                    <p>
                                        Difficulty:<span className={`font-semibold ml-1 
                                        ${getDifficultyColor(recipe.difficulty)}}`
                                        }>
                                            {recipe.difficulty}
                                        </span>
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="font-semibold text-gray-200 mb-1">
                                        Ingredients:
                                    </p>
                                    <span className="text-sm text-gray-400 italic">
                                        {recipe.ingredients.join(", ")}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <p className="font-semibold text-gray-200 mb-1">
                                        Instructions:
                                    </p>
                                    <p className="text-sm leading-relaxed text-gray-300">
                                        {recipe.instructions}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    {!session && <p className="text-sm text-gray-400 mb-2">Please log in to save recipes.</p>}
                                    <button
                                        className={`w-full bg-indigo-600 text-white py-2 rounded-lg text-lg font-semibold transition ${isSavingRecipe === recipe.id || !session
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'cursor-pointer hover:bg-indigo-700'
                                            }`}
                                        onClick={() => saveRecipe(recipe)}
                                        disabled={!session || isSavingRecipe !== false}
                                    >
                                        {isSavingRecipe === recipe.id ? 'Saving...' : 'Save Recipe'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )



}