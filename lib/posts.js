/**
 * Posts-hantering
 *
 * Hanterar blogginlägg via AITable.
 * Används av både frontend-sidor och API-routes.
 */

import {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord
} from "./aitable";

const BLOG_DATASHEET_ID = process.env.AITABLE_FLEXRA_BLOG_ID;

/**
 * Mappar AITable-record till post-objekt
 * @param {object} record - AITable record
 * @returns {object} Post-objekt
 */
function mapRecordToPost(record) {
  const fields = record.fields || {};

  // AITable URL-fält returnerar objekt med title/text/favicon
  // Vi extraherar URL:en från text-egenskapen
  let imageUrl = "";
  if (fields.image) {
    if (typeof fields.image === "string") {
      imageUrl = fields.image;
    } else if (fields.image.text) {
      imageUrl = fields.image.text;
    }
  }

  return {
    id: record.recordId,
    slug: fields.slug || "",
    title: fields.Title || "",  // AITable har "Title" med stort T
    description: fields.description || "",
    content: fields.content || "",
    image: imageUrl,
    category: fields.category || "Insikter",
    categoryColor: fields.categoryColor || "bg-pink-200",
    author: fields.author || "Flexra",
    date: fields.date || "",
    published: fields.published || false,
    // SEO-fält (med fallbacks till vanliga fält)
    metaTitle: fields.metaTitle || fields.Title || "",
    metaDescription: fields.metaDescription || fields.description || "",
    keywords: fields.keywords || "",
    canonicalUrl: fields.canonicalUrl || "",
    noIndex: fields.noIndex || false,
    // Bild alt-text för SEO
    imageAlt: fields.imageAlt || "",
    // Multi-company support
    company: fields.company || "FLEXRA"
  };
}

/**
 * Mappar post-objekt till AITable-fält
 * @param {object} postData - Post-data
 * @returns {object} AITable-fält
 */
function mapPostToFields(postData) {
  const fields = {};

  if (postData.slug !== undefined) fields.slug = postData.slug;
  if (postData.title !== undefined) fields.Title = postData.title;  // AITable har "Title" med stort T
  if (postData.description !== undefined) fields.description = postData.description;
  if (postData.content !== undefined) fields.content = postData.content;
  if (postData.image !== undefined) fields.image = postData.image;
  if (postData.category !== undefined) fields.category = postData.category;
  if (postData.categoryColor !== undefined) fields.categoryColor = postData.categoryColor;
  if (postData.author !== undefined) fields.author = postData.author;
  if (postData.date !== undefined) fields.date = postData.date;
  if (postData.published !== undefined) fields.published = postData.published;
  // SEO-fält
  if (postData.metaTitle !== undefined) fields.metaTitle = postData.metaTitle;
  if (postData.metaDescription !== undefined) fields.metaDescription = postData.metaDescription;
  if (postData.keywords !== undefined) fields.keywords = postData.keywords;
  if (postData.canonicalUrl !== undefined) fields.canonicalUrl = postData.canonicalUrl;
  if (postData.noIndex !== undefined) fields.noIndex = postData.noIndex;
  // Bild alt-text för SEO
  if (postData.imageAlt !== undefined) fields.imageAlt = postData.imageAlt;
  // Multi-company support
  if (postData.company !== undefined) fields.company = postData.company;

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
 * AITable har en gräns på 100 records per request
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

    // Om vi fick färre än pageSize records, finns inga fler sidor
    if (records.length < pageSize) {
      break;
    }

    pageNum++;

    // Säkerhetsgräns för att undvika oändlig loop
    if (pageNum > 50) {
      console.warn("Reached pagination safety limit (5000 records)");
      break;
    }
  }

  return allRecords;
}

/**
 * Hämtar alla publicerade inlägg
 * @param {object} options - Filtreringsalternativ
 * @param {string} options.company - Filtrera på företag (default: "FLEXRA")
 * @param {boolean} options.includeUnpublished - Inkludera opublicerade
 * @param {number} options.limit - Max antal att returnera
 * @returns {Promise<Array>} Array med posts
 */
