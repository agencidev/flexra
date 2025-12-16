/**
 * Bildprompt-generering för blogginlägg
 *
 * Genererar bildpromptar från artikelinnehåll som kan skickas
 * till OpenRouter för AI-bildgenerering.
 */

/**
 * Kända företag/produkter och deras visuella representation
 * Används för att inkludera relevanta loggor i bildprompten
 */
const BRAND_VISUALS = {
  // AI-företag och produkter
  "openai": { name: "OpenAI", visual: "OpenAI logo, green circular logo" },
  "chatgpt": { name: "ChatGPT", visual: "ChatGPT interface, OpenAI green logo" },
  "gpt-4": { name: "GPT-4", visual: "OpenAI GPT-4 branding" },
  "gpt4": { name: "GPT-4", visual: "OpenAI GPT-4 branding" },
  "claude": { name: "Claude", visual: "Anthropic Claude logo, orange gradient" },
  "anthropic": { name: "Anthropic", visual: "Anthropic logo" },
  "bard": { name: "Google Bard", visual: "Google Bard colorful sparkle logo" },
  "gemini": { name: "Google Gemini", visual: "Google Gemini star logo" },
  "google": { name: "Google", visual: "Google logo, colorful G" },
  "microsoft": { name: "Microsoft", visual: "Microsoft logo, four colored squares" },
  "copilot": { name: "Microsoft Copilot", visual: "Microsoft Copilot logo" },

  // Automationsverktyg
  "zapier": { name: "Zapier", visual: "Zapier orange logo, lightning bolt Z" },
  "make": { name: "Make", visual: "Make.com purple logo" },
  "n8n": { name: "n8n", visual: "n8n workflow automation logo" },

  // Svenska företag/verktyg
  "fortnox": { name: "Fortnox", visual: "Fortnox green logo" },
  "visma": { name: "Visma", visual: "Visma logo" },
  "klarna": { name: "Klarna", visual: "Klarna pink logo" },

  // Bildgenerering
  "midjourney": { name: "Midjourney", visual: "Midjourney sailing ship logo" },
  "dall-e": { name: "DALL-E", visual: "OpenAI DALL-E logo" },
  "stable diffusion": { name: "Stable Diffusion", visual: "Stability AI logo" },
  "sora": { name: "Sora", visual: "OpenAI Sora video generation" },

  // Projektverktyg
  "slack": { name: "Slack", visual: "Slack colorful hashtag logo" },
  "notion": { name: "Notion", visual: "Notion black and white logo" },
  "asana": { name: "Asana", visual: "Asana coral colored logo" },
  "trello": { name: "Trello", visual: "Trello blue logo" },
  "monday": { name: "Monday.com", visual: "Monday.com colorful logo" }
};

/**
 * Genererar en bildprompt baserat på artikelns innehåll
 * @param {object} article - Artikeldata
 * @param {string} article.title - Artikelns titel
 * @param {string} article.description - Kort beskrivning
 * @param {string} article.category - Kategori (Insikter, Nyheter, Guider)
 * @param {string} article.content - Artikelns innehåll (optional)
 * @returns {object} - Prompt och alt-text förslag
 */
/**
 * Bildstilsalternativ för variation
 * Olika stilar väljs baserat på kategori och slumpmässigt för variation
 */
const IMAGE_STYLES = {
  "Insikter": [
    "clean, minimalist, professional business photography style",
    "abstract conceptual illustration, modern flat design",
    "editorial photography style, thoughtful composition",
    "modern corporate aesthetic, soft gradients",
    "Scandinavian design, minimalist and airy"
  ],
  "Nyheter": [
    "dynamic, modern, tech-focused editorial style",
    "news editorial photography, bold and impactful",
    "digital art style, vibrant tech aesthetics",
    "futuristic corporate design, sleek and modern",
    "high-contrast editorial, dramatic lighting"
  ],
  "Guider": [
    "step-by-step visual, infographic style, clear and instructive",
    "educational illustration, friendly and approachable",
    "clean tutorial aesthetic, organized layout feel",
    "modern how-to visual, practical and clear",
    "instructional design, warm and inviting"
  ]
};

