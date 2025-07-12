import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
  apiKey: Deno.env.get("GOOGLE_GENAI_API_KEY") || "",
});
