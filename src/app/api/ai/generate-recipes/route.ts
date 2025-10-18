import { saveGeneratedRecipes } from "@/lib/ai";
import { requireAuth } from "@/utils/requireAuth";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

export async function POST(request: Request) {
    const userId = await requireAuth();
    try {

        const { ingredients } = await request.json();

        if (!ingredients) {
            return NextResponse.json({ error: 'No ingredients provided' }, { status: 400 });
        }

        const prompt = `
        Generate 3 to 5 recipes using at least one of the following ingredients: ${ingredients}

        Return ONLY a JSON array in this exact format:
        [
            {
             "title": "Recipe Name",
            "description": "Short description",
            "ingredients": ["ingredient 1", "ingredient 2"],
            "instructions": "You add x. After that you mix y. Then you cook z.",
            "prepTime": 15,
            "cookTime": 30,
            "servings": 4,
            "difficulty": "⭐⭐",
            "image_url": "https://example.com/image.jpg"
            }
        ]
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            config: {
                systemInstruction: `You are a helpful recipe generator assistant. 
                CRITICAL RULES:
                - You MUST use at least one of the ingredients provided by the user in EVERY recipe
                - Generate practical, cookable recipes
                - Return ONLY valid JSON array format with NO markdown, NO code blocks, NO backticks
                - Start your response directly with [ and end with ]
                Each recipe must include: title, description, ingredients (array), instructions, prepTime, cookTime, servings, difficulty, and image_url (optional).`
            },
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }],
                },
            ],

        });

        const aiText = response.text;

        if (!aiText) {
            return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
        }

        const cleanedText = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsedRecipes = JSON.parse(cleanedText);

        if (userId) {
            const savedRecipes = await saveGeneratedRecipes(parsedRecipes, userId);

            if (!savedRecipes) {
                throw new Error('Failed to save recipes');
            }

            return NextResponse.json({
                recipes: savedRecipes.map(result => result.rows[0])
            });
        } else {
            return NextResponse.json({
                recipes: parsedRecipes.map((recipe: any, index: number) => ({
                    id: `temp-${Date.now()}-${index}`,
                    ...recipe
                }))
            });
        };


    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error while generating recipes' }, { status: 500 });
    }
}