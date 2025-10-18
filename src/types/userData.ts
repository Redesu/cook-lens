import { Recipe } from "./recipe";

export interface UserData {
    userInfo: {
        username: string;
        avatar?: string;
        email: string;
    };
    userSavedRecipes: Recipe[];
    userGeneratedRecipes: Recipe[];
}