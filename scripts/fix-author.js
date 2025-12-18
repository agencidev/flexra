/**
 * Fixar author för posts #36-50 som felaktigt fick "Flexra" istället för "Markus Westerlund"
 *
 * Kör: node scripts/fix-author.js
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { updateRecords } from '../lib/aitable.js';

const BLOG_DATASHEET_ID = process.env.AITABLE_FLEXRA_BLOG_ID;

// Posts som behöver author-fix (batch 4, #36-50)
const recordIds = [
  "rectgOIsNbQcX",  // Black Friday för AI
  "rec7PAABRkKYL",  // AI-strategi för 2025
  "recwQCLRots33",  // AI-agenter
  "rec4D2qi4D4wW",  // Två år med ChatGPT
  "recnxV0KG3Qwd",  // AI för småföretag
  "rec7xswt9j6pX",  // AI-trender 2025
  "rec1xJvkYfTND",  // 2025 vardagen
  "recZjQv2h6XfX",  // n8n vs Zapier vs Make
  "recKfrdbEHidf",  // AI inom juridik
  "recQHYQqcQDiH",  // 7 vanliga misstag
  "recYX64jBmlRo",  // AI projektledning
  "recHzOcD7Mnwb",  // Datadriven marknadsföring
  "recEg7HerPy1q",  // AI och hållbarhet
  "rec17h36F74Fa",  // Framtidens arbetsplats
  "recc6Gz0xNjJo"   // Halvårsrapport 2025
];

async function fixAuthor() {
  console.log(`Uppdaterar author för ${recordIds.length} posts...\n`);

  const updates = recordIds.map(recordId => ({
    recordId,
    fields: {
      author: "Markus Westerlund"
    }
  }));

  // Uppdatera i batchar om 10
  for (let i = 0; i < updates.length; i += 10) {
    const batch = updates.slice(i, i + 10);
    await updateRecords(BLOG_DATASHEET_ID, batch);
    console.log(`Batch ${Math.floor(i / 10) + 1} klar (${batch.length} posts)`);
  }

  console.log('\nKlart! Alla 15 posts har nu author: "Markus Westerlund"');
}

fixAuthor().catch(console.error);
