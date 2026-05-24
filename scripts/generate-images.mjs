#!/usr/bin/env node
/**
 * Generate beauty product images via GPT Image 2 API
 * Usage: node scripts/generate-images.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'images');

const API_BASE = 'https://api.tokenrouter.com/v1';
const API_KEY = 'sk-UtvGgs4hW4hCWRVnN4MLXp91DK8bFmcafy0LdcEBWm1j0ySz';
const MODEL = 'openai/gpt-5.4-image-2';

// Each entry: [filename, prompt]
const IMAGES = [
  ['a1-judydoll-velvet-lip.png',
   'Professional product photography of a Chinese beauty brand lip glaze tube, velvet matte coral color, elegant minimal packaging with rose-gold cap, on a clean soft pink gradient background, studio lighting, e-commerce product shot, 800x800'],

  ['a2-judydoll-lip-tiktok.png',
   'Professional beauty product shot of a lip glaze being applied, coral velvet lip color swatch on lips close-up, soft warm lighting, vertical composition for TikTok, Chinese beauty brand aesthetic, dreamy bokeh background'],

  ['a3-judydoll-powder.png',
   'Professional product photography of a soft-focus pressed powder compact, open showing powder and mirror, nude beige color, minimal elegant packaging, on white marble surface, beauty brand product shot, Google ad banner style, 1200x628 wide format'],

  ['a4-judydoll-eyeshadow-palette.png',
   'Professional product photography of a 7-color eyeshadow palette, earth tone shades including brown, bronze, champagne, rose, arranged beautifully, open palette showing all colors, clean cream background, Chinese beauty brand, e-commerce main image'],

  ['a5-judydoll-summer-poster.png',
   'Beautiful summer beauty campaign poster design, coral and peach color scheme, cosmetic products arranged artistically with tropical flowers, fresh vibrant summer feel, Chinese beauty brand promotional material, Instagram square format'],

  ['a6-judydoll-brand-guide.png',
   'Flat lay of a beauty brand guideline book/manual, coral and cream color scheme, with brand logo samples and color swatches visible, professional brand identity document, clean white desk background, overhead shot'],

  ['a7-judydoll-lip-swatch-video.png',
   'Close-up of a hand holding a lip glaze tube with multiple lip color swatches on arm/wrist, coral and rose shades, beauty product swatch testing scene, warm soft lighting, TikTok video thumbnail style, vertical format'],

  ['a8-judydoll-blush.png',
   'Professional product photography of a round blush compact, peach pink color, delicate shimmer, open showing the powder, cute Korean-style packaging, on soft pink fabric background, beauty product shot'],

  ['a9-judydoll-lip-old.png',
   'Product photography of a lip glaze tube, slightly vintage/dated packaging design, coral color, on a plain white background, simple e-commerce style, older product generation look'],

  ['a10-judydoll-eyebrow.png',
   'Professional product photography of an eyebrow pencil, slim retractable design, dark brown color, with natural eyebrow stroke swatches shown beside it, clean white background, beauty product shot'],

  ['a11-intoyou-water-gloss.png',
   'Professional product photography of a glossy lip glaze, glass-like shine, rose pink color, sleek modern tube packaging, water droplet reflections, on reflective surface, high-end beauty brand product shot, Korean beauty aesthetic'],

  ['a12-intoyou-matte-lip.png',
   'Professional product photography of a matte lip mud/mousse, mauve bean-paste color, velvet texture swatch shown, modern minimalist tube packaging, on grey concrete background, vertical TikTok format, trendy beauty brand'],

  ['a13-intoyou-foundation.png',
   'Professional product photography of a liquid foundation bottle, glass bottle with pump, nude beige color, clean minimalist design, on white background with a drop of foundation beside it, Google ad style wide format'],

  ['a14-intoyou-618-poster.png',
   'Vibrant 618 shopping festival promotional poster, red and gold color scheme, beauty products arranged festively, bold sale typography, Chinese e-commerce big sale campaign design, exciting festive mood'],

  ['a15-intoyou-mascara.png',
   'Professional product photography of a mascara tube and wand, black sleek packaging, the wand showing bristle detail, on clean white background, beauty product e-commerce main image, studio lighting'],

  ['a16-intoyou-cleanser.png',
   'Professional product photography of a micellar water/makeup remover bottle, blue and clear packaging, fresh clean aesthetic, on white background with water splash elements, skincare product shot, Instagram square format'],

  ['a17-intoyou-brand-video.png',
   'Cinematic still from a beauty brand video, elegant woman applying lipstick, soft golden hour lighting, luxury beauty brand aesthetic, film grain, brand story mood, widescreen format'],

  ['a18-intoyou-loose-powder.png',
   'Professional product photography of a loose setting powder jar, fine translucent powder with puff, elegant minimal packaging, on soft fabric background, beauty product draft quality, slightly warm lighting'],

  ['a19-intoyou-rejected-poster.png',
   'Overly bright and garish beauty promotional poster, too many neon colors clashing, cosmetic products poorly arranged, looks unprofessional, rejected design concept with wrong brand tone'],

  ['a20-intoyou-archived.png',
   'Vintage-looking beauty campaign poster, slightly faded colors, dated design style, cosmetics arranged in older promotional style, archived campaign material look'],

  ['a21-colorkey-air-lip.png',
   'Professional product photography of a lightweight air lip glaze, sheer pink color, airy transparent tube packaging, cherry blossom petals scattered around, dreamy soft pink background, youthful beauty brand aesthetic'],

  ['a22-colorkey-eyeliner.png',
   'Professional product photography of a precision liquid eyeliner pen, ultra-fine tip shown, jet black, with a clean wing eyeliner stroke drawn on white surface, modern packaging, TikTok vertical format, trendy beauty brand'],

  ['a23-colorkey-eyeshadow.png',
   'Professional product photography of a colorful eyeshadow palette, vibrant sweet candy-like colors including purple, pink, blue, yellow, open palette on pastel background, cute youthful beauty brand, Google ad wide format'],

  ['a24-colorkey-anniversary-poster.png',
   'Elegant anniversary celebration poster for a beauty brand, purple and gold color scheme, sparkles and confetti elements, limited edition products displayed, festive luxurious mood, Instagram square format'],

  ['a25-colorkey-setting-spray.png',
   'Professional product photography of a facial setting spray bottle, transparent bottle with fine mist shown, refreshing cool blue-green tones, water droplets on bottle, clean white background, e-commerce product shot'],

  ['a26-colorkey-brand-video.png',
   'Cinematic still from a trendy beauty brand video, young model with colorful modern makeup, vibrant neon lights background, energetic urban style, brand promotional film still, widescreen format'],

  ['a27-colorkey-concealer.png',
   'Professional product photography of a concealer stick, nude beige shade, twist-up packaging, with smooth concealer swatch beside it, on clean white background, beauty product draft, simple lighting'],

  ['a28-colorkey-expired-event.png',
   'Slightly faded promotional event image for a beauty brand sale, past-season campaign look, cosmetics on display with dated promotional text, expired marketing material appearance'],

  ['a29-colorkey-blush-archived.png',
   'Product photography of a blush compact, rose pink shade, older generation packaging design, on plain background, archived product image, slightly vintage beauty product photography style'],

  ['a30-colorkey-skincare-set.png',
   'Professional product photography of a skincare set with 3 products (toner, serum, moisturizer), white and mint green packaging, clean minimal aesthetic, on white background, Instagram square format, K-beauty style'],

  ['a31-judydoll-loose-powder.png',
   'Professional product photography of a loose setting powder container, dome-shaped jar with sifter, translucent nude powder, soft rose-gold lid, on cream background, beauty product e-commerce shot for Lazada'],

  ['a32-judydoll-highlight-contour.png',
   'Professional product photography of a highlight and contour duo palette, champagne gold highlight and soft brown contour, open showing shimmer texture, elegant packaging, vertical TikTok format, beauty product shot'],

  ['a33-judydoll-color-eyeshadow.png',
   'Professional product photography of a colorful spring eyeshadow palette, gradient pastel colors including lavender, peach, mint, rose, open palette on floral background, fresh girly beauty brand, e-commerce main image'],

  ['a34-judydoll-cleansing-balm.png',
   'Professional product photography of a cleansing balm jar, green herbal natural packaging, with a small amount of balm texture shown, on natural bamboo/wood surface, clean skincare product shot, widescreen format'],

  ['a35-judydoll-lip-color-chart.png',
   'Professional lip glaze color chart showing 8 different lip color swatches arranged in a grid, ranging from nude to coral to rose to berry, each color labeled, clean white background, product reference image, beauty brand color palette'],
];

const CONCURRENCY = 3; // max parallel requests

async function generateImage(filename, prompt) {
  const outPath = path.join(OUT_DIR, filename);
  if (fs.existsSync(outPath)) {
    console.log(`  SKIP (exists): ${filename}`);
    return true;
  }

  console.log(`  GEN: ${filename}`);
  try {
    const res = await fetch(`${API_BASE}/images/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        n: 1,
        size: '1024x1024',
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`  FAIL ${filename}: ${res.status} ${errText.slice(0, 200)}`);
      return false;
    }

    const json = await res.json();
    const b64 = json.data?.[0]?.b64_json;
    if (!b64) {
      console.error(`  FAIL ${filename}: no b64_json in response`);
      console.error('  Response keys:', JSON.stringify(Object.keys(json)));
      return false;
    }

    fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
    console.log(`  OK: ${filename}`);
    return true;
  } catch (err) {
    console.error(`  ERR ${filename}: ${err.message}`);
    return false;
  }
}

async function runBatch(items, concurrency) {
  let idx = 0;
  let ok = 0;
  let fail = 0;

  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      const [filename, prompt] = items[i];
      const success = await generateImage(filename, prompt);
      if (success) ok++; else fail++;
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  return { ok, fail };
}

async function main() {
  console.log(`Generating ${IMAGES.length} beauty product images...`);
  console.log(`Output: ${OUT_DIR}\n`);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const { ok, fail } = await runBatch(IMAGES, CONCURRENCY);
  console.log(`\nDone: ${ok} succeeded, ${fail} failed`);
}

main().catch(console.error);
