import Groq from "groq-sdk";
import "dotenv/config";

let groq;
if (process.env.GROQ_API_KEY) {
  groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
} else {
  console.warn("⚠️ GROQ_API_KEY is missing. Groq features will fail if used.");
}

export const Groq_questions = async (
  domain,
  forbiddenList = [],
  count = 20,
) => {
  try {
    if (!groq) {
      throw new Error("GROQ_API_KEY is missing in environment variables.");
    }
    // Safety: Limit the list to avoid "BadRequestError" (Prompt too long)
    const slicedList = forbiddenList.slice(-15);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert technical interviewer and quiz generator. Your task is to provide high-quality, challenging multiple-choice questions. Return ONLY a valid JSON object, no introductory or concluding text.",
        },
        {
          role: "user",
          content: `Generate exactly ${count} unique, high-quality Multiple Choice Questions (MCQs) for a technical contest in the domain: ${domain}.
                    
                    Rules:
                    1. Each question must have exactly 4 diverse options.
                    2. Only one option must be correct.
                    3. The difficulty should be balanced (Junior to Senior level).
                    4. ${slicedList.length > 0 ? `DO NOT include questions similar to these existing ones: ${slicedList.join(", ")}.` : "Ensure all questions are unique and technically accurate."}
                    
                    Output Format:
                    {
                      "questions": [
                        {
                          "question": "Question text here?",
                          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                          "correctAnswer": "The exact string of the correct option"
                        }
                      ]
                    }`,
        },
      ],
      model: "llama-3.1-8b-instant",

      response_format: { type: "json_object" },
    });

    // Check if completion and choices exist to avoid the 'reading 0' error
    if (!completion?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response structure from Groq");
    }

    const data = JSON.parse(completion.choices[0].message.content);
    return data.questions || data;
  } catch (error) {
    console.error("Groq Service Error:", error);
    throw error;
  }
};
