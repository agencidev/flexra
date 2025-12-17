import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { generateImagePrompt, generateImageWithOpenRouter } from '../lib/image-prompt.js';
import { getRecords, updateRecords } from '../lib/aitable.js';

const slug = 'gpt-4-ar-har-detta-behover-du-veta-som-foretagare';
const BLOG_DATASHEET_ID = process.env.AITABLE_FLEXRA_BLOG_ID;

const promptData = generateImagePrompt({
  title: 'GPT-4 är här - detta behöver du veta som företagare',
  description: 'OpenAI släpper GPT-4 med förbättrad förståelse och nya möjligheter.',
  category: 'Nyheter'
});

console.log('Generating image for GPT-4 post...');
const imageUrl = await generateImageWithOpenRouter(promptData.prompt);

if (imageUrl.startsWith('data:image/')) {
  const base64Data = imageUrl.split(',')[1];
  const blogDir = join(process.cwd(), 'public', 'blog', slug);
  if (!existsSync(blogDir)) {
    mkdirSync(blogDir, { recursive: true });
  }
  writeFileSync(join(blogDir, 'hero.png'), Buffer.from(base64Data, 'base64'));
  console.log('Image saved!');

  // Update AITable
  const records = await getRecords(BLOG_DATASHEET_ID, { pageSize: 100 });
  const record = records.find(r => r.fields.slug === slug);
  if (record) {
    await updateRecords(BLOG_DATASHEET_ID, [{
      recordId: record.recordId,
      fields: {
        image: '/blog/' + slug + '/hero.png',
        imageAlt: promptData.altText
      }
    }]);
    console.log('AITable updated!');
  }
} else {
  console.log('Failed to generate image');
}
