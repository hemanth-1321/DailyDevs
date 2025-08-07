import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function RefactoredContent(content: string) {
  const prompt = `
You are a grammar correction assistant.

Please correct the following sentence and make it grammatically proper:

"${content}"

Return only the corrected sentence.`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);

  return response.text;
}
