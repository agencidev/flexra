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

  return {
    id: record.recordId,
    slug: fields.slug || "",
    title: fields.title || "",
    description: fields.description || "",
    content: fields.content || "",
    image: fields.image || "",
    category: fields.category || "Insikter",
    categoryColor: fields.categoryColor || "bg-pink-100",
    author: fields.author || "Flexra",
    date: fields.date || "",
    published: fields.published || false
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
  if (postData.title !== undefined) fields.title = postData.title;
  if (postData.description !== undefined) fields.description = postData.description;
  if (postData.content !== undefined) fields.content = postData.content;
  if (postData.image !== undefined) fields.image = postData.image;
  if (postData.category !== undefined) fields.category = postData.category;
  if (postData.categoryColor !== undefined) fields.categoryColor = postData.categoryColor;
  if (postData.author !== undefined) fields.author = postData.author;
  if (postData.date !== undefined) fields.date = postData.date;
  if (postData.published !== undefined) fields.published = postData.published;

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
 * Hämtar alla publicerade inlägg
 * @param {object} options - Filtreringsalternativ
 * @returns {Promise<Array>} Array med posts
 */
export async function getAllPosts(options = {}) {
  if (!BLOG_DATASHEET_ID) {
    console.warn("AITABLE_FLEXRA_BLOG_ID is not configured, returning empty array");
    return [];
  }

  try {
    const records = await getRecords(BLOG_DATASHEET_ID, {
      filterByFormula: options.includeUnpublished
        ? undefined
        : "{published} = TRUE",
      sort: options.sort || [{ field: "date", order: "desc" }]
    });

    let posts = records.map(mapRecordToPost);

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
 * @returns {Promise<object|null>} Post eller null
 */
export async function getPostBySlug(slug) {
  if (!BLOG_DATASHEET_ID) {
    console.warn("AITABLE_FLEXRA_BLOG_ID is not configured");
    return null;
  }

  try {
    const records = await getRecords(BLOG_DATASHEET_ID, {
      filterByFormula: `{slug} = "${slug}"`
    });

    if (records.length === 0) {
      return null;
    }

    return mapRecordToPost(records[0]);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

/**
 * Hämtar relaterade inlägg (exklusive current)
 * @param {string} currentSlug - Slug att exkludera
 * @param {number} limit - Max antal att returnera
 * @returns {Promise<Array>} Array med relaterade posts
 */
export async function getRelatedPosts(currentSlug, limit = 3) {
  const allPosts = await getAllPosts();

  return allPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit);
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

  // Auto-generera slug om inte specificerad
  if (!postData.slug && postData.title) {
    postData.slug = generateSlug(postData.title);
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
 * @returns {Promise<Array>} Array med posts
 */
export async function getPostsByCategory(category, limit) {
  const allPosts = await getAllPosts();

  let posts = allPosts.filter(post => post.category === category);

  if (limit && limit > 0) {
    posts = posts.slice(0, limit);
  }

  return posts;
}
