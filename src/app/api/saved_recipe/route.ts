import { getRandomSavedRecipe, getSavedRecipe, insertSaveRecipe } from "@/lib/queries";
import { requireAuth } from "@/utils/requireAuth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const userId = await requireAuth();
    try {
        const data = await request.json();
        if (!userId) {
            throw new Error("User ID is undefined");
        }
        const saveRecipe = await insertSaveRecipe(data.recipe_id, userId);

        return NextResponse.json({ saveRecipe }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error while saving recipe' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {

        const searchParams = new URL(request.url).searchParams;
        const id = searchParams.get('id');

        if (id) {
            const recipes = await getSavedRecipe(id);

            if (!recipes) {
                return NextResponse.json('Saved recipe not found', { status: 404 });
            }

            return NextResponse.json(recipes.rows);
        }

        const randomSavedRecipe = await getRandomSavedRecipe();
        const recipeId = randomSavedRecipe.rows[0].id;

        return NextResponse.json(recipeId, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error while getting saved recipe' }, { status: 500 });
    }
}