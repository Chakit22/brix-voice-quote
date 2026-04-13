import { ai } from './gemini';
import type { Extraction } from './types';

const EXTRACTION_PROMPT = `You are an HVAC service extraction engine. Extract structured information from a technician's spoken job description.

IMPORTANT: Only extract information that is clearly related to HVAC/air conditioning systems. If the transcript does not describe an HVAC job, return all fields as null or empty. Do NOT guess or infer HVAC meaning from non-HVAC terms.

Return ONLY valid JSON matching this schema:
{
  "brand": string | null,
  "system_type": string | null,
  "issues": string[],
  "services_needed": string[],
  "age_years": number | null,
  "urgency": "low" | "medium" | "high",
  "notes": string,
  "search_query": string
}

Rules:
- brand: Only known HVAC brands (Daikin, Fujitsu, Actron, Mitsubishi, Samsung, LG, Panasonic, Carrier, Toshiba), or null if not mentioned or if the brand mention is not in an HVAC context
- system_type: "split", "ducted", "multi-split", "cassette", "window", or null — only if an actual HVAC system is being described
- issues: list of HVAC-specific problems only (e.g., "not cooling", "leaking water", "strange noise", "compressor failure"). Leave as empty array if no HVAC issues are described
- services_needed: only HVAC services (e.g., "regas", "compressor replacement", "filter clean", "full service"). Leave as empty array if no HVAC services are needed
- age_years: system age if mentioned, else null
- urgency: "high" if system is completely down or safety issue, "medium" for degraded performance, "low" for maintenance/inspection. Default to "low" if unclear
- notes: any other relevant HVAC details, or empty string
- search_query: an optimized search string for matching against an HVAC service catalog. Use HVAC industry terminology, expand abbreviations (e.g., "regas" → "refrigerant recharge"), and include synonyms that would appear in service descriptions. If the transcript is not about HVAC, return an empty string

Do NOT include any text outside the JSON object.`;

export async function extractFromTranscript(transcript: string): Promise<Extraction> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `${EXTRACTION_PROMPT}\n\nTranscript: "${transcript}"`,
    config: {
      temperature: 0.1,
      responseMimeType: 'application/json',
    },
  });

  const text = response.text ?? '';
  return JSON.parse(text) as Extraction;
}
