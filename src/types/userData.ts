import { Recipe } from "./recipe";

export interface UserData {
    userInfo: {
        username: string;
        avatar_url?: string;
        email: string;
        created_at: Date
    };
    userSavedRecipes: Recipe[];
    userGeneratedRecipes: Recipe[];
}