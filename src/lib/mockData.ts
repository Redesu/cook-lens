export interface Recipe {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    cook_time: number;
    prep_time: number;
    servings: number;
    difficulty: '⭐' | '⭐⭐' | '⭐⭐⭐';
    ingredients: string[];
    instructions: string;
}

export const sampleRecipes: Recipe[] = [
    {
        id: '1',
        title: 'Spaghetti Bolognese',
        description: 'A classic Italian pasta dish with rich meat sauce.',
        cook_time: 45,
        prep_time: 15,
        servings: 4,
        difficulty: '⭐⭐',
        ingredients: ['Spaghetti', 'Ground Beef', 'Tomato Sauce', 'Onion', 'Garlic'],
        instructions: 'Cook spaghetti. Brown beef with onion and garlic. Add tomato sauce and simmer. Combine with spaghetti.'
    },
    {
        id: '2',
        title: 'Chicken Stir Fry',
        description: 'A quick and healthy chicken stir fry with vegetables.',
        cook_time: 30,
        prep_time: 15,
        servings: 2,
        difficulty: '⭐',
        ingredients: ['Chicken Breast', 'Mixed Vegetables', 'Soy Sauce', 'Garlic', 'Ginger'],
        instructions: 'Sauté chicken until cooked. Add vegetables, garlic, and ginger. Stir in soy sauce and cook until vegetables are tender.'
    },
    {
        id: '3',
        title: 'Vegetable Curry',
        description: 'A flavorful and aromatic vegetable curry with coconut milk.',
        cook_time: 40,
        prep_time: 10,
        servings: 4,
        difficulty: '⭐⭐⭐',
        ingredients: ['Mixed Vegetables', 'Coconut Milk', 'Curry Powder', 'Onion', 'Garlic'],
        instructions: 'Sauté onion and garlic. Add vegetables and curry powder. Pour in coconut milk and simmer until vegetables are tender.'
    }
]