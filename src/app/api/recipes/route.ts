import { insertRecipe } from "@/lib/queries";
import { NextResponse } from "next/server";
import { requireAuth } from "@/utils/requireAuth";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const userId = await requireAuth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const createRecipe = await insertRecipe(data.recipe, userId);

        return NextResponse.json(createRecipe.rows[0]);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error while creating recipe' }, { status: 500 });
    }
}