import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const API_TOKEN = process.env.AITABLE_API_TOKEN;
const DATASHEET_ID = process.env.AITABLE_FLEXRA_BLOG_ID;

async function cleanup() {
  // Hämta alla records
  const res = await fetch(`https://aitable.ai/fusion/v1/datasheets/${DATASHEET_ID}/records?pageSize=100`, {
    headers: { 'Authorization': `Bearer ${API_TOKEN}` }
  });
  const data = await res.json();
  const records = data.data.records;

  // Gruppera efter slug
  const bySlug = {};
  for (const r of records) {
    const slug = r.fields.slug;
    if (!bySlug[slug]) bySlug[slug] = [];
    bySlug[slug].push(r);
  }

  // Hitta dubbletter och ta bort den utan bild
  const toDelete = [];
  for (const [slug, recs] of Object.entries(bySlug)) {
    if (recs.length > 1) {
      // Sortera: de med bild först
      recs.sort((a, b) => {
        const hasImageA = a.fields.image ? 1 : 0;
        const hasImageB = b.fields.image ? 1 : 0;
        return hasImageB - hasImageA;
      });
      // Ta bort alla utom första (den med bild)
      for (let i = 1; i < recs.length; i++) {
        toDelete.push(recs[i].recordId);
        console.log(`Ta bort: ${slug} (${recs[i].recordId})`);
      }
    }
  }

  if (toDelete.length === 0) {
    console.log('Inga dubbletter att ta bort');
    return;
  }

  console.log(`\nTar bort ${toDelete.length} dubbletter...`);

  // Ta bort i batchar om 10
  for (let i = 0; i < toDelete.length; i += 10) {
    const batch = toDelete.slice(i, i + 10);
    const ids = batch.join(',');
    const delRes = await fetch(`https://aitable.ai/fusion/v1/datasheets/${DATASHEET_ID}/records?recordIds=${ids}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    });
    const delData = await delRes.json();
    const batchNum = Math.floor(i / 10) + 1;
    console.log(`Batch ${batchNum}: ${delData.success ? 'OK' : 'FEL'}`);
  }

  console.log('Klart!');
}

cleanup().catch(console.error);
