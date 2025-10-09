'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Recipe, sampleRecipes } from "../lib/mockData";

export default function ResultsPage() {
    const searchParams = useSearchParams();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="min-h-screen flex flex-coltext-white">
            <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
                <h2 className="text-4xl text-center mb-8">
                    Recipe Ideas
                </h2>
                {loading ? (
                    <p className="text-center text-lg text-gray-400">Loading delicious ideas...</p>
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
                                        ${recipe.difficulty === '⭐' ? 'text-green-400' :
                                                recipe.difficulty === '⭐⭐' ? 'text-yellow-400' :
                                                    'text-red-400'}`
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
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )



}