import { Recipe } from "@/types";
import { insertRecipe } from "./queries";

export async function saveGeneratedRecipes(aiText: string, userId: string) {
    try {
        const jsonMatch = aiText.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            throw new Error('No JSON found in AI response');
        }

        const aiRecipes = JSON.parse(jsonMatch[0]);

        const recipes = aiRecipes.map((r: any) => ({
            title: r.title,
            description: r.description,
            ingredients: r.ingredients,
            instructions: r.instructions,
            prep_time: r.prepTime,
            cook_time: r.cookTime,
            servings: r.servings,
            difficulty: r.difficulty || '⭐⭐',
        }));
        const results = await Promise.all(
            recipes.map((recipe: Omit<Recipe, "id" | "user_id" | "created_at">) => insertRecipe(recipe, userId))
        );

        return results;
    } catch (e) {
        console.error('Error parsing/saving recipes:', e);
        throw new Error('Failed to save recipes');
    }
}