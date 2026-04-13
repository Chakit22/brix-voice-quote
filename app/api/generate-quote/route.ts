import { NextResponse } from 'next/server';
import { extractFromTranscript } from '@/lib/extract';
import { generateQuote } from '@/lib/quote';
import { searchCatalog } from '@/lib/embeddings';
import { ai } from '@/lib/gemini';
import type { EmbeddedService, QuoteResult } from '@/lib/types';
import catalogData from '@/data/catalog-embedded.json';

const catalog = catalogData as EmbeddedService[];

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json();

    if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 },
      );
    }

    const extraction = await extractFromTranscript(transcript.trim());

    const searchQuery = extraction.search_query;

    if (!searchQuery) {
      return NextResponse.json({
        error: 'Could not identify an HVAC job from your description. Please describe an air conditioning issue or service needed.',
      });
    }

    const embeddingResponse = await ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: searchQuery,
    });

    const queryEmbedding = embeddingResponse.embeddings?.[0]?.values;
    if (!queryEmbedding) {
      throw new Error('Failed to generate query embedding');
    }

    const matchedServices = searchCatalog(queryEmbedding, catalog, 12);

    if (matchedServices.length === 0) {
      return NextResponse.json({
        error: 'No matching services found in the catalog for your description. Please try again with more detail.',
      });
    }

    const { tiers, disclaimer } = await generateQuote(extraction, matchedServices);

    const result: QuoteResult = {
      extraction,
      searchQuery,
      tiers,
      disclaimer,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Quote generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate quote. Please try again.' },
      { status: 500 },
    );
  }
}
