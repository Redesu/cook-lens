import { getSavedRecipe } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;

        const singleSavedRecipe = await getSavedRecipe(id);

        if (!singleSavedRecipe.rows || singleSavedRecipe.rows.length === 0) {
            return NextResponse.json({ error: 'Saved recipe not found' }, { status: 404 });
        }

        return NextResponse.json(singleSavedRecipe.rows);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }
}