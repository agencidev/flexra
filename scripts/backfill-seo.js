/**
 * Backfill-script för SEO-fält
 * Uppdaterar alla posts som saknar metaTitle, metaDescription eller canonicalUrl
 *
 * Kör: node scripts/backfill-seo.js
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { getRecords, updateRecords } from '../lib/aitable.js';

const BLOG_DATASHEET_ID = process.env.AITABLE_FLEXRA_BLOG_ID;

async function backfillSEO() {
  console.log('Hämtar alla blogginlägg...\n');

  // Hämta alla records med pagination
  const allRecords = [];
  let pageNum = 1;
  const pageSize = 100;

  while (true) {
    const records = await getRecords(BLOG_DATASHEET_ID, { pageSize, pageNum });
    allRecords.push(...records);
    if (records.length < pageSize) break;
    pageNum++;
  }

  console.log(`Hittade ${allRecords.length} posts\n`);

  let updatedCount = 0;

  for (const record of allRecords) {
    const fields = record.fields || {};
    const updates = {};
    let needsUpdate = false;

    // Kontrollera metaTitle
    if (!fields.metaTitle && fields.Title) {
      updates.metaTitle = fields.Title;
      needsUpdate = true;
    }

    // Kontrollera metaDescription
    if (!fields.metaDescription && fields.description) {
      updates.metaDescription = fields.description.slice(0, 160);
      needsUpdate = true;
    }

    // Kontrollera canonicalUrl
    if (!fields.canonicalUrl && fields.slug) {
      updates.canonicalUrl = `https://flexra.se/insikter/${fields.slug}`;
      needsUpdate = true;
    }

    if (needsUpdate) {
      const title = fields.Title || 'Okänd';
      console.log(`Uppdaterar: ${title}`);
      console.log(`  - metaTitle: ${updates.metaTitle ? 'ja' : 'nej'}`);
      console.log(`  - metaDescription: ${updates.metaDescription ? 'ja' : 'nej'}`);
      console.log(`  - canonicalUrl: ${updates.canonicalUrl ? 'ja' : 'nej'}`);

      await updateRecords(BLOG_DATASHEET_ID, [{
        recordId: record.recordId,
        fields: updates
      }]);

      updatedCount++;

      // Kort paus för att inte överbelasta API:et
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log(`\nKlart! Uppdaterade ${updatedCount} av ${allRecords.length} posts.`);
}

backfillSEO().catch(console.error);
