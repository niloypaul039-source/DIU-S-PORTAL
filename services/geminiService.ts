import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAcademicAdviceStream = async (
  prompt: string, 
  history: { role: string; parts: { text: string }[] }[]
) => {
  try {
    const modelId = 'gemini-2.5-flash';
    
    // Transform history to the format expected by the SDK if necessary, 
    // or use the chat helper. Here we use the chat helper for convenience.
    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: `You are the DIU Student Portal Smart Advisor. 
        Your goal is to help students with academic inquiries, study tips, explaining complex topics from their courses, and providing general university guidance.
        Be encouraging, professional, and concise. 
        If asked about specific student data (grades, fees), remind them you are a general assistant but can explain how to calculate CGPA or how payment systems typically work.`,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessageStream({ message: prompt });
    return result;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};