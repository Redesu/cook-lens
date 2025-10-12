import db from "@/lib/db";
import { Recipe, User } from "@/types";

export function getAllRecipes() {
    return db.query("SELECT * FROM recipes");
}

export function getRecipeById(id: string): Promise<Recipe | null> {
    const result = db.query("SELECT * FROM recipes WHERE id = $1", [id]);
    return result.then(res => res.rows[0] || null);
}

export function insertRecipe(recipe: Recipe, user_id: User["id"]) {
    const { title, ingredients, instructions, cook_time, difficulty, image_url, prep_time, servings, description } = recipe;
    return db.query(
        `INSERT INTO recipes 
        (title, ingredients, instructions, cook_time, 
        difficulty, image_url, prep_time, servings, description, 
        user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *`,
        [title, ingredients, instructions, cook_time, difficulty, image_url, prep_time, servings, description, user_id]
    );
}

export function getUserGeneratedRecipes(user_id: User['id']) {
    return db.query(
        `SELECT * FROM recipes
        WHERE user_id = $1
        ORDER BY created_at DESC`, [user_id]
    );
}
