import { NextResponse } from "next/server";
import { createField, getDatasheetMeta } from "../../../../lib/aitable";

const CASE_STUDIES_DATASHEET_ID = process.env.AITABLE_CASE_STUDIES_ID;

/**
 * Field definitions for Case Studies datasheet
 * Note: "Title" field usually exists by default in AITable
 */
const CASE_STUDY_FIELDS = [
  // Text fields
  { name: "slug", type: "SingleText", property: { defaultValue: "" } },
  { name: "client", type: "SingleText", property: { defaultValue: "" } },
  { name: "clientLogo", type: "URL" },
  { name: "heroImage", type: "URL" },
  { name: "excerpt", type: "Text" },

  // Single Select fields (color is an index 0-50)
  {
    name: "industry",
    type: "SingleSelect",
    property: {
      options: [
        { name: "Bygg", color: 0 },
        { name: "E-handel", color: 1 },
        { name: "Konsult", color: 2 },
        { name: "Finans", color: 3 },
        { name: "Tillverkning", color: 4 },
        { name: "Hälsovård", color: 5 },
        { name: "Utbildning", color: 6 },
        { name: "Transport", color: 7 },
        { name: "Fastighet", color: 8 },
        { name: "IT", color: 9 }
      ]
    }
  },
  {
    name: "category",
    type: "SingleSelect",
    property: {
      options: [
        { name: "Processautomation", color: 0 },
        { name: "AI-integration", color: 1 },
        { name: "Integration", color: 2 },
        { name: "Dataanalys", color: 3 },
        { name: "Kundservice", color: 4 }
      ]
    }
  },
  {
    name: "categoryColor",
    type: "SingleSelect",
    property: {
      options: [
        { name: "bg-pink-100", color: 0 },
        { name: "bg-yellow-100", color: 1 },
        { name: "bg-lime-100", color: 2 },
        { name: "bg-indigo-100", color: 3 },
        { name: "bg-blue-100", color: 4 }
      ]
    }
  },

  // Long text fields (markdown content)
  { name: "challenge", type: "Text" },
  { name: "solution", type: "Text" },
  { name: "results", type: "Text" },

  // JSON fields (stored as text)
  { name: "metrics", type: "Text" },
  { name: "gallery", type: "Text" },

  // Tech stack (comma-separated)
  { name: "techStack", type: "SingleText", property: { defaultValue: "" } },

  // Testimonial fields
  { name: "testimonial", type: "Text" },
  { name: "testimonialAuthor", type: "SingleText", property: { defaultValue: "" } },
  { name: "testimonialRole", type: "SingleText", property: { defaultValue: "" } },

  // Contact
  { name: "contactEmail", type: "Email" },

  // Publishing
  { name: "published", type: "Checkbox", property: { icon: "white_check_mark" } },
  { name: "date", type: "SingleText", property: { defaultValue: "" } },

  // Multi-site support
  { name: "company", type: "SingleText", property: { defaultValue: "FLEXRA" } },

  // SEO fields
  { name: "metaTitle", type: "SingleText", property: { defaultValue: "" } },
  { name: "metaDescription", type: "Text" },
  { name: "keywords", type: "SingleText", property: { defaultValue: "" } },
  { name: "noIndex", type: "Checkbox", property: { icon: "white_check_mark" } }
];

/**
 * POST /api/case-studies/setup
 * Creates all required fields in the Case Studies datasheet
 * Requires API key authentication
 */
export async function POST(request) {
  try {
    // Verify API key
    const authHeader = request.headers.get("Authorization");
    const apiKey = authHeader?.replace("Bearer ", "");

    if (apiKey !== process.env.POSTS_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!CASE_STUDIES_DATASHEET_ID) {
      return NextResponse.json(
        { error: "AITABLE_CASE_STUDIES_ID is not configured" },
        { status: 500 }
      );
    }

    // Get existing fields
    const existingFields = await getDatasheetMeta(CASE_STUDIES_DATASHEET_ID);
    const existingFieldNames = existingFields.map(f => f.name.toLowerCase());

    const results = {
      created: [],
      skipped: [],
      errors: []
    };

    // Create each field if it doesn't exist
    for (const fieldConfig of CASE_STUDY_FIELDS) {
      const fieldName = fieldConfig.name.toLowerCase();

      if (existingFieldNames.includes(fieldName)) {
        results.skipped.push(fieldConfig.name);
        continue;
      }

      try {
        await createField(CASE_STUDIES_DATASHEET_ID, fieldConfig);
        results.created.push(fieldConfig.name);

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        results.errors.push({
          field: fieldConfig.name,
          error: error.message
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Setup complete. Created ${results.created.length} fields, skipped ${results.skipped.length} existing fields.`,
      results
    });

  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/case-studies/setup
 * Returns current field configuration
 */
export async function GET(request) {
  try {
    // Verify API key
    const authHeader = request.headers.get("Authorization");
    const apiKey = authHeader?.replace("Bearer ", "");

    if (apiKey !== process.env.POSTS_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!CASE_STUDIES_DATASHEET_ID) {
      return NextResponse.json(
        { error: "AITABLE_CASE_STUDIES_ID is not configured" },
        { status: 500 }
      );
    }

    const existingFields = await getDatasheetMeta(CASE_STUDIES_DATASHEET_ID);

    return NextResponse.json({
      success: true,
      datasheetId: CASE_STUDIES_DATASHEET_ID,
      existingFields: existingFields.map(f => ({
        id: f.id,
        name: f.name,
        type: f.type
      })),
      requiredFields: CASE_STUDY_FIELDS.map(f => f.name)
    });

  } catch (error) {
    console.error("Get fields error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
