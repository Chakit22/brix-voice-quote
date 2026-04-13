import { ai } from './gemini';
import type { Extraction, EmbeddedService, QuoteTier } from './types';

const QUOTE_PROMPT = `You are an HVAC quoting engine for an Australian HVAC company. Generate three quote tiers (Good, Better, Best) based on the job extraction and matched services from our catalog.

Rules:
- Good: Essential fix only. Minimum viable repair to resolve the immediate issue.
- Better: Recommended option. Fixes the issue properly with quality parts and includes preventive maintenance. Mark this as recommended.
- Best: Premium option. Comprehensive service including the fix, full system service, and upgrades where applicable.
- All prices in AUD. Include 10% GST separately.
- Each tier must have line items with: service name, parts list, parts_cost, labour_cost, and total.
- Be realistic with Australian HVAC pricing. Labour typically $90-$130/hr.
- Each tier should have a short label (e.g., "Essential Repair", "Recommended Service", "Complete Care") and a one-sentence description.

Return ONLY valid JSON matching this schema:
{
  "tiers": [
    {
      "tier": "Good" | "Better" | "Best",
      "label": string,
      "description": string,
      "line_items": [
        {
          "service": string,
          "parts": string[],
          "parts_cost": number,
          "labour_cost": number,
          "total": number
        }
      ],
      "subtotal": number,
      "gst": number,
      "total": number,
      "recommended": boolean
    }
  ],
  "disclaimer": string
}

Do NOT include any text outside the JSON object.`;

export async function generateQuote(
  extraction: Extraction,
  matchedServices: EmbeddedService[],
): Promise<{ tiers: QuoteTier[]; disclaimer: string }> {
  const catalogContext = matchedServices.map((s) => ({
    name: s.name,
    brand: s.brand,
    category: s.category,
    description: s.description,
    parts: s.parts,
    estimated_hours: s.estimated_hours,
    parts_cost: s.parts_cost,
    labour_rate: s.labour_rate,
    total_price: s.total_price,
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `${QUOTE_PROMPT}\n\nExtraction:\n${JSON.stringify(extraction, null, 2)}\n\nMatched Services from Catalog:\n${JSON.stringify(catalogContext, null, 2)}`,
    config: {
      temperature: 0.3,
      responseMimeType: 'application/json',
    },
  });

  const text = response.text ?? '';
  return JSON.parse(text) as { tiers: QuoteTier[]; disclaimer: string };
}