export async function getAllPosts(options = {}) {
  if (!BLOG_DATASHEET_ID) {
    console.warn("AITABLE_FLEXRA_BLOG_ID is not configured, returning empty array");
    return [];
  }

  try {
    // Hämta alla records med pagination
    const records = await getAllRecordsWithPagination(BLOG_DATASHEET_ID);

    let posts = records.map(mapRecordToPost);

    // Filtrera på företag (default: FLEXRA)
    const company = options.company || "FLEXRA";
    posts = posts.filter(post => post.company === company);

    // Filtrera bort opublicerade om inte includeUnpublished är true
    if (!options.includeUnpublished) {
      posts = posts.filter(post => post.published === true);
    }

    // Sortera efter datum (nyast först)
    posts.sort((a, b) => {
      // Parsar svenskt datumformat "12 dec 2025"
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
      posts = posts.slice(0, options.limit);
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

/**
 * Hämtar ett enskilt inlägg via slug
 * @param {string} slug - URL-slug
 * @param {string} company - Företag (default: "FLEXRA")
 * @returns {Promise<object|null>} Post eller null
 */
export async function getPostBySlug(slug, company = "FLEXRA") {
  if (!BLOG_DATASHEET_ID) {
    console.warn("AITABLE_FLEXRA_BLOG_ID is not configured");
    return null;
  }

  try {
    // Hämta alla records med pagination
    const records = await getAllRecordsWithPagination(BLOG_DATASHEET_ID);

    const posts = records.map(mapRecordToPost);
    const post = posts.find(p => p.slug === slug && p.company === company);

    return post || null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

/**
 * Hämtar relaterade inlägg (exklusive current)
 * @param {string} currentSlug - Slug att exkludera
 * @param {number} limit - Max antal att returnera
 * @param {string} company - Företag (default: "FLEXRA")
 * @returns {Promise<Array>} Array med relaterade posts
 */
export async function getRelatedPosts(currentSlug, limit = 3, company = "FLEXRA") {
  const allPosts = await getAllPosts({ company });

  return allPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit);
}

/**
 * Kontrollerar om en slug redan existerar
 * @param {string} slug - Slug att kontrollera
 * @param {string} company - Företag (default: "FLEXRA")
 * @returns {Promise<boolean>} True om slug existerar
 */
export async function slugExists(slug, company = "FLEXRA") {
  const existingPost = await getPostBySlug(slug, company);
  return existingPost !== null;
}

/**
 * Genererar en unik slug genom att lägga till suffix vid behov
 * @param {string} baseSlug - Bas-slug
 * @param {string} company - Företag
 * @returns {Promise<string>} Unik slug
 */
async function ensureUniqueSlug(baseSlug, company = "FLEXRA") {
  let slug = baseSlug;
  let counter = 1;

  while (await slugExists(slug, company)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
    // Säkerhetsgräns för att undvika oändlig loop
    if (counter > 100) {
      throw new Error(`Could not generate unique slug for: ${baseSlug}`);
    }
  }

  return slug;
}

/**
 * Skapar ett nytt inlägg
 * @param {object} postData - Inläggs-data
 * @returns {Promise<object>} Skapat inlägg
 */
export async function createPost(postData) {
  if (!BLOG_DATASHEET_ID) {
    throw new Error("AITABLE_FLEXRA_BLOG_ID is not configured");
  }

  const company = postData.company || "FLEXRA";

  // Auto-generera slug om inte specificerad
  if (!postData.slug && postData.title) {
    postData.slug = generateSlug(postData.title);
  }

  // Säkerställ att slug är unik
  if (postData.slug) {
    postData.slug = await ensureUniqueSlug(postData.slug, company);
  }

  // Auto-generera datum om inte specificerat
  if (!postData.date) {
    postData.date = formatDate();
  }

  // Sätt default-värden
  const fields = mapPostToFields({
    category: "Insikter",
    categoryColor: "bg-pink-100",
    author: "Flexra",
    published: false,
    company: company,
    ...postData
  });

  const record = await createRecord(BLOG_DATASHEET_ID, fields);
  return mapRecordToPost(record);
}

/**
 * Uppdaterar ett befintligt inlägg
 * @param {string} recordId - AITable record ID
 * @param {object} postData - Data att uppdatera
 * @returns {Promise<object>} Uppdaterat inlägg
 */
export async function updatePost(recordId, postData) {
  if (!BLOG_DATASHEET_ID) {
    throw new Error("AITABLE_FLEXRA_BLOG_ID is not configured");
  }

  const fields = mapPostToFields(postData);
  const record = await updateRecord(BLOG_DATASHEET_ID, recordId, fields);
  return mapRecordToPost(record);
}

/**
 * Tar bort ett inlägg
 * @param {string} recordId - AITable record ID
 * @returns {Promise<boolean>} True om lyckad
 */
export async function deletePost(recordId) {
  if (!BLOG_DATASHEET_ID) {
    throw new Error("AITABLE_FLEXRA_BLOG_ID is not configured");
  }

  return deleteRecord(BLOG_DATASHEET_ID, recordId);
}

/**
 * Hämtar alla unika kategorier
 * @returns {Promise<Array>} Array med kategorier
 */
export async function getCategories() {
  const posts = await getAllPosts();

  const categories = [...new Set(posts.map(post => post.category))];

  return categories.map(name => ({
    name,
    count: posts.filter(p => p.category === name).length
  }));
}

/**
 * Hämtar inlägg efter kategori
 * @param {string} category - Kategorinamn
 * @param {number} limit - Max antal
 * @param {string} company - Företag (default: "FLEXRA")
 * @returns {Promise<Array>} Array med posts
 */
export async function getPostsByCategory(category, limit, company = "FLEXRA") {
  const allPosts = await getAllPosts({ company });

  let posts = allPosts.filter(post => post.category === category);

  if (limit && limit > 0) {
    posts = posts.slice(0, limit);
  }

  return posts;
}
