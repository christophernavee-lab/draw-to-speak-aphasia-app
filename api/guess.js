import Anthropic from "@anthropic-ai/sdk";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { image, category } = await req.json();

    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = new Anthropic();
    const categoryHint = category ? `Category hint: ${category}. ` : "";

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: "image/png", data: image },
            },
            {
              type: "text",
              text: `You are helping someone with aphasia communicate. They drew a simple sketch to express a word they cannot say. ${categoryHint}

Look at this drawing and guess what they might be trying to communicate. Provide 4-6 simple, common word guesses.

IMPORTANT: Respond with ONLY a JSON array of words, nothing else. Example: ["water", "drink", "cup", "thirsty"]`,
            },
          ],
        },
      ],
    });

    const text = response.content?.[0]?.text || "";
    let guesses = [];
    try {
      const cleaned = text.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
      guesses = JSON.parse(cleaned);
    } catch {
      const matches = text.match(/["']([^"']+)["']/g);
      if (matches) guesses = matches.map((m) => m.replace(/["']/g, ""));
    }

    return new Response(JSON.stringify({ guesses }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process image", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
}
