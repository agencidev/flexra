import { NextResponse } from "next/server";
import { getPostBySlug, updatePost, deletePost } from "../../../../lib/posts";

/**
 * API för enskilda blogginlägg
 *
 * GET    /api/posts/[slug] - Hämta enskilt inlägg
 * PUT    /api/posts/[slug] - Uppdatera inlägg (kräver API-nyckel)
 * DELETE /api/posts/[slug] - Ta bort inlägg (kräver API-nyckel)
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

// GET /api/posts/[slug]
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const company = searchParams.get("company") || "FLEXRA";

    const post = await getPostBySlug(slug, company);

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post", message: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/posts/[slug]
export async function PUT(request, { params }) {
  try {
    // Validera API-nyckel
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { error: "Invalid or missing API key" },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const body = await request.json();
    const company = body.company || "FLEXRA";

    const post = await getPostBySlug(slug, company);

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Uppdatera inlägg
    const updatedPost = await updatePost(post.id, {
      title: body.title,
      slug: body.slug,
      description: body.description,
      content: body.content,
      image: body.image,
      category: body.category,
      categoryColor: body.categoryColor,
      author: body.author,
      date: body.date,
      published: body.published,
      company: body.company,
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
      data: updatedPost,
      message: "Post updated successfully"
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post", message: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[slug]
export async function DELETE(request, { params }) {
  try {
    // Validera API-nyckel
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { error: "Invalid or missing API key" },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const company = searchParams.get("company") || "FLEXRA";

    const post = await getPostBySlug(slug, company);

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    await deletePost(post.id);

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post", message: error.message },
      { status: 500 }
    );
  }
}
