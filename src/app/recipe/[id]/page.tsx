import ShareButton from "@/components/ShareButton";
import { Recipe } from "@/lib/mockData";
import getDifficultyColor from "@/utils/getDifficultyColor";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getRecipe(id: string): Promise<Recipe> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saved_recipe/${id}`, {
        cache: 'no-store'
    })

    if (!response.ok) {
        notFound();
    }

    const data: Recipe[] = await response.json();
    return data[0];
}


export default async function savedRecipePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const recipe = await getRecipe(id);

    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
                {!recipe ? (
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
                            <Image
                                src={recipe.image_url || `https://placehold.co/800x400/1F2937/D1D5DB?text=${recipe.title}`}
                                alt={recipe.title}
                                fill
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                        </div>

                        <div className="p-6 sm:p-10">
                            <div className="flex justify-between items-start mb-6">
                                <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-400 leading-tight">
                                    {recipe.title}
                                </h1>
                                <p>
                                    Difficulty:<span className={`font-semibold ml-1 ${getDifficultyColor(recipe.difficulty)}`}>
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
                                        <span className="text-2xl font-bold text-white">{recipe.cook_time + recipe.prep_time} min</span>
                                        <span className="text-xs text-gray-400">Total Time</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-white">{recipe.servings}</span>
                                        <span className="text-xs text-gray-400">Servings</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-white">{recipe.prep_time} min</span>
                                        <span className="text-xs text-gray-400">Prep Time</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-white">{recipe.cook_time} min</span>
                                        <span className="text-xs text-gray-400">Cook Time</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                <div className="lg:col-span-1">
                                    <h2 className="text-3xl font-bold mb-4 border-b border-gray-700 pb-2 text-emerald-300">
                                        Ingredients ({recipe.servings} Servings)
                                    </h2>
                                    <ul className="space-y-3">
                                        {recipe.ingredients.map((item: string, index: number) => (
                                            <li key={index} className="flex items-start text-gray-300 text-base">
                                                <svg className="w-5 h-5 text-emerald-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 14.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>


                                <div className="lg:col-span-2">
                                    <h2 className="text-3xl font-bold mb-4 border-b border-gray-700 pb-2 text-emerald-300">
                                        Preparation Instructions
                                    </h2>
                                    <ol className="space-y-5">
                                        {recipe.instructions
                                            .split('.')
                                            .map(step => step.trim())
                                            .filter(step => step.length > 0)
                                            .map((step, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="flex items-center justify-center w-8 h-8 mr-4 text-lg font-bold rounded-full bg-emerald-600 text-white flex-shrink-0">
                                                        {index + 1}
                                                    </span>
                                                    <p className="text-gray-300 leading-relaxed pt-1">
                                                        {step + '.'}
                                                    </p>
                                                </li>
                                            ))}
                                    </ol>
                                </div>
                                <ShareButton />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )

}