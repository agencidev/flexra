import { NextResponse } from "next/server";
import { getAllPosts, createPost } from "../../../lib/posts";

/**
 * API för blogginlägg
 *
 * GET  /api/posts - Lista alla publicerade inlägg
 * POST /api/posts - Skapa nytt inlägg (kräver API-nyckel)
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

// GET /api/posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const includeUnpublished = searchParams.get("includeUnpublished") === "true";
    const company = searchParams.get("company") || "FLEXRA";

    // Kräv API-nyckel för att se opublicerade inlägg
    if (includeUnpublished && !validateApiKey(request)) {
      return NextResponse.json(
        { error: "API key required for unpublished posts" },
        { status: 401 }
      );
    }

    const posts = await getAllPosts({
      limit: limit ? parseInt(limit, 10) : undefined,
      includeUnpublished,
      company
    });

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/posts
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

    // Validera required fields
    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Skapa inlägg
    const post = await createPost({
      title: body.title,
      slug: body.slug,
      description: body.description,
      content: body.content,
      image: body.image,
      category: body.category,
      categoryColor: body.categoryColor,
      author: body.author,
      date: body.date,
      published: body.published ?? false,
      company: body.company || "FLEXRA",
      // SEO-fält
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      keywords: body.keywords,
      canonicalUrl: body.canonicalUrl,
      noIndex: body.noIndex,
      // Bild alt-text
      imageAlt: body.imageAlt
    });

    return NextResponse.json({
      success: true,
      data: post,
      message: "Post created successfully"
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post", message: error.message },
      { status: 500 }
    );
  }
}
