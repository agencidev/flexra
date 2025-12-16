/**
 * Script för att generera bilder för befintliga blogginlägg
 *
 * Kör: node scripts/generate-post-images.js
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { generateImagePrompt, generateImageWithOpenRouter } from '../lib/image-prompt.js';
import { getRecords, updateRecords } from '../lib/aitable.js';

const BLOG_DATASHEET_ID = process.env.AITABLE_FLEXRA_BLOG_ID;

// Posts att generera bilder för (med exakta sluggar från AITable)
const postsToUpdate = [
  {
    slug: "chatgpt-har-lanserats-vad-betyder-det-for-svenska-foretag",
    title: "ChatGPT har lanserats - vad betyder det för svenska företag?",
    description: "OpenAI släppte ChatGPT idag. Vi tittar på vad det kan innebära för svenska företag.",
    category: "Nyheter"
  },
  {
    slug: "forsta-intrycken-av-chatgpt-sa-kan-ai-forandra-din-vardag",
    title: "Första intrycken av ChatGPT - så kan AI förändra din vardag",
    description: "Efter två veckors testande delar vi våra ärliga intryck av ChatGPT.",
    category: "Insikter"
  },
  {
    slug: "5-satt-att-borja-anvanda-ai-i-ditt-foretag-redan-idag",
    title: "5 sätt att börja använda AI i ditt företag redan idag",
    description: "Konkreta tips för att komma igång med AI utan stora investeringar.",
    category: "Guider"
  },
  {
    slug: "ai-for-nyborjare-en-praktisk-guide-for-smaforetagare",
    title: "AI för nybörjare: En praktisk guide för småföretagare",
    description: "En enkel guide till AI för dig som vill förstå grunderna.",
    category: "Guider"
  },
  {
    slug: "automation-vs-ai-vad-ar-egentligen-skillnaden",
    title: "Automation vs AI - vad är egentligen skillnaden?",
    description: "Vi reder ut begreppen och förklarar när du behöver vad.",
    category: "Insikter"
  }
];

async function generateAndSaveImage(post) {
  console.log(`\n📝 Genererar bild för: ${post.title}`);

  // Generera bildprompt
  const promptData = generateImagePrompt({
    title: post.title,
    description: post.description,
    category: post.category
  });

  console.log(`   Prompt: ${promptData.prompt.substring(0, 100)}...`);
  console.log(`   Alt-text: ${promptData.altText}`);

  try {
    // Generera bild via OpenRouter
    console.log(`   🎨 Genererar bild via OpenRouter...`);
    const imageUrl = await generateImageWithOpenRouter(promptData.prompt);

    // Spara bild lokalt
    const blogDir = join(process.cwd(), 'public', 'blog', post.slug);
    if (!existsSync(blogDir)) {
      mkdirSync(blogDir, { recursive: true });
    }

    // Extrahera base64-data och spara som fil
    if (imageUrl.startsWith('data:image/')) {
      const base64Data = imageUrl.split(',')[1];
      const extension = imageUrl.split(';')[0].split('/')[1];
      const filename = `hero.${extension}`;
      const filepath = join(blogDir, filename);

      writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
      console.log(`   ✅ Bild sparad: /public/blog/${post.slug}/${filename}`);

      return {
        slug: post.slug,
        localPath: `/blog/${post.slug}/${filename}`,
        altText: promptData.altText,
        success: true
      };
    } else {
      console.log(`   ℹ️  Bild-URL returnerad: ${imageUrl.substring(0, 50)}...`);
      return {
        slug: post.slug,
        imageUrl: imageUrl,
        altText: promptData.altText,
        success: true
      };
    }
  } catch (error) {
    console.error(`   ❌ Fel: ${error.message}`);
    return {
      slug: post.slug,
      error: error.message,
      success: false
    };
  }
}

async function updatePostsInAITable(results) {
  console.log(`\n📊 Uppdaterar AITable med nya bilder...`);

  // Hämta alla records för att få recordId
  const records = await getRecords(BLOG_DATASHEET_ID, { pageSize: 100 });

  for (const result of results) {
    if (!result.success) continue;

    // Hitta record med matchande slug
    const record = records.find(r => r.fields.slug === result.slug);
    if (!record) {
      console.log(`   ⚠️  Hittade inte record för: ${result.slug}`);
      continue;
    }

    // Uppdatera record
    const imageUrl = result.localPath || result.imageUrl;
    try {
      await updateRecords(BLOG_DATASHEET_ID, [{
        recordId: record.recordId,
        fields: {
          image: imageUrl,
          imageAlt: result.altText
        }
      }]);
      console.log(`   ✅ Uppdaterade: ${result.slug}`);
    } catch (error) {
      console.error(`   ❌ Kunde inte uppdatera ${result.slug}: ${error.message}`);
    }
  }
}

async function main() {
  console.log('🚀 Startar bildgenerering för blogginlägg\n');
  console.log(`   API Token: ${process.env.AITABLE_API_TOKEN ? '✓ Konfigurerad' : '✗ Saknas'}`);
  console.log(`   OpenRouter: ${process.env.OPENROUTER_API_KEY ? '✓ Konfigurerad' : '✗ Saknas'}`);
  console.log(`   Datasheet: ${BLOG_DATASHEET_ID}`);

  const results = [];

  for (const post of postsToUpdate) {
    const result = await generateAndSaveImage(post);
    results.push(result);

    // Vänta lite mellan requests för att inte överbelasta API:et
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Summering
  console.log('\n📋 Summering:');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  console.log(`   ✅ Lyckade: ${successful.length}`);
  console.log(`   ❌ Misslyckade: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\n   Misslyckade inlägg:');
    failed.forEach(f => console.log(`   - ${f.slug}: ${f.error}`));
  }

  // Uppdatera AITable
  if (successful.length > 0) {
    await updatePostsInAITable(successful);
  }

  console.log('\n✨ Klart!');
}

main().catch(console.error);
