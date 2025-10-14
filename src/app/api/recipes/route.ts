import { getAllRecipes, getRecipeById, insertRecipe } from "@/lib/queries";
import { NextResponse } from "next/server";
import { requireAuth } from "@/utils/requireAuth";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const userId = await requireAuth();
        if (!userId) {
            throw new Error("User ID is undefined");
        }
        const createRecipe = await insertRecipe(data.recipe, userId);

        return NextResponse.json(createRecipe.rows[0]);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error while creating recipe' }, { status: 500 });
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
        return new Response(JSON.stringify({ error: 'Error while getting recipes' }), { status: 500 });
    }
}