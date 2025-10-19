import { getRecipeById } from "@/lib/queries";
import { requireAuth } from "@/utils/requireAuth";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
    const userId = await requireAuth();
    try {
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { id } = await params;

        const singleRecipe = await getRecipeById(id);

        if (!singleRecipe) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }

        return NextResponse.json(singleRecipe);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error while getting recipe' }, { status: 500 });
    }
}