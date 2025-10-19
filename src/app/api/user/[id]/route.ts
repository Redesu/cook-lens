import { getAllUserSavedRecipes, getUserById, getUserGeneratedRecipes } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } | Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const getBasicUserInformation = await getUserById(id);

        const getAllSavedRecipes = await getAllUserSavedRecipes(id);

        const getRecentGeneratedRecipes = await getUserGeneratedRecipes(id);

        if (!getBasicUserInformation.rows || getBasicUserInformation.rows.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            user: getBasicUserInformation.rows[0],
            savedRecipes: getAllSavedRecipes.rows,
            generatedRecipes: getRecentGeneratedRecipes.rows
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error while getting user' }, { status: 500 });
    }
}