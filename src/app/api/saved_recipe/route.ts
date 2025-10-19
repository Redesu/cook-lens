import { getRandomSavedRecipe, insertSaveRecipe } from "@/lib/queries";
import { requireAuth } from "@/utils/requireAuth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const userId = await requireAuth();
    try {
        const data = await request.json();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const saveRecipe = await insertSaveRecipe(data.recipe_id, userId);

        return NextResponse.json({ saveRecipe }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error while saving recipe' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const randomSavedRecipe = await getRandomSavedRecipe();

        if (!randomSavedRecipe.rows || randomSavedRecipe.rows.length === 0 || !randomSavedRecipe.rows[0].id) {
            return NextResponse.json({ error: 'No saved recipes found' }, { status: 404 });
        }

        const recipeId = randomSavedRecipe.rows[0].id;

        return NextResponse.json(recipeId, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error while getting saved recipe:' }, { status: 500 });
    }
}