/**
 * Kompositionsalternativ för variation
 */
const COMPOSITIONS = [
  "centered subject with clean background",
  "diagonal composition with depth",
  "symmetrical layout, balanced elements",
  "rule of thirds composition",
  "layered elements with foreground interest"
];

export function generateImagePrompt(article) {
  const { title, description, category, content } = article;

  // Kombinera all text för analys (titel, beskrivning OCH innehåll)
  const fullText = [title, description, content].filter(Boolean).join(" ");

  // Extrahera nyckelkoncept från all text
  const keywords = extractKeywords(fullText);

  // Detektera relevanta varumärken/företag med relevansanalys
  const brandAnalysis = detectBrands(fullText, title);

  // Välj slumpmässig stil från kategorins alternativ för variation
  const categoryStyles = IMAGE_STYLES[category] || IMAGE_STYLES["Insikter"];
  const styleIndex = hashString(title) % categoryStyles.length;
  const style = categoryStyles[styleIndex];

  // Välj komposition baserat på innehållet
  const compositionIndex = hashString(description || title) % COMPOSITIONS.length;
  const composition = COMPOSITIONS[compositionIndex];

  // Bygg prompt med innehållskontext och eventuella varumärken
  const prompt = buildPrompt(keywords, style, title, content, brandAnalysis, composition);

  // Generera alt-text förslag
  const altText = generateAltText(title, keywords, brandAnalysis.brandsToInclude);

  return {
    prompt,
    altText,
    keywords,
    detectedBrands: brandAnalysis.brands.map(b => b.name),
    includedBrands: brandAnalysis.brandsToInclude.map(b => b.name),
    negativePrompt: "blurry, low quality, distorted, deformed, ugly, bad anatomy, text overlay, watermark"
  };
}

/**
 * Enkel hash-funktion för att få konsekvent men varierad output
 * @param {string} str - Sträng att hasha
 * @returns {number} - Hash-värde
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < (str || "").length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Detekterar kända varumärken/företag i texten och bedömer relevans
 * @param {string} text - Text att analysera
 * @param {string} title - Artikelns titel
 * @returns {object} - { brands: Array, shouldIncludeBrands: boolean }
 */
function detectBrands(text, title) {
  const lowerText = text.toLowerCase();
  const lowerTitle = (title || "").toLowerCase();
  const detected = [];

  for (const [key, brand] of Object.entries(BRAND_VISUALS)) {
    if (lowerText.includes(key)) {
      // Undvik dubbletter (t.ex. chatgpt och openai)
      if (!detected.some(b => b.name === brand.name)) {
        // Räkna förekomster för att bedöma relevans
        const regex = new RegExp(key, "gi");
        const count = (text.match(regex) || []).length;
        const inTitle = lowerTitle.includes(key);

        detected.push({
          ...brand,
          count,
          inTitle,
          relevance: inTitle ? count + 10 : count
        });
      }
    }
  }

  // Sortera efter relevans
  detected.sort((a, b) => b.relevance - a.relevance);

  // Bestäm om varumärken ska inkluderas i bilden
  // Inkludera bara om: artikeln handlar PRIMÄRT om varumärket (i titeln eller nämns 3+ gånger)
  const topBrand = detected[0];
  const shouldIncludeBrands = topBrand && (topBrand.inTitle || topBrand.count >= 3);

  // Om vi ska inkludera, ta bara det mest relevanta varumärket (max 2)
  const brandsToInclude = shouldIncludeBrands ? detected.slice(0, 2) : [];

  return {
    brands: detected.slice(0, 3),
    brandsToInclude,
    shouldIncludeBrands
  };
}

/**
 * Extraherar relevanta nyckelord från text
 * @param {string} text - Text att analysera
 * @returns {string[]} - Array med nyckelord
 */
