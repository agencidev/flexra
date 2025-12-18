/**
 * Backfill-script för imageAlt
 * Uppdaterar alla 50 posts med unika, beskrivande alt-texter
 *
 * Kör: node scripts/backfill-imagealt.js
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { updateRecords } from '../lib/aitable.js';

const BLOG_DATASHEET_ID = process.env.AITABLE_FLEXRA_BLOG_ID;

// Alla 50 posts med unikt framtagna alt-texter baserat på titel och innehåll
const postsToUpdate = [
  {
    recordId: "rec8n6kaJ1GyT",
    title: "ChatGPT har lanserats - vad betyder det för svenska företag?",
    imageAlt: "ChatGPT-logotyp och svensk flagga symboliserar AI-lanseringens inverkan på svenska företag"
  },
  {
    recordId: "recfXPaFn1QNg",
    title: "Första intrycken av ChatGPT: Så kan AI förändra din vardag",
    imageAlt: "Person som interagerar med ChatGPT på laptop, visar vardaglig AI-användning"
  },
  {
    recordId: "recygZFGvLR0h",
    title: "5 sätt att börja använda AI i ditt företag redan idag",
    imageAlt: "Fem ikoner som representerar olika AI-användningsområden för företag"
  },
  {
    recordId: "recoHTUySnXEb",
    title: "AI för nybörjare: En praktisk guide för småföretagare",
    imageAlt: "Nybörjarvänlig illustration av AI-verktyg anpassade för småföretagare"
  },
  {
    recordId: "recjqTxSxF4pw",
    title: "Automation vs AI - vad är egentligen skillnaden?",
    imageAlt: "Jämförelse mellan traditionell automation och modern AI-teknologi"
  },
  {
    recordId: "rec87RONCs0pW",
    title: "Konsten att skriva bättre prompts för ChatGPT",
    imageAlt: "Exempel på välformulerade AI-prompts med tydliga instruktioner"
  },
  {
    recordId: "recOe2H3bwGBX",
    title: "GPT-4 är här - detta behöver du veta som företagare",
    imageAlt: "GPT-4-logotyp med nyckelförbättringar markerade för företagsanvändning"
  },
  {
    recordId: "recsFkgp2xpBS",
    title: "5 AI-verktyg som sparar dig timmar varje vecka",
    imageAlt: "Samling produktivitetsverktyg: Otter.ai, Notion AI och Grammarly"
  },
  {
    recordId: "recgKat62wlQP",
    title: "Automatisera din fakturering med AI-stöd",
    imageAlt: "Automatiserat faktureringsflöde med AI som hanterar bokföringsprocessen"
  },
  {
    recordId: "rec3T9iWcEMAd",
    title: "AI inom marknadsföring: Möjligheter och fallgropar",
    imageAlt: "Marknadsföringsdiagram med AI-möjligheter och varningsflaggor"
  },
  {
    recordId: "reccqeJ7C04y7",
    title: "Chatbots för kundtjänst - är det värt investeringen?",
    imageAlt: "Kundtjänst-chatbot som kommunicerar med kunder i realtid"
  },
  {
    recordId: "reck5A1e6ZU1H",
    title: "AI-etik: Vad varje företagsledare måste tänka på",
    imageAlt: "Vågskal som balanserar AI-innovation mot etiska överväganden"
  },
  {
    recordId: "recvdyuw6ZlUN",
    title: "Semesterläsning: 5 böcker om AI som förändrar ditt perspektiv",
    imageAlt: "Bokhög med fem rekommenderade AI-böcker för sommarläsning"
  },
  {
    recordId: "rect1EwdL2xwJ",
    title: "Så förbereder du ditt team för AI-transformation",
    imageAlt: "Team i workshop som planerar organisationens AI-transformation"
  },
  {
    recordId: "rec3GYCiZkxrm",
    title: "AI inom HR: Smartare rekrytering och onboarding",
    imageAlt: "HR-process som visar AI-assisterad rekrytering och onboarding-flöde"
  },
  {
    recordId: "recCD9D6ayk04",
    title: "Höstens AI-trender: Vad svenska företag satsar på",
    imageAlt: "Trendgraf över AI-investeringar bland svenska företag hösten 2023"
  },
  {
    recordId: "recpH5HeIXOU9",
    title: "ROI på AI-investeringar - så räknar du rätt",
    imageAlt: "Kalkylator och diagram som visar ROI-beräkning för AI-investering"
  },
  {
    recordId: "recD9iJaZNkPQ",
    title: "AI-assistenter i jämförelse: ChatGPT, Claude och Bard",
    imageAlt: "Tre AI-assistenter ChatGPT, Claude och Bard i direkt jämförelse"
  },
  {
    recordId: "recacFabsBMsr",
    title: "Ett år med ChatGPT: Lärdomar från svenska företag",
    imageAlt: "Tidslinje som visar ett års utveckling med ChatGPT i svensk verksamhet"
  },
  {
    recordId: "rec3SuFwz29Cg",
    title: "Julens bästa AI-verktyg för företagare",
    imageAlt: "Presentpaket med årets bästa AI-verktyg för julens arbete"
  },
  {
    recordId: "recxe2MwpITOG",
    title: "AI-trender 2024: Vad väntar runt hörnet?",
    imageAlt: "Framåtblickande visualisering av AI-trender för kommande år"
  },
  {
    recordId: "rec4tbHr8DLMm",
    title: "Nyårslöften för digitalisering: Börja med AI",
    imageAlt: "Nyårsklocka och checklista för digitala förändringsmål med AI"
  },
  {
    recordId: "recjqLUFRpk2V",
    title: "Integrera AI i ditt befintliga workflow - steg för steg",
    imageAlt: "Steg-för-steg-diagram för AI-integration i befintligt arbetsflöde"
  },
  {
    recordId: "recyYIHawLCAu",
    title: "AI för ekonomiavdelningen: Från bokföring till analys",
    imageAlt: "Ekonomiavdelning med AI-verktyg för bokföring och finansanalys"
  },
  {
    recordId: "recAqCOq8SrHV",
    title: "Sora och AI-genererad video: En ny era för innehåll",
    imageAlt: "OpenAI Sora som genererar videomaterial för innehållsskapande"
  },
  {
    recordId: "rec6Qc7nb7jFS",
    title: "Automatisera rapportering med AI - en komplett guide",
    imageAlt: "Automatiskt genererad affärsrapport med AI-driven dataanalys"
  },
  {
    recordId: "rec7lEORqC0Xj",
    title: "AI governance: Policies för ansvarsfull AI-användning",
    imageAlt: "Dokument med riktlinjer och policys för företagets AI-användning"
  },
  {
    recordId: "rec3hSTzjGqKP",
    title: "Claude vs ChatGPT: Vilken AI-assistent passar ditt företag?",
    imageAlt: "Claude och ChatGPT logotyper i direkt jämförelse för företag"
  },
  {
    recordId: "recOIctkn48LE",
    title: "AI inom tillverkningsindustrin: Verkliga exempel",
    imageAlt: "Fabriksrobotar och AI-system i svensk tillverkningsindustri"
  },
  {
    recordId: "recbOb1aRDhWx",
    title: "Dataskydd och AI: GDPR-perspektivet för svenska företag",
    imageAlt: "GDPR-symbol kombinerad med AI-teknologi för dataskydd"
  },
  {
    recordId: "recap4jV3tyc0",
    title: "Sommarens AI-projekt: Börja smått, tänk stort",
    imageAlt: "Sommarprojekt-planering med AI-experiment i mindre skala"
  },
  {
    recordId: "rec93bXKoIuaJ",
    title: "AI för e-handel: Personalisering som ökar försäljningen",
    imageAlt: "E-handelsplattform med AI-driven produktpersonalisering"
  },
  {
    recordId: "recfQD3AapS1y",
    title: "Automatisera sociala medier med AI-verktyg",
    imageAlt: "Sociala medier-flöde som hanteras av AI för schemaläggning"
  },
  {
    recordId: "recwYxGHmQVTI",
    title: "AI inom redovisning: Bokföring på autopilot",
    imageAlt: "Bokföringsprogram med AI som automatiserar redovisningsprocessen"
  },
  {
    recordId: "recxaenrDzemz",
    title: "Höstens nya AI-verktyg: Vad är värt att testa?",
    imageAlt: "Höstlöv och nya AI-verktyg som lanseras under säsongen"
  },
  {
    recordId: "rectgOIsNbQcX",
    title: "Black Friday för AI: Vilka verktyg är värda pengarna?",
    imageAlt: "Black Friday-erbjudanden på AI-prenumerationer och verktyg"
  },
  {
    recordId: "rec7PAABRkKYL",
    title: "Så bygger du en AI-strategi för 2025",
    imageAlt: "Strategidokument och roadmap för AI-implementation 2025"
  },
  {
    recordId: "recwQCLRots33",
    title: "AI-agenter: Nästa steg i intelligent automation",
    imageAlt: "Autonoma AI-agenter som samarbetar i automatiserade arbetsflöden"
  },
  {
    recordId: "rec4D2qi4D4wW",
    title: "Två år med ChatGPT: Hur AI har förändrat arbetslivet",
    imageAlt: "Tvåårig tillbakablick på ChatGPTs påverkan på arbetsplatsen"
  },
  {
    recordId: "recnxV0KG3Qwd",
    title: "AI för småföretag: Budgetvänliga lösningar som fungerar",
    imageAlt: "Prisvärd AI-verktygslåda anpassad för småföretagarbudget"
  },
  {
    recordId: "rec7xswt9j6pX",
    title: "AI-trender 2025: Prognoser och förväntningar",
    imageAlt: "Kristallkula och prognosgraf för AI-utvecklingen 2025"
  },
  {
    recordId: "rec1xJvkYfTND",
    title: "2025: Året då AI blir en naturlig del av vardagen",
    imageAlt: "Vardagsscen där AI naturligt integreras i dagliga arbetsuppgifter"
  },
  {
    recordId: "recZjQv2h6XfX",
    title: "n8n vs Zapier vs Make: Bästa automationsplattformen",
    imageAlt: "Jämförelsetabell mellan n8n, Zapier och Make automationsverktyg"
  },
  {
    recordId: "recKfrdbEHidf",
    title: "AI inom juridik: Automatiserad avtalshantering",
    imageAlt: "Juridiska avtal som granskas och hanteras av AI-system"
  },
  {
    recordId: "recQHYQqcQDiH",
    title: "7 vanliga misstag vid AI-implementation (och hur du undviker dem)",
    imageAlt: "Varningsskyltar som markerar sju vanliga AI-implementationsmisstag"
  },
  {
    recordId: "recYX64jBmlRo",
    title: "AI för projektledning: Verktyg och metoder som fungerar",
    imageAlt: "Projektledningstavla med AI-verktyg som Otter.ai och Motion"
  },
  {
    recordId: "recHzOcD7Mnwb",
    title: "Datadriven marknadsföring med AI: En praktisk guide",
    imageAlt: "Marknadsföringsanalys med AI-driven lead scoring och personalisering"
  },
  {
    recordId: "recEg7HerPy1q",
    title: "AI och hållbarhet: Så bidrar automation till grön omställning",
    imageAlt: "Gröna löv och AI-symbol visar hållbar automation och miljöpåverkan"
  },
  {
    recordId: "rec17h36F74Fa",
    title: "Framtidens arbetsplats: AI som din nya kollega",
    imageAlt: "Kontor där människor och AI-assistenter arbetar sida vid sida"
  },
  {
    recordId: "recc6Gz0xNjJo",
    title: "Halvårsrapport 2025: AI-landskapet i Sverige",
    imageAlt: "Sverigekarta med statistik över AI-adoption i olika regioner"
  }
];

async function backfillImageAlt() {
  console.log(`Uppdaterar imageAlt för ${postsToUpdate.length} posts...\n`);

  // Uppdatera i batchar om 10
  for (let i = 0; i < postsToUpdate.length; i += 10) {
    const batch = postsToUpdate.slice(i, i + 10);
    const batchNum = Math.floor(i / 10) + 1;
    const totalBatches = Math.ceil(postsToUpdate.length / 10);

    const updates = batch.map(post => ({
      recordId: post.recordId,
      fields: {
        imageAlt: post.imageAlt
      }
    }));

    await updateRecords(BLOG_DATASHEET_ID, updates);

    console.log(`Batch ${batchNum}/${totalBatches} klar:`);
    for (const post of batch) {
      console.log(`  ✓ ${post.title.substring(0, 50)}...`);
    }
    console.log('');

    // Kort paus mellan batchar
    if (i + 10 < postsToUpdate.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log('Klart! Alla 50 posts har nu unika imageAlt-texter.');
}

backfillImageAlt().catch(console.error);
