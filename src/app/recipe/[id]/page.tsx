'use client';
import { use, useEffect, useState } from "react";
import { Recipe, sampleRecipes } from "@/lib/mockData";
import getDifficultyColor from "@/utils/getDifficultyColor";

export default function savedRecipePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    const loadRecipeById = (id: string) => {
        // simulating api fetch call
        setTimeout(() => {
            const recipe = sampleRecipes.find((r) => r.id === id) || null;
            setRecipe(recipe);
            setLoading(false);
            return recipe;
        }, 1000);
    }

    useEffect(() => {
        loadRecipeById(id);
    }, [id]);

    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
                {loading ? (
                    <div className="flex flex-col items-center space-y-4">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <p className="text-center text-lg text-gray-400">Loading recipe...</p>
                    </div>
                ) : !recipe ? (
                    <p className="text-center text-lg text-gray-400">Recipe not found</p>
                ) : (
                    <div
                        className="
                        bg-gray-800 
                        rounded-3xl 
                        shadow-2xl 
                        border border-gray-700 
                        overflow-hidden
                        transition-all duration-500
                    "
                    >
                        <div className="relative h-64 sm:h-80 bg-gray-700">
                            <img
                                src="https://placehold.co/800x400/1F2937/D1D5DB?text=Recipe+Image"
                                alt={recipe.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                        </div>

                        <div className="p-6 sm:p-10">
                            <div className="flex justify-between items-start mb-6">
                                <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-400 leading-tight">
                                    {recipe.title}
                                </h1>
                                <p>
                                    Difficulty:<span className={`font-semibold ml-1  ${getDifficultyColor(recipe.difficulty)}}`
                                    }>
                                        {recipe.difficulty}
                                    </span>
                                </p>
                            </div>

                            <p className="text-gray-300 mb-8 max-w-3xl leading-relaxed">
                                {recipe.description}
                            </p>

                            <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-700/50 p-4 rounded-xl mb-10 shadow-inner border border-gray-600">
                                <div className="flex space-x-6 sm:space-x-10 text-center mb-4 sm:mb-0">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-white">{recipe.cookTime + recipe.prepTime} min</span>
                                        <span className="text-xs text-gray-400">Total Time</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-white">{recipe.servings}</span>
                                        <span className="text-xs text-gray-400">Servings</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-white">{recipe.prepTime} min</span>
                                        <span className="text-xs text-gray-400">Prep Time</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                                <div className="lg:col-span-1">
                                    <h2 className="text-3xl font-bold mb-4 border-b border-gray-700 pb-2 text-indigo-300">
                                        Ingredients ({recipe.servings} Servings)
                                    </h2>
                                    <ul className="space-y-3">
                                        {recipe.ingredients.map((item, index) => (
                                            <li key={index} className="flex items-start text-gray-300 text-base">
                                                <svg className="w-5 h-5 text-indigo-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="lg:col-span-2">
                                    <h2 className="text-3xl font-bold mb-4 border-b border-gray-700 pb-2 text-indigo-300">
                                        Preparation Instructions
                                    </h2>
                                    <ol className="space-y-5">
                                        {recipe.instructions
                                            .split('.')
                                            .map(step => step.trim())
                                            .filter(step => step.length > 0)
                                            .map((step, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="flex items-center justify-center w-8 h-8 mr-4 text-lg font-bold rounded-full bg-indigo-600 text-white flex-shrink-0">
                                                        {index + 1}
                                                    </span>
                                                    <p className="text-gray-300 leading-relaxed pt-1">
                                                        {step + '.'}
                                                    </p>
                                                </li>
                                            ))}
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>

    )

}