'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Recipe } from "../../lib/mockData";
import getDifficultyColor from "@/utils/getDifficultyColor";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/contexts/ToastContext";
import Image from "next/image";

export default function ResultsClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const { showToast } = useToast();

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSavingRecipe, setIsSavingRecipe] = useState<string | false>(false);

    useEffect(() => {
        const ingredients = searchParams.get("ingredients");
        if (!ingredients) {
            router.push("/");
            return;
        }
        generateRecipes(ingredients);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const generateRecipes = async (ingredients: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/ai/generate-recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredients }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate recipes');
            }

            const data = await response.json();

            setRecipes(data.recipes);

        } catch (err) {
            console.error(err);
            setError('Failed to generate recipes');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    const saveRecipe = async (recipe: Recipe) => {
        setError(null);
        if (!session) {
            showToast('You must be logged in to save a recipe', 'error');
            router.push("/login");
            return;
        }
        setIsSavingRecipe(recipe.id);

        const recipeId = recipe.id;

        try {
            const response = await fetch('/api/saved_recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipe_id: recipeId }),
            });

            if (!response.ok) {
                throw new Error('Failed to save recipe');
            }
            router.push(`/recipe/${recipe.id}`);
        } catch (err) {
            console.error(err);
            setError('Failed to save recipe');
        } finally {
            setIsSavingRecipe(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col text-white">
            <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
                <h2 className="text-4xl text-center mb-8">
                    Recipe Ideas
                </h2>
                {error && <p className="text-center text-lg text-red-500">{error}</p>}
                <h3 className="text-2xl text-center mb-4">Ingredients: {searchParams.get("ingredients")}</h3>
                {loading ? (
                    <div className="flex flex-col items-center space-y-4">
                        <LoadingSpinner />
                        <p className="text-center text-lg text-gray-400">Loading delicious ideas...</p>
                    </div>
                ) : recipes.length === 0 || recipes === undefined ? (
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
                                border border-gray-700 
                                hover:bg-gray-700 
                                transition-all duration-300 
                                flex flex-col
                                overflow-hidden
                            "
                            >
                                {recipe.image_url && (
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <Image
                                            src={recipe.image_url}
                                            alt={recipe.title}
                                            fill
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                                    </div>
                                )}

                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-2xl mb-3 text-emerald-400">
                                        {recipe.title}
                                    </h3>

                                    <div className="space-y-1 mb-4 text-sm text-gray-300">
                                        <p>
                                            Cook Time: <span className="font-medium text-white">{recipe.cook_time} minutes</span>
                                        </p>
                                        <p>
                                            Difficulty:<span className={`font-semibold ml-1 ${getDifficultyColor(recipe.difficulty)}`}>
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
                                        {!session && <p className="text-sm text-red-400 mb-2 font-semibold">Please log in to save recipes.</p>}
                                        <button
                                            className={`w-full bg-emerald-600 text-white py-2 rounded-lg text-lg font-semibold transition ${isSavingRecipe === recipe.id || !session
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'cursor-pointer hover:bg-emerald-700'
                                                }`}
                                            onClick={() => saveRecipe(recipe)}
                                            disabled={!session || isSavingRecipe !== false}
                                        >
                                            {isSavingRecipe === recipe.id ? 'Saving...' : 'Save Recipe'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}