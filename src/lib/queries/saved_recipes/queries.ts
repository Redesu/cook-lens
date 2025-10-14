import db from "@/lib/db";
import { SavedRecipe, User } from "@/types";

export function insertSaveRecipe(savedRecipe: SavedRecipe, user_id: User['id']) {
    const { recipe_id } = savedRecipe;
    return db.query(
        `INSERT INTO saved_recipes 
        (user_id, recipe_id, saved_at) 
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP) 
        RETURNING *`,
        [user_id, recipe_id]
    );
}

export function getUserSavedRecipes(user_id: User['id']) {
    return db.query(
        `SELECT recipes.* FROM RECIPES
        INNER JOIN saved_recipes ON recipes.id = saved_recipes.recipe_id
        WHERE saved_recipes.user_id = $1
        ORDER BY saved_recipes.saved_at DESC`, [user_id]
    );
}

export function getRandomSavedRecipe() {
    return db.query(
        `SELECT DISTINCT r.* FROM recipes r
        INNER JOIN saved_recipes ON r.id = saved_recipes.recipe_id
        ORDER BY RANDOM()
        LIMIT 1
        `
    )
}