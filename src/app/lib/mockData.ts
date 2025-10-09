export interface Recipe {
    id: string;
    title: string;
    cookTime: number;
    difficulty: '⭐' | '⭐⭐' | '⭐⭐⭐';
    ingredients: string[];
    instructions: string;
}

export const sampleRecipes: Recipe[] = [
    {
        id: '1',
        title: 'Spaghetti Bolognese',
        cookTime: 45,
        difficulty: '⭐⭐',
        ingredients: ['Spaghetti', 'Ground Beef', 'Tomato Sauce', 'Onion', 'Garlic'],
        instructions: 'Cook spaghetti. Brown beef with onion and garlic. Add tomato sauce and simmer. Combine with spaghetti.'
    },
    {
        id: '2',
        title: 'Chicken Stir Fry',
        cookTime: 30,
        difficulty: '⭐',
        ingredients: ['Chicken Breast', 'Mixed Vegetables', 'Soy Sauce', 'Garlic', 'Ginger'],
        instructions: 'Sauté chicken until cooked. Add vegetables, garlic, and ginger. Stir in soy sauce and cook until vegetables are tender.'
    },
    {
        id: '3',
        title: 'Vegetable Curry',
        cookTime: 40,
        difficulty: '⭐⭐⭐',
        ingredients: ['Mixed Vegetables', 'Coconut Milk', 'Curry Powder', 'Onion', 'Garlic'],
        instructions: 'Sauté onion and garlic. Add vegetables and curry powder. Pour in coconut milk and simmer until vegetables are tender.'
    }
]