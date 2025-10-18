import { Recipe } from "@/types";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface RecipeCardProps {
    recipe: Recipe;
    icon: LucideIcon;
    dateLabel: string
    id?: string
}

export default function RecipeCard({ recipe, icon: IconComponent, dateLabel }: RecipeCardProps) {
    const recipeCreationDate = new Date(recipe.created_at);
    const CardContent = () => (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate cursor-pointer">{recipe.title}</h3>
                    <p className="text-sm truncate mt-1">{recipe.ingredients}</p>
                    <p className="text-xs text-gray-400 mt-2">{dateLabel}: {recipeCreationDate.toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );

    if (dateLabel === 'Saved') {
        return (
            <Link href={`/recipe/${recipe.id}`} className="block">
                <CardContent />
            </Link>
        )
    }

    return <CardContent />

}