import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
const GEMINI_KEY = process.env.GEMINI_KEY;


const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });

async function main() {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: 'Why is the sky blue?',
    });
    console.log(response.text);
}

main();