function extractKeywords(text) {
  // Lista av AI/automation-relaterade nyckelord att prioritera
  const relevantTerms = [
    "ai", "automation", "robot", "workflow", "data", "process",
    "integration", "effektivisering", "digitalisering", "chatgpt",
    "machine learning", "analytics", "dashboard", "team", "office",
    "bokföring", "redovisning", "fakturering", "kundtjänst", "chatbot",
    "marknadsföring", "e-handel", "projekt", "hr", "rekrytering",
    "rapportering", "analys", "strategi", "framtid", "transformation"
  ];

  const words = text.toLowerCase().split(/\s+/);
  const found = relevantTerms.filter(term =>
    words.some(word => word.includes(term))
  );

  return found.length > 0 ? found.slice(0, 5) : ["business", "technology", "automation"];
}

/**
 * Extraherar huvudtemat från innehållet
 * @param {string} content - Artikelns innehåll
 * @returns {string} - Sammanfattning av huvudtemat
 */
function extractContentTheme(content) {
  if (!content) return "";

  // Extrahera första stycket eller rubriker för kontext
  const lines = content.split("\n").filter(l => l.trim());
  const relevantLines = [];

  for (const line of lines) {
    // Ta med rubriker och första meningar
    if (line.startsWith("#") || relevantLines.length < 2) {
      const cleaned = line.replace(/^#+\s*/, "").trim();
      if (cleaned && cleaned.length > 10) {
        relevantLines.push(cleaned);
      }
    }
    if (relevantLines.length >= 3) break;
  }

  return relevantLines.join(". ");
}

/**
 * Bygger bildprompt från nyckelord, stil och innehåll
 * @param {string[]} keywords - Nyckelord
 * @param {string} style - Stilbeskrivning
 * @param {string} title - Artikelns titel
 * @param {string} content - Artikelns innehåll
 * @param {object} brandAnalysis - Varumärkesanalys med brandsToInclude
 * @param {string} composition - Kompositionsstil
 * @returns {string} - Komplett bildprompt
 */
function buildPrompt(keywords, style, title, content, brandAnalysis = {}, composition = "") {
  const conceptMap = {
    "ai": "artificial intelligence visualization, neural network patterns",
    "automation": "automated workflow, connected systems, seamless processes",
    "robot": "friendly robot assistant, modern robotics",
    "workflow": "flowchart visualization, process optimization",
    "data": "data visualization, abstract data streams",
    "integration": "connected puzzle pieces, unified systems",
    "chatgpt": "conversational AI interface, chat bubbles",
    "team": "diverse professional team collaborating",
    "office": "modern Scandinavian office environment",
    "bokföring": "financial documents, calculator, spreadsheets",
    "redovisning": "accounting software interface, financial charts",
    "fakturering": "invoice documents, payment processing",
    "kundtjänst": "customer service representative, support chat",
    "chatbot": "chat interface, AI assistant conversation",
    "marknadsföring": "marketing analytics dashboard, social media icons",
    "e-handel": "online shopping interface, e-commerce elements",
    "projekt": "project management board, kanban cards",
    "hr": "human resources, employee profiles",
    "rekrytering": "hiring process, candidate interviews",
    "rapportering": "business reports, data charts",
    "analys": "data analysis, graphs and metrics",
    "strategi": "strategic planning, roadmap visualization",
    "framtid": "futuristic technology, innovation",
    "transformation": "digital transformation, change process"
  };

  // Bygg konceptlista från nyckelord
  const concepts = keywords
    .map(k => conceptMap[k] || k)
    .join(", ");

  // Lägg till varumärkesloggor ENDAST om de är tillräckligt relevanta
  let brandSection = "";
  const brandsToInclude = brandAnalysis.brandsToInclude || [];
  if (brandsToInclude.length > 0) {
    const brandVisuals = brandsToInclude.map(b => b.visual).join(", ");
    brandSection = ` Subtly featuring: ${brandVisuals}.`;
  }

  // Extrahera tema från innehållet för mer kontext
  const contentTheme = extractContentTheme(content);
  let contextSection = "";
  if (contentTheme) {
    const shortTheme = contentTheme.length > 80
      ? contentTheme.substring(0, 77) + "..."
      : contentTheme;
    contextSection = ` Theme: ${shortTheme}.`;
  }

  // Komposition för variation
  const compositionSection = composition ? ` Composition: ${composition}.` : "";

  return `Professional blog header image: ${concepts}.${brandSection}${contextSection} Style: ${style}.${compositionSection} Swedish business context. Aspect ratio 16:9. High quality, modern aesthetic. Soft, natural lighting.`;
}

/**
 * Genererar SEO-vänlig alt-text
 * @param {string} title - Artikelns titel
 * @param {string[]} keywords - Nyckelord
 * @param {Array} brands - Detekterade varumärken
 * @returns {string} - Alt-text (80-125 tecken)
 */
function generateAltText(title, keywords, brands = []) {
  // Svenska översättningar för vanliga koncept
  const translations = {
    "ai": "AI",
    "automation": "automation",
    "robot": "robotik",
    "workflow": "arbetsflöde",
    "data": "datahantering",
    "integration": "systemintegration",
    "chatgpt": "ChatGPT",
    "team": "teamarbete",
    "office": "kontorsmiljö",
    "bokföring": "bokföring",
    "redovisning": "redovisning",
    "fakturering": "fakturering",
    "kundtjänst": "kundtjänst",
    "chatbot": "chatbot",
    "marknadsföring": "marknadsföring",
    "e-handel": "e-handel",
    "projekt": "projektledning",
    "hr": "HR",
    "rekrytering": "rekrytering",
    "rapportering": "rapportering",
    "analys": "analys",
    "strategi": "strategi",
    "framtid": "framtidsteknik",
    "transformation": "digital transformation"
  };

  // Skapa beskrivande alt-text
  const keywordStr = keywords
    .slice(0, 2)
    .map(k => translations[k] || k)
    .join(" och ");

  // Inkludera varumärken om de finns
  let brandStr = "";
  if (brands.length > 0) {
    brandStr = ` med ${brands.slice(0, 2).map(b => b.name).join(" och ")}`;
  }

  const base = `Illustration som visar ${keywordStr}${brandStr} i modern affärsmiljö`;

  // Trimma till max 125 tecken
  if (base.length > 125) {
    return base.substring(0, 122) + "...";
  }
  return base;
}

/**
 * Skickar prompt till OpenRouter för bildgenerering
 *
 * OpenRouter använder chat/completions endpoint med modalities: ["image", "text"]
 * för bildgenerering. Stödjer modeller som:
 * - google/gemini-2.5-flash-image-preview (rekommenderad)
 * - black-forest-labs/flux.2-pro
 * - black-forest-labs/flux.2-flex
 *
 * @param {string} prompt - Bildprompt
 * @param {object} options - Konfigurationsalternativ
 * @param {string} options.model - Modell att använda
 * @param {string} options.aspectRatio - Bildformat (default: "16:9")
 * @returns {Promise<string>} - Base64 data URL till genererad bild
 */
export async function generateImageWithOpenRouter(prompt, options = {}) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  // Hämta modell från env eller använd default
  const model = options.model || process.env.OPENROUTER_IMAGE_MODEL || "google/gemini-2.5-flash-image-preview";
  const aspectRatio = options.aspectRatio || "16:9";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://flexra.se",
      "X-Title": "Flexra Blog"
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      modalities: ["image", "text"],
      image_config: {
        aspect_ratio: aspectRatio
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenRouter error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();

  // OpenRouter returnerar bilder i choices[0].message.images array
  if (!data.choices?.[0]?.message?.images?.[0]?.image_url?.url) {
    throw new Error("Invalid response from OpenRouter - no image returned");
  }

  // Returnerar base64 data URL (data:image/png;base64,...)
  return data.choices[0].message.images[0].image_url.url;
}

/**
 * Genererar bildprompt och bild i ett steg
 * @param {object} article - Artikeldata
 * @param {boolean} generateImage - Om bilden ska genereras
 * @returns {Promise<object>} - Promptdata och eventuell bild-URL
 */
export async function generateBlogImage(article, generateImage = false) {
  const promptData = generateImagePrompt(article);

  if (!generateImage) {
    return promptData;
  }

  try {
    const imageUrl = await generateImageWithOpenRouter(promptData.prompt);
    return {
      ...promptData,
      imageUrl
    };
  } catch (error) {
    return {
      ...promptData,
      imageError: error.message
    };
  }
}
