import Groq from "groq-sdk";
import "dotenv/config";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const Groq_questions = async (
  domain,
  forbiddenList = [],
  count = 20,
) => {
  try {
    // Safety: Limit the list to avoid "BadRequestError" (Prompt too long)
    const slicedList = forbiddenList.slice(-15);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a technical quiz generator. Return ONLY a JSON object.",
        },
        {
          role: "user",
          content: `Generate exactly ${count} unique MCQs for the domain: ${domain}. 
                    ${slicedList.length > 0 ? `Avoid these topics: ${slicedList.join(", ")}.` : ""}
                    Format: {"questions": [{"question": "", "options": [], "correctAnswer": ""}]}`,
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
