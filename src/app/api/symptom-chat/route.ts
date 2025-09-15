// src/app/api/symptom-chat/route.ts
import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const streamingResp = await model.generateContentStream({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI medical assistant. 
Your role is to help users understand their symptoms, suggest possible causes, 
and recommend when to seek professional care. 
Always include a disclaimer: "I’m not a doctor, but I can help you understand your symptoms." 
Be clear, safe, and supportive.`,
            },
          ],
        },
        { role: "user", parts: [{ text: message }] },
      ],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of streamingResp.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Error generating response", { status: 500 });
  }
}
