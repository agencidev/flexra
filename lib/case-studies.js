/**
 * Case Studies-hantering
 *
 * Hanterar case studies via AITable.
 * Används av både frontend-sidor och API-routes.
 */

import {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord
} from "./aitable";

const CASE_STUDIES_DATASHEET_ID = process.env.AITABLE_CASE_STUDIES_ID;

/**
 * Mappar AITable-record till case study-objekt
 * @param {object} record - AITable record
 * @returns {object} Case study-objekt
 */
function mapRecordToCaseStudy(record) {
  const fields = record.fields || {};

  // AITable URL-fält returnerar objekt med title/text/favicon
  const extractUrl = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (field.text) return field.text;
    return "";
  };

  // Parsa JSON-fält säkert
  const parseJson = (field, defaultValue = []) => {
    if (!field) return defaultValue;
    if (Array.isArray(field)) return field;
    try {
      return JSON.parse(field);
    } catch {
      return defaultValue;
    }
  };

  return {
    id: record.recordId,
    slug: fields.slug || "",
    title: fields.Title || fields.title || "",
    client: fields.client || "",
    clientLogo: extractUrl(fields.clientLogo),
    industry: fields.industry || "",
    category: fields.category || "Automation",
    categoryColor: fields.categoryColor || "bg-pink-100",
    heroImage: extractUrl(fields.heroImage),
    excerpt: fields.excerpt || "",
    challenge: fields.challenge || "",
    solution: fields.solution || "",
    results: fields.results || "",
    metrics: parseJson(fields.metrics, []),
    techStack: fields.techStack || "",
    testimonial: fields.testimonial || "",
    testimonialAuthor: fields.testimonialAuthor || "",
    testimonialRole: fields.testimonialRole || "",
    contactEmail: fields.contactEmail || "",
    gallery: parseJson(fields.gallery, []),
    published: fields.published || false,
    date: fields.date || "",
    // Webb-projekt
    websiteUrl: extractUrl(fields.websiteUrl),
    desktopScreenshot: extractUrl(fields.desktopScreenshot),
    mobileScreenshot: extractUrl(fields.mobileScreenshot),
    // Multi-site
    company: fields.company || "FLEXRA",
    // SEO-fält
    metaTitle: fields.metaTitle || fields.Title || fields.title || "",
    metaDescription: fields.metaDescription || fields.excerpt || "",
    keywords: fields.keywords || "",
    noIndex: fields.noIndex || false
  };
}

/**
 * Mappar case study-objekt till AITable-fält
 * @param {object} caseData - Case study-data
 * @returns {object} AITable-fält
 */
function mapCaseStudyToFields(caseData) {
  const fields = {};

  if (caseData.slug !== undefined) fields.slug = caseData.slug;
  if (caseData.title !== undefined) fields.Title = caseData.title;
  if (caseData.client !== undefined) fields.client = caseData.client;
  if (caseData.clientLogo !== undefined) fields.clientLogo = caseData.clientLogo;
  if (caseData.industry !== undefined) fields.industry = caseData.industry;
  if (caseData.category !== undefined) fields.category = caseData.category;
  if (caseData.categoryColor !== undefined) fields.categoryColor = caseData.categoryColor;
  if (caseData.heroImage !== undefined) fields.heroImage = caseData.heroImage;
  if (caseData.excerpt !== undefined) fields.excerpt = caseData.excerpt;
  if (caseData.challenge !== undefined) fields.challenge = caseData.challenge;
  if (caseData.solution !== undefined) fields.solution = caseData.solution;
  if (caseData.results !== undefined) fields.results = caseData.results;
  if (caseData.metrics !== undefined) {
    fields.metrics = typeof caseData.metrics === "string"
      ? caseData.metrics
      : JSON.stringify(caseData.metrics);
  }
  if (caseData.techStack !== undefined) fields.techStack = caseData.techStack;
  if (caseData.testimonial !== undefined) fields.testimonial = caseData.testimonial;
  if (caseData.testimonialAuthor !== undefined) fields.testimonialAuthor = caseData.testimonialAuthor;
  if (caseData.testimonialRole !== undefined) fields.testimonialRole = caseData.testimonialRole;
  if (caseData.contactEmail !== undefined) fields.contactEmail = caseData.contactEmail;
  if (caseData.gallery !== undefined) {
    fields.gallery = typeof caseData.gallery === "string"
      ? caseData.gallery
      : JSON.stringify(caseData.gallery);
  }
  if (caseData.published !== undefined) fields.published = caseData.published;
  if (caseData.date !== undefined) fields.date = caseData.date;
  // Webb-projekt
  if (caseData.websiteUrl !== undefined) fields.websiteUrl = caseData.websiteUrl;
  if (caseData.desktopScreenshot !== undefined) fields.desktopScreenshot = caseData.desktopScreenshot;
  if (caseData.mobileScreenshot !== undefined) fields.mobileScreenshot = caseData.mobileScreenshot;
  // Multi-site
  if (caseData.company !== undefined) fields.company = caseData.company;
  // SEO-fält
  if (caseData.metaTitle !== undefined) fields.metaTitle = caseData.metaTitle;
  if (caseData.metaDescription !== undefined) fields.metaDescription = caseData.metaDescription;
  if (caseData.keywords !== undefined) fields.keywords = caseData.keywords;
  if (caseData.noIndex !== undefined) fields.noIndex = caseData.noIndex;

  return fields;
}

