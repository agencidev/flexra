#!/usr/bin/env node

/**
 * Migreringsscript: Flytta blogginlägg till AITable
 *
 * Användning:
 *   node scripts/migrate-posts-to-aitable.js
 *
 * Kräver att följande miljövariabler är satta:
 *   - AITABLE_API_TOKEN
 *   - AITABLE_FLEXRA_BLOG_ID
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Ladda .env.local manuellt
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const envVars = {};
envContent.split("\n").forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const AITABLE_BASE_URL = "https://aitable.ai/fusion/v1";
const AITABLE_TOKEN = envVars.AITABLE_API_TOKEN;
const BLOG_DATASHEET_ID = envVars.AITABLE_FLEXRA_BLOG_ID;

// Befintliga inlägg från Blog37.jsx
const posts = [
  {
    slug: "designa-foretagskulturer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-pink-200",
    title: "Designa företagskulturer",
    description: "Utforska hur du sätter medarbetarna i centrum av din företagskultur för att driva framgång och lojalitet.",
    date: "12 dec 2025",
    author: "Erik Lindqvist",
    published: true,
    content: `Att designa en stark företagskultur handlar om mer än att bara sätta upp värderingar på väggen. Det handlar om att skapa en miljö där medarbetarna känner sig sedda, hörda och uppskattade.

I denna artikel utforskar vi hur du kan sätta medarbetarna i centrum av din företagskultur för att driva framgång och lojalitet. Vi tittar på konkreta strategier och verktyg som hjälper dig att bygga en kultur som attraherar och behåller talanger.

## Varför företagskultur spelar roll

En stark företagskultur är grunden för framgångsrika organisationer. Den påverkar allt från medarbetarengagemang till kundnöjdhet och i slutändan företagets resultat.

## Praktiska steg för att förbättra kulturen

1. **Lyssna aktivt** - Skapa kanaler för feedback och agera på den
2. **Var transparent** - Dela information öppet och ärligt
3. **Fira framgångar** - Uppmärksamma både stora och små vinster
4. **Investera i utveckling** - Ge medarbetarna möjlighet att växa

## Slutsats

Att bygga en stark företagskultur tar tid, men det är en investering som betalar sig mångfalt.`
  },
  {
    slug: "leda-hybrida-team-val",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    category: "Nyheter",
    categoryColor: "bg-yellow-200",
    title: "Leda hybrida team väl",
    description: "Lär dig hur du framgångsrikt hanterar en arbetsstyrka som blandar kontor och distansarbete.",
    date: "10 dec 2025",
    author: "Anna Bergström",
    published: true,
    content: `Hybridarbete har blivit den nya normen för många organisationer. Men att leda team som arbetar både på kontoret och på distans kräver nya färdigheter och verktyg.

## Utmaningar med hybridarbete

- Kommunikation kan bli ojämn
- Risk för "vi och dem"-mentalitet
- Svårare att bygga teamkänsla

## Strategier för framgång

### Skapa tydliga strukturer
Etablera tydliga rutiner för möten, kommunikation och samarbete som fungerar oavsett var medarbetarna befinner sig.

### Investera i rätt verktyg
Använd digitala verktyg som möjliggör sömlöst samarbete mellan kontor och distans.

### Var medveten om inkludering
Se till att distansarbetare inte hamnar utanför viktiga diskussioner och beslut.`
  },
  {
    slug: "arbetsfloden-for-effektivitet",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-lime-200",
    title: "Arbetsflöden för effektivitet",
    description: "Upptäck hur automation kan förenkla dagliga operationer och öka den övergripande produktiviteten.",
    date: "8 dec 2025",
    author: "Marcus Holm",
    published: true,
    content: `Automation är nyckeln till att frigöra tid för det som verkligen spelar roll. Genom att automatisera repetitiva uppgifter kan ditt team fokusera på strategiskt arbete.

## Identifiera rätt processer

Inte alla processer lämpar sig för automation. Börja med att kartlägga:

- Repetitiva uppgifter som tar mycket tid
- Processer med hög felfrekvens
- Uppgifter som kräver data från flera system

## Vanliga automationsmöjligheter

1. **Fakturahantering** - Automatisk inläsning och matchning
2. **Rapportering** - Schemalagda rapporter som genereras automatiskt
3. **Onboarding** - Automatiserade välkomstflöden för nya medarbetare
4. **Kundservice** - Chatbots för vanliga frågor

## Mät resultaten

Följ upp effekten av dina automationer genom att mäta tidsbesparingar och kvalitetsförbättringar.`
  },
  {
    slug: "ai-i-vardagen",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-pink-200",
    title: "AI i vardagen",
    description: "Se hur artificiell intelligens blir en naturlig del av moderna arbetsplatser.",
    date: "5 dec 2025",
    author: "Erik Lindqvist",
    published: true,
    content: `AI är inte längre science fiction - det är ett verktyg som redan används på arbetsplatser världen över. Men hur kan du börja använda AI i din organisation?

## Praktiska AI-användningsområden

### Textgenerering och redigering
AI-verktyg kan hjälpa till att skriva utkast, sammanfatta dokument och förbättra texter.

### Dataanalys
Analysera stora datamängder snabbare och hitta mönster som annars skulle missas.

### Kundinteraktion
Chatbots och virtuella assistenter kan hantera rutinfrågor dygnet runt.

## Kom igång med AI

1. Identifiera ett specifikt problem att lösa
2. Välj rätt verktyg för uppgiften
3. Börja smått och skala upp
4. Utbilda teamet i hur verktygen fungerar`
  },
  {
    slug: "framtidens-arbetsplats",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    category: "Nyheter",
    categoryColor: "bg-yellow-200",
    title: "Framtidens arbetsplats",
    description: "Hur teknologi formar morgondagens kontor och arbetsmiljöer.",
    date: "3 dec 2025",
    author: "Anna Bergström",
    published: true,
    content: `Arbetsplatsen genomgår en transformation. Teknologi, förändrade förväntningar och nya arbetssätt formar hur vi kommer att arbeta i framtiden.

## Trender att hålla koll på

### Flexibla arbetsytor
Kontoret blir en plats för samarbete snarare än individuellt arbete.

### AI-assistenter
Varje medarbetare får tillgång till AI-verktyg som förstärker deras kapacitet.

### Hållbarhet i fokus
Miljömedvetna val blir en självklar del av arbetsplatsdesignen.

## Förbered din organisation

Börja redan nu med att experimentera med nya arbetssätt och teknologier för att vara redo för framtiden.`
  },
  {
    slug: "datadriven-strategi",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    category: "Insikter",
    categoryColor: "bg-lime-200",
    title: "Datadriven strategi",
    description: "Använd data för att fatta bättre beslut och driva tillväxt i din organisation.",
    date: "1 dec 2025",
    author: "Marcus Holm",
    published: true,
    content: `Data är den nya oljan, sägs det. Men det räcker inte att samla data - du måste också kunna använda den för att fatta bättre beslut.

## Bygg en datadriven kultur

### Tillgängliggör data
Se till att rätt personer har tillgång till rätt data vid rätt tidpunkt.

### Utbilda i dataanalys
Ge medarbetarna verktyg och kunskap för att tolka och använda data.

### Fatta beslut baserat på fakta
Skapa processer där data är en naturlig del av beslutsfattandet.

## Vanliga misstag att undvika

- Samla data utan syfte
- Ignorera datakvalitet
- Övertolka korrelationer som kausalitet`
  }
];

async function createRecords(records) {
  const url = `${AITABLE_BASE_URL}/datasheets/${BLOG_DATASHEET_ID}/records`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${AITABLE_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      records: records.map(fields => ({ fields }))
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`AITable API error: ${response.status} - ${JSON.stringify(error)}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(`AITable error: ${data.message || "Unknown error"}`);
  }

  return data.data?.records || [];
}

async function migrate() {
  console.log("🚀 Startar migrering av blogginlägg till AITable...\n");

  if (!AITABLE_TOKEN) {
    console.error("❌ AITABLE_API_TOKEN är inte satt i .env.local");
    process.exit(1);
  }

  if (!BLOG_DATASHEET_ID) {
    console.error("❌ AITABLE_FLEXRA_BLOG_ID är inte satt i .env.local");
    process.exit(1);
  }

  console.log(`📊 Datasheet ID: ${BLOG_DATASHEET_ID}`);
  console.log(`📝 Antal inlägg att migrera: ${posts.length}\n`);

  // AITable tillåter max 10 records per request
  const batchSize = 10;
  let totalCreated = 0;

  for (let i = 0; i < posts.length; i += batchSize) {
    const batch = posts.slice(i, i + batchSize);
    console.log(`📦 Migrerar batch ${Math.floor(i / batchSize) + 1}...`);

    try {
      const created = await createRecords(batch);
      totalCreated += created.length;

      for (const record of created) {
        console.log(`   ✅ ${record.fields.title}`);
      }
    } catch (error) {
      console.error(`   ❌ Fel vid migrering:`, error.message);
    }

    // Vänta lite mellan batches för att respektera rate limits
    if (i + batchSize < posts.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log(`\n✨ Migrering klar! ${totalCreated} inlägg skapade i AITable.`);
}

migrate().catch(console.error);
