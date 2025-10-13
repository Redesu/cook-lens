import { getAllRecipes, getRecipeById, insertRecipe } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const createRecipe = await insertRecipe(data.recipe, data.user_id);

        return NextResponse.json(createRecipe.rows[0]);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const id = searchParams.get('id');

        if (id) {
            const recipe = await getRecipeById(id);

            if (!recipe) {
                return NextResponse.json('Recipe not found', { status: 404 });
            }

            return NextResponse.json(recipe);
        }

        const recipes = await getAllRecipes();

        return NextResponse.json(recipes.rows);

    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: 'Error' }), { status: 500 });
    }
}