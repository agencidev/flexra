import { NextResponse } from "next/server";
import { getAllCaseStudies, createCaseStudy } from "../../../lib/case-studies";

/**
 * API för case studies
 *
 * GET  /api/case-studies - Lista alla publicerade case studies
 * POST /api/case-studies - Skapa ny case study (kräver API-nyckel)
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

// GET /api/case-studies
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const includeUnpublished = searchParams.get("includeUnpublished") === "true";
    const industry = searchParams.get("industry");
    const category = searchParams.get("category");
    const company = searchParams.get("company"); // Multi-site filter

    // Kräv API-nyckel för att se opublicerade
    if (includeUnpublished && !validateApiKey(request)) {
      return NextResponse.json(
        { error: "API key required for unpublished case studies" },
        { status: 401 }
      );
    }

    const caseStudies = await getAllCaseStudies({
      limit: limit ? parseInt(limit, 10) : undefined,
      includeUnpublished,
      industry,
      category,
      company: company || undefined // Use default if not specified
    });

    return NextResponse.json({
      success: true,
      data: caseStudies,
      count: caseStudies.length
    });
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { error: "Failed to fetch case studies", message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/case-studies
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

    if (!body.client) {
      return NextResponse.json(
        { error: "Client is required" },
        { status: 400 }
      );
    }

    // Skapa case study
    const caseStudy = await createCaseStudy({
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
      published: body.published ?? false,
      date: body.date,
      // Multi-site
      company: body.company,
      // SEO-fält
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      keywords: body.keywords,
      noIndex: body.noIndex
    });

    return NextResponse.json({
      success: true,
      data: caseStudy,
      message: "Case study created successfully"
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating case study:", error);
    return NextResponse.json(
      { error: "Failed to create case study", message: error.message },
      { status: 500 }
    );
  }
}
