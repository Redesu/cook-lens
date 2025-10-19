import { Recipe } from "@/types";
import { insertRecipe } from "./queries";

export async function saveGeneratedRecipes(aiRecipes: Recipe[], userId: string) {
    try {
        const recipes = aiRecipes.map((r: Recipe) => ({
            title: r.title,
            description: r.description,
            ingredients: r.ingredients,
            instructions: r.instructions,
            prep_time: r.prep_time,
            cook_time: r.cook_time,
            servings: r.servings,
            image_url: r.image_url,
            difficulty: r.difficulty || '⭐⭐',
        }));

        const results = await Promise.all(
            recipes.map((recipe) => insertRecipe(recipe, userId))
        );

        return results;
    } catch (e) {
        console.error('Error parsing/saving recipes:', e);
        throw new Error('Failed to save recipes');
    }
}