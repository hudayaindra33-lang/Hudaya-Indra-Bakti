import { GoogleGenAI } from "@google/genai";

// FIX: Refactored to align with @google/genai coding guidelines for initialization.
// Assumes API_KEY is available in the environment, removing conditional checks.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateCourseDescription = async (title: string): Promise<string> => {
    try {
        const prompt = `Generate a compelling and concise course description for an online course titled "${title}". The description should be one paragraph, engaging, and highlight the key benefits for the learner. Do not use markdown or special formatting.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text;
        if (!text) {
            throw new Error("Received an empty response from the API.");
        }

        return text.trim();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate content from Gemini API.");
    }
};
