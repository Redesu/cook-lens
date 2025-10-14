import { saveGeneratedRecipes } from "@/lib/ai";
import { requireAuth } from "@/utils/requireAuth";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

export async function POST(request: Request) {
    const userId = await requireAuth();
    try {

        const ingredients = await request.json();

        if (!ingredients) {
            return NextResponse.json({ error: 'No ingredients provided' }, { status: 400 });
        }

        const prompt = `Generate 3 recipes using the following ingredients: ${ingredients}
        For each recipe, include the following details:
        - Title
        - Description
        - Cook time
        - Prep time
        - Difficulty
        - Ingredients
        - Instructions
        - Image URL (optional)
        - Servings

        IMPORTANT: Return ONLY the JSON array of recipes, nothing else, in this format:
        [
            {
             "title": "Recipe Name",
            "description": "Short description",
            "ingredients": ["ingredient 1", "ingredient 2"],
            "instructions": "Step 1...\nStep 2...",
            "prepTime": 15,
            "cookTime": 30,
            "servings": 4,
            "difficulty": "⭐⭐",
            "image_url": "https://example.com/image.jpg"
            }
        ]
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }],
                },
            ],
        });

        const aiText = response.text || '';

        if (userId) {
            await saveGeneratedRecipes(aiText, userId);
        }

        console.log(response);
        return NextResponse.json(response);


    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error while generating recipes' }, { status: 500 });
    }
}