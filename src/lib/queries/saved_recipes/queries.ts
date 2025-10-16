import db from "@/lib/db";
import { SavedRecipe, User } from "@/types";

export function insertSaveRecipe(recipe_id: string, user_id: User['id']) {
    return db.query(
        `INSERT INTO saved_recipes 
        (user_id, recipe_id, saved_at) 
        VALUES ($1, $2, CURRENT_TIMESTAMP) 
        RETURNING *`,
        [user_id, recipe_id]
    );
}

export function getSavedRecipe(recipe_id: string) {
    return db.query(
        `SELECT recipes.* from RECIPES
        INNER JOIN saved_recipes ON recipes.id = saved_recipes.recipe_id
        WHERE saved_recipes.recipe_id = $1`, [recipe_id]
    )
}

export function getAllUserSavedRecipes(user_id: User['id']) {
    return db.query(
        `SELECT recipes.* FROM RECIPES
        INNER JOIN saved_recipes ON recipes.id = saved_recipes.recipe_id
        WHERE saved_recipes.user_id = $1
        ORDER BY saved_recipes.saved_at DESC`, [user_id]
    );
}

export function getRandomSavedRecipe() {
    return db.query(
        `SELECT r.* FROM recipes r
        INNER JOIN saved_recipes ON r.id = saved_recipes.recipe_id
        ORDER BY RANDOM()
        LIMIT 1
        `
    )
}