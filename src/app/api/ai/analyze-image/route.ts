import { GenerateContentParameters, GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

export async function POST(request: Request) {
    try {
        const { image } = await request.json();

        if (!image) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

        const contents: GenerateContentParameters['contents'] = [
            {
                role: 'user',
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/png',
                            data: base64Data
                        },
                    },
                    {
                        text: `Extract the ingredients from the image and return them as a comma separated list. If the image does not contain any cookable ingredients, return an empty list.`,
                    }
                ]
            }
        ];

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: contents,
        })

        const text = response.text;

        return NextResponse.json({
            success: true,
            ingredients: text
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Error while getting ingredients from image' }, { status: 500 });
    }
}
