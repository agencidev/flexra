import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { generateImageWithOpenRouter } from '../lib/image-prompt.js';
import { updateRecords } from '../lib/aitable.js';

const BLOG_DATASHEET_ID = process.env.AITABLE_FLEXRA_BLOG_ID;
const RECORD_ID = 'rectgOIsNbQcX';
const SLUG = 'black-friday-for-ai-vilka-verktyg-ar-varda-pengarna';

// Enklare prompt för bildgenerering
const customPrompt = "Professional blog header image: shopping for AI software, digital deals and discounts, modern tech shopping concept, professional style. Style: modern how-to visual, practical and clear. Swedish business context. Aspect ratio 16:9. High quality, modern aesthetic. Soft, natural lighting. IMPORTANT: Do NOT include any text, words, letters, numbers, or typography in the image.";

async function saveImage(base64Data, slug) {
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = Buffer.from(base64Image, 'base64');

  const dir = `public/blog/${slug}`;
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const filePath = join(dir, 'hero.png');
  writeFileSync(filePath, imageBuffer);

  return `/blog/${slug}/hero.png`;
}

async function main() {
  console.log('Regenererar bild för Black Friday-inlägget...');

  console.log('Genererar bild...');
  const imageData = await generateImageWithOpenRouter(customPrompt);
  const imagePath = await saveImage(imageData, SLUG);
  console.log(`Bild sparad: ${imagePath}`);

  await updateRecords(BLOG_DATASHEET_ID, [{
    recordId: RECORD_ID,
    fields: {
      image: imagePath,
      imageAlt: "Illustration som visar AI-verktyg och Black Friday-erbjudanden i modern affärsmiljö"
    }
  }]);
  console.log('AITable uppdaterad med bild');
  console.log('Klart!');
}

main().catch(console.error);
