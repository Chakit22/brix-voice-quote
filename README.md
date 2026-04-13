# brix Voice-to-Quote

AI-powered HVAC quoting tool. Speak a job description, get instant Good/Better/Best quote options.

## How It Works

1. **Voice Input** — Technician describes the job via microphone (Web Speech API) or picks a sample prompt
2. **AI Extraction** — Gemini AI parses the raw transcript into structured fields (brand, system type, issues, services needed, urgency)
3. **Query Reformulation** — The LLM generates an optimized search query using HVAC industry terminology
4. **RAG Retrieval** — Query is embedded via `gemini-embedding-001` and matched against a pre-embedded service catalog using cosine similarity (0.7 threshold)
5. **Quote Generation** — Matched services and extraction are sent to Gemini to compose three pricing tiers (Good/Better/Best) with line items, parts, labour, and GST

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI**: Google Gemini 2.5 Flash + Gemini Embedding 001
- **UI**: MUI v9 + Emotion (dark theme, purple & black)
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- A [Google AI Studio](https://aistudio.google.com) API key

### Setup

```bash
npm install
```

Create a `.env.local` file:

```
GEMINI_API_KEY=your-api-key-here
```

### Run

```bash
npm run dev
```

Open http://localhost:3000

### Embed Catalog

If you modify `data/hvac-catalog.json`, regenerate embeddings:

```bash
npx tsx scripts/embed-catalog.mts
```

## Project Structure

```
app/
  api/generate-quote/   # POST endpoint — extraction, retrieval, quote generation
  page.tsx              # Main UI — voice input, results display
  theme.ts              # MUI theme (purple & black)
  providers.tsx         # ThemeProvider wrapper
  layout.tsx            # Root layout with DM Sans font

components/
  Header.tsx            # App bar with branding
  MicButton.tsx         # Voice input with Web Speech API
  TranscriptDisplay.tsx # Shows transcript, reformatted query, extracted details
  QuoteCard.tsx         # Good/Better/Best tier cards
  LoadingState.tsx      # Skeleton loading

lib/
  extract.ts            # Gemini extraction prompt (HVAC-only validation)
  quote.ts              # Gemini quote generation prompt
  embeddings.ts         # Cosine similarity search with 0.7 threshold
  gemini.ts             # Google GenAI client
  types.ts              # TypeScript interfaces

data/
  hvac-catalog.json     # Service catalog (base prices, parts, labour rates)
  catalog-embedded.json # Pre-computed embeddings for catalog

scripts/
  embed-catalog.mts     # Script to generate catalog embeddings
```

## Deploy

```bash
vercel --prod
```

Set `GEMINI_API_KEY` in Vercel Environment Variables before deploying.
