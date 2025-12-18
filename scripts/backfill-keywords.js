/**
 * Backfill-script för keywords
 * Lägger till keywords på posts #36-50 som saknar dem
 *
 * Kör: node scripts/backfill-keywords.js
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { updateRecords } from '../lib/aitable.js';

const BLOG_DATASHEET_ID = process.env.AITABLE_FLEXRA_BLOG_ID;

// Posts som saknar keywords med manuellt skapade keywords
const postsToUpdate = [
  {
    recordId: "rec7PAABRkKYL",
    title: "Så bygger du en AI-strategi för 2025",
    keywords: "AI-strategi, digitalisering, implementation, affärsnytta, KPI, förändringsledning"
  },
  {
    recordId: "recwQCLRots33",
    title: "AI-agenter: Nästa steg i intelligent automation",
    keywords: "AI-agenter, automation, LLM, autonoma system, verktygsanvändning, intelligent automation"
  },
  {
    recordId: "rec4D2qi4D4wW",
    title: "Två år med ChatGPT: Hur AI har förändrat arbetslivet",
    keywords: "ChatGPT, AI-adoption, svenskt arbetsliv, AI-verktyg, produktivitet, två år"
  },
  {
    recordId: "recnxV0KG3Qwd",
    title: "AI för småföretag: Budgetvänliga lösningar som fungerar",
    keywords: "småföretag, budget, gratis AI, ROI, ChatGPT Plus, Canva AI, kostnadseffektivt"
  },
  {
    recordId: "rectgOIsNbQcX",
    title: "Black Friday för AI: Vilka verktyg är värda pengarna?",
    keywords: "Black Friday, AI-verktyg, prenumerationer, rabatter, årsprenumeration, lifetime deals"
  },
  {
    recordId: "rec7xswt9j6pX",
    title: "AI-trender 2025: Prognoser och förväntningar",
    keywords: "AI-trender 2025, prognoser, AI-agenter, multimodal AI, AI Act, reglering"
  },
  {
    recordId: "rec1xJvkYfTND",
    title: "2025: Året då AI blir en naturlig del av vardagen",
    keywords: "AI vardag, produktivitet, arbetsplatsen 2025, integration, automatisering"
  },
  {
    recordId: "recZjQv2h6XfX",
    title: "n8n vs Zapier vs Make: Bästa automationsplattformen",
    keywords: "n8n, Zapier, Make, automationsplattform, jämförelse, workflow automation, self-hosting"
  },
  {
    recordId: "recKfrdbEHidf",
    title: "AI inom juridik: Automatiserad avtalshantering",
    keywords: "juridik, avtal, avtalshantering, legal tech, avtalsgranskning, AI juridik"
  },
  {
    recordId: "recQHYQqcQDiH",
    title: "7 vanliga misstag vid AI-implementation (och hur du undviker dem)",
    keywords: "AI-implementation, misstag, fallgropar, tips, förändringsledning, datakvalitet"
  },
  {
    recordId: "recYX64jBmlRo",
    title: "AI för projektledning: Verktyg och metoder som fungerar",
    keywords: "projektledning, möteshantering, rapportering, AI-verktyg, Otter.ai, Motion"
  },
  {
    recordId: "recHzOcD7Mnwb",
    title: "Datadriven marknadsföring med AI: En praktisk guide",
    keywords: "marknadsföring, personalisering, analytics, marketing automation, lead scoring, AI marketing"
  },
  {
    recordId: "recEg7HerPy1q",
    title: "AI och hållbarhet: Så bidrar automation till grön omställning",
    keywords: "hållbarhet, grön omställning, energieffektivisering, klimat, supply chain, sustainability"
  },
  {
    recordId: "rec17h36F74Fa",
    title: "Framtidens arbetsplats: AI som din nya kollega",
    keywords: "framtidens arbetsplats, AI-kollega, samarbete, människa-maskin, kompetens"
  },
  {
    recordId: "recc6Gz0xNjJo",
    title: "Halvårsrapport 2025: AI-landskapet i Sverige",
    keywords: "Sverige, AI-statistik, adoption, trender 2025, halvårsrapport, svenska företag"
  }
];

async function backfillKeywords() {
  console.log(`Uppdaterar keywords för ${postsToUpdate.length} posts...\n`);

  // Uppdatera i batchar om 10
  for (let i = 0; i < postsToUpdate.length; i += 10) {
    const batch = postsToUpdate.slice(i, i + 10);

    const updates = batch.map(post => ({
      recordId: post.recordId,
      fields: {
        keywords: post.keywords
      }
    }));

    await updateRecords(BLOG_DATASHEET_ID, updates);

    for (const post of batch) {
      console.log(`✓ ${post.title}`);
      console.log(`  Keywords: ${post.keywords}\n`);
    }

    // Kort paus mellan batchar
    if (i + 10 < postsToUpdate.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log('Klart!');
}

backfillKeywords().catch(console.error);
