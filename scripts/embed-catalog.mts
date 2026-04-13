import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY is required. Pass via environment.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function main() {
  const catalogPath = resolve(process.cwd(), 'data/hvac-catalog.json');
  const outputPath = resolve(process.cwd(), 'data/catalog-embedded.json');

  console.log('Reading catalog...');
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf-8'));
  console.log(`Found ${catalog.length} services`);

  const texts = catalog.map(
    (item: any) =>
      `${item.name}. ${item.description}. Brand: ${item.brand}. Category: ${item.category}. Parts: ${item.parts.join(', ')}`,
  );

  const BATCH_SIZE = 100;
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    console.log(`Embedding batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(texts.length / BATCH_SIZE)}...`);

    const response = await ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: batch,
    });

    if (!response.embeddings) {
      throw new Error(`Embedding failed for batch starting at index ${i}`);
    }

    for (const emb of response.embeddings) {
      allEmbeddings.push(emb.values!);
    }
  }

  const embedded = catalog.map((item: any, idx: number) => ({
    ...item,
    embedding: allEmbeddings[idx],
  }));

  writeFileSync(outputPath, JSON.stringify(embedded));
  console.log(`Wrote ${embedded.length} embedded services to ${outputPath}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
