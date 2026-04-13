import type { EmbeddedService } from './types';

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function searchCatalog(
  queryEmbedding: number[],
  catalog: EmbeddedService[],
  topK: number = 12,
): EmbeddedService[] {
  const scored = catalog.map((service) => ({
    service,
    score: cosineSimilarity(queryEmbedding, service.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored
    .filter((s) => s.score > 0.7)
    .slice(0, topK)
    .map((s) => s.service);
}
