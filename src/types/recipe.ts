export interface Recipe {
    id: string;
    user_id: string;
    title: string;
    description: string;
    cook_time: number;
    prep_time: number;
    difficulty: '⭐' | '⭐⭐' | '⭐⭐⭐';
    ingredients: string[];
    instructions: string;
    image_url?: string;
    servings: number;
    created_at: Date;
}