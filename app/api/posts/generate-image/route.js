import { NextResponse } from "next/server";
import { generateImagePrompt, generateImageWithOpenRouter } from "../../../../lib/image-prompt";

/**
 * API för bildprompt-generering
 *
 * POST /api/posts/generate-image
 *
 * Genererar en bildprompt baserat på artikelinnehåll.
 * Kan även generera själva bilden via OpenRouter om generateImage=true.
 *
 * Request body:
 * {
 *   "title": "Artikelns titel",
 *   "description": "Kort beskrivning",
 *   "category": "Insikter|Nyheter|Guider",
 *   "content": "Artikelns innehåll (optional)",
 *   "generateImage": false
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "prompt": "Professional blog header image...",
 *     "altText": "Illustration som visar...",
 *     "keywords": ["ai", "automation"],
 *     "negativePrompt": "text, watermark...",
 *     "imageUrl": "https://..." // endast om generateImage=true
 *   }
 * }
 */

// Validera API-nyckel
function validateApiKey(request) {
  const apiKey = request.headers.get("x-api-key");
  const validKey = process.env.POSTS_API_KEY;

  if (!validKey) {
    console.warn("POSTS_API_KEY is not configured");
    return false;
  }

  return apiKey === validKey;
}

export async function POST(request) {
  try {
    // Validera API-nyckel
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { error: "Invalid or missing API key" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, category, content, generateImage = false } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Generera prompt
    const promptData = generateImagePrompt({
      title,
      description,
      category,
      content
    });

    const result = {
      success: true,
      data: {
        prompt: promptData.prompt,
        altText: promptData.altText,
        keywords: promptData.keywords,
        detectedBrands: promptData.detectedBrands,
        includedBrands: promptData.includedBrands,
        negativePrompt: promptData.negativePrompt
      }
    };

    // Om generateImage är true, generera bilden via OpenRouter
    if (generateImage) {
      try {
        const imageUrl = await generateImageWithOpenRouter(promptData.prompt);
        result.data.imageUrl = imageUrl;
      } catch (error) {
        console.error("Error generating image:", error);
        result.data.imageError = error.message;
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating image prompt:", error);
    return NextResponse.json(
      { error: "Failed to generate image prompt", message: error.message },
      { status: 500 }
    );
  }
}
