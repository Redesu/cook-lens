import db from "./db";
import { Recipe, User, SavedRecipe } from "@/types";


export function insertUser(user: User['name'], email: User['email'], avatar_url?: User['avatar_url']) {
    return db.query(
        `INSERT INTO users (name, email, avatar_url) VALUES ($1, $2, $3) RETURNING *`,
        [user, email, avatar_url]
    );
}

export function updateUser(id: User['id'], name: User['name'], email: User['email'], avatar_url?: User['avatar_url']) {
    return db.query(
        `UPDATE users SET name = $1, email = $2 WHERE id = $3, avatar_url = $4 RETURNING *`,
        [name, email, id, avatar_url]
    );
}

export function getUserById(id: User['id']) {
    return db.query("SELECT * FROM users WHERE id = $1", [id]);
}


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

export function insertSaveRecipe(savedRecipe: SavedRecipe) {
    const { user_id, recipe_id, saved_at } = savedRecipe;
    return db.query(
        `INSERT INTO saved_recipes 
        (user_id, recipe_id, saved_at) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
        [user_id, recipe_id, saved_at]
    );
}