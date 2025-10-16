import { insertRecipe } from "./queries";

export async function saveGeneratedRecipes(aiRecipes: any[], userId: string) {
    try {

        const recipes = aiRecipes.map((r: any) => ({
            title: r.title,
            description: r.description,
            ingredients: r.ingredients,
            instructions: r.instructions,
            prep_time: r.prepTime,
            cook_time: r.cookTime,
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