/**
 * Genererar slug från titel
 * @param {string} title - Titel
 * @returns {string} URL-vänlig slug
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Formaterar datum till svensk format
 * @param {Date} date - Datum
 * @returns {string} Formaterat datum (t.ex. "16 dec 2025")
 */
export function formatDate(date = new Date()) {
  const months = [
    "jan", "feb", "mar", "apr", "maj", "jun",
    "jul", "aug", "sep", "okt", "nov", "dec"
  ];

  const d = new Date(date);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Hämtar ALLA records från AITable med pagination
 * @param {string} datasheetId - Datasheet ID
 * @returns {Promise<Array>} Alla records
 */
async function getAllRecordsWithPagination(datasheetId) {
  const allRecords = [];
  let pageNum = 1;
  const pageSize = 100;

  while (true) {
    const records = await getRecords(datasheetId, {
      pageSize,
      pageNum
    });

    allRecords.push(...records);

    if (records.length < pageSize) {
      break;
    }

    pageNum++;

    if (pageNum > 50) {
      console.warn("Reached pagination safety limit (5000 records)");
      break;
    }
  }

  return allRecords;
}

// Default company for multi-site filtering
const DEFAULT_COMPANY = process.env.SITE_COMPANY || "FLEXRA";

/**
 * Hämtar alla publicerade case studies
 * @param {object} options - Filtreringsalternativ
 * @param {boolean} options.includeUnpublished - Inkludera opublicerade
 * @param {number} options.limit - Max antal att returnera
 * @param {string} options.industry - Filtrera på bransch
 * @param {string} options.category - Filtrera på kategori
 * @param {string} options.company - Filtrera på företag (default: FLEXRA)
 * @returns {Promise<Array>} Array med case studies
 */
export async function getAllCaseStudies(options = {}) {
  if (!CASE_STUDIES_DATASHEET_ID) {
    console.warn("AITABLE_CASE_STUDIES_ID is not configured, returning empty array");
    return [];
  }

  try {
    const records = await getAllRecordsWithPagination(CASE_STUDIES_DATASHEET_ID);

    let caseStudies = records.map(mapRecordToCaseStudy);

    // Filtrera på företag (multi-site support)
    const company = options.company ?? DEFAULT_COMPANY;
    if (company) {
      caseStudies = caseStudies.filter(cs => cs.company === company);
    }

    // Filtrera bort opublicerade om inte includeUnpublished är true
    if (!options.includeUnpublished) {
      caseStudies = caseStudies.filter(cs => cs.published === true);
    }

    // Filtrera på bransch
    if (options.industry) {
      caseStudies = caseStudies.filter(cs => cs.industry === options.industry);
    }

    // Filtrera på kategori
    if (options.category) {
      caseStudies = caseStudies.filter(cs => cs.category === options.category);
    }

    // Sortera efter datum (nyast först)
    caseStudies.sort((a, b) => {
      const parseDate = (dateStr) => {
        const months = {
          jan: 0, feb: 1, mar: 2, apr: 3, maj: 4, jun: 5,
          jul: 6, aug: 7, sep: 8, okt: 9, nov: 10, dec: 11
        };
        const parts = dateStr.split(" ");
        if (parts.length === 3) {
          return new Date(parseInt(parts[2]), months[parts[1]] || 0, parseInt(parts[0]));
        }
        return new Date(0);
      };
      return parseDate(b.date) - parseDate(a.date);
    });

    // Applicera limit om specificerad
    if (options.limit && options.limit > 0) {
      caseStudies = caseStudies.slice(0, options.limit);
    }

    return caseStudies;
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}

/**
 * Hämtar en enskild case study via slug
 * @param {string} slug - URL-slug
 * @returns {Promise<object|null>} Case study eller null
 */
export async function getCaseStudyBySlug(slug) {
  if (!CASE_STUDIES_DATASHEET_ID) {
    console.warn("AITABLE_CASE_STUDIES_ID is not configured");
    return null;
  }

  try {
    const records = await getAllRecordsWithPagination(CASE_STUDIES_DATASHEET_ID);

    const caseStudies = records.map(mapRecordToCaseStudy);
    const caseStudy = caseStudies.find(cs => cs.slug === slug);

    return caseStudy || null;
  } catch (error) {
    console.error("Error fetching case study by slug:", error);
    return null;
  }
}

/**
 * Hämtar relaterade case studies (exklusive current)
 * @param {string} currentSlug - Slug att exkludera
 * @param {number} limit - Max antal att returnera
 * @param {string} category - Samma kategori (optional)
 * @returns {Promise<Array>} Array med relaterade case studies
 */
export async function getRelatedCaseStudies(currentSlug, limit = 3, category = null) {
  const allCaseStudies = await getAllCaseStudies();

  let related = allCaseStudies.filter(cs => cs.slug !== currentSlug);

  // Prioritera samma kategori
  if (category) {
    const sameCategory = related.filter(cs => cs.category === category);
    const otherCategory = related.filter(cs => cs.category !== category);
    related = [...sameCategory, ...otherCategory];
  }

  return related.slice(0, limit);
}

/**
 * Kontrollerar om en slug redan existerar
 * @param {string} slug - Slug att kontrollera
 * @returns {Promise<boolean>} True om slug existerar
 */
export async function slugExists(slug) {
  const existing = await getCaseStudyBySlug(slug);
  return existing !== null;
}

/**
 * Genererar en unik slug
 * @param {string} baseSlug - Bas-slug
 * @returns {Promise<string>} Unik slug
 */
async function ensureUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let counter = 1;

  while (await slugExists(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
    if (counter > 100) {
      throw new Error(`Could not generate unique slug for: ${baseSlug}`);
    }
  }

  return slug;
}

/**
 * Skapar en ny case study
 * @param {object} caseData - Case study-data
 * @returns {Promise<object>} Skapad case study
 */
export async function createCaseStudy(caseData) {
  if (!CASE_STUDIES_DATASHEET_ID) {
    throw new Error("AITABLE_CASE_STUDIES_ID is not configured");
  }

  // Auto-generera slug om inte specificerad
  if (!caseData.slug && caseData.title) {
    caseData.slug = generateSlug(caseData.title);
  }

  // Säkerställ att slug är unik
  if (caseData.slug) {
    caseData.slug = await ensureUniqueSlug(caseData.slug);
  }

  // Auto-generera datum om inte specificerat
  if (!caseData.date) {
    caseData.date = formatDate();
  }

  // Sätt default-värden
  const fields = mapCaseStudyToFields({
    category: "Automation",
    categoryColor: "bg-pink-100",
    published: false,
    company: DEFAULT_COMPANY,
    ...caseData
  });

  const record = await createRecord(CASE_STUDIES_DATASHEET_ID, fields);
  return mapRecordToCaseStudy(record);
}

/**
 * Uppdaterar en befintlig case study
 * @param {string} recordId - AITable record ID
 * @param {object} caseData - Data att uppdatera
 * @returns {Promise<object>} Uppdaterad case study
 */
export async function updateCaseStudy(recordId, caseData) {
  if (!CASE_STUDIES_DATASHEET_ID) {
    throw new Error("AITABLE_CASE_STUDIES_ID is not configured");
  }

  const fields = mapCaseStudyToFields(caseData);
  const record = await updateRecord(CASE_STUDIES_DATASHEET_ID, recordId, fields);
  return mapRecordToCaseStudy(record);
}

/**
 * Tar bort en case study
 * @param {string} recordId - AITable record ID
 * @returns {Promise<boolean>} True om lyckad
 */
export async function deleteCaseStudy(recordId) {
  if (!CASE_STUDIES_DATASHEET_ID) {
    throw new Error("AITABLE_CASE_STUDIES_ID is not configured");
  }

  return deleteRecord(CASE_STUDIES_DATASHEET_ID, recordId);
}

/**
 * Hämtar alla unika branscher
 * @returns {Promise<Array>} Array med branscher
 */
export async function getIndustries() {
  const caseStudies = await getAllCaseStudies();

  const industries = [...new Set(caseStudies.map(cs => cs.industry).filter(Boolean))];

  return industries.map(name => ({
    name,
    count: caseStudies.filter(cs => cs.industry === name).length
  }));
}

/**
 * Hämtar alla unika kategorier
 * @returns {Promise<Array>} Array med kategorier
 */
export async function getCategories() {
  const caseStudies = await getAllCaseStudies();

  const categories = [...new Set(caseStudies.map(cs => cs.category).filter(Boolean))];

  return categories.map(name => ({
    name,
    count: caseStudies.filter(cs => cs.category === name).length
  }));
}
