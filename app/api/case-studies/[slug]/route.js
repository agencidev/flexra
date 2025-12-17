import { NextResponse } from "next/server";
import { getCaseStudyBySlug, updateCaseStudy, deleteCaseStudy } from "../../../../lib/case-studies";

/**
 * API för enskilda case studies
 *
 * GET    /api/case-studies/[slug] - Hämta enskild case study
 * PUT    /api/case-studies/[slug] - Uppdatera case study (kräver API-nyckel)
 * DELETE /api/case-studies/[slug] - Ta bort case study (kräver API-nyckel)
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

// GET /api/case-studies/[slug]
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const caseStudy = await getCaseStudyBySlug(slug);

    if (!caseStudy) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: caseStudy
    });
  } catch (error) {
    console.error("Error fetching case study:", error);
    return NextResponse.json(
      { error: "Failed to fetch case study", message: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/case-studies/[slug]
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

    const caseStudy = await getCaseStudyBySlug(slug);

    if (!caseStudy) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    // Uppdatera case study
    const updatedCaseStudy = await updateCaseStudy(caseStudy.id, {
      title: body.title,
      slug: body.slug,
      client: body.client,
      clientLogo: body.clientLogo,
      industry: body.industry,
      category: body.category,
      categoryColor: body.categoryColor,
      heroImage: body.heroImage,
      excerpt: body.excerpt,
      challenge: body.challenge,
      solution: body.solution,
      results: body.results,
      metrics: body.metrics,
      techStack: body.techStack,
      testimonial: body.testimonial,
      testimonialAuthor: body.testimonialAuthor,
      testimonialRole: body.testimonialRole,
      contactEmail: body.contactEmail,
      gallery: body.gallery,
      published: body.published,
      date: body.date,
      // SEO-fält
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      keywords: body.keywords,
      noIndex: body.noIndex
    });

    return NextResponse.json({
      success: true,
      data: updatedCaseStudy,
      message: "Case study updated successfully"
    });
  } catch (error) {
    console.error("Error updating case study:", error);
    return NextResponse.json(
      { error: "Failed to update case study", message: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/case-studies/[slug]
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

    const caseStudy = await getCaseStudyBySlug(slug);

    if (!caseStudy) {
      return NextResponse.json(
        { error: "Case study not found" },
        { status: 404 }
      );
    }

    await deleteCaseStudy(caseStudy.id);

    return NextResponse.json({
      success: true,
      message: "Case study deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting case study:", error);
    return NextResponse.json(
      { error: "Failed to delete case study", message: error.message },
      { status: 500 }
    );
  }